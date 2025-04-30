import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: { label: 'ID', type: 'text', placeholder: 'ID 입력' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { userId: credentials.userId }
        });

        if (!user) {
          await prisma.loginFailLog.create({
            data: {
              userId: credentials.userId,
              reason: "아이디 오류",
            },
          });
          return null;
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          await prisma.loginFailLog.create({
            data: {
              userId: user.userId,
              reason: "비밀번호 오류",
            },
          });
          return null;
        }

        // 로그인 성공 시 로그 기록
        if (user.role === "USER") {
          await prisma.loginLog.create({
            data: {
              userId: user.userId,
            },
          });
        }

        return {
          id: user.id.toString(),
          userId: user.userId,
          name: user.name,
          role: user.role,
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
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        expires: undefined, // 창 닫히면 자동 삭제 시도
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as "USER" | "ADMIN";
        session.user.userId = token.userId as string;
      }
      return session;
    },
  },
};
