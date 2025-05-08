// /app/api/lotto/check-lotto/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const pageSize = 1; // 한 번에 하나의 회차만 응답
  const skip = (page - 1) * pageSize;

  try {
    const totalCount = await prisma.lottoResult.count();

    // 최신 회차부터 내림차순 정렬
    const results = await prisma.lottoResult.findMany({
      orderBy: { round: "desc" },
      skip,
      take: pageSize,
    });

    if (results.length === 0) {
      return NextResponse.json({ result: null }, { status: 200 });
    }

    
    const result = results[0];

    // BigInt -> string 변환 (필요한 필드만)
    const serializedResult = {
      ...result,
      firstPrize: result.firstPrize?.toString(), //  BigInt 필드
      secondPrize: result.secondPrize?.toString(),
      thirdPrize: result.thirdPrize?.toString(),
      fourthPrize: result.fourthPrize?.toString(),
      fifthPrize: result.fifthPrize?.toString(),
    };

    return NextResponse.json({ result: serializedResult, totalCount }, { status: 200 });
  } catch (error) {
    console.error("로또 결과 조회 실패", error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
