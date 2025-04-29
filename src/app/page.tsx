"use client"

import { useState } from 'react';
import Link from "next/link";

export default function Home() {
  // 상태변화 numbers 선언
  const [numbers, setNumbers] = useState<number[]>([]);

  // 로또 번호 생성함수
  const getLottoNumbers = () => {
    const lottoArray: number[] = [];
    // 카운트배열 하나 만듦
    const newCount = Array(46).fill(0); 
    while (lottoArray.length < 6) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      if( newCount[randomNum] == 0) {
         // 카운트배열에 값 더해서 해당 값 다시 안나오게하기.
        newCount[randomNum] = 1;
        lottoArray.push(randomNum);
      }
    }
    // 번호 오름차순 정렬해서 저장
    setNumbers(lottoArray.sort((a, b) => a - b)); 
  };
 
 
  return (
    <main className="flex flex-col items-center mt-[100px]">
      <Link href="/lotto" className="flex">
        <h1 className="text-2xl mb-5 text-[green]">🎰 로또 번호 생성하러가기 🍀</h1>
      </Link>
      <div style={{ display: "flex", gap: "10px" }}>
        {numbers.map((num, idx) => (
          <div 
            key={idx} 
            className ="w-[50px] h-[50px] rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-bold text-[1.2rem]"
          >
            {num}
          </div>
        ))}
      </div>
    </main>

  );
}
