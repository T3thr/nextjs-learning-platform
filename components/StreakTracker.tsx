"use client";

import React, { useState, useEffect } from "react";
import { useProgress } from "@/context/ProgressContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface StreakTrackerProps {
  userId?: string;
}

interface ProgressItem {
  completedAt?: Date;
  // Add other properties if they exist in your progress data
}

export default function StreakTracker({ userId: propUserId }: StreakTrackerProps) {
  const [streak, setStreak] = useState({
    currentStreak: 0,
    longestStreak: 0,
    lastActive: null as Date | null,
    activeDays: [] as string[],
  });

  const { progress } = useProgress();
  const { session, status } = useAuth();

  const today = new Date().toISOString().split("T")[0];
  const userId = propUserId || (session?.user?.id as string);

  useEffect(() => {
    if (status !== "authenticated" || !userId) return;

    const fetchStreak = async () => {
      try {
        const response = await fetch(`/api/streaks?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setStreak({
            currentStreak: data.currentStreak,
            longestStreak: data.longestStreak,
            lastActive: data.lastActive ? new Date(data.lastActive) : null,
            activeDays: data.activeDays,
          });
        }

        // Fixed type handling for progress items
        const hasActivityToday = 
          (progress.lessons as ProgressItem[]).some((lesson) => {
            return lesson.completedAt && 
                   new Date(lesson.completedAt).toISOString().split("T")[0] === today;
          }) || 
          (progress.exercises as ProgressItem[]).some((exercise) => {
            return exercise.completedAt && 
                   new Date(exercise.completedAt).toISOString().split("T")[0] === today;
          });

        if (hasActivityToday) {
          await fetch(`/api/streaks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              userId,
              hasActivityToday: true 
            }),
          });
          
          const updatedResponse = await fetch(`/api/streaks?userId=${userId}`);
          if (updatedResponse.ok) {
            const updatedData = await updatedResponse.json();
            setStreak({
              currentStreak: updatedData.currentStreak,
              longestStreak: updatedData.longestStreak,
              lastActive: updatedData.lastActive ? new Date(updatedData.lastActive) : null,
              activeDays: updatedData.activeDays,
            });
          }
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการจัดการการเรียนต่อเนื่อง:", error);
      }
    };

    fetchStreak();
  }, [progress.lessons, progress.exercises, today, userId, status]);

  if (status !== "authenticated" || !userId) {
    return (
      <div className="bg-surface p-6 rounded-lg border border-text-secondary/10">
        <h3 className="font-bold text-lg mb-4">การเรียนต่อเนื่อง</h3>
        <p className="text-sm text-center">กรุณาเข้าสู่ระบบเพื่อดูสถิติการเรียนต่อเนื่อง</p>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-lg border border-text-secondary/10">
      <h3 className="font-bold text-lg mb-4">การเรียนต่อเนื่อง</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-background rounded-lg">
          <div className="text-3xl font-bold text-primary">{streak.currentStreak}</div>
          <div className="text-sm text-text-secondary">วันต่อเนื่อง</div>
        </div>

        <div className="text-center p-4 bg-background rounded-lg">
          <div className="text-3xl font-bold text-primary">{streak.longestStreak}</div>
          <div className="text-sm text-text-secondary">สูงสุด</div>
        </div>
      </div>

      {/* แสดงแถบวันในสัปดาห์ */}
      <div className="mt-4">
        <div className="text-sm text-text-secondary mb-2">7 วันล่าสุด</div>
        <div className="flex justify-between">
          {Array.from({ length: 7 }).map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - index));
            const dateStr = date.toISOString().split("T")[0];
            const isActive = streak.activeDays.includes(dateStr);
            const dayNames = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
            const dayName = dayNames[date.getDay()];

            return (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-text-secondary mb-1">{dayName}</div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-background border border-text-secondary/20"
                  }`}
                >
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ข้อความกระตุ้น */}
      <div className="mt-6 text-center">
        {streak.currentStreak > 0 ? (
          <p className="text-sm">
            เยี่ยมมาก! คุณเรียนต่อเนื่องมาแล้ว {streak.currentStreak} วัน 🔥
          </p>
        ) : (
          <p className="text-sm">
            เริ่มเรียนวันนี้เพื่อสร้างสถิติการเรียนต่อเนื่อง! 🚀
          </p>
        )}
      </div>

      {/* ปุ่มไปยังบทเรียน */}
      <div className="mt-4">
        <Link
          href="/lessons"
          className="block w-full text-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          เรียนต่อ
        </Link>
      </div>
    </div>
  );
}