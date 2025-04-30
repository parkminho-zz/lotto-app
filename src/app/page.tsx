"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
 
  return (
    <main className="flex flex-col items-center mt-[100px]">
      {isLoggedIn ? (
        <Link href="/lotto" className="flex">
          <h1 className="text-2xl mb-5 text-[green]">🎰 로또 번호 생성하러가기 🍀</h1>
        </Link>
      ) : (
        <h1 className="text-2xl mb-5 text-red-500">로그인이 필요합니다.</h1>
      )}
    </main>
  );
}
