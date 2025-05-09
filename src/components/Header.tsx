'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link href="/">
        <h1 className="text-2xl font-bold text-green-600 hover:opacity-80 cursor-pointer">
          LottoApp
        </h1>
      </Link>
      <div className="flex gap-4 items-center">
        <a href="https://github.com/parkminho-zz/lotto-app/tree/main/src/app">
            <button className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition">
            깃허브
            </button>
        </a>

        {isAdmin && (
          <Link href="/admin/logs/summary">
            <button className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition">
              관리자 페이지
            </button>
          </Link>
        )}

        {status === "loading" ? null : session ? (
            <>
              <div>환영합니다, {session.user?.name}님!</div>
              <button
              onClick={handleLogout}
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
              >
              로그아웃
              </button>
            </>
        ) : (
          <>
            <Link href="/api/auth/signin">
            <button className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition">
                로그인
            </button>
            </Link>
            <Link href="/signup">
            <button className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition">
                회원가입
            </button>
            </Link>      
          </>      
        )}
      </div>
    </header>
  );
}
