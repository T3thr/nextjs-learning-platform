import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/backend/db";
import { users } from "@/backend/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// ตัวเลือกการตั้งค่าสำหรับ NextAuth.js
// ไฟล์นี้กำหนดค่าต่างๆ สำหรับระบบยืนยันตัวตน
export const authOptions: NextAuthOptions = {
  // กำหนด providers ที่ใช้ในการยืนยันตัวตน
  providers: [
    // Provider สำหรับการยืนยันตัวตนด้วยอีเมลและรหัสผ่าน
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "อีเมล", type: "email" },
        password: { label: "รหัสผ่าน", type: "password" },
      },
      // ฟังก์ชันสำหรับตรวจสอบข้อมูลการเข้าสู่ระบบ
      async authorize(credentials, req) {
        // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
        if (!credentials?.email || !credentials?.password) {
          throw new Error("กรุณากรอกอีเมลและรหัสผ่าน");
        }

        try {
          // ค้นหาผู้ใช้จากฐานข้อมูลด้วย Drizzle ORM
          const user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email),
          });

          // ถ้าไม่พบผู้ใช้หรือไม่มีรหัสผ่าน
          if (!user || !user.password) {
            throw new Error("ไม่พบบัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
          }

          // ตรวจสอบรหัสผ่านด้วย bcrypt
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // ถ้ารหัสผ่านไม่ถูกต้อง
          if (!isPasswordValid) {
            throw new Error("รหัสผ่านไม่ถูกต้อง");
          }

          // ส่งข้อมูลผู้ใช้กลับไป (ไม่รวมรหัสผ่าน)
          return {
            id: user.id.toString(), // แปลง id เป็น string
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการยืนยันตัวตน:", error);
          throw new Error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        }
      },
    }),
    // Provider สำหรับการยืนยันตัวตนด้วย GitHub
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // Provider สำหรับการยืนยันตัวตนด้วย Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  // หน้าที่เกี่ยวข้องกับการยืนยันตัวตน
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  // การตั้งค่า session
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 วัน
  },
  // การตั้งค่า callbacks
  callbacks: {
    // ปรับแต่ง JWT token
    async jwt({ token, user }) {
      // เพิ่มข้อมูลเพิ่มเติมใน token ถ้ามีข้อมูลผู้ใช้
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // ปรับแต่ง session
    async session({ session, token }) {
      // เพิ่มข้อมูลเพิ่มเติมใน session จาก token
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  // การตั้งค่าความปลอดภัย
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};