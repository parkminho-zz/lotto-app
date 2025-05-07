'use client';

import useSWR from "swr";
import { LottoResult } from "@/types/lotto";
import LottoWinnersTable from '@/components/LottoWinnersTable';
import { usePageVisitLogger } from "@/hooks/usePageVisitLogger";
import RoundSelector from "@/components/RoundSelector";
import { useEffect, useState } from "react";

//GET
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CheckLottoPage() {

  //방문기록
  usePageVisitLogger("check-lotto");

  // 첫 렌더링에서 최신 회차 보여주기 위해 초기 상태 설정
  const { data, error, isLoading } = useSWR<{ result: LottoResult; roundNumbers: number[] }>(
    "/api/lotto/check-lotto",
    fetcher
  );
  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  useEffect(() => {
    if (data && !selectedRound) {
      setSelectedRound(data.result.round);
    }
  }, [data, selectedRound]);

  // 선택된 회차가 있다면 그 회차 데이터를 따로 fetch
  const { data: selectedData, isLoading: isSelectedLoading  } = useSWR(
    selectedRound ? `/api/lotto/check-lotto?round=${selectedRound}` : null,
    fetcher
  );

  const result = selectedData?.result || data?.result;
  const roundNumbers = data?.roundNumbers || [];

  if (error) return <p className="text-red-500">로또 정보를 불러오지 못했습니다.</p>;
  if (isLoading || isSelectedLoading || !result) return <p>로딩 중...</p>;

  return (
    <div className="flex flex-col items-center p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">✅ 로또 당첨번호 확인</h1>

      <div className="mb-4">
        <RoundSelector
          rounds={roundNumbers}
          selectedRound={selectedRound || result.round}
          onChange={setSelectedRound}
        />
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-5xl text-center">
        <h2 className="text-2xl font-semibold mb-2">{result.round}회 당첨결과</h2>
        <p className="text-sm text-gray-600 mb-6">({result.drawDate.split('T')[0]} 추첨)</p>

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
    </div>
  );
}