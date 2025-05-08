import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 10;

 //prisma 문법 // 해당 모델의 userId 와 같은 쿼리가 있는지 || user모델안에 name과 같은 쿼리가 있는지 검사
  const where: any = {
    OR: [
      { userId: { contains: query } },
      { user: { name: { contains: query } } },
    ],
  };

  //날짜 필터
  if (startDate && endDate) {
    where.clickedAt = {
      gte: new Date(`${startDate}T00:00:00.000Z`),
      lt: new Date(`${endDate}T23:59:59.999Z`),
    };
  }

  const total = await prisma.lottoClickLog.count({ where });

  const logs = await prisma.lottoClickLog.findMany({
    where,
    include: {
      user: { select: { name: true } },
    },
    orderBy: { clickedAt: 'desc' },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return NextResponse.json({
    total,
    logs,
  });
}
