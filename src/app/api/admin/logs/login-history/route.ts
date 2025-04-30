import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const status = searchParams.get('status') || 'all';
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 10;

  // 날짜 필터 준비
  const start = startDate ? new Date(`${startDate}T00:00:00.000Z`) : null;
  const end = endDate ? new Date(`${endDate}T23:59:59.999Z`) : null;

  const loginLogWhere: any = {
    userId: { contains: query },
  };
  const loginFailWhere: any = {
    userId: { contains: query },
  };

  if (start && end) {
    loginLogWhere.loginAt = { gte: start, lte: end };
    loginFailWhere.failedAt = { gte: start, lte: end };
  }

  let logs: any[] = [];

  if (status === 'success' || status === 'all') {
    const loginLogs = await prisma.loginLog.findMany({
      where: loginLogWhere,
      include: { user: { select: { name: true } } },
    });

    logs.push(
      ...loginLogs.map(log => ({
        id: log.id,
        userId: log.userId,
        name: log.user?.name ?? '-',
        ip: log.ip,
        time: log.loginAt,
        status: 'success',
      }))
    );
  }

  if (status === 'fail' || status === 'all') {
    const failLogs = await prisma.loginFailLog.findMany({
      where: loginFailWhere,
    });

    logs.push(
      ...failLogs.map(log => ({
        id: log.id,
        userId: log.userId,
        name: '-', // 실패는 user relation 없음
        ip: log.ip,
        time: log.failedAt,
        status: 'fail',
        reason: log.reason,
      }))
    );
  }

  // 최신순 정렬
  logs.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  // 전체 개수
  const total = logs.length;

  // 페이징
  const paginated = logs.slice((page - 1) * pageSize, page * pageSize);

  return NextResponse.json({
    total,
    logs: paginated,
  });
}
