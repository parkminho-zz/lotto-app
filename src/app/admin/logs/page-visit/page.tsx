"use client";

import useSWR from "swr";
import PageVisitChart from "@/components/PageVisitChart";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PageVisitStatsPage() {
  const { data, isLoading } = useSWR("/api/admin/logs/page-visit", fetcher);

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <main className="min-h-screen p-6 w-full box-border">
    <h1 className="text-2xl font-bold mb-5">📈 페이지 방문 통계</h1>
    <PageVisitChart data={data || []} />
    </main>
  );
}
