import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { users, userPoints } from "@/backend/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// API Route สำหรับการลงทะเบียนผู้ใช้ใหม่
export async function POST(request: NextRequest) {
  try {
    // รับข้อมูลจาก request body
    const { name, email, password } = await request.json();

    // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    // ตรวจสอบว่าอีเมลนี้มีในระบบแล้วหรือไม่
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "อีเมลนี้ถูกใช้งานแล้ว" },
        { status: 400 }
      );
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    }).returning();

    // สร้างข้อมูลคะแนนเริ่มต้นสำหรับผู้ใช้ใหม่
    if (newUser[0]?.id) {
      await db.insert(userPoints).values({
        userId: newUser[0].id,
        points: 0,
        level: 1,
        lastUpdated: new Date(),
      });
    }

    // ส่งข้อมูลผู้ใช้กลับไป (ไม่รวมรหัสผ่าน)
    return NextResponse.json({
      message: "สมัครสมาชิกสำเร็จ",
      user: {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
        role: newUser[0].role,
      },
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลงทะเบียน:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการลงทะเบียน" },
      { status: 500 }
    );
  }
}