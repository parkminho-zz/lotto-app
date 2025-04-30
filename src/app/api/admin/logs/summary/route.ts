import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 로그인 성공 수
    const loginSuccessCount = await prisma.loginLog.count();

    // 로그인 실패 수
    const loginFailCount = await prisma.loginFailLog.count();
    
    // 로그인 실패 수
    const lottoClickCount = await prisma.lottoClickLog.count();

    // 페이지 방문 수
    const pageVisitCount = await prisma.pageVisitLog.count();

    // 최근 로그인 4개
    const recentLogin = await prisma.loginLog.findMany({
      orderBy: { loginAt: 'desc' },
      take: 4,
      select: {
        userId: true,
        loginAt: true,
      },
    });

    // 최근 로그인 실패 4개
    const recentFail = await prisma.loginFailLog.findMany({
      orderBy: { failedAt: 'desc' },
      take: 4,
      select: {
        userId: true,
        failedAt: true,
        reason: true,
      },
    });

    return NextResponse.json({
      summary: {
        loginSuccess: loginSuccessCount,
        loginFail: loginFailCount,
        lottoClicks: lottoClickCount,
        pageVisits: pageVisitCount,
      },
      recentLogs: {
        login: recentLogin.map(log => ({
          userId: log.userId,
          time: new Date(log.loginAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
        })),
        fail: recentFail.map(log => ({
          userId: log.userId,
          time: new Date(log.failedAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
          reason: log.reason,
        })),
      }
    });
  } catch (err) {
    console.error('로그 API 에러:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
