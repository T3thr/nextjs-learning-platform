import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการใช้งาน Dark Mode ใน Next.js
export default function DarkModeExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# การใช้งาน Dark Mode ใน Next.js

Dark Mode หรือโหมดมืดเป็นฟีเจอร์ที่ช่วยให้ผู้ใช้สามารถเปลี่ยนธีมของเว็บไซต์เป็นโทนสีเข้มได้ ซึ่งช่วยลดความเมื่อยล้าของดวงตาเมื่อใช้งานในที่มืดหรือในเวลากลางคืน ในตัวอย่างนี้ เราจะแสดงวิธีการใช้งาน Dark Mode ใน Next.js ด้วยวิธีการต่างๆ

## ประโยชน์ของการใช้งาน Dark Mode

1. **ลดความเมื่อยล้าของดวงตา**: ช่วยลดความเมื่อยล้าของดวงตาเมื่อใช้งานในที่มืดหรือในเวลากลางคืน
2. **ประหยัดพลังงาน**: ช่วยประหยัดพลังงานแบตเตอรี่บนอุปกรณ์ที่ใช้หน้าจอ OLED หรือ AMOLED
3. **เพิ่มความสวยงาม**: สร้างความแตกต่างและความน่าสนใจให้กับเว็บไซต์
4. **เพิ่มความสามารถในการเข้าถึง**: ช่วยให้ผู้ใช้ที่มีความไวต่อแสงสามารถใช้งานเว็บไซต์ได้สะดวกขึ้น
5. **ตอบสนองความต้องการของผู้ใช้**: ให้ผู้ใช้สามารถเลือกธีมที่ต้องการได้ตามความชอบ`;

  // เนื้อหาเกี่ยวกับการใช้งาน Dark Mode ด้วย Tailwind CSS
  const tailwindDarkModeContent = `## การใช้งาน Dark Mode ด้วย Tailwind CSS

Tailwind CSS มีระบบ Dark Mode ในตัวที่ช่วยให้เราสามารถกำหนดสไตล์สำหรับ Dark Mode ได้อย่างง่ายดาย:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Tailwind CSS
  const tailwindConfigCode = `// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // กำหนดให้ Dark Mode ทำงานตามคลาส 'dark' ที่อยู่ใน HTML
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // กำหนดสีสำหรับธีมสว่างและธีมมืด
        'primary': '#3b82f6', // สีหลัก
        'secondary': '#6b7280', // สีรอง
        'background': {
          DEFAULT: '#ffffff', // สีพื้นหลังสำหรับธีมสว่าง
          dark: '#121212', // สีพื้นหลังสำหรับธีมมืด
        },
        'surface': {
          DEFAULT: '#f3f4f6', // สีพื้นผิวสำหรับธีมสว่าง
          dark: '#1e1e1e', // สีพื้นผิวสำหรับธีมมืด
        },
        'text': {
          DEFAULT: '#111827', // สีข้อความหลักสำหรับธีมสว่าง
          dark: '#e5e7eb', // สีข้อความหลักสำหรับธีมมืด
          'secondary': {
            DEFAULT: '#4b5563', // สีข้อความรองสำหรับธีมสว่าง
            dark: '#9ca3af', // สีข้อความรองสำหรับธีมมืด
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;`;

  // โค้ดตัวอย่างสำหรับ CSS ที่ใช้ในการกำหนดสีพื้นฐาน
  const globalCssCode = `/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* กำหนดสีพื้นฐานสำหรับธีมสว่าง */
:root {
  --background: 255 255 255; /* สีพื้นหลัง */
  --surface: 243 244 246; /* สีพื้นผิว */
  --text: 17 24 39; /* สีข้อความหลัก */
  --text-secondary: 75 85 99; /* สีข้อความรอง */
}

/* กำหนดสีพื้นฐานสำหรับธีมมืด */
.dark {
  --background: 18 18 18; /* สีพื้นหลัง */
  --surface: 30 30 30; /* สีพื้นผิว */
  --text: 229 231 235; /* สีข้อความหลัก */
  --text-secondary: 156 163 175; /* สีข้อความรอง */
}

/* กำหนดสีพื้นฐานให้กับ body */
body {
  @apply bg-[rgb(var(--background))] text-[rgb(var(--text))];
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Context API สำหรับจัดการ Dark Mode
  const contextApiContent = `## การใช้งาน Context API สำหรับจัดการ Dark Mode

เราสามารถใช้ Context API ของ React เพื่อจัดการสถานะของ Dark Mode และแชร์สถานะนี้ไปยังคอมโพเนนต์ต่างๆ ได้:`;

  // โค้ดตัวอย่างสำหรับ ThemeContext
  const themeContextCode = `// context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// กำหนดประเภทของค่าที่จะเก็บใน Context
type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme; // ธีมปัจจุบัน
  setTheme: (theme: Theme) => void; // ฟังก์ชันสำหรับเปลี่ยนธีม
};

// สร้าง Context สำหรับธีม
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// สร้าง Provider สำหรับธีม
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // สร้าง state สำหรับเก็บธีมปัจจุบัน
  const [theme, setTheme] = useState<Theme>('light');

  // ฟังก์ชันสำหรับเปลี่ยนธีม
  const handleThemeChange = (newTheme: Theme) => {
    // บันทึกธีมลงใน localStorage
    localStorage.setItem('theme', newTheme);
    
    // เปลี่ยนธีมใน state
    setTheme(newTheme);
    
    // เพิ่มหรือลบคลาส 'dark' จาก document.documentElement
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // ใช้ useEffect เพื่อโหลดธีมจาก localStorage เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    // ตรวจสอบว่ามีธีมที่บันทึกไว้ใน localStorage หรือไม่
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // ถ้ามีธีมที่บันทึกไว้ ให้ใช้ธีมนั้น
    if (savedTheme) {
      handleThemeChange(savedTheme);
    } 
    // ถ้าไม่มีธีมที่บันทึกไว้ ให้ตรวจสอบว่าผู้ใช้ต้องการใช้ธีมมืดหรือไม่
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      handleThemeChange('dark');
    }
  }, []);

  // ส่งค่า theme และ setTheme ไปยังคอมโพเนนต์ลูก
  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

// สร้าง Hook สำหรับใช้งาน ThemeContext
export function useTheme() {
  const context = useContext(ThemeContext);
  
  // ถ้าไม่ได้ใช้งานภายใน ThemeProvider จะแสดงข้อความแจ้งเตือน
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}`;

  // โค้ดตัวอย่างสำหรับ ThemeToggle
  const themeToggleCode = `// components/ThemeToggle.tsx
'use client';

import { useTheme } from '@/context/ThemeContext';

// คอมโพเนนต์สำหรับสลับธีม
export default function ThemeToggle() {
  // ใช้ Hook useTheme เพื่อเข้าถึงค่าธีมและฟังก์ชันเปลี่ยนธีม
  const { theme, setTheme } = useTheme();

  // ฟังก์ชันสำหรับสลับธีม
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-surface hover:bg-surface-secondary transition-colors"
      aria-label={theme === 'light' ? 'เปลี่ยนเป็นโหมดมืด' : 'เปลี่ยนเป็นโหมดสว่าง'}
    >
      {/* ไอคอนสำหรับโหมดสว่าง (แสดงเมื่ออยู่ในโหมดมืด) */}
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        // ไอคอนสำหรับโหมดมืด (แสดงเมื่ออยู่ในโหมดสว่าง)
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน next-themes
  const nextThemesContent = `## การใช้งาน next-themes

next-themes เป็นไลบรารีที่ช่วยให้การจัดการธีมใน Next.js เป็นเรื่องง่าย โดยมีฟีเจอร์ต่างๆ เช่น การจัดการ localStorage, การตรวจสอบ prefers-color-scheme, และการป้องกัน hydration mismatch:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง next-themes
  const installNextThemesCode = `# ติดตั้ง next-themes
npm install next-themes

# หรือใช้ yarn
yarn add next-themes

# หรือใช้ bun
bun add next-themes`;

  // โค้ดตัวอย่างสำหรับการใช้งาน next-themes
  const nextThemesProviderCode = `// app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

// คอมโพเนนต์ Providers สำหรับห่อหุ้มแอปพลิเคชัน
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Providers ใน layout.tsx
  const layoutCode = `// app/layout.tsx
import { Providers } from './providers';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน next-themes ใน ThemeToggle
  const nextThemesToggleCode = `// components/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// คอมโพเนนต์สำหรับสลับธีม
export default function ThemeToggle() {
  // ใช้ Hook useTheme จาก next-themes
  const { theme, setTheme } = useTheme();
  
  // สร้าง state สำหรับตรวจสอบว่าคอมโพเนนต์ถูกโหลดหรือยัง
  const [mounted, setMounted] = useState(false);

  // ใช้ useEffect เพื่อตั้งค่า mounted เป็น true เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    setMounted(true);
  }, []);

  // ถ้าคอมโพเนนต์ยังไม่ถูกโหลด ให้แสดงปุ่มที่ว่างเปล่า
  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-surface hover:bg-surface-secondary transition-colors"
        aria-label="สลับธีม"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-surface hover:bg-surface-secondary transition-colors"
      aria-label={theme === 'light' ? 'เปลี่ยนเป็นโหมดมืด' : 'เปลี่ยนเป็นโหมดสว่าง'}
    >
      {/* ไอคอนสำหรับโหมดสว่าง (แสดงเมื่ออยู่ในโหมดมืด) */}
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        // ไอคอนสำหรับโหมดมืด (แสดงเมื่ออยู่ในโหมดสว่าง)
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน CSS Variables
  const cssVariablesContent = `## การใช้งาน CSS Variables

CSS Variables (Custom Properties) เป็นวิธีที่ยืดหยุ่นในการกำหนดสีสำหรับธีมต่างๆ:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน CSS Variables
  const cssVariablesCode = `/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* กำหนดสีพื้นฐานสำหรับธีมสว่าง */
:root {
  --color-primary: 59 130 246; /* สีหลัก */
  --color-secondary: 107 114 128; /* สีรอง */
  
  --color-background: 255 255 255; /* สีพื้นหลัก */
  --color-surface: 243 244 246; /* สีพื้นผิว */
  --color-surface-secondary: 229 231 235; /* สีพื้นผิวรอง */
  
  --color-text: 17 24 39; /* สีข้อความหลัก */
  --color-text-secondary: 75 85 99; /* สีข้อความรอง */
  
  --color-success: 34 197 94; /* สีสำเร็จ */
  --color-warning: 234 179 8; /* สีเตือน */
  --color-error: 239 68 68; /* สีผิดพลาด */
  --color-info: 59 130 246; /* สีข้อมูล */
}

/* กำหนดสีพื้นฐานสำหรับธีมมืด */
.dark {
  --color-primary: 96 165 250; /* สีหลัก */
  --color-secondary: 156 163 175; /* สีรอง */
  
  --color-background: 18 18 18; /* สีพื้นหลัก */
  --color-surface: 30 30 30; /* สีพื้นผิว */
  --color-surface-secondary: 55 55 55; /* สีพื้นผิวรอง */
  
  --color-text: 229 231 235; /* สีข้อความหลัก */
  --color-text-secondary: 156 163 175; /* สีข้อความรอง */
  
  --color-success: 74 222 128; /* สีสำเร็จ */
  --color-warning: 250 204 21; /* สีเตือน */
  --color-error: 248 113 113; /* สีผิดพลาด */
  --color-info: 96 165 250; /* สีข้อมูล */
}

/* กำหนดสีพื้นฐานให้กับ body */
body {
  @apply bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))];
}

/* กำหนดคลาสสำหรับใช้งานสีต่างๆ */
@layer components {
  .bg-primary {
    @apply bg-[rgb(var(--color-primary))];
  }
  
  .bg-surface {
    @apply bg-[rgb(var(--color-surface))];
  }
  
  .bg-surface-secondary {
    @apply bg-[rgb(var(--color-surface-secondary))];
  }
  
  .text-primary {
    @apply text-[rgb(var(--color-primary))];
  }
  
  .text-secondary {
    @apply text-[rgb(var(--color-secondary))];
  }
  
  .text-text-secondary {
    @apply text-[rgb(var(--color-text-secondary))];
  }
  
  .border-surface {
    @apply border-[rgb(var(--color-surface))];
  }
  
  .border-surface-secondary {
    @apply border-[rgb(var(--color-surface-secondary))];
  }
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน CSS Variables ในคอมโพเนนต์
  const cssVariablesComponentCode = `// components/Card.tsx
'use client';

// คอมโพเนนต์ Card ที่ใช้ CSS Variables
export default function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
      <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
        อ่านเพิ่มเติม
      </button>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Dark Mode ใน Server Components
  const serverComponentsContent = `## การใช้งาน Dark Mode ใน Server Components

ใน Next.js 13+ เราสามารถใช้งาน Dark Mode ใน Server Components ได้โดยใช้ cookies หรือ headers:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Dark Mode ใน Server Components
  const serverComponentsCode = `// app/layout.tsx
import { cookies } from 'next/headers';
import { Providers } from './providers';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // อ่านค่า theme จาก cookies
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value || 'light';
  
  return (
    <html lang="th" className={theme} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}`;

  // โค้ดตัวอย่างสำหรับการบันทึกธีมลงใน cookies
  const cookiesCode = `// components/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';

// คอมโพเนนต์สำหรับสลับธีม
export default function ThemeToggle() {
  // ใช้ Hook useTheme จาก next-themes
  const { theme, setTheme } = useTheme();
  
  // สร้าง state สำหรับตรวจสอบว่าคอมโพเนนต์ถูกโหลดหรือยัง
  const [mounted, setMounted] = useState(false);

  // ใช้ useEffect เพื่อตั้งค่า mounted เป็น true เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    setMounted(true);
  }, []);

  // ใช้ useEffect เพื่อบันทึกธีมลงใน cookies เมื่อธีมเปลี่ยน
  useEffect(() => {
    if (theme) {
      setCookie('theme', theme, { maxAge: 60 * 60 * 24 * 365 }); // บันทึกเป็นเวลา 1 ปี
    }
  }, [theme]);

  // ถ้าคอมโพเนนต์ยังไม่ถูกโหลด ให้แสดงปุ่มที่ว่างเปล่า
  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-surface hover:bg-surface-secondary transition-colors"
        aria-label="สลับธีม"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-surface hover:bg-surface-secondary transition-colors"
      aria-label={theme === 'light' ? 'เปลี่ยนเป็นโหมดมืด' : 'เปลี่ยนเป็นโหมดสว่าง'}
    >
      {/* ไอคอนสำหรับโหมดสว่าง (แสดงเมื่ออยู่ในโหมดมืด) */}
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        // ไอคอนสำหรับโหมดมืด (แสดงเมื่ออยู่ในโหมดสว่าง)
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Dark Mode กับ UI Components
  const uiComponentsContent = `## การใช้งาน Dark Mode กับ UI Components

เราสามารถสร้าง UI Components ที่รองรับ Dark Mode ได้ดังนี้:`;

  // โค้ดตัวอย่างสำหรับการสร้าง Button ที่รองรับ Dark Mode
  const buttonComponentCode = `// components/Button.tsx
'use client';

import { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// กำหนดสไตล์สำหรับปุ่มด้วย class-variance-authority
const buttonVariants = cva(
  // สไตล์พื้นฐานสำหรับปุ่มทุกประเภท
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      // ประเภทของปุ่ม
      variant: {
        // ปุ่มหลัก
        primary: 'bg-primary text-white hover:opacity-90',
        // ปุ่มรอง
        secondary: 'bg-secondary text-white hover:opacity-90',
        // ปุ่มเติมเต็ม
        outline: 'border border-input bg-transparent hover:bg-surface',
        // ปุ่มลิงก์
        ghost: 'hover:bg-surface hover:text-text',
        // ปุ่มอันตราย
        destructive: 'bg-red-500 text-white hover:opacity-90',
      },
      // ขนาดของปุ่ม
      size: {
        // ขนาดเล็ก
        sm: 'h-9 px-3 rounded-md',
        // ขนาดกลาง
        md: 'h-10 py-2 px-4',
        // ขนาดใหญ่
        lg: 'h-11 px-8 rounded-md',
      },
    },
    // ค่าเริ่มต้น
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// กำหนดประเภทของ props สำหรับ Button
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // props เพิ่มเติม
}

// คอมโพเนนต์ Button
export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}`;

  // โค้ดตัวอย่างสำหรับการสร้าง Card ที่รองรับ Dark Mode
  const cardComponentCode = `// components/Card.tsx
'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// กำหนดประเภทของ props สำหรับ Card
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  // props เพิ่มเติม
}

// คอมโพเนนต์ Card
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface rounded-lg shadow-sm p-6',
        className
      )}
      {...props}
    />
  );
}

// คอมโพเนนต์ CardHeader
export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  );
}

// คอมโพเนนต์ CardTitle
export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3
      className={cn('text-xl font-bold', className)}
      {...props}
    />
  );
}

// คอมโพเนนต์ CardDescription
export function CardDescription({ className, ...props }: CardProps) {
  return (
    <p
      className={cn('text-text-secondary', className)}
      {...props}
    />
  );
}

// คอมโพเนนต์ CardContent
export function CardContent({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('pt-0', className)}
      {...props}
    />
  );
}

// คอมโพเนนต์ CardFooter
export function CardFooter({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการใช้งาน Dark Mode ใน Next.js ดังนี้:

1. การใช้งาน Dark Mode ด้วย Tailwind CSS
2. การใช้งาน Context API สำหรับจัดการ Dark Mode
3. การใช้งาน next-themes
4. การใช้งาน CSS Variables
5. การใช้งาน Dark Mode ใน Server Components
6. การใช้งาน Dark Mode กับ UI Components

การใช้งาน Dark Mode ช่วยเพิ่มความสามารถในการเข้าถึงและประสบการณ์ผู้ใช้ของเว็บไซต์ Next.js มีเครื่องมือและไลบรารีที่ช่วยให้การใช้งาน Dark Mode เป็นเรื่องง่าย`;

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของตัวอย่าง */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/examples" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการตัวอย่าง
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">การใช้งาน Dark Mode</h1>
            <p className="text-text-secondary">ตัวอย่างการใช้งาน Dark Mode ใน Next.js ด้วยวิธีการต่างๆ</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              20 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาตัวอย่าง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={exampleContent} />
        <MarkdownContent content={tailwindDarkModeContent} />
        <CodeBlock code={tailwindConfigCode} language="typescript" fileName="tailwind.config.ts" />
        <CodeBlock code={globalCssCode} language="css" fileName="globals.css" />
        <MarkdownContent content={contextApiContent} />
        <CodeBlock code={themeContextCode} language="typescript" fileName="context/ThemeContext.tsx" />
        <CodeBlock code={themeToggleCode} language="typescript" fileName="components/ThemeToggle.tsx" />
        <MarkdownContent content={nextThemesContent} />
        <CodeBlock code={installNextThemesCode} language="bash" fileName="Terminal" />
        <CodeBlock code={nextThemesProviderCode} language="typescript" fileName="app/providers.tsx" />
        <CodeBlock code={layoutCode} language="typescript" fileName="app/layout.tsx" />
        <CodeBlock code={nextThemesToggleCode} language="typescript" fileName="components/ThemeToggle.tsx" />
        <MarkdownContent content={cssVariablesContent} />
        <CodeBlock code={cssVariablesCode} language="css" fileName="globals.css" />
        <CodeBlock code={cssVariablesComponentCode} language="typescript" fileName="components/Card.tsx" />
        <MarkdownContent content={serverComponentsContent} />
        <CodeBlock code={serverComponentsCode} language="typescript" fileName="app/layout.tsx" />
        <CodeBlock code={cookiesCode} language="typescript" fileName="components/ThemeToggle.tsx" />
        <MarkdownContent content={uiComponentsContent} />
        <CodeBlock code={buttonComponentCode} language="typescript" fileName="components/Button.tsx" />
        <CodeBlock code={cardComponentCode} language="typescript" fileName="components/Card.tsx" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
