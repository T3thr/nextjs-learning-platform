"use client";

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface LeaderboardProps {
  data?: {
    id: string;
    name: string;
    points: number;
    level: number;
    achievements: number;
  }[];
  limit?: number;
}

// คอมโพเนนต์สำหรับแสดงอันดับผู้เรียน
export default function Leaderboard({ 
  data = [], 
  limit = 10 
}: LeaderboardProps) {
  // ใช้ context สำหรับตรวจสอบธีมปัจจุบัน
  const { theme } = useTheme();
  
  // สถานะสำหรับการเรียงลำดับ
  const [sortBy, setSortBy] = useState<'points' | 'level' | 'achievements'>('points');
  
  // ถ้าไม่มีข้อมูล ให้ใช้ข้อมูลตัวอย่าง
  const leaderboardData = data.length > 0 ? data : [
    { id: '1', name: 'ผู้ใช้ตัวอย่าง 1', points: 850, level: 9, achievements: 12 },
    { id: '2', name: 'ผู้ใช้ตัวอย่าง 2', points: 720, level: 8, achievements: 10 },
    { id: '3', name: 'ผู้ใช้ตัวอย่าง 3', points: 650, level: 7, achievements: 8 },
    { id: '4', name: 'ผู้ใช้ตัวอย่าง 4', points: 520, level: 6, achievements: 7 },
    { id: '5', name: 'ผู้ใช้ตัวอย่าง 5', points: 480, level: 5, achievements: 6 },
  ];
  
  // เรียงลำดับข้อมูลตามเงื่อนไขที่เลือก
  const sortedData = [...leaderboardData].sort((a, b) => b[sortBy] - a[sortBy]);
  
  // จำกัดจำนวนข้อมูลที่แสดง
  const limitedData = sortedData.slice(0, limit);

  return (
    <div className="bg-surface rounded-lg overflow-hidden border border-text-secondary/10">
      <div className="p-4 border-b border-text-secondary/10">
        <h3 className="font-bold text-lg">อันดับผู้เรียน</h3>
        <p className="text-text-secondary text-sm">ผู้เรียนที่มีคะแนนสูงสุด</p>
      </div>
      
      {/* ตัวเลือกการเรียงลำดับ */}
      <div className="p-4 bg-background border-b border-text-secondary/10 flex space-x-2">
        <button
          onClick={() => setSortBy('points')}
          className={`px-3 py-1 text-sm rounded-full ${
            sortBy === 'points' 
              ? 'bg-primary text-white' 
              : 'bg-surface text-text-secondary hover:bg-text-secondary/10'
          }`}
        >
          คะแนน
        </button>
        <button
          onClick={() => setSortBy('level')}
          className={`px-3 py-1 text-sm rounded-full ${
            sortBy === 'level' 
              ? 'bg-primary text-white' 
              : 'bg-surface text-text-secondary hover:bg-text-secondary/10'
          }`}
        >
          เลเวล
        </button>
        <button
          onClick={() => setSortBy('achievements')}
          className={`px-3 py-1 text-sm rounded-full ${
            sortBy === 'achievements' 
              ? 'bg-primary text-white' 
              : 'bg-surface text-text-secondary hover:bg-text-secondary/10'
          }`}
        >
          ความสำเร็จ
        </button>
      </div>
      
      {/* ตารางแสดงอันดับ */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                อันดับ
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                ผู้เรียน
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                คะแนน
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                เลเวล
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                ความสำเร็จ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-text-secondary/10">
            {limitedData.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'bg-surface' : 'bg-background'}>
                <td className="px-4 py-3 whitespace-nowrap">
                  {/* แสดงเหรียญสำหรับ 3 อันดับแรก */}
                  {index === 0 && <span className="text-xl mr-1">🥇</span>}
                  {index === 1 && <span className="text-xl mr-1">🥈</span>}
                  {index === 2 && <span className="text-xl mr-1">🥉</span>}
                  {index > 2 && <span className="font-medium ml-2">{index + 1}</span>}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="font-medium">{user.name}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className={`font-medium ${sortBy === 'points' ? 'text-primary' : ''}`}>
                    {user.points}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className={`font-medium ${sortBy === 'level' ? 'text-primary' : ''}`}>
                    {user.level}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className={`font-medium ${sortBy === 'achievements' ? 'text-primary' : ''}`}>
                    {user.achievements}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
