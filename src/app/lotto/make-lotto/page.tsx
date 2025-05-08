"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { usePageVisitLogger } from "@/hooks/usePageVisitLogger";
import LottoCountChart from "@/components/LottoCountChart";


interface CountItem {
  number: number;
  count: number;
}

//GET
const fetcher = (url: string) => fetch(url).then(res => res.json());

// POST 
const postClickLog = async (url: string) => {
  const res = await fetch(url, { method: "POST" });
  if (!res.ok) throw new Error("클릭 로그 저장 실패");
  return res.json();
};

//GET
const countsByNumbers = async (url: string) => {
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error("counts 로딩 실패");
  return res.json();
};

export default function LottoPage() {
  
  //방문기록
  usePageVisitLogger("make-lotto");
  
  //로그인 여부 확인하기위해 세션정보가져오기
  const { data: session, status } = useSession();
  const router = useRouter();
  
  
  const [countData, setCountData] = useState<CountItem[] | null>(null);
  
  // swr을 이용해서 get 요청 (로또 번호 가져오기)
  const [lottoData, setLottoData] = useState<{ numbers: number[] } | null>(null);

  // swr을 이용해서 POST 요청 (클릭 로그 생성)
  const { trigger: triggerClickLog } = useSWRMutation("/api/lotto/make-lotto", postClickLog);

  //swr로 api 요청
  const handleClick = async () => {
    try {

    // 로또 번호 요청
    const lottoRes = await fetcher("/api/lotto/make-lotto");
    const numbers = lottoRes.numbers;
    setLottoData(lottoRes)

    // 카운트 데이터 요청
    const numberQuery = numbers.join(",");
    const countRes = await countsByNumbers(`/api/lotto/counts?numbers=${numberQuery}`);

    // 상태 업데이트
    setCountData(countRes);
    
    // 클릭로그저장
    await triggerClickLog();

    } catch (err) {
      console.error("실패", err);
    } 
  };

  if (status !== "loading" && !session) {
    router.push("/");
    return null;
  }

  return (
        <main className="flex flex-col items-center p-10 bg-gray-100 min-h-screen pt-25">
          <h1 className="text-3xl font-bold mb-6">🎰 로또 번호 생성기 🍀</h1>
          <button 
            onClick={handleClick} 
            className="px-[20px] py-[10px] text-[1rem] bg-white cursor-pointer mb-[30px] border-2 border-[#87d37c] text-[#87d37c] hover:bg-[#87d37c] hover:text-white active:bg-[#87d37c] active:border-white"
          >
            번호 생성하기
          </button>
          
          {/* {error && <p className="text-red-500">로딩 실패</p>}
          {isLoading && <p>로딩 중...</p>} */}

          <div className="flex gap-2 mb-10 min-h-[80px] items-center justify-center">
            {lottoData?.numbers?.length ? (
              lottoData.numbers.map((num: number, idx: number) => (
                <div
                  key={idx}
                  className="w-[50px] h-[50px] rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-bold text-[1.2rem] border-2"
                >
                  {num}
                </div>
              ))
            ) : (
              <div className="h-[50px]" />
            )}
          </div>
          <div className="w-full max-w-4xl">
            {lottoData?.numbers && countData?.length ? (
              <LottoCountChart
                data={countData.filter((item) => lottoData.numbers.includes(item.number))}
              />
            ) : null}
          </div>

        </main>

  );
}
