import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { userPoints } from "@/backend/db/schema";
import { eq } from "drizzle-orm";

// API Route สำหรับดึงข้อมูลคะแนนและเลเวลของผู้ใช้
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = parseInt(params.userId);

    // ดึงข้อมูลคะแนนจาก userPoints
    const points = await db.query.userPoints.findFirst({
      where: eq(userPoints.userId, userId),
    });

    return NextResponse.json({ points: points || { level: 1, points: 0 } }, { status: 200 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลคะแนน:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลคะแนน" },
      { status: 500 }
    );
  }
}