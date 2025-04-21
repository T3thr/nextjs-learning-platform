import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { userProgress } from "@/backend/db/schema";
import { eq } from "drizzle-orm";

// API Route สำหรับจัดการข้อมูลความคืบหน้าของผู้ใช้
export async function GET(request: NextRequest) {
  try {
    // ดึง userId จาก query parameters
    const userId = request.nextUrl.searchParams.get("userId");

    // ตรวจสอบว่ามี userId หรือไม่
    if (!userId) {
      return NextResponse.json(
        { message: "ต้องระบุ userId ใน query parameters" },
        { status: 400 }
      );
    }

    // แปลง userId เป็นตัวเลข
    const parsedUserId = parseInt(userId);

    // ตรวจสอบว่า userId เป็นตัวเลขที่ถูกต้องหรือไม่
    if (isNaN(parsedUserId)) {
      return NextResponse.json(
        { message: "userId ต้องเป็นตัวเลข" },
        { status: 400 }
      );
    }

    // ดึงข้อมูลความคืบหน้าจากฐานข้อมูล
    const progress = await db.query.userProgress.findMany({
      where: eq(userProgress.userId, parsedUserId),
    });

    // ส่งข้อมูลความคืบหน้ากลับไป
    return NextResponse.json({ progress }, { status: 200 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้า:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้า" },
      { status: 500 }
    );
  }
}

// ฟังก์ชันสำหรับอัปเดตความคืบหน้าของผู้ใช้
export async function POST(request: NextRequest) {
  try {
    // ดึงข้อมูลจาก request body
    const { userId, lessonId, exerciseId, completed, score } = await request.json();

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!userId) {
      return NextResponse.json(
        { message: "ต้องระบุ userId" },
        { status: 400 }
      );
    }

    const parsedUserId = parseInt(userId);

    // ตรวจสอบว่า userId เป็นตัวเลขที่ถูกต้องหรือไม่
    if (isNaN(parsedUserId)) {
      return NextResponse.json(
        { message: "userId ต้องเป็นตัวเลข" },
        { status: 400 }
      );
    }

    // ตรวจสอบว่ามีข้อมูล lessonId หรือ exerciseId หรือไม่
    if (!lessonId && !exerciseId) {
      return NextResponse.json(
        { message: "ต้องระบุ lessonId หรือ exerciseId" },
        { status: 400 }
      );
    }

    // อัปเดตหรือสร้างข้อมูลความคืบหน้าใหม่
    let progress;
    if (lessonId) {
      progress = await db.insert(userProgress)
        .values({
          userId: parsedUserId,
          lessonId,
          completed: completed || false,
          score: score || 0,
          completedAt: completed ? new Date() : undefined,
        })
        .returning();
    } else if (exerciseId) {
      progress = await db.insert(userProgress)
        .values({
          userId: parsedUserId,
          exerciseId,
          completed: completed || false,
          score: score || 0,
          completedAt: completed ? new Date() : undefined,
        })
        .returning();
    }

    // ส่งข้อมูลความคืบหน้าที่อัปเดตแล้วกลับไป
    return NextResponse.json({ progress }, { status: 200 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า" },
      { status: 500 }
    );
  }
}