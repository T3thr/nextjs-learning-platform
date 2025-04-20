import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { userProgress } from "@/backend/db/schema/gamification";
import { eq } from "drizzle-orm";

// API Route สำหรับการอัปเดตความคืบหน้าของผู้ใช้
export async function POST(request: NextRequest) {
  try {
    // รับข้อมูลจาก request body
    const { userId, action, itemId, points } = await request.json();

    // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
    if (!userId || !action || !itemId) {
      return NextResponse.json(
        { message: "กรุณาส่งข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    // ดึงข้อมูลความคืบหน้าปัจจุบันของผู้ใช้
    const progress = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
    });

    if (!progress) {
      return NextResponse.json(
        { message: "ไม่พบข้อมูลความคืบหน้าของผู้ใช้" },
        { status: 404 }
      );
    }

    // อัปเดตข้อมูลตามประเภทของการกระทำ
    let updatedProgress = { ...progress };
    let pointsToAdd = points || 0;

    switch (action) {
      case "completeLesson":
        // ตรวจสอบว่าเรียนบทเรียนนี้ไปแล้วหรือไม่
        if (!progress.completedLessons.includes(itemId)) {
          updatedProgress.completedLessons = [...progress.completedLessons, itemId];
          pointsToAdd = points || 10; // ค่าเริ่มต้น 10 คะแนนต่อบทเรียน
        }
        break;
      
      case "completeExercise":
        // ตรวจสอบว่าทำแบบฝึกหัดนี้ไปแล้วหรือไม่
        if (!progress.completedExercises.includes(itemId)) {
          updatedProgress.completedExercises = [...progress.completedExercises, itemId];
          pointsToAdd = points || 15; // ค่าเริ่มต้น 15 คะแนนต่อแบบฝึกหัด
        }
        break;
      
      case "earnAchievement":
        // ตรวจสอบว่าได้รับความสำเร็จนี้ไปแล้วหรือไม่
        if (!progress.achievements.includes(itemId)) {
          updatedProgress.achievements = [...progress.achievements, itemId];
          pointsToAdd = points || 20; // ค่าเริ่มต้น 20 คะแนนต่อความสำเร็จ
        }
        break;
      
      default:
        return NextResponse.json(
          { message: "ประเภทการกระทำไม่ถูกต้อง" },
          { status: 400 }
        );
    }

    // คำนวณคะแนนและเลเวลใหม่
    const newPoints = progress.points + pointsToAdd;
    let newLevel = progress.level;
    
    // ตรวจสอบว่าควรเลื่อนเลเวลหรือไม่ (ทุก 100 คะแนนจะเลื่อนขึ้น 1 เลเวล)
    if (Math.floor(newPoints / 100) > Math.floor(progress.points / 100)) {
      newLevel = Math.floor(newPoints / 100) + 1;
    }

    // อัปเดตข้อมูลในฐานข้อมูล
    await db.update(userProgress)
      .set({
        completedLessons: updatedProgress.completedLessons,
        completedExercises: updatedProgress.completedExercises,
        achievements: updatedProgress.achievements,
        points: newPoints,
        level: newLevel,
        updatedAt: new Date(),
      })
      .where(eq(userProgress.userId, userId));

    // ส่งข้อมูลความคืบหน้าที่อัปเดตแล้วกลับไป
    return NextResponse.json({
      message: "อัปเดตความคืบหน้าสำเร็จ",
      progress: {
        completedLessons: updatedProgress.completedLessons,
        completedExercises: updatedProgress.completedExercises,
        achievements: updatedProgress.achievements,
        points: newPoints,
        level: newLevel,
      },
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า" },
      { status: 500 }
    );
  }
}
