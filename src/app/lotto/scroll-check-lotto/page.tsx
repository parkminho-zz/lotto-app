'use client';


import useSWRInfinite from "swr/infinite";
import { LottoResult } from "@/types/lotto";
import LottoWinnersTable from '@/components/LottoWinnersTable';
import { usePageVisitLogger } from "@/hooks/usePageVisitLogger";
import { useEffect, useRef } from "react";

//GET
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CheckLottoPage() {
    usePageVisitLogger("check-lotto(scroll)");
  
    // SWR Infinite 설정
    const { data, size, setSize, isLoading, isValidating, error} = useSWRInfinite<{ result: LottoResult }>(
      (index) => `/api/lotto/scroll-check-lotto?page=${index + 1}`, // page는 1부터 시작
      fetcher,
      { revalidateAll: false } //항상 모든 페이지의 갱신 시도
    );
  
    console.log(data);
    const allResults = data?.map((d) => d.result) || [];
  
    // 무한스크롤 감지용 ref
    const bottomRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isValidating) {
            setSize(size + 1); // 다음 페이지 로드
          }
        },
        // 요소가 뷰포트에 1/2만 나와도 0.5의 값이 나옴 완전 뷰포트에 보여야하므로 1로 함
        { threshold: 1 } 
      );
  
      if (bottomRef.current) observer.observe(bottomRef.current);
  
      return () => {
        if (bottomRef.current) observer.unobserve(bottomRef.current);
      };
    }, [bottomRef, isValidating, size, setSize]);
  
    if (error) return <p className="text-red-500">로또 정보를 불러오지 못했습니다.</p>;
  

  return (
    <div className="flex flex-col items-center p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">✅ 로또 당첨번호 확인</h1>

      {allResults.map((result) => (
        <div
          key={result.round}
          className="bg-white rounded-xl shadow-md p-8 w-full max-w-5xl text-center mb-10"
        >
          <h2 className="text-2xl font-semibold mb-2">{result.round}회 당첨결과</h2>
          <p className="text-sm text-gray-600 mb-6">
            ({result.drawDate.split("T")[0]} 추첨)
          </p>

          <div className="flex items-center justify-center gap-3 mb-4">
            {[result.number1, result.number2, result.number3, result.number4, result.number5, result.number6].map(
              (num, idx) => (
                <div
                  key={idx}
                  className="w-[50px] h-[50px] rounded-full bg-[#4CAF50] text-white flex items-center justify-center font-bold text-lg"
                >
                  {num}
                </div>
              )
            )}
            <span className="text-xl font-bold">+</span>
            <div className="w-[50px] h-[50px] rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-lg">
              {result.bonusNumber}
            </div>
          </div>

          <LottoWinnersTable result={result} />
        </div>
      ))}

      {isLoading || isValidating ? <p>로딩 중...</p> : null}

      {/* 스크롤 감지 요소 */}
      <div ref={bottomRef} className="h-10" />
    </div>
  );
}