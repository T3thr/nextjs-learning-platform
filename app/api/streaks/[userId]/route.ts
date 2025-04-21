import { NextRequest, NextResponse } from "next/server";
import { db } from "@/backend/db";
import { userStreaks } from "@/backend/db/schema/users";
import { eq } from "drizzle-orm";

// API Route สำหรับจัดการข้อมูลการเรียนต่อเนื่องของผู้ใช้
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "ต้องระบุ userId" },
        { status: 400 }
      );
    }

    const userIdNum = parseInt(userId);

    // ดึงข้อมูลการเรียนต่อเนื่อง
    const streak = await db.query.userStreaks.findFirst({
      where: eq(userStreaks.userId, userIdNum),
    });

    if (!streak) {
      return NextResponse.json(
        {
          currentStreak: 0,
          longestStreak: 0,
          lastActive: null,
          activeDays: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        lastActive: streak.lastActive,
        activeDays: streak.activeDays,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการเรียนต่อเนื่อง:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, hasActivityToday } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: "ต้องระบุ userId" },
        { status: 400 }
      );
    }

    const userIdNum = parseInt(userId);

    // ดึงข้อมูลการเรียนต่อเนื่องปัจจุบัน
    let streak = await db.query.userStreaks.findFirst({
      where: eq(userStreaks.userId, userIdNum),
    });

    // คำนวณวันที่ปัจจุบัน
    const today = new Date().toISOString().split("T")[0];
    const activeDays = streak ? (streak.activeDays as string[]) : [];

    if (hasActivityToday && !activeDays.includes(today)) {
      streak = await db.transaction(async (tx) => {
        let updatedStreak;

        if (!streak) {
          const newStreak = await tx
            .insert(userStreaks)
            .values({
              userId: userIdNum,
              currentStreak: 1,
              longestStreak: 1,
              lastActive: new Date(today),
              activeDays: [today],
              updatedAt: new Date(),
            })
            .returning();
          updatedStreak = newStreak[0];
        } else {
          let currentStreak = streak.currentStreak;
          const lastActive = streak.lastActive ? new Date(streak.lastActive) : null;
          const currentDate = new Date(today);

          if (lastActive) {
            const diffTime = Math.abs(currentDate.getTime() - lastActive.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
              currentStreak += 1;
            } else if (diffDays > 1) {
              currentStreak = 1;
            }
          } else {
            currentStreak = 1;
          }

          const longestStreak = Math.max(currentStreak, streak.longestStreak);
          const updatedActiveDays = [...activeDays, today];

          const updated = await tx
            .update(userStreaks)
            .set({
              currentStreak,
              longestStreak,
              lastActive: new Date(today),
              activeDays: updatedActiveDays,
              updatedAt: new Date(),
            })
            .where(eq(userStreaks.userId, userIdNum))
            .returning();
          updatedStreak = updated[0];
        }

        return updatedStreak;
      });
    }

    return NextResponse.json(
      {
        currentStreak: streak?.currentStreak || 0,
        longestStreak: streak?.longestStreak || 0,
        lastActive: streak?.lastActive || null,
        activeDays: streak?.activeDays || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปเดตการเรียนต่อเนื่อง:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" },
      { status: 500 }
    );
  }
}