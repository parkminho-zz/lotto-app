"use client"

import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {
  const [numbers, setNumbers] = useState<number[]>([]);

  const getLottoNumbers = () => {
    const lottoSet = new Set<number>();
    while (lottoSet.size < 6) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      lottoSet.add(randomNum);
    }
    setNumbers(Array.from(lottoSet).sort((a, b) => a - b));
  };
 
 
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>🎰 로또 번호 생성기 🍀</h1>
      <button 
        onClick={getLottoNumbers} 
        className={styles.lottoButton}
      >
        번호 생성하기
      </button>
      <div style={{ display: "flex", gap: "10px" }}>
        {numbers.map((num, idx) => (
          <div 
            key={idx} 
            className = {styles.lottoNumList}
          >
            {num}
          </div>
        ))}
      </div>
    </main>

  );
}
