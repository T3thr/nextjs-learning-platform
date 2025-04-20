import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// ขยายประเภท User เพื่อรวมฟิลด์ที่กำหนดเอง
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: "user" | "admin";
  }

  interface Session {
    user: {
      id: string;
      role: "user" | "admin";
    } & DefaultSession["user"];
  }
}

// ขยายประเภท JWT เพื่อรวมฟิลด์ที่กำหนดเอง
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "user" | "admin";
  }
}