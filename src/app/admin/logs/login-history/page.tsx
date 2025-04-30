'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { SearchInput } from '@/components/SearchInput';
import { Pagination } from '@/components/Pagination';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function LoginSuccessPage() {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const params = new URLSearchParams({
    query,
    page: String(page),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(status !== 'all' && { status }),
  });

  const { data, isLoading } = useSWR( `/api/admin/logs/login-history?${params.toString()}`, fetcher);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1); // 검색 시 페이지 초기화
  };

  const logs = data?.logs || [];
  const total = data?.total || 0;

  return (
    <main className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">✅ 로그인 이력</h1>

      {/* 검색/필터 */}
      <form onSubmit={handleSearch} className="mb-4 flex justify-end">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 mr-2"
        >
          <option value="all">전체</option>
          <option value="success">로그인 성공</option>
          <option value="fail">로그인 실패</option>
        </select>
        <SearchInput 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(e) => setStartDate(e.target.value)}
          onEndDateChange={(e) => setEndDate(e.target.value)}
        />
        <button className="ml-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded">
          검색
        </button>
      </form>

      {/* 테이블 */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">이름</th>
            <th className="p-2 border">로그인 시간</th>
            <th className="p-2 border">실패 사유</th> 
          </tr>
        </thead>
          <tbody>
            {logs.map((log: any, i: number) => (
              <tr key={i} className="text-center">
                <td className="border p-2">{log.userId}</td>
                <td className="border p-2">{log.name || '-'}</td>
                <td className="border p-2">
                  {log.time
                    ? new Date(log.time).toLocaleString('ko-KR', {
                        timeZone: 'Asia/Seoul',
                      })
                    : '-'}
                </td>
                <td className="border p-2">{log.status === 'fail' ? log.reason || '-' : '-'}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4">데이터가 없습니다</td>
              </tr>
            )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={page}
          totalItems={total}
          itemsPerPage={10}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
