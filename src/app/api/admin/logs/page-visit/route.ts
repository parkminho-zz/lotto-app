import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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