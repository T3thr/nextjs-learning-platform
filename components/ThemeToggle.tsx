"use client";

// ไฟล์นี้เป็นคอมโพเนนต์สำหรับสลับระหว่างโหมดมืดและโหมดสว่าง
// This file is a component for toggling between dark and light modes

import { useTheme } from '@/context/ThemeContext';

// คอมโพเนนต์สำหรับการสลับระหว่างโหมดมืดและโหมดสว่าง
// Component for toggling between dark and light modes
export default function ThemeToggle() {
  // ใช้ hook useTheme เพื่อเข้าถึง theme และ toggleTheme
  // Use useTheme hook to access theme and toggleTheme
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-surface hover:bg-opacity-80 transition-colors"
      aria-label={theme === 'light' ? 'เปลี่ยนเป็นโหมดมืด' : 'เปลี่ยนเป็นโหมดสว่าง'}
    >
      {theme === 'light' ? (
        // ไอคอนพระจันทร์สำหรับโหมดมืด
        // Moon icon for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      ) : (
        // ไอคอนพระอาทิตย์สำหรับโหมดสว่าง
        // Sun icon for light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      )}
    </button>
  );
}