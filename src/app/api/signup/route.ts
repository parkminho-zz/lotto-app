import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    // 이메일, 비밀번호 체크
    if (!email || !password ) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }

    // 이메일 형식 체크
    if (!isValidEmail(email)) {
        return NextResponse.json({ error: "유효하지 않은 이메일 형식입니다." }, { status: 400 });
    }

    // 이미 가입된 이메일 있는지 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "이미 가입된 이메일입니다." }, { status: 409 });
    }

    // 비밀번호 해시
    const hashedPassword = await hash(password, 10);

    // 사용자 생성
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...(name && { name }),
      },
    });

    return NextResponse.json({ message: "회원가입 성공", userId: newUser.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
