import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { userProgress } from "@/backend/db/schema/content"; // แก้ไข import จาก gamification เป็น content
import { eq } from "drizzle-orm";

// API Route สำหรับการดึงข้อมูลความคืบหน้าของผู้ใช้
export async function GET(request: NextRequest) {
  try {
    // ดึง userId จาก query parameters และแปลงเป็น number
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId || isNaN(parseInt(userId))) {
      return NextResponse.json(
        { message: "กรุณาระบุ userId ที่ถูกต้อง" },
        { status: 400 }
      );
    }

    const parsedUserId = parseInt(userId);

    // ดึงข้อมูลความคืบหน้าของผู้ใช้จากฐานข้อมูล
    const progress = await db.query.userProgress.findMany({
      where: eq(userProgress.userId, parsedUserId),
    });

    if (!progress || progress.length === 0) {
      return NextResponse.json(
        { message: "ไม่พบข้อมูลความคืบหน้าของผู้ใช้" },
        { status: 404 }
      );
    }

    // สร้าง response โดยรวมข้อมูลความคืบหน้าทั้งหมด
    const response = progress.map((item) => ({
      lessonId: item.lessonId,
      exerciseId: item.exerciseId,
      completed: item.completed,
      score: item.score,
      completedAt: item.completedAt?.toISOString(),
      attempts: item.attempts,
      lastAttemptAt: item.lastAttemptAt?.toISOString(),
    }));

    // ส่งข้อมูลความคืบหน้ากลับไป
    return NextResponse.json({ progress: response });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้า:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้า" },
      { status: 500 }
    );
  }
}