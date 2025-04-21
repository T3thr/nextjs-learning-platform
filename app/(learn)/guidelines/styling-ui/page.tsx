import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงแนวทางการจัดการ UI และ Styling ใน Next.js
export default function StylingUIGuideline() {
  // เนื้อหาแนวทางในรูปแบบ Markdown
  const guidelineContent = `# การจัดการ UI และ Styling

การจัดการ UI และ Styling เป็นส่วนสำคัญในการพัฒนาแอปพลิเคชัน Next.js ที่มีประสิทธิภาพและสวยงาม ตามมาตรฐานองค์กรของเรา เราใช้ Tailwind CSS เป็นหลักในการพัฒนา UI ในคู่มือนี้ เราจะแนะนำวิธีการใช้งาน Tailwind CSS และการสร้าง UI Components ใน Next.js

## การตั้งค่า Tailwind CSS

Tailwind CSS เป็น utility-first CSS framework ที่ช่วยให้เราสามารถสร้าง UI ได้อย่างรวดเร็วและมีประสิทธิภาพ โดยไม่ต้องเขียน CSS เอง เมื่อคุณสร้างโปรเจค Next.js ด้วย \`create-next-app\` และเลือกใช้ Tailwind CSS Tailwind จะถูกติดตั้งและตั้งค่าให้โดยอัตโนมัติ

อย่างไรก็ตาม คุณอาจต้องการปรับแต่งการตั้งค่า Tailwind CSS เพิ่มเติมตามมาตรฐานองค์กร:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Tailwind CSS
  const tailwindConfigCode = `// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  // กำหนดไฟล์ที่ Tailwind จะสแกนหา class
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // เปิดใช้งาน Dark Mode แบบ class
  darkMode: 'class',
  theme: {
    extend: {
      // กำหนดสีตามแบรนด์ขององค์กร
      colors: {
        primary: {
          DEFAULT: '#0070f3',
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0070f3',
          600: '#005cc0',
          700: '#00448e',
          800: '#002d5c',
          900: '#00172a',
        },
        secondary: {
          DEFAULT: '#7928ca',
          50: '#f5e9ff',
          100: '#e0c3ff',
          200: '#cc9eff',
          300: '#b779ff',
          400: '#a354ff',
          500: '#8f30ff',
          600: '#7928ca',
          700: '#5b1e99',
          800: '#3d1466',
          900: '#1e0a33',
        },
        // สีสำหรับ Dark Mode
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: 'hsl(var(--surface))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
      },
      // กำหนด font family
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
      // กำหนด border radius
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      // กำหนด box shadow
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [
    // เพิ่ม plugins ตามต้องการ
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;`;

  // เนื้อหาเกี่ยวกับการตั้งค่า CSS Variables
  const cssVariablesContent = `## การตั้งค่า CSS Variables

เราใช้ CSS Variables เพื่อจัดการธีมสีและสลับระหว่าง Light Mode และ Dark Mode:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า CSS Variables
  const cssVariablesCode = `/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --surface: 0 0% 98%;
    --text-primary: 222.2 84% 4.9%;
    --text-secondary: 215.4 16.3% 46.9%;
    
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    
    --secondary: 270 50% 40%;
    --secondary-foreground: 210 40% 98%;
    
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --surface: 223 47% 11%;
    --text-primary: 210 40% 98%;
    --text-secondary: 215 20.2% 65.1%;
    
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    
    --secondary: 270 50% 40%;
    --secondary-foreground: 210 40% 98%;
    
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-text-primary;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded-md font-medium transition-colors;
  }
  
  .btn-primary {
    @apply bg-primary text-white hover:bg-primary-600;
  }
  
  .btn-secondary {
    @apply bg-secondary text-white hover:bg-secondary-600;
  }
  
  .btn-outline {
    @apply border border-primary text-primary hover:bg-primary hover:text-white;
  }
  
  .btn-ghost {
    @apply text-text-primary hover:bg-surface;
  }
  
  .badge {
    @apply px-2 py-1 rounded-full text-xs font-medium;
  }
  
  .card {
    @apply bg-surface rounded-lg p-6 shadow-md;
  }
  
  .input {
    @apply w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent;
  }
  
  .select {
    @apply w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent;
  }
  
  .checkbox {
    @apply h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary;
  }
  
  .radio {
    @apply h-4 w-4 border-gray-300 text-primary focus:ring-primary;
  }
}`;

  // เนื้อหาเกี่ยวกับการสร้าง UI Components
  const uiComponentsContent = `## การสร้าง UI Components

การสร้าง UI Components ที่ใช้ซ้ำได้เป็นสิ่งสำคัญในการพัฒนาแอปพลิเคชันขนาดใหญ่ เราแนะนำให้สร้าง UI Components พื้นฐานที่ใช้บ่อยและเก็บไว้ในโฟลเดอร์ \`components/ui\`:`;

  // โค้ดตัวอย่างสำหรับการสร้าง Button Component
  const buttonComponentCode = `// src/components/ui/Button.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// กำหนด variants และ sizes ของปุ่ม
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// กำหนด Props ของ Button Component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// สร้าง Button Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

// วิธีการใช้งาน
// import { Button } from '@/components/ui/Button';
//
// <Button>ปุ่มปกติ</Button>
// <Button variant="secondary">ปุ่มรอง</Button>
// <Button variant="outline">ปุ่มเส้นขอบ</Button>
// <Button variant="ghost">ปุ่มโปร่งใส</Button>
// <Button variant="link">ปุ่มลิงก์</Button>
// <Button size="sm">ปุ่มขนาดเล็ก</Button>
// <Button size="lg">ปุ่มขนาดใหญ่</Button>`;

  // โค้ดตัวอย่างสำหรับการสร้าง Input Component
  const inputComponentCode = `// src/components/ui/Input.tsx
import React from 'react';
import { cn } from '@/lib/utils';

// กำหนด Props ของ Input Component
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// สร้าง Input Component
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };

// วิธีการใช้งาน
// import { Input } from '@/components/ui/Input';
//
// <Input type="text" placeholder="ชื่อผู้ใช้" />
// <Input type="email" placeholder="อีเมล" />
// <Input type="password" placeholder="รหัสผ่าน" />`;

  // เนื้อหาเกี่ยวกับการสร้าง Utility Function สำหรับ Class Names
  const utilityFunctionContent = `## การสร้าง Utility Function สำหรับ Class Names

เราใช้ \`clsx\` และ \`tailwind-merge\` เพื่อจัดการ class names ได้อย่างมีประสิทธิภาพ:`;

  // โค้ดตัวอย่างสำหรับการสร้าง Utility Function
  const utilityFunctionCode = `// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ฟังก์ชันสำหรับรวม class names และแก้ไขปัญหา class ที่ขัดแย้งกัน
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// วิธีการใช้งาน
// import { cn } from '@/lib/utils';
//
// <div className={cn(
//   'text-red-500', // class พื้นฐาน
//   isActive && 'font-bold', // เพิ่ม class ตามเงื่อนไข
//   className // รับ class จากภายนอก
// )}>
//   เนื้อหา
// </div>`;

  // เนื้อหาเกี่ยวกับการจัดการ Dark Mode
  const darkModeContent = `## การจัดการ Dark Mode

เราใช้ \`next-themes\` เพื่อจัดการ Dark Mode ใน Next.js:`;

  // โค้ดตัวอย่างสำหรับการจัดการ Dark Mode
  const darkModeCode = `// ติดตั้ง next-themes
// npm install next-themes
// หรือ
// bun add next-themes

// src/components/ThemeProvider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

// สร้าง ThemeProvider Component
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// src/app/layout.tsx
import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// src/components/ThemeToggle.tsx
"use client"

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// สร้าง ThemeToggle Component
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้ Font ใน Next.js
  const fontContent = `## การใช้ Font ใน Next.js

Next.js 13+ มีระบบจัดการ Font ที่ดีขึ้นด้วย \`next/font\`:`;

  // โค้ดตัวอย่างสำหรับการใช้ Font
  const fontCode = `// src/app/layout.tsx
import { Inter, Poppins } from 'next/font/google';

// โหลด font Inter สำหรับเนื้อหาทั่วไป
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// โหลด font Poppins สำหรับหัวข้อ
const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={\`\${inter.variable} \${poppins.variable}\`}>
      <body>
        {children}
      </body>
    </html>
  );
}

// การใช้งานใน Component
// <h1 className="font-heading text-3xl font-bold">หัวข้อใหญ่</h1>
// <p className="font-sans text-base">เนื้อหาทั่วไป</p>`;

  // เนื้อหาเกี่ยวกับการใช้ Icons
  const iconsContent = `## การใช้ Icons

เราใช้ \`lucide-react\` เป็นไลบรารี Icon หลักในโปรเจค:`;

  // โค้ดตัวอย่างสำหรับการใช้ Icons
  const iconsCode = `// ติดตั้ง lucide-react
// npm install lucide-react
// หรือ
// bun add lucide-react

// การใช้งาน Icons
import { Home, Settings, User, Bell, Search } from 'lucide-react';

export default function IconsExample() {
  return (
    <div className="flex gap-4">
      <Home className="h-6 w-6 text-primary" />
      <Settings className="h-6 w-6 text-secondary" />
      <User className="h-6 w-6 text-text-secondary" />
      <Bell className="h-6 w-6 text-yellow-500" />
      <Search className="h-6 w-6 text-green-500" />
    </div>
  );
}

// การสร้าง Icon Button
import { Button } from '@/components/ui/Button';
import { Bell } from 'lucide-react';

<Button variant="ghost" size="icon">
  <Bell className="h-5 w-5" />
</Button>`;

  // เนื้อหาเกี่ยวกับการสร้าง Layout Components
  const layoutComponentsContent = `## การสร้าง Layout Components

การสร้าง Layout Components ช่วยให้เราสามารถจัดการโครงสร้างหน้าเว็บได้อย่างมีประสิทธิภาพ:`;

  // โค้ดตัวอย่างสำหรับการสร้าง Layout Components
  const layoutComponentsCode = `// src/components/layout/Header.tsx
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { User } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            My App
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link href="/" className="hover:text-primary">
              หน้าแรก
            </Link>
            <Link href="/features" className="hover:text-primary">
              คุณสมบัติ
            </Link>
            <Link href="/pricing" className="hover:text-primary">
              ราคา
            </Link>
            <Link href="/blog" className="hover:text-primary">
              บทความ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

// src/components/layout/Footer.tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">My App</h3>
            <p className="text-text-secondary">
              แอปพลิเคชันที่ช่วยให้คุณทำงานได้อย่างมีประสิทธิภาพ
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">ลิงก์</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-text-secondary hover:text-primary">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-text-secondary hover:text-primary">
                  คุณสมบัติ
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-text-secondary hover:text-primary">
                  ราคา
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-primary">
                  บทความ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">บริษัท</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-primary">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-text-secondary hover:text-primary">
                  ร่วมงานกับเรา
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-primary">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">ติดต่อ</h3>
            <ul className="space-y-2">
              <li className="text-text-secondary">
                อีเมล: info@myapp.com
              </li>
              <li className="text-text-secondary">
                โทรศัพท์: 02-123-4567
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-text-secondary">
          <p>© {new Date().getFullYear()} My App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// src/app/layout.tsx
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## แนวทางปฏิบัติที่ดีในการจัดการ UI และ Styling

1. **ใช้ Tailwind CSS** - ใช้ Tailwind CSS เป็นหลักในการพัฒนา UI
2. **สร้าง UI Components ที่ใช้ซ้ำได้** - แยก UI Components ออกมาเพื่อใช้ซ้ำได้
3. **ใช้ CSS Variables สำหรับธีม** - ใช้ CSS Variables เพื่อจัดการธีมสีและ Dark Mode
4. **ใช้ clsx และ tailwind-merge** - ใช้ utility functions เพื่อจัดการ class names
5. **ใช้ next-themes สำหรับ Dark Mode** - ใช้ next-themes เพื่อจัดการ Dark Mode
6. **ใช้ next/font สำหรับ Font** - ใช้ next/font เพื่อจัดการ Font
7. **ใช้ lucide-react สำหรับ Icons** - ใช้ lucide-react เป็นไลบรารี Icon หลัก
8. **สร้าง Layout Components** - แยก Layout Components ออกมาเพื่อใช้ซ้ำได้

## ขั้นตอนต่อไป

หลังจากที่คุณได้เรียนรู้เกี่ยวกับการจัดการ UI และ Styling ใน Next.js แล้ว คุณสามารถศึกษาแนวทางต่อไปนี้:

1. [การดึงข้อมูลและการจัดการ API](/guidelines/data-fetching) - เรียนรู้วิธีการดึงข้อมูลและการสร้าง API Routes
2. [การยืนยันตัวตนด้วย NextAuth.js](/guidelines/authentication) - เรียนรู้วิธีการใช้งาน NextAuth.js สำหรับการยืนยันตัวตน
3. [การเชื่อมต่อฐานข้อมูลด้วย Drizzle ORM](/guidelines/database-integration) - เรียนรู้วิธีการใช้งาน Drizzle ORM สำหรับการเชื่อมต่อฐานข้อมูล`;

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของแนวทาง */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/guidelines" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการแนวทาง
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">การจัดการ UI และ Styling</h1>
            <p className="text-text-secondary">แนวทางการใช้งาน Tailwind CSS และการจัดการ UI ใน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs mr-2">
              เริ่มต้น
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              30 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาแนวทาง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={guidelineContent} />
        <CodeBlock code={tailwindConfigCode} language="typescript" fileName="tailwind.config.ts" />
        <MarkdownContent content={cssVariablesContent} />
        <CodeBlock code={cssVariablesCode} language="css" fileName="src/app/globals.css" />
        <MarkdownContent content={uiComponentsContent} />
        <CodeBlock code={buttonComponentCode} language="typescript" fileName="src/components/ui/Button.tsx" />
        <CodeBlock code={inputComponentCode} language="typescript" fileName="src/components/ui/Input.tsx" />
        <MarkdownContent content={utilityFunctionContent} />
        <CodeBlock code={utilityFunctionCode} language="typescript" fileName="src/lib/utils.ts" />
        <MarkdownContent content={darkModeContent} />
        <CodeBlock code={darkModeCode} language="typescript" fileName="Dark Mode Setup" />
        <MarkdownContent content={fontContent} />
        <CodeBlock code={fontCode} language="typescript" fileName="Font Setup" />
        <MarkdownContent content={iconsContent} />
        <CodeBlock code={iconsCode} language="typescript" fileName="Icons Usage" />
        <MarkdownContent content={layoutComponentsContent} />
        <CodeBlock code={layoutComponentsCode} language="typescript" fileName="Layout Components" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
