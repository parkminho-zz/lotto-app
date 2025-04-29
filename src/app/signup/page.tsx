"use client";

import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import { useState } from 'react';

const signUp = async (url: string, { arg }: { arg: any }) => {
  const res = await axios.post(url, arg);
  return res.data;
};

export default function SignUpPage() {
  const { trigger, isMutating } = useSWRMutation('/api/signup', signUp);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    try {
      const result = await trigger({ email, password, name });
      alert('회원가입 성공!');
      window.location.href = "/"; 
    } catch (err: any) {
      alert(err.response?.data?.error || '회원가입 실패');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 translate-y-[-80px]">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          onClick={handleSubmit}
          disabled={isMutating}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
