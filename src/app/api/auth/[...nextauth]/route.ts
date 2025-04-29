import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: '이메일', type: 'text', placeholder: '이메일 주소 입력' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null;
    
            const user = await prisma.user.findUnique({
              where: { email: credentials.email }
            });
    
            if (!user) return null;
    
            const isValid = await compare(credentials.password, user.password);
            if (!isValid) return null;
    
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
            };
          }
        })
      ],
      pages: {
        signIn: "/login", 
      },
      session: {
        strategy: "jwt"
      },
      cookies: {
        sessionToken: {
          name: `next-auth.session-token`,
          options: {
            httpOnly: true,   //자바스크립트에서 접근불가
            sameSite: 'lax',  // 쿠키 보내는여부 : get요청에만 포함하나, post나 리디렉션엔 제외 (기본적으로 lax를 쓴다함)
            path: '/',        // 
            secure: process.env.NODE_ENV === 'production',
            expires: undefined, // 창 꺼지면 세션삭제함으로써 로그아웃
          },
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
  })

export { handler as GET, handler as POST }