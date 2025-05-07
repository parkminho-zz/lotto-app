import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const prisma = new PrismaClient();

export async function GET() {
  const visits = await prisma.pageVisitLog.groupBy({
    by: ["page"],
    _count: { page: true },
    orderBy: { _count: { page: "desc" } },
  });

  return NextResponse.json(
    visits.map(v => ({ page: v.page, count: v._count.page }))
  );
}


export async function POST(req: NextRequest) {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const userId = session?.user?.userId;

  if (!userId || !body.page) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    await prisma.pageVisitLog.create({
      data: {
        userId,
        page: body.page,
        visitedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("페이지 방문 저장 실패", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}