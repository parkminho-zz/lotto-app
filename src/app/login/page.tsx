"use client"

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect  } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // 실패했을 때 redirect 방지
    });

    if (res?.error) {
      alert("존재하지 않는 계정이거나 틀린 비밀번호입니다."); // alert 창 띄우기
    } else {
      console.log("로그인성공여부 확인 : " + res); // 로그인 성공여부 확인
      window.location.href = "/"; // 로그인 성공 시 메인 페이지로 이동
    }
  };

  useEffect(() => {
    if (session) {
      console.log("현재 세션:", session);
    }
  }, [session])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
        <div className="bg-white p-8 rounded-2xl shadow-md w-96 translate-y-[-80px]">
          <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">아이디</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="비밀번호 입력"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            로그인
          </button>
      </div>
    </div>
  );
}
