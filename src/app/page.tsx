'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-10 space-y-6 mb-50">
        {isLoggedIn ? (
          <>
            <Link href="/lotto/make-lotto">
              <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg transition duration-300 ease-in-out">
                🎰 로또 번호 생성하러 가기 🍀
              </button>
            </Link>
            <Link href="/lotto/check-lotto">
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl shadow-lg transition duration-300 ease-in-out">
                ✅ 로또 당첨번호 확인하러 가기
              </button>
            </Link>
          </>
        ) : (
          <h1 className="text-2xl text-red-500">로그인이 필요합니다.</h1>
        )}
      </main>
    </div>
  );
}
