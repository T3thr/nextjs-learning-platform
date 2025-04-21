import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { userProgress } from "@/backend/db/schema/content";
import { userPoints, userAchievements } from "@/backend/db/schema/users";
import { eq, and } from "drizzle-orm";

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

    // เริ่มต้น transaction เพื่อความสอดคล้องของข้อมูล
    const result = await db.transaction(async (tx) => {
      // ตัวแปรสำหรับเก็บข้อมูลที่ส่งกลับ
      let updatedProgress = null;
      let updatedPoints = null;
      let updatedAchievement = null;
      let pointsToAdd = points || 0;

      // อัปเดตข้อมูลตามประเภทของการกระทำ
      switch (action) {
        case "completeLesson":
          // ตรวจสอบว่ามีบันทึกความคืบหน้าสำหรับบทเรียนนี้หรือไม่
          updatedProgress = await tx.query.userProgress.findFirst({
            where: and(
              eq(userProgress.userId, userId),
              eq(userProgress.lessonId, itemId)
            ),
          });

          if (!updatedProgress) {
            // สร้างบันทึกใหม่ถ้ายังไม่มี
            const newProgress = await tx
              .insert(userProgress)
              .values({
                userId,
                lessonId: itemId,
                completed: true,
                score: points || 10, // คะแนนเริ่มต้น 10 สำหรับบทเรียน
                completedAt: new Date(),
                attempts: 1,
                lastAttemptAt: new Date(),
              })
              .returning();
            updatedProgress = newProgress[0];
            pointsToAdd = points || 10;
          } else if (!updatedProgress.completed) {
            // อัปเดตบันทึกถ้ายังไม่สำเร็จ
            updatedProgress = (
              await tx
                .update(userProgress)
                .set({
                  completed: true,
                  score: points || 10,
                  completedAt: new Date(),
                  attempts: updatedProgress.attempts + 1,
                  lastAttemptAt: new Date(),
                })
                .where(
                  and(
                    eq(userProgress.userId, userId),
                    eq(userProgress.lessonId, itemId)
                  )
                )
                .returning()
            )[0];
            pointsToAdd = points || 10;
          }
          break;

        case "completeExercise":
          // ตรวจสอบว่ามีบันทึกความคืบหน้าสำหรับแบบฝึกหัดนี้หรือไม่
          updatedProgress = await tx.query.userProgress.findFirst({
            where: and(
              eq(userProgress.userId, userId),
              eq(userProgress.exerciseId, itemId)
            ),
          });

          if (!updatedProgress) {
            // สร้างบันทึกใหม่ถ้ายังไม่มี
            const newProgress = await tx
              .insert(userProgress)
              .values({
                userId,
                exerciseId: itemId,
                completed: true,
                score: points || 15, // คะแนนเริ่มต้น 15 สำหรับแบบฝึกหัด
                completedAt: new Date(),
                attempts: 1,
                lastAttemptAt: new Date(),
              })
              .returning();
            updatedProgress = newProgress[0];
            pointsToAdd = points || 15;
          } else if (!updatedProgress.completed) {
            // อัปเดตบันทึกถ้ายังไม่สำเร็จ
            updatedProgress = (
              await tx
                .update(userProgress)
                .set({
                  completed: true,
                  score: points || 15,
                  completedAt: new Date(),
                  attempts: updatedProgress.attempts + 1,
                  lastAttemptAt: new Date(),
                })
                .where(
                  and(
                    eq(userProgress.userId, userId),
                    eq(userProgress.exerciseId, itemId)
                  )
                )
                .returning()
            )[0];
            pointsToAdd = points || 15;
          }
          break;

        case "earnAchievement":
          // ตรวจสอบว่าผู้ใช้ได้รับความสำเร็จนี้แล้วหรือไม่
          updatedAchievement = await tx.query.userAchievements.findFirst({
            where: and(
              eq(userAchievements.userId, userId),
              eq(userAchievements.achievementId, itemId)
            ),
          });

          if (!updatedAchievement) {
            // บันทึกความสำเร็จใหม่
            const newAchievement = await tx
              .insert(userAchievements)
              .values({
                userId,
                achievementId: itemId,
                earnedAt: new Date(),
              })
              .returning();
            updatedAchievement = newAchievement[0];
            pointsToAdd = points || 20; // คะแนนเริ่มต้น 20 สำหรับความสำเร็จ
          }
          break;

        default:
          throw new Error("ประเภทการกระทำไม่ถูกต้อง");
      }

      // อัปเดตคะแนนและเลเวลในตาราง userPoints
      if (pointsToAdd > 0) {
        const currentPoints = await tx.query.userPoints.findFirst({
          where: eq(userPoints.userId, userId),
        });

        if (!currentPoints) {
          // สร้างบันทึกคะแนนใหม่ถ้ายังไม่มี
          const newPoints = await tx
            .insert(userPoints)
            .values({
              userId,
              points: pointsToAdd,
              level: 1,
              lastUpdated: new Date(),
            })
            .returning();
          updatedPoints = newPoints[0];
        } else {
          // คำนวณคะแนนและเลเวลใหม่
          const newPointsTotal = currentPoints.points + pointsToAdd;
          const newLevel = Math.floor(newPointsTotal / 100) + 1;

          updatedPoints = (
            await tx
              .update(userPoints)
              .set({
                points: newPointsTotal,
                level: newLevel,
                lastUpdated: new Date(),
              })
              .where(eq(userPoints.userId, userId))
              .returning()
          )[0];
        }
      }

      // ส่งข้อมูลที่อัปเดตกลับ
      return {
        progress: updatedProgress,
        points: updatedPoints,
        achievement: updatedAchievement,
      };
    });

    // ส่งข้อมูลความคืบหน้าที่อัปเดตแล้วกลับไป
    return NextResponse.json({
      message: "อัปเดตความคืบหน้าสำเร็จ",
      progress: result.progress,
      points: result.points,
      achievement: result.achievement,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า" },
      { status: 500 }
    );
  }
}