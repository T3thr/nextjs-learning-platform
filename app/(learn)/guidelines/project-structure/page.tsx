import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงแนวทางการจัดโครงสร้างโปรเจค Next.js
export default function ProjectStructureGuideline() {
  // เนื้อหาแนวทางในรูปแบบ Markdown
  const guidelineContent = `# โครงสร้างโปรเจค Next.js

การจัดโครงสร้างโปรเจค Next.js ที่ดีจะช่วยให้การพัฒนาแอปพลิเคชันเป็นไปอย่างมีประสิทธิภาพ โดยเฉพาะเมื่อโปรเจคมีขนาดใหญ่และมีนักพัฒนาหลายคนทำงานร่วมกัน ในคู่มือนี้ เราจะแนะนำวิธีการจัดโครงสร้างโปรเจค Next.js ตามมาตรฐานองค์กรของเรา

## โครงสร้างโปรเจคพื้นฐาน

โครงสร้างโปรเจค Next.js พื้นฐานที่แนะนำมีดังนี้:`;

  // โค้ดตัวอย่างสำหรับโครงสร้างโปรเจคพื้นฐาน
  const basicStructureCode = `my-nextjs-app/
├── .eslintrc.json        # การตั้งค่า ESLint
├── .gitignore            # ไฟล์ที่ไม่ต้องการให้ Git ติดตาม
├── next.config.js        # การตั้งค่า Next.js
├── next-env.d.ts         # TypeScript declarations สำหรับ Next.js
├── package.json          # รายการ dependencies และ scripts
├── postcss.config.js     # การตั้งค่า PostCSS (สำหรับ Tailwind CSS)
├── README.md             # เอกสารโปรเจค
├── tailwind.config.ts    # การตั้งค่า Tailwind CSS
├── tsconfig.json         # การตั้งค่า TypeScript
├── public/               # ไฟล์ static (รูปภาพ, ไอคอน, ฯลฯ)
└── src/                  # โค้ดของแอปพลิเคชัน
    ├── app/              # App Router
    │   ├── favicon.ico   # ไอคอนเว็บไซต์
    │   ├── globals.css   # CSS ทั่วไป
    │   ├── layout.tsx    # Layout หลัก
    │   └── page.tsx      # หน้าแรก
    ├── components/       # React Components
    ├── lib/              # Utility functions และ shared logic
    ├── types/            # TypeScript type definitions
    └── styles/           # CSS modules และ styled components`;

  // เนื้อหาเกี่ยวกับโครงสร้างโปรเจคขั้นสูง
  const advancedStructureContent = `## โครงสร้างโปรเจคขั้นสูงตามมาตรฐานองค์กร

สำหรับโปรเจคขนาดใหญ่ เราแนะนำให้ใช้โครงสร้างที่ละเอียดมากขึ้น เพื่อให้สามารถจัดการโค้ดได้ง่ายและขยายขนาดได้ดี:`;

  // โค้ดตัวอย่างสำหรับโครงสร้างโปรเจคขั้นสูง
  const advancedStructureCode = `my-nextjs-app/
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── next-env.d.ts
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── drizzle.config.ts     # การตั้งค่า Drizzle ORM
├── public/
│   ├── fonts/            # ฟอนต์
│   ├── images/           # รูปภาพ static
│   └── locales/          # ไฟล์ภาษา (i18n)
└── src/
    ├── app/              # App Router
    │   ├── (auth)/       # กลุ่มเส้นทางสำหรับการยืนยันตัวตน
    │   │   ├── login/    # หน้าเข้าสู่ระบบ
    │   │   ├── register/ # หน้าลงทะเบียน
    │   │   └── layout.tsx # Layout สำหรับส่วนยืนยันตัวตน
    │   ├── (dashboard)/  # กลุ่มเส้นทางสำหรับแดชบอร์ด
    │   │   ├── overview/ # หน้าภาพรวม
    │   │   ├── settings/ # หน้าตั้งค่า
    │   │   └── layout.tsx # Layout สำหรับส่วนแดชบอร์ด
    │   ├── api/          # API Routes
    │   │   ├── auth/     # API สำหรับการยืนยันตัวตน
    │   │   └── [...]     # API อื่นๆ
    │   ├── globals.css   # CSS ทั่วไป
    │   ├── layout.tsx    # Layout หลัก
    │   └── page.tsx      # หน้าแรก
    ├── components/       # React Components
    │   ├── ui/           # UI Components พื้นฐาน (ปุ่ม, การ์ด, ฯลฯ)
    │   ├── forms/        # Form Components
    │   ├── layout/       # Layout Components
    │   └── [feature]/    # Components เฉพาะ feature
    ├── hooks/            # Custom React Hooks
    │   ├── use-auth.ts   # Hook สำหรับการยืนยันตัวตน
    │   ├── use-form.ts   # Hook สำหรับฟอร์ม
    │   └── [...]         # Hook อื่นๆ
    ├── lib/              # Utility functions และ shared logic
    │   ├── auth/         # Logic สำหรับการยืนยันตัวตน
    │   ├── db/           # Database utilities
    │   ├── utils/        # Utility functions
    │   └── [...]         # Logic อื่นๆ
    ├── types/            # TypeScript type definitions
    │   ├── auth.ts       # Types สำหรับการยืนยันตัวตน
    │   ├── db.ts         # Types สำหรับฐานข้อมูล
    │   └── [...]         # Types อื่นๆ
    ├── styles/           # CSS modules และ styled components
    ├── constants/        # Constants และ configuration
    └── backend/          # Backend code
        ├── db/           # Database schema และ migrations
        │   ├── schema/   # Drizzle schema
        │   └── migrations/ # Drizzle migrations
        ├── services/     # Business logic
        └── utils/        # Backend utilities`;

  // เนื้อหาเกี่ยวกับการจัดโครงสร้างตาม Feature
  const featureBasedContent = `## การจัดโครงสร้างตาม Feature

สำหรับโปรเจคที่มีความซับซ้อนสูง เราแนะนำให้จัดโครงสร้างตาม Feature แทนที่จะจัดตามประเภทไฟล์ ซึ่งจะช่วยให้โค้ดที่เกี่ยวข้องกันอยู่ใกล้กัน และทำให้การพัฒนา Feature ใหม่ทำได้ง่ายขึ้น:`;

  // โค้ดตัวอย่างสำหรับการจัดโครงสร้างตาม Feature
  const featureBasedCode = `my-nextjs-app/
└── src/
    ├── app/              # App Router (เส้นทางและหน้า)
    ├── features/         # แบ่งตาม Feature
    │   ├── authentication/ # Feature การยืนยันตัวตน
    │   │   ├── components/ # Components เฉพาะของ Feature นี้
    │   │   ├── hooks/      # Hooks เฉพาะของ Feature นี้
    │   │   ├── types/      # Types เฉพาะของ Feature นี้
    │   │   ├── utils/      # Utils เฉพาะของ Feature นี้
    │   │   └── index.ts    # Export ทุกอย่างที่ต้องการให้ใช้จากภายนอก
    │   ├── dashboard/    # Feature แดชบอร์ด
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── types/
    │   │   ├── utils/
    │   │   └── index.ts
    │   └── [...]         # Feature อื่นๆ
    ├── shared/           # โค้ดที่ใช้ร่วมกันระหว่าง Features
    │   ├── components/   # Shared Components
    │   ├── hooks/        # Shared Hooks
    │   ├── types/        # Shared Types
    │   └── utils/        # Shared Utils
    └── lib/              # Core libraries และ utilities`;

  // เนื้อหาเกี่ยวกับการจัดการ Import
  const importManagementContent = `## การจัดการ Import

การจัดการ Import ที่ดีจะช่วยให้โค้ดอ่านง่ายและลดความซับซ้อน เราแนะนำให้ใช้ alias ในการ Import เพื่อหลีกเลี่ยง relative imports ที่ซับซ้อน:`;

  // โค้ดตัวอย่างสำหรับการจัดการ Import
  const importManagementCode = `// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@features/*": ["./src/features/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@lib/*": ["./src/lib/*"],
      "@types/*": ["./src/types/*"],
      "@styles/*": ["./src/styles/*"],
      "@constants/*": ["./src/constants/*"],
      "@backend/*": ["./src/backend/*"]
    }
  }
}

// ตัวอย่างการใช้งาน
// แบบไม่ดี (relative imports)
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../hooks/use-auth';

// แบบดี (absolute imports ด้วย alias)
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/use-auth';`;

  // เนื้อหาเกี่ยวกับการจัดการ Environment Variables
  const envVarsContent = `## การจัดการ Environment Variables

Environment Variables เป็นสิ่งสำคัญในการพัฒนาแอปพลิเคชัน Next.js โดยเฉพาะเมื่อต้องการใช้ค่าที่แตกต่างกันในแต่ละสภาพแวดล้อม (development, staging, production):`;

  // โค้ดตัวอย่างสำหรับการจัดการ Environment Variables
  const envVarsCode = `# .env.local (ไม่ควร commit ลง Git)
# ค่าที่ใช้ทั้งใน client และ server
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://example.com

# ค่าที่ใช้เฉพาะใน server
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# .env.development (สำหรับ development)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# .env.production (สำหรับ production)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://example.com

# วิธีการใช้งานใน Next.js
# ใน server component หรือ API route
const dbUrl = process.env.DATABASE_URL;

# ใน client component (ต้องมี NEXT_PUBLIC_ นำหน้า)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;`;

  // เนื้อหาเกี่ยวกับการจัดการ Constants
  const constantsContent = `## การจัดการ Constants

การแยก Constants ออกมาจากโค้ดหลักจะช่วยให้การบำรุงรักษาโค้ดทำได้ง่ายขึ้น และลดความซ้ำซ้อน:`;

  // โค้ดตัวอย่างสำหรับการจัดการ Constants
  const constantsCode = `// src/constants/routes.ts
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/dashboard/profile',
};

// src/constants/api.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
  },
  USERS: {
    GET_ALL: '/api/users',
    GET_BY_ID: (id: string) => \`/api/users/\${id}\`,
    UPDATE: (id: string) => \`/api/users/\${id}\`,
    DELETE: (id: string) => \`/api/users/\${id}\`,
  },
};

// src/constants/config.ts
export const CONFIG = {
  SITE_NAME: 'My Next.js App',
  SITE_DESCRIPTION: 'A Next.js app built with the company stack',
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
};

// วิธีการใช้งาน
import { ROUTES } from '@constants/routes';
import { API_ENDPOINTS } from '@constants/api';
import { CONFIG } from '@constants/config';

function MyComponent() {
  return (
    <div>
      <h1>{CONFIG.SITE_NAME}</h1>
      <Link href={ROUTES.DASHBOARD}>ไปที่แดชบอร์ด</Link>
    </div>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## แนวทางปฏิบัติที่ดีในการจัดโครงสร้างโปรเจค

1. **แบ่งโค้ดตามหน้าที่** - แยกโค้ดตามหน้าที่การทำงาน เช่น components, hooks, utils
2. **ใช้ชื่อไฟล์และโฟลเดอร์ที่มีความหมาย** - ตั้งชื่อให้สื่อความหมายและเข้าใจง่าย
3. **จัดกลุ่มไฟล์ที่เกี่ยวข้องกัน** - ไฟล์ที่เกี่ยวข้องกันควรอยู่ในโฟลเดอร์เดียวกัน
4. **ใช้ barrel exports** - ใช้ไฟล์ index.ts เพื่อ export ทุกอย่างในโฟลเดอร์
5. **หลีกเลี่ยง relative imports ที่ซับซ้อน** - ใช้ alias ในการ import
6. **แยก constants ออกจากโค้ดหลัก** - เก็บค่าคงที่ไว้ในไฟล์ constants
7. **จัดการ environment variables อย่างเหมาะสม** - แยกตามสภาพแวดล้อม

## ขั้นตอนต่อไป

หลังจากที่คุณได้จัดโครงสร้างโปรเจค Next.js ตามมาตรฐานองค์กรแล้ว คุณสามารถศึกษาแนวทางต่อไปนี้:

1. [การจัดการเส้นทางและการนำทาง](/guidelines/routing-navigation) - เรียนรู้วิธีการใช้งาน App Router ใน Next.js
2. [การจัดการ UI และ Styling](/guidelines/styling-ui) - เรียนรู้วิธีการใช้งาน Tailwind CSS และการสร้าง UI Components
3. [การดึงข้อมูลและการจัดการ API](/guidelines/data-fetching) - เรียนรู้วิธีการดึงข้อมูลและการสร้าง API Routes`;

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
            <h1 className="text-3xl font-bold mb-2">โครงสร้างโปรเจค Next.js</h1>
            <p className="text-text-secondary">แนวทางการจัดโครงสร้างโปรเจค Next.js ตามมาตรฐานองค์กร</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs mr-2">
              เริ่มต้น
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
      
      {/* เนื้อหาแนวทาง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={guidelineContent} />
        <CodeBlock code={basicStructureCode} language="plaintext" fileName="โครงสร้างโปรเจคพื้นฐาน" />
        <MarkdownContent content={advancedStructureContent} />
        <CodeBlock code={advancedStructureCode} language="plaintext" fileName="โครงสร้างโปรเจคขั้นสูง" />
        <MarkdownContent content={featureBasedContent} />
        <CodeBlock code={featureBasedCode} language="plaintext" fileName="โครงสร้างตาม Feature" />
        <MarkdownContent content={importManagementContent} />
        <CodeBlock code={importManagementCode} language="typescript" fileName="tsconfig.json และตัวอย่างการใช้งาน" />
        <MarkdownContent content={envVarsContent} />
        <CodeBlock code={envVarsCode} language="bash" fileName="Environment Variables" />
        <MarkdownContent content={constantsContent} />
        <CodeBlock code={constantsCode} language="typescript" fileName="Constants" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
