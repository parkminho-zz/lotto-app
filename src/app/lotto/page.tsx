"use client"

import { useState } from "react";
import axios from "axios"; 

export default function LottoPage() {
  const [numbers, setNumbers] = useState<number[]>([]);

  const fetchLottoNumbers = async () => {
    try {
      const response = await axios.get("/api/lotto");
      setNumbers(response.data.numbers); // axios는 자동으로 json 파싱
    } catch (error) {
      console.error("로또 번호 가져오기 실패:", error);
    }
  };
 
  return (
    <main className="flex flex-col items-center mt-[100px]">
      <h1 className="text-2xl mb-5">🎰 로또 번호 생성기 🍀</h1>
      <button 
        onClick={fetchLottoNumbers} 
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
