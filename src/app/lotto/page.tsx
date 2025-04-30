"use client"

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { usePageVisitLogger } from "@/hooks/usePageVisitLogger";

//GET
const fetcher = (url: string) => fetch(url).then(res => res.json());

// POST 
const postClickLog = async (url: string) => {
  const res = await fetch(url, { method: "POST" });
  if (!res.ok) throw new Error("클릭 로그 저장 실패");
  return res.json();
};

export default function LottoPage() {
  
  //방문기록
  usePageVisitLogger("lotto");

  // 번호생성 버튼 눌러야만 번호가 보이게 초기값 설정
  const [callFetch, setCallFetch] = useState(false);

  // swr을 이용해서 get 요청 (로또 번호 가져오기)
  const { data: lottoData, error, isLoading } = useSWR(callFetch ? "/api/lotto" : null, fetcher);

  // swr을 이용해서 POST 요청 (클릭 로그 생성)
  const { trigger: triggerClickLog } = useSWRMutation("/api/lotto", postClickLog);

  //swr로 api 요청
  const handleClick = async () => {
    setCallFetch(true); // 버튼 클릭 시 fetch 시작
    await mutate("/api/lotto");

    try {
      await triggerClickLog(); // 클릭 로그 저장
    } catch (err) {
      console.error("로그 저장 실패", err);
    } 
  };

  //로그인 여부 확인하기위해 세션정보가져오기
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status !== "loading" && !session) {
    router.push("/");
    return null;
  }

  return (
    <main className="flex flex-col items-center mt-[100px]">
      <h1 className="text-2xl mb-5">🎰 로또 번호 생성기 🍀</h1>
      <button 
        onClick={handleClick} 
        className="px-[20px] py-[10px] text-[1rem] bg-white cursor-pointer mb-[30px] border-2 border-[#87d37c] text-[#87d37c] hover:bg-[#87d37c] hover:text-white active:bg-[#87d37c] active:border-white"
      >
        번호 생성하기
      </button>
      
      {error && <p className="text-red-500">로딩 실패</p>}
      {isLoading && <p>로딩 중...</p>}

      <div className="flex gap-2">
        {lottoData?.numbers?.map((num: number, idx: number) => (
          <div 
            key={idx} 
            className ="w-[50px] h-[50px] rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-bold text-[1.2rem] mb-[100px] border-2"
          >
            {num}
          </div>
        ))}
      </div>
    </main>

  );
}
