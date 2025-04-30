import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST 요청: 클릭 로그 저장
export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.lottoClickLog.create({
      data: {
        userId: session.user.userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("LottoClickLog 저장 실패:", err);
    return NextResponse.json({ error: "Failed to log click" }, { status: 500 });
  }
}


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