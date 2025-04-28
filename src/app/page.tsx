"use client"

import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {
  
  // 상태변화 numbers 선언
  const [numbers, setNumbers] = useState<number[]>([]);

  // 로또 번호 생성함수
  const getLottoNumbers = () => {
    const lottoArray: number[] = [];
    const newCount = Array(46).fill(0); // 새로 초기화
    while (lottoArray.length < 6) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      if( newCount[randomNum] == 0) {
        newCount[randomNum] = 1; // 사용 인덱스 값은 1
        lottoArray.push(randomNum);
      }
    }
    setNumbers(lottoArray.sort((a, b) => a - b)); // 번호 오름차순 정렬해서 저장
  };
 
 
  return (
    <main className="flex flex-col items-center mt-[100px]">
      <h1 className="text-2xl mb-5">🎰 로또 번호 생성기 🍀</h1>
      <button 
        onClick={getLottoNumbers} 
        className="px-[20px] py-[10px] text-[1rem] bg-white cursor-pointer mb-[30px] border-2 border-[#87d37c] text-[#87d37c] hover:bg-[#87d37c] hover:text-white active:bg-[#87d37c] active:border-white"
      >
        번호 생성하기
      </button>
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
