import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
        id: string;
        userId: string;
        name: string;
        role: Role;
    };
  }

  interface User {
    id: string;
    userId: string;
    name: string;
    role: Role;
  }

  interface JWT {
    role: Role;
    userId: string;
  }
}
