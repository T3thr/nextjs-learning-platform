import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { userAchievements } from "@/backend/db/schema";
import { eq } from "drizzle-orm";

// API Route สำหรับดึงข้อมูลความสำเร็จของผู้ใช้
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = parseInt(params.userId);

    // ดึงข้อมูลความสำเร็จจาก userAchievements
    const achievements = await db.query.userAchievements.findMany({
      where: eq(userAchievements.userId, userId),
    });

    return NextResponse.json({ achievements }, { status: 200 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลความสำเร็จ:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลความสำเร็จ" },
      { status: 500 }
    );
  }
}