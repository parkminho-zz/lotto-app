"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RecentLogs, Summary } from "@/types/logs";
import useSWR from 'swr';
import { SummaryCard } from "@/components/SummaryCard";
import { RecentLogTable } from "@/components/RecentLogTable";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminLogsDashboard() {
  const { data, error, isLoading } = useSWR('/api/admin/logs/summary', fetcher);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  const summary = data.summary;
  const recentLogs = data.recentLogs;


  return (
    <main className="p-6  w-full h-full">
      <h1 className="text-2xl font-bold mb-4">📊 로그 대시보드</h1>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <SummaryCard label="로그인 성공" value={summary.loginSuccess} color="green"/> 
        <SummaryCard label="로그인 실패" value={summary.loginFail} color="red"/>
        <SummaryCard label="로또 클릭" value={summary.lottoClicks} color="blue"/>
        <SummaryCard label="페이지 방문" value={summary.pageVisits} color="purple"/>
      </div>

      {/* 최근 로그 테이블 */}
      <div className="space-y-8">
        <RecentLogTable
          title="최근 로그인"
          logs={recentLogs.login}
        />
        <RecentLogTable
          title="최근 로그인 실패"
          logs={recentLogs.fail}
        />
      </div>
    </main>
  );
}