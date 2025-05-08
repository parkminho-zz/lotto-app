"use client";

import useSWR from 'swr';
import { SummaryCard } from "@/components/SummaryCard";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Footer() {
  const { data, error, isLoading } = useSWR('/api/admin/logs/summary', fetcher);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  const summary = data.summary;


  return (
    <main className="fixed bottom-0 left-0 w-full bg-gray-50 text-center py-4 shadow-md z-40 border-t">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <SummaryCard label="로그인 성공" value={summary.loginSuccess} color="green"/> 
        <SummaryCard label="로그인 실패" value={summary.loginFail} color="red"/>
        <SummaryCard label="로또 클릭" value={summary.lottoClicks} color="blue"/>
        <SummaryCard label="페이지 방문" value={summary.pageVisits} color="purple"/>
      </div>
    </main>
  );
}