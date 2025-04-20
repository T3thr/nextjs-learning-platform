import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงแนวทางการเริ่มต้นใช้งาน Next.js
export default function GettingStartedGuideline() {
  // เนื้อหาแนวทางในรูปแบบ Markdown
  const guidelineContent = `# เริ่มต้นใช้งาน Next.js

Next.js เป็นเฟรมเวิร์ก React ที่มีประสิทธิภาพสูงสำหรับการพัฒนาเว็บแอปพลิเคชันแบบ Full-stack ในคู่มือนี้ เราจะแนะนำวิธีการเริ่มต้นใช้งาน Next.js ตามมาตรฐานองค์กรของเรา

## ข้อกำหนดเบื้องต้น

ก่อนที่จะเริ่มต้นใช้งาน Next.js คุณจำเป็นต้องมีสิ่งต่อไปนี้ติดตั้งในเครื่องของคุณ:

- **Node.js 18.17.0** หรือเวอร์ชันที่สูงกว่า
- **npm**, **yarn**, หรือ **bun** สำหรับการจัดการแพ็คเกจ (เราแนะนำให้ใช้ **bun** เนื่องจากมีประสิทธิภาพสูงและใช้พื้นที่น้อยกว่า)

คุณสามารถตรวจสอบเวอร์ชันของ Node.js ที่ติดตั้งในเครื่องของคุณได้โดยใช้คำสั่งต่อไปนี้ในเทอร์มินัล:`;

  // โค้ดตัวอย่างสำหรับการตรวจสอบเวอร์ชัน
  const checkVersionCode = `node -v
npm -v
# หรือ
yarn -v
# หรือ
bun -v`;

  // เนื้อหาเกี่ยวกับการสร้างโปรเจคใหม่
  const createProjectContent = `## การสร้างโปรเจค Next.js ใหม่

เราสามารถสร้างโปรเจค Next.js ใหม่ได้โดยใช้คำสั่ง \`create-next-app\` ซึ่งเป็นเครื่องมือที่ช่วยให้เราสามารถเริ่มต้นโปรเจค Next.js ได้อย่างรวดเร็ว โดยมีการตั้งค่าเริ่มต้นที่เหมาะสม

ตามมาตรฐานองค์กรของเรา เราจะใช้ TypeScript, Tailwind CSS, ESLint และ App Router ในทุกโปรเจค:`;

  // โค้ดตัวอย่างสำหรับการสร้างโปรเจคใหม่
  const createProjectCode = `# ใช้ npm
npx create-next-app@latest my-nextjs-app

# หรือใช้ yarn
yarn create next-app my-nextjs-app

# หรือใช้ bun (แนะนำ)
bun create next-app my-nextjs-app`;

  // เนื้อหาเกี่ยวกับการตั้งค่าโปรเจค
  const projectSetupContent = `เมื่อรันคำสั่งข้างต้น คุณจะได้รับชุดคำถามเพื่อตั้งค่าโปรเจค ให้ตอบตามนี้:

1. **Would you like to use TypeScript?** ✅ Yes
2. **Would you like to use ESLint?** ✅ Yes
3. **Would you like to use Tailwind CSS?** ✅ Yes
4. **Would you like to use \`src/\` directory?** ✅ Yes
5. **Would you like to use App Router? (recommended)** ✅ Yes
6. **Would you like to customize the default import alias?** ✅ Yes
7. **What import alias would you like configured?** \`@/*\`

## โครงสร้างโปรเจคเริ่มต้น

หลังจากสร้างโปรเจคแล้ว คุณจะได้โครงสร้างไฟล์ดังนี้:`;

  // โค้ดตัวอย่างสำหรับโครงสร้างโปรเจค
  const projectStructureCode = `my-nextjs-app/
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
    └── components/       # React Components`;

  // เนื้อหาเกี่ยวกับการรันโปรเจค
  const runProjectContent = `## การรันโปรเจค

หลังจากสร้างโปรเจคแล้ว คุณสามารถเข้าไปในโฟลเดอร์โปรเจคและรันเซิร์ฟเวอร์การพัฒนาได้ดังนี้:`;

  // โค้ดตัวอย่างสำหรับการรันโปรเจค
  const runProjectCode = `# เข้าไปในโฟลเดอร์โปรเจค
cd my-nextjs-app

# รันเซิร์ฟเวอร์การพัฒนา
# ใช้ npm
npm run dev

# หรือใช้ yarn
yarn dev

# หรือใช้ bun (แนะนำ)
bun dev`;

  // เนื้อหาเกี่ยวกับการติดตั้ง dependencies เพิ่มเติม
  const additionalDependenciesContent = `## การติดตั้ง Dependencies เพิ่มเติมตามมาตรฐานองค์กร

ตามมาตรฐานองค์กรของเรา เราจะใช้ไลบรารีเพิ่มเติมต่อไปนี้ในทุกโปรเจค:

1. **NextAuth.js** - สำหรับการยืนยันตัวตน
2. **Drizzle ORM** - สำหรับการเชื่อมต่อฐานข้อมูล
3. **Zod** - สำหรับการตรวจสอบข้อมูล
4. **React Hook Form** - สำหรับการจัดการฟอร์ม
5. **Lucide React** - สำหรับไอคอน
6. **clsx** และ **tailwind-merge** - สำหรับการจัดการ CSS classes

คุณสามารถติดตั้ง dependencies เหล่านี้ได้ดังนี้:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง dependencies เพิ่มเติม
  const additionalDependenciesCode = `# ใช้ npm
npm install next-auth@beta drizzle-orm @auth/drizzle-adapter
npm install zod react-hook-form @hookform/resolvers
npm install lucide-react clsx tailwind-merge

# หรือใช้ yarn
yarn add next-auth@beta drizzle-orm @auth/drizzle-adapter
yarn add zod react-hook-form @hookform/resolvers
yarn add lucide-react clsx tailwind-merge

# หรือใช้ bun (แนะนำ)
bun add next-auth@beta drizzle-orm @auth/drizzle-adapter
bun add zod react-hook-form @hookform/resolvers
bun add lucide-react clsx tailwind-merge

# ติดตั้ง dev dependencies สำหรับ Drizzle
# ใช้ npm
npm install -D drizzle-kit

# หรือใช้ yarn
yarn add -D drizzle-kit

# หรือใช้ bun (แนะนำ)
bun add -D drizzle-kit`;

  // เนื้อหาเกี่ยวกับการตั้งค่า Tailwind CSS
  const tailwindSetupContent = `## การตั้งค่า Tailwind CSS ตามมาตรฐานองค์กร

เราใช้ Tailwind CSS เป็นหลักในการพัฒนา UI ตามมาตรฐานองค์กรของเรา เราจะตั้งค่า Tailwind CSS ให้รองรับ Dark Mode และกำหนดธีมสีขององค์กร:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Tailwind CSS
  const tailwindSetupCode = `// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // เปิดใช้งาน Dark Mode แบบ class
  theme: {
    extend: {
      colors: {
        // กำหนดสีตามแบรนด์ขององค์กร
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
        // สีสำหรับ Dark Mode
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: 'hsl(var(--surface))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
      },
    },
  },
  plugins: [],
};

export default config;`;

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
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --surface: 223 47% 11%;
    --text-primary: 210 40% 98%;
    --text-secondary: 215 20.2% 65.1%;
  }
}

@layer base {
  body {
    @apply bg-background text-text-primary;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 rounded-md font-medium transition-colors;
  }
  
  .btn-primary {
    @apply bg-primary text-white hover:bg-primary-600;
  }
  
  .btn-outline {
    @apply border border-primary text-primary hover:bg-primary hover:text-white;
  }
  
  .badge {
    @apply px-2 py-1 rounded-full text-xs font-medium;
  }
}`;

  // เนื้อหาสรุป
  const summaryContent = `## ขั้นตอนต่อไป

หลังจากที่คุณได้เริ่มต้นโปรเจค Next.js ตามมาตรฐานองค์กรแล้ว คุณสามารถศึกษาแนวทางต่อไปนี้เพื่อพัฒนาแอปพลิเคชันต่อไป:

1. [โครงสร้างโปรเจค Next.js](/guidelines/project-structure) - เรียนรู้วิธีการจัดโครงสร้างโปรเจคให้เป็นระเบียบและขยายขนาดได้ง่าย
2. [การจัดการเส้นทางและการนำทาง](/guidelines/routing-navigation) - เรียนรู้วิธีการใช้งาน App Router ใน Next.js
3. [การจัดการ UI และ Styling](/guidelines/styling-ui) - เรียนรู้วิธีการใช้งาน Tailwind CSS และการสร้าง UI Components

หากคุณมีคำถามหรือต้องการความช่วยเหลือเพิ่มเติม สามารถติดต่อทีม Next.js ขององค์กรได้ที่ช่อง Slack #nextjs-support`;

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
            <h1 className="text-3xl font-bold mb-2">เริ่มต้นใช้งาน Next.js</h1>
            <p className="text-text-secondary">แนวทางการติดตั้งและเริ่มต้นโปรเจค Next.js สำหรับผู้เริ่มต้น</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs mr-2">
              เริ่มต้น
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              15 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาแนวทาง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={guidelineContent} />
        <CodeBlock code={checkVersionCode} language="bash" fileName="Terminal" />
        <MarkdownContent content={createProjectContent} />
        <CodeBlock code={createProjectCode} language="bash" fileName="Terminal" />
        <MarkdownContent content={projectSetupContent} />
        <CodeBlock code={projectStructureCode} language="plaintext" fileName="โครงสร้างโปรเจค" />
        <MarkdownContent content={runProjectContent} />
        <CodeBlock code={runProjectCode} language="bash" fileName="Terminal" />
        <MarkdownContent content={additionalDependenciesContent} />
        <CodeBlock code={additionalDependenciesCode} language="bash" fileName="Terminal" />
        <MarkdownContent content={tailwindSetupContent} />
        <CodeBlock code={tailwindSetupCode} language="typescript" fileName="tailwind.config.ts" />
        <CodeBlock code={cssVariablesCode} language="css" fileName="src/app/globals.css" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
