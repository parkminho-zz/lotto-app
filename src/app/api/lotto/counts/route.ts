import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const counts = await prisma.lottoNumberCount.findMany({
      orderBy: { number: "asc" }, // 1번부터 45번까지 정렬
    });

    return NextResponse.json(counts);
  } catch (err) {
    console.error("번호 카운트 가져오기 실패:", err);
    return NextResponse.json({ error: "Failed to fetch counts" }, { status: 500 });
  }
}
