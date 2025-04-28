import { NextResponse } from "next/server";

// GET 요청 처리
export async function GET() {
    const lottoArray: number[] = [];
    const newCount = Array(46).fill(0);
  
    while (lottoArray.length < 6) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      if (newCount[randomNum] === 0) {
        newCount[randomNum] = 1;
        lottoArray.push(randomNum);
      }
    }
  
    // 리턴할 때 json 으로 변환 후 넘겨줌
    return NextResponse.json({ numbers: lottoArray.sort((a, b) => a - b) });
  }