import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { userAchievements, achievements } from "@/backend/db/schema";
import { eq } from "drizzle-orm";

// API Route สำหรับดึงข้อมูลความสำเร็จของผู้ใช้
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // ตรวจสอบและแปลง userId เป็นตัวเลข
    const userId = parseInt(params.userId);
    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "รหัสผู้ใช้ไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    // ดึงข้อมูลความสำเร็จจาก userAchievements พร้อมรายละเอียดจาก achievements
    const achievementData = await db
      .select({
        id: userAchievements.id,
        userId: userAchievements.userId,
        achievementId: userAchievements.achievementId,
        earnedAt: userAchievements.earnedAt,
        name: achievements.name,
        description: achievements.description,
        points: achievements.points,
      })
      .from(userAchievements)
      .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
      .where(eq(userAchievements.userId, userId));

    return NextResponse.json({ achievements: achievementData }, { status: 200 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลความสำเร็จ:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลความสำเร็จ" },
      { status: 500 }
    );
  }
}