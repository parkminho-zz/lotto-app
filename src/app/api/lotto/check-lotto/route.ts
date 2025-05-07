
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET 요청 처리
export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const roundParam = searchParams.get("round");

      // 특정 회차 요청
      if (roundParam) {
        const round = parseInt(roundParam, 10);
        const result = await prisma.lottoResult.findUnique({
          where: { round },
        });

        if (!result) {
          return NextResponse.json({ message: "해당 회차 없음" }, { status: 404 });
        }

        const serializedResult = JSON.parse(
          JSON.stringify(result, (_key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );

        return NextResponse.json({ result: serializedResult });
      }
      
      //세부조회
      const latestResult = await prisma.lottoResult.findFirst({
        orderBy: { id: 'desc' },
      });
      
      //전체회차 조회
      const allRounds = await prisma.lottoResult.findMany({
        select: { round: true },
        orderBy: { round: "desc" },
      });

      const roundNumbers = allRounds.map((r) => r.round);

      if (!latestResult) {
        return NextResponse.json({ message: '단일 결과 없음' }, { status: 404 });
      }
  
      if (!roundNumbers) {
        return NextResponse.json({ message: '전체 결과 없음' }, { status: 404 });
      }

      const serializedResult = JSON.parse(
          JSON.stringify(latestResult, (_key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
      )

      return NextResponse.json({      
        result: serializedResult,
        roundNumbers
      });

    } catch (error) {
      console.error('로또 결과 조회 실패:', error);
      return NextResponse.json({ message: '서버 오류' }, { status: 500 });
    }
    
  }