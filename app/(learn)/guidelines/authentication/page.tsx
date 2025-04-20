import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงแนวทางการยืนยันตัวตนด้วย NextAuth.js
export default function AuthenticationGuideline() {
  // เนื้อหาแนวทางในรูปแบบ Markdown
  const guidelineContent = `# การยืนยันตัวตนด้วย NextAuth.js

การยืนยันตัวตน (Authentication) เป็นส่วนสำคัญในการพัฒนาแอปพลิเคชัน Next.js ที่มีความปลอดภัย NextAuth.js เป็นไลบรารีที่ได้รับความนิยมสำหรับการจัดการการยืนยันตัวตนใน Next.js ในคู่มือนี้ เราจะแนะนำวิธีการใช้งาน NextAuth.js ตามมาตรฐานองค์กรของเรา

## การติดตั้ง NextAuth.js

เริ่มต้นด้วยการติดตั้ง NextAuth.js:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง NextAuth.js
  const installationCode = `# ติดตั้ง NextAuth.js
npm install next-auth
# หรือ
bun add next-auth`;

  // เนื้อหาเกี่ยวกับการตั้งค่า NextAuth.js
  const setupContent = `## การตั้งค่า NextAuth.js

ใน Next.js 13+ ที่ใช้ App Router เราจะตั้งค่า NextAuth.js ดังนี้:

1. สร้างไฟล์ route handler สำหรับ NextAuth.js:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า NextAuth.js
  const setupCode = `// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from './options';

// สร้าง handler สำหรับ NextAuth.js
const handler = NextAuth(authOptions);

// ส่งออก handler สำหรับ GET และ POST requests
export { handler as GET, handler as POST };`;

  // เนื้อหาเกี่ยวกับการตั้งค่า Options
  const optionsContent = `2. สร้างไฟล์ options สำหรับ NextAuth.js:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Options
  const optionsCode = `// app/api/auth/[...nextauth]/options.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { db } from '@/lib/db';
import { users } from '@/backend/db/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcrypt';

// กำหนดค่า options สำหรับ NextAuth.js
export const authOptions: NextAuthOptions = {
  // กำหนด providers สำหรับการยืนยันตัวตน
  providers: [
    // Provider สำหรับการยืนยันตัวตนด้วยอีเมลและรหัสผ่าน
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'อีเมล', type: 'email' },
        password: { label: 'รหัสผ่าน', type: 'password' },
      },
      async authorize(credentials) {
        // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // ค้นหาผู้ใช้จากอีเมล
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email))
            .limit(1);

          // ถ้าไม่พบผู้ใช้
          if (user.length === 0) {
            return null;
          }

          // ตรวจสอบรหัสผ่าน
          const passwordMatch = await compare(
            credentials.password,
            user[0].password
          );

          // ถ้ารหัสผ่านไม่ถูกต้อง
          if (!passwordMatch) {
            return null;
          }

          // ส่งข้อมูลผู้ใช้กลับไป (ไม่รวมรหัสผ่าน)
          return {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            role: user[0].role,
            image: user[0].image,
          };
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
    
    // Provider สำหรับการยืนยันตัวตนด้วย Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    
    // Provider สำหรับการยืนยันตัวตนด้วย GitHub
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  
  // กำหนดหน้าที่เกี่ยวข้องกับการยืนยันตัวตน
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/auth/register',
  },
  
  // กำหนดการจัดการ session
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 วัน
  },
  
  // กำหนดการจัดการ callbacks
  callbacks: {
    // เพิ่มข้อมูลเพิ่มเติมใน token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    
    // เพิ่มข้อมูลเพิ่มเติมใน session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
  
  // กำหนดการตั้งค่าความปลอดภัย
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};`;

  // เนื้อหาเกี่ยวกับการตั้งค่า Environment Variables
  const envVarsContent = `3. ตั้งค่า Environment Variables:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Environment Variables
  const envVarsCode = `# .env.local
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# Google Provider
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub Provider
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret`;

  // เนื้อหาเกี่ยวกับการสร้าง AuthContext
  const authContextContent = `## การสร้าง AuthContext

เราจะสร้าง AuthContext เพื่อให้สามารถเข้าถึงข้อมูลการยืนยันตัวตนได้ทั่วทั้งแอปพลิเคชัน:`;

  // โค้ดตัวอย่างสำหรับการสร้าง AuthContext
  const authContextCode = `// context/AuthContext.tsx
"use client"

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// สร้าง AuthContext Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// app/layout.tsx
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน useSession
  const useSessionContent = `## การใช้งาน useSession

เราสามารถใช้ \`useSession\` hook เพื่อเข้าถึงข้อมูล session ปัจจุบัน:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน useSession
  const useSessionCode = `// components/UserProfile.tsx
"use client"

import { useSession } from 'next-auth/react';

export default function UserProfile() {
  // ใช้ useSession hook เพื่อเข้าถึงข้อมูล session
  const { data: session, status } = useSession();
  
  // ถ้ากำลังโหลดข้อมูล
  if (status === 'loading') {
    return <div>กำลังโหลด...</div>;
  }
  
  // ถ้ายังไม่ได้เข้าสู่ระบบ
  if (status === 'unauthenticated') {
    return <div>กรุณาเข้าสู่ระบบเพื่อดูข้อมูลโปรไฟล์</div>;
  }
  
  // ถ้าเข้าสู่ระบบแล้ว
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-2">โปรไฟล์ของคุณ</h2>
      <div className="flex items-center gap-4 mb-4">
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name || 'ผู้ใช้'}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div>
          <p className="font-bold">{session.user.name}</p>
          <p className="text-text-secondary">{session.user.email}</p>
          <p className="text-sm text-primary">{session.user.role}</p>
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการสร้างหน้าเข้าสู่ระบบ
  const signInPageContent = `## การสร้างหน้าเข้าสู่ระบบ

เราจะสร้างหน้าเข้าสู่ระบบที่รองรับทั้งการเข้าสู่ระบบด้วยอีเมลและรหัสผ่าน และการเข้าสู่ระบบด้วย OAuth providers:`;

  // โค้ดตัวอย่างสำหรับการสร้างหน้าเข้าสู่ระบบ
  const signInPageCode = `// app/auth/signin/page.tsx
"use client"

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // ฟังก์ชันสำหรับการเข้าสู่ระบบด้วยอีเมลและรหัสผ่าน
  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      if (result?.error) {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // ฟังก์ชันสำหรับการเข้าสู่ระบบด้วย Google
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };
  
  // ฟังก์ชันสำหรับการเข้าสู่ระบบด้วย GitHub
  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };
  
  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="bg-surface p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleCredentialsSignIn} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block mb-1">อีเมล</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1">รหัสผ่าน</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface text-text-secondary">
              หรือเข้าสู่ระบบด้วย
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Google
          </button>
          
          <button
            type="button"
            onClick={handleGitHubSignIn}
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            GitHub
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-text-secondary">
            ยังไม่มีบัญชี?{' '}
            <Link href="/auth/register" className="text-primary hover:underline">
              ลงทะเบียน
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการสร้างหน้าลงทะเบียน
  const registerPageContent = `## การสร้างหน้าลงทะเบียน

เราจะสร้างหน้าลงทะเบียนสำหรับผู้ใช้ใหม่:`;

  // โค้ดตัวอย่างสำหรับการสร้างหน้าลงทะเบียน
  const registerPageCode = `// app/auth/register/page.tsx
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ตรวจสอบข้อมูล
    if (!name || !email || !password || !confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    
    if (password.length < 8) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // ส่งข้อมูลไปยัง API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'การลงทะเบียนล้มเหลว');
      }
      
      // เมื่อลงทะเบียนสำเร็จ ให้ไปที่หน้าเข้าสู่ระบบ
      router.push('/auth/signin?registered=true');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('เกิดข้อผิดพลาดในการลงทะเบียน');
      }
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="bg-surface p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ลงทะเบียน</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-4 mb-6">
          <div>
            <label htmlFor="name" className="block mb-1">ชื่อ</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full"
              placeholder="ชื่อของคุณ"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-1">อีเมล</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1">รหัสผ่าน</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              placeholder="••••••••"
              required
            />
            <p className="text-xs text-text-secondary mt-1">
              รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร
            </p>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block mb-1">ยืนยันรหัสผ่าน</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input w-full"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
          </button>
        </form>
        
        <div className="text-center">
          <p className="text-text-secondary">
            มีบัญชีอยู่แล้ว?{' '}
            <Link href="/auth/signin" className="text-primary hover:underline">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการสร้าง API Route สำหรับการลงทะเบียน
  const registerApiContent = `## การสร้าง API Route สำหรับการลงทะเบียน

เราจะสร้าง API Route สำหรับการลงทะเบียนผู้ใช้ใหม่:`;

  // โค้ดตัวอย่างสำหรับการสร้าง API Route สำหรับการลงทะเบียน
  const registerApiCode = `// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/backend/db/schema';
import { hash } from 'bcrypt';
import { z } from 'zod';

// สร้าง schema สำหรับตรวจสอบข้อมูล
const registerSchema = z.object({
  name: z.string().min(1, 'ชื่อต้องไม่ว่างเปล่า'),
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(8, 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร'),
});

export async function POST(request: Request) {
  try {
    // รับข้อมูลจาก request body
    const body = await request.json();
    
    // ตรวจสอบข้อมูลด้วย zod
    const validationResult = registerSchema.safeParse(body);
    
    // ถ้าข้อมูลไม่ถูกต้อง
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    // ข้อมูลที่ผ่านการตรวจสอบแล้ว
    const { name, email, password } = validationResult.data;
    
    // ตรวจสอบว่าอีเมลซ้ำหรือไม่
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'อีเมลนี้ถูกใช้งานแล้ว' },
        { status: 400 }
      );
    }
    
    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await hash(password, 10);
    
    // เพิ่มผู้ใช้ใหม่ในฐานข้อมูล
    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    }).returning();
    
    // ส่งข้อมูลผู้ใช้ใหม่กลับไป (ไม่รวมรหัสผ่าน)
    const { password: _, ...userWithoutPassword } = newUser[0];
    
    return NextResponse.json(
      { user: userWithoutPassword, message: 'ลงทะเบียนสำเร็จ' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการลงทะเบียน' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาเกี่ยวกับการป้องกันเส้นทางที่ต้องการการยืนยันตัวตน
  const protectedRoutesContent = `## การป้องกันเส้นทางที่ต้องการการยืนยันตัวตน

เราสามารถป้องกันเส้นทางที่ต้องการการยืนยันตัวตนได้หลายวิธี:

### 1. การใช้ Middleware

เราสามารถใช้ Middleware เพื่อตรวจสอบการยืนยันตัวตนก่อนที่จะเข้าถึงเส้นทางที่ต้องการการยืนยันตัวตน:`;

  // โค้ดตัวอย่างสำหรับการใช้ Middleware
  const middlewareCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // ตรวจสอบ token จาก NextAuth.js
  const token = await getToken({ req: request });
  
  // ถ้าเข้าถึงเส้นทางที่ต้องการการยืนยันตัวตนแต่ไม่มี token
  if (
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/profile')
  ) {
    if (!token) {
      // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบพร้อมกับ URL ที่ต้องการกลับไป
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    
    // ตรวจสอบสิทธิ์สำหรับ admin routes
    if (
      request.nextUrl.pathname.startsWith('/dashboard/admin') &&
      token.role !== 'admin'
    ) {
      // เปลี่ยนเส้นทางไปยังหน้า dashboard ทั่วไป
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // ถ้ามี token แล้วพยายามเข้าถึงหน้าเข้าสู่ระบบหรือลงทะเบียน
  if (
    (request.nextUrl.pathname.startsWith('/auth/signin') ||
     request.nextUrl.pathname.startsWith('/auth/register')) &&
    token
  ) {
    // เปลี่ยนเส้นทางไปยังแดชบอร์ด
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/auth/signin',
    '/auth/register',
  ],
};`;

  // เนื้อหาเกี่ยวกับการใช้ Client Component
  const clientComponentContent = `### 2. การใช้ Client Component

เราสามารถใช้ \`useSession\` hook ใน Client Component เพื่อตรวจสอบการยืนยันตัวตน:`;

  // โค้ดตัวอย่างสำหรับการใช้ Client Component
  const clientComponentCode = `// components/ProtectedRoute.tsx
"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // ถ้ากำลังโหลดข้อมูล ไม่ต้องทำอะไร
    if (status === 'loading') return;
    
    // ถ้ายังไม่ได้เข้าสู่ระบบ
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }
    
    // ถ้าต้องการสิทธิ์ admin แต่ผู้ใช้ไม่ใช่ admin
    if (requireAdmin && session?.user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [status, session, router, requireAdmin]);
  
  // ถ้ากำลังโหลดข้อมูล
  if (status === 'loading') {
    return <div>กำลังโหลด...</div>;
  }
  
  // ถ้ายังไม่ได้เข้าสู่ระบบ
  if (status === 'unauthenticated') {
    return null;
  }
  
  // ถ้าต้องการสิทธิ์ admin แต่ผู้ใช้ไม่ใช่ admin
  if (requireAdmin && session?.user?.role !== 'admin') {
    return null;
  }
  
  // ถ้าผ่านการตรวจสอบทั้งหมด
  return <>{children}</>;
}

// การใช้งาน
// app/dashboard/admin/page.tsx
"use client"

import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminDashboard() {
  return (
    <ProtectedRoute requireAdmin>
      <div>
        <h1>แดชบอร์ดสำหรับผู้ดูแลระบบ</h1>
        {/* เนื้อหาสำหรับผู้ดูแลระบบ */}
      </div>
    </ProtectedRoute>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้ Server Component
  const serverComponentContent = `### 3. การใช้ Server Component

เราสามารถใช้ \`getServerSession\` ใน Server Component เพื่อตรวจสอบการยืนยันตัวตน:`;

  // โค้ดตัวอย่างสำหรับการใช้ Server Component
  const serverComponentCode = `// app/dashboard/page.tsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  // ดึงข้อมูล session จาก server
  const session = await getServerSession(authOptions);
  
  // ถ้ายังไม่ได้เข้าสู่ระบบ
  if (!session) {
    redirect('/auth/signin');
  }
  
  return (
    <div>
      <h1>แดชบอร์ด</h1>
      <p>ยินดีต้อนรับ, {session.user.name}!</p>
      {/* เนื้อหาแดชบอร์ด */}
    </div>
  );
}

// app/dashboard/admin/page.tsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function AdminDashboardPage() {
  // ดึงข้อมูล session จาก server
  const session = await getServerSession(authOptions);
  
  // ถ้ายังไม่ได้เข้าสู่ระบบ
  if (!session) {
    redirect('/auth/signin');
  }
  
  // ถ้าผู้ใช้ไม่ใช่ admin
  if (session.user.role !== 'admin') {
    redirect('/dashboard');
  }
  
  return (
    <div>
      <h1>แดชบอร์ดสำหรับผู้ดูแลระบบ</h1>
      {/* เนื้อหาสำหรับผู้ดูแลระบบ */}
    </div>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## แนวทางปฏิบัติที่ดีในการยืนยันตัวตนด้วย NextAuth.js

1. **ใช้ NextAuth.js สำหรับการยืนยันตัวตน** - NextAuth.js เป็นไลบรารีที่มีประสิทธิภาพและใช้งานง่ายสำหรับการยืนยันตัวตนใน Next.js
2. **รองรับหลาย Providers** - รองรับทั้งการยืนยันตัวตนด้วยอีเมลและรหัสผ่าน และการยืนยันตัวตนด้วย OAuth providers
3. **ใช้ JWT สำหรับการจัดการ Session** - ใช้ JWT เพื่อจัดการ session ซึ่งมีประสิทธิภาพและขยายขนาดได้ดี
4. **ป้องกันเส้นทางที่ต้องการการยืนยันตัวตน** - ใช้ Middleware, Client Component, หรือ Server Component เพื่อป้องกันเส้นทางที่ต้องการการยืนยันตัวตน
5. **จัดการสิทธิ์ผู้ใช้** - ใช้ role-based access control เพื่อจัดการสิทธิ์ผู้ใช้
6. **ตรวจสอบข้อมูลอย่างเข้มงวด** - ใช้ zod เพื่อตรวจสอบข้อมูลที่รับเข้ามา
7. **เข้ารหัสรหัสผ่าน** - ใช้ bcrypt เพื่อเข้ารหัสรหัสผ่าน

## ขั้นตอนต่อไป

หลังจากที่คุณได้เรียนรู้เกี่ยวกับการยืนยันตัวตนด้วย NextAuth.js แล้ว คุณสามารถศึกษาแนวทางต่อไปนี้:

1. [การเชื่อมต่อฐานข้อมูลด้วย Drizzle ORM](/guidelines/database-integration) - เรียนรู้วิธีการใช้งาน Drizzle ORM สำหรับการเชื่อมต่อฐานข้อมูล
2. [การ Deploy แอปพลิเคชัน Next.js](/guidelines/deployment) - เรียนรู้วิธีการ Deploy แอปพลิเคชัน Next.js ไปยัง Production`;

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
            <h1 className="text-3xl font-bold mb-2">การยืนยันตัวตนด้วย NextAuth.js</h1>
            <p className="text-text-secondary">แนวทางการใช้งาน NextAuth.js สำหรับการยืนยันตัวตนใน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              40 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาแนวทาง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={guidelineContent} />
        <CodeBlock code={installationCode} language="bash" fileName="การติดตั้ง NextAuth.js" />
        <MarkdownContent content={setupContent} />
        <CodeBlock code={setupCode} language="typescript" fileName="app/api/auth/[...nextauth]/route.ts" />
        <MarkdownContent content={optionsContent} />
        <CodeBlock code={optionsCode} language="typescript" fileName="app/api/auth/[...nextauth]/options.ts" />
        <MarkdownContent content={envVarsContent} />
        <CodeBlock code={envVarsCode} language="bash" fileName=".env.local" />
        <MarkdownContent content={authContextContent} />
        <CodeBlock code={authContextCode} language="typescript" fileName="context/AuthContext.tsx" />
        <MarkdownContent content={useSessionContent} />
        <CodeBlock code={useSessionCode} language="typescript" fileName="components/UserProfile.tsx" />
        <MarkdownContent content={signInPageContent} />
        <CodeBlock code={signInPageCode} language="typescript" fileName="app/auth/signin/page.tsx" />
        <MarkdownContent content={registerPageContent} />
        <CodeBlock code={registerPageCode} language="typescript" fileName="app/auth/register/page.tsx" />
        <MarkdownContent content={registerApiContent} />
        <CodeBlock code={registerApiCode} language="typescript" fileName="app/api/auth/register/route.ts" />
        <MarkdownContent content={protectedRoutesContent} />
        <CodeBlock code={middlewareCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={clientComponentContent} />
        <CodeBlock code={clientComponentCode} language="typescript" fileName="components/ProtectedRoute.tsx" />
        <MarkdownContent content={serverComponentContent} />
        <CodeBlock code={serverComponentCode} language="typescript" fileName="Server Components" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
