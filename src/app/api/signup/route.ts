import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, password, name } = body;

    // 아이디, 비밀번호 체크
    if (!userId || !password || !name) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }

    // 이미 가입된 아이디 있는지 확인
    const existingUser = await prisma.user.findUnique({
      where: { userId },
    });

    if (existingUser) {
      return NextResponse.json({ error: "이미 가입된 ID입니다." }, { status: 409 });
    }

    // 비밀번호 해시
    const hashedPassword = await hash(password, 10);

    // 사용자 생성
    const newUser = await prisma.user.create({
      data: {
        userId,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json({ message: "회원가입 성공", userId: newUser.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
