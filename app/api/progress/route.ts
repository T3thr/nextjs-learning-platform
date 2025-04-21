import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { userProgress } from "@/backend/db/schema/content";
import { eq } from "drizzle-orm";

// API Route สำหรับการจัดการข้อมูลความคืบหน้าของผู้ใช้
export async function GET(request: NextRequest) {
  try {
    // ดึง userId จาก query parameters
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "กรุณาระบุ userId" },
        { status: 400 }
      );
    }

    const parsedUserId = parseInt(userId);

    if (isNaN(parsedUserId)) {
      return NextResponse.json(
        { message: "userId ต้องเป็นตัวเลข" },
        { status: 400 }
      );
    }

    // ดึงข้อมูลความคืบหน้าของผู้ใช้จากฐานข้อมูล
    const progress = await db.query.userProgress.findMany({
      where: eq(userProgress.userId, parsedUserId),
    });

    // จัดรูปแบบข้อมูลความคืบหน้าก่อนส่งกลับ
    const formattedProgress = {
      lessons: progress.filter(item => item.lessonId !== null),
      exercises: progress.filter(item => item.exerciseId !== null),
      level: 1, // สามารถคำนวณจากคะแนนสะสมได้ในอนาคต
      points: progress.reduce((sum, item) => sum + (item.score || 0), 0),
      completedLessons: progress
        .filter(item => item.lessonId !== null && item.completed)
        .map(item => item.lessonId!.toString()),
      completedExercises: progress
        .filter(item => item.exerciseId !== null && item.completed)
        .map(item => item.exerciseId!.toString()),
      achievements: [], // สามารถเพิ่มจากตาราง achievements ในอนาคต
    };

    return NextResponse.json({ progress: formattedProgress });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้า:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้า" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, action, itemId, points } = await request.json();

    if (!userId || !action || !itemId) {
      return NextResponse.json(
        { message: "ต้องระบุ userId, action และ itemId" },
        { status: 400 }
      );
    }

    const parsedUserId = parseInt(userId);

    if (isNaN(parsedUserId)) {
      return NextResponse.json(
        { message: "userId ต้องเป็นตัวเลข" },
        { status: 400 }
      );
    }

    // กำหนดประเภทของ item ตาม action
    const isLesson = action === 'completeLesson';
    const isExercise = action === 'completeExercise';
    const isAchievement = action === 'earnAchievement';

    // อัปเดตหรือสร้างข้อมูลความคืบหน้าใหม่
    const updatedProgress = await db.transaction(async (tx) => {
      // สำหรับบทเรียนหรือแบบฝึกหัด
      if (isLesson || isExercise) {
        const existing = await tx.query.userProgress.findFirst({
          where: isLesson 
            ? eq(userProgress.lessonId, itemId)
            : eq(userProgress.exerciseId, itemId),
        });

        if (existing) {
          // อัปเดตข้อมูลที่มีอยู่
          const [updated] = await tx.update(userProgress)
            .set({
              completed: true,
              score: points || existing.score || 0,
              completedAt: new Date(),
              attempts: (existing.attempts || 0) + 1,
              lastAttemptAt: new Date(),
            })
            .where(eq(userProgress.id, existing.id))
            .returning();

          return updated;
        } else {
          // สร้างข้อมูลใหม่
          const [newProgress] = await tx.insert(userProgress)
            .values({
              userId: parsedUserId,
              [isLesson ? 'lessonId' : 'exerciseId']: itemId,
              completed: true,
              score: points || 0,
              completedAt: new Date(),
              attempts: 1,
              lastAttemptAt: new Date(),
            })
            .returning();

          return newProgress;
        }
      }
      // สำหรับความสำเร็จ (สามารถเพิ่ม logic ได้ในอนาคต)
      else if (isAchievement) {
        // สามารถเพิ่ม logic สำหรับบันทึกความสำเร็จได้ที่นี่
        return null;
      }

      return null;
    });

    // ดึงข้อมูลความคืบหน้าล่าสุดเพื่อส่งกลับ
    const latestProgress = await db.query.userProgress.findMany({
      where: eq(userProgress.userId, parsedUserId),
    });

    const formattedProgress = {
      lessons: latestProgress.filter(item => item.lessonId !== null),
      exercises: latestProgress.filter(item => item.exerciseId !== null),
      level: 1,
      points: latestProgress.reduce((sum, item) => sum + (item.score || 0), 0),
      completedLessons: latestProgress
        .filter(item => item.lessonId !== null && item.completed)
        .map(item => item.lessonId!.toString()),
      completedExercises: latestProgress
        .filter(item => item.exerciseId !== null && item.completed)
        .map(item => item.exerciseId!.toString()),
      achievements: [],
    };

    return NextResponse.json({ progress: formattedProgress });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า" },
      { status: 500 }
    );
  }
}