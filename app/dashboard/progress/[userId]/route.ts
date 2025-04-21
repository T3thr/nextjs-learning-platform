import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { userProgress } from "@/backend/db/schema";
import { eq } from "drizzle-orm";

// API Route สำหรับดึงข้อมูลความคืบหน้าของผู้ใช้
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userId = parseInt(params.userId);

    // ดึงข้อมูลความคืบหน้าจาก userProgress
    const progress = await db.query.userProgress.findMany({
      where: eq(userProgress.userId, userId),
    });

    return NextResponse.json({ progress }, { status: 200 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้า:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}