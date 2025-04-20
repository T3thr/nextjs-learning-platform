import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการยืนยันตัวตนด้วย NextAuth.js
export default function AuthenticationExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# การยืนยันตัวตนด้วย NextAuth.js

NextAuth.js เป็นไลบรารีที่ได้รับความนิยมสำหรับการจัดการการยืนยันตัวตนใน Next.js ในตัวอย่างนี้ เราจะแสดงวิธีการใช้งาน NextAuth.js ในแอปพลิเคชัน Next.js ที่ใช้ App Router

## ขั้นตอนการทำงาน

1. ติดตั้ง NextAuth.js
2. ตั้งค่า NextAuth.js
3. สร้าง Provider สำหรับการยืนยันตัวตน
4. สร้างหน้าเข้าสู่ระบบ
5. ป้องกันเส้นทางที่ต้องการการยืนยันตัวตน
6. ใช้งานข้อมูลผู้ใช้ในแอปพลิเคชัน`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง NextAuth.js
  const installationCode = `# ติดตั้ง NextAuth.js
npm install next-auth
# หรือ
bun add next-auth`;

  // เนื้อหาเกี่ยวกับการตั้งค่า NextAuth.js
  const setupContent = `## การตั้งค่า NextAuth.js

เราจะเริ่มต้นด้วยการสร้างไฟล์ route handler สำหรับ NextAuth.js:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า NextAuth.js
  const routeHandlerCode = `// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from './options';

// สร้าง handler สำหรับ NextAuth.js
// ฟังก์ชันนี้จะจัดการกับการร้องขอ API ทั้งหมดที่เกี่ยวข้องกับการยืนยันตัวตน
const handler = NextAuth(authOptions);

// ส่งออก handler สำหรับ GET และ POST requests
export { handler as GET, handler as POST };`;

  // เนื้อหาเกี่ยวกับการตั้งค่า Options
  const optionsContent = `จากนั้นเราจะสร้างไฟล์ options สำหรับ NextAuth.js:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Options
  const optionsCode = `// app/api/auth/[...nextauth]/options.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
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

  // เนื้อหาเกี่ยวกับการสร้าง Provider
  const providerContent = `## การสร้าง Provider

เราจะสร้าง Provider สำหรับการยืนยันตัวตนเพื่อให้สามารถเข้าถึงข้อมูลการยืนยันตัวตนได้ทั่วทั้งแอปพลิเคชัน:`;

  // โค้ดตัวอย่างสำหรับการสร้าง Provider
  const providerCode = `// components/providers/AuthProvider.tsx
"use client"

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// สร้าง AuthProvider component
// SessionProvider จะทำให้สามารถเข้าถึงข้อมูล session ได้ทั่วทั้งแอปพลิเคชัน
export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Provider ใน Layout
  const layoutContent = `จากนั้นเราจะใช้งาน Provider ใน Layout:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Provider ใน Layout
  const layoutCode = `// app/layout.tsx
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        {/* ห่อ children ด้วย AuthProvider เพื่อให้สามารถเข้าถึงข้อมูล session ได้ทั่วทั้งแอปพลิเคชัน */}
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}`;

  // เนื้อหาเกี่ยวกับการสร้างหน้าเข้าสู่ระบบ
  const signinPageContent = `## การสร้างหน้าเข้าสู่ระบบ

เราจะสร้างหน้าเข้าสู่ระบบที่รองรับทั้งการเข้าสู่ระบบด้วยอีเมลและรหัสผ่าน และการเข้าสู่ระบบด้วย OAuth providers:`;

  // โค้ดตัวอย่างสำหรับการสร้างหน้าเข้าสู่ระบบ
  const signinPageCode = `// app/auth/signin/page.tsx
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
      // เรียกใช้ฟังก์ชัน signIn จาก NextAuth.js
      const result = await signIn('credentials', {
        redirect: false, // ไม่ต้องการให้ redirect อัตโนมัติ
        email,
        password,
      });
      
      if (result?.error) {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      } else {
        // เมื่อเข้าสู่ระบบสำเร็จ ให้ไปที่หน้า dashboard
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

  // เนื้อหาเกี่ยวกับการป้องกันเส้นทางที่ต้องการการยืนยันตัวตน
  const protectedRoutesContent = `## การป้องกันเส้นทางที่ต้องการการยืนยันตัวตน

เราสามารถป้องกันเส้นทางที่ต้องการการยืนยันตัวตนได้หลายวิธี:

### 1. การใช้ Middleware`;

  // โค้ดตัวอย่างสำหรับการใช้ Middleware
  const middlewareCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware จะทำงานก่อนที่จะเข้าถึงเส้นทางที่ต้องการการยืนยันตัวตน
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

  // เนื้อหาเกี่ยวกับการใช้งาน useSession
  const useSessionContent = `### 2. การใช้ useSession ใน Client Components

เราสามารถใช้ \`useSession\` hook ใน Client Components เพื่อตรวจสอบการยืนยันตัวตน:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน useSession
  const useSessionCode = `// components/ProfileButton.tsx
"use client"

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function ProfileButton() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  
  // ถ้ากำลังโหลดข้อมูล
  if (status === 'loading') {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }
  
  // ถ้ายังไม่ได้เข้าสู่ระบบ
  if (status === 'unauthenticated') {
    return (
      <Link href="/auth/signin" className="btn btn-primary">
        เข้าสู่ระบบ
      </Link>
    );
  }
  
  // ถ้าเข้าสู่ระบบแล้ว
  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || 'ผู้ใช้'}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            {session.user.name?.charAt(0) || 'U'}
          </div>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b">
            <p className="font-bold">{session.user.name}</p>
            <p className="text-sm text-text-secondary">{session.user.email}</p>
          </div>
          <Link
            href="/profile"
            className="block px-4 py-2 hover:bg-surface-hover"
            onClick={() => setIsOpen(false)}
          >
            โปรไฟล์
          </Link>
          <Link
            href="/dashboard"
            className="block px-4 py-2 hover:bg-surface-hover"
            onClick={() => setIsOpen(false)}
          >
            แดชบอร์ด
          </Link>
          {session.user.role === 'admin' && (
            <Link
              href="/dashboard/admin"
              className="block px-4 py-2 hover:bg-surface-hover"
              onClick={() => setIsOpen(false)}
            >
              แดชบอร์ดผู้ดูแลระบบ
            </Link>
          )}
          <button
            className="block w-full text-left px-4 py-2 hover:bg-surface-hover text-red-500"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            ออกจากระบบ
          </button>
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน getServerSession
  const getServerSessionContent = `### 3. การใช้ getServerSession ใน Server Components

เราสามารถใช้ \`getServerSession\` ใน Server Components เพื่อตรวจสอบการยืนยันตัวตน:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน getServerSession
  const getServerSessionCode = `// app/dashboard/page.tsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function DashboardPage() {
  // ดึงข้อมูล session จาก server
  const session = await getServerSession(authOptions);
  
  // ถ้ายังไม่ได้เข้าสู่ระบบ
  if (!session) {
    redirect('/auth/signin');
  }
  
  // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">แดชบอร์ด</h1>
      
      <div className="bg-surface p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">ยินดีต้อนรับ, {session.user.name}!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2">สถานะการเรียน</h3>
            <p>คุณได้เรียนไปแล้ว 5 บทเรียน</p>
          </div>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2">แบบฝึกหัด</h3>
            <p>คุณได้ทำแบบฝึกหัดไปแล้ว 3 ข้อ</p>
          </div>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2">คะแนน</h3>
            <p>คุณมีคะแนนทั้งหมด 250 คะแนน</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน useSession ใน Client Components
  const clientComponentContent = `## การใช้งานข้อมูลผู้ใช้ใน Client Components

เราสามารถใช้ \`useSession\` hook เพื่อเข้าถึงข้อมูลผู้ใช้ใน Client Components:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน useSession ใน Client Components
  const clientComponentCode = `// components/UserProfile.tsx
"use client"

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function UserProfile() {
  const { data: session, status, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  
  // ถ้ากำลังโหลดข้อมูล
  if (status === 'loading') {
    return <div>กำลังโหลด...</div>;
  }
  
  // ถ้ายังไม่ได้เข้าสู่ระบบ
  if (status === 'unauthenticated') {
    return <div>กรุณาเข้าสู่ระบบเพื่อดูข้อมูลโปรไฟล์</div>;
  }
  
  // เริ่มการแก้ไขโปรไฟล์
  const handleEdit = () => {
    setName(session.user.name || '');
    setIsEditing(true);
  };
  
  // บันทึกการแก้ไขโปรไฟล์
  const handleSave = async () => {
    try {
      // ส่งข้อมูลไปยัง API
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      // อัปเดตข้อมูล session
      await update({
        ...session,
        user: {
          ...session.user,
          name,
        },
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์');
    }
  };
  
  // ยกเลิกการแก้ไขโปรไฟล์
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  // ถ้าเข้าสู่ระบบแล้ว
  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">โปรไฟล์ของคุณ</h2>
      
      <div className="flex items-center gap-4 mb-6">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || 'ผู้ใช้'}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
            {session.user.name?.charAt(0) || 'U'}
          </div>
        )}
        
        <div>
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full"
                placeholder="ชื่อของคุณ"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="btn btn-primary btn-sm"
                >
                  บันทึก
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-outline btn-sm"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="font-bold">{session.user.name}</p>
              <p className="text-text-secondary">{session.user.email}</p>
              <p className="text-sm text-primary">{session.user.role}</p>
              
              <button
                onClick={handleEdit}
                className="btn btn-outline btn-sm mt-2"
              >
                แก้ไขโปรไฟล์
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการใช้งาน NextAuth.js ในแอปพลิเคชัน Next.js ที่ใช้ App Router ดังนี้:

1. ติดตั้ง NextAuth.js
2. ตั้งค่า NextAuth.js ด้วยการสร้าง route handler และ options
3. สร้าง Provider สำหรับการยืนยันตัวตน
4. สร้างหน้าเข้าสู่ระบบที่รองรับทั้งการเข้าสู่ระบบด้วยอีเมลและรหัสผ่าน และการเข้าสู่ระบบด้วย OAuth providers
5. ป้องกันเส้นทางที่ต้องการการยืนยันตัวตนด้วย Middleware, useSession, และ getServerSession
6. ใช้งานข้อมูลผู้ใช้ในแอปพลิเคชันทั้งใน Client Components และ Server Components

NextAuth.js เป็นไลบรารีที่มีประสิทธิภาพและใช้งานง่ายสำหรับการจัดการการยืนยันตัวตนใน Next.js ซึ่งช่วยให้เราสามารถสร้างระบบการยืนยันตัวตนที่ปลอดภัยและมีประสิทธิภาพได้อย่างรวดเร็ว`;

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
            <h1 className="text-3xl font-bold mb-2">การยืนยันตัวตนด้วย NextAuth.js</h1>
            <p className="text-text-secondary">ตัวอย่างการใช้งาน NextAuth.js สำหรับการยืนยันตัวตนใน Next.js ด้วยหลากหลาย providers</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับกลาง
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
      
      {/* เนื้อหาตัวอย่าง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={exampleContent} />
        <CodeBlock code={installationCode} language="bash" fileName="การติดตั้ง NextAuth.js" />
        <MarkdownContent content={setupContent} />
        <CodeBlock code={routeHandlerCode} language="typescript" fileName="app/api/auth/[...nextauth]/route.ts" />
        <MarkdownContent content={optionsContent} />
        <CodeBlock code={optionsCode} language="typescript" fileName="app/api/auth/[...nextauth]/options.ts" />
        <MarkdownContent content={providerContent} />
        <CodeBlock code={providerCode} language="typescript" fileName="components/providers/AuthProvider.tsx" />
        <MarkdownContent content={layoutContent} />
        <CodeBlock code={layoutCode} language="typescript" fileName="app/layout.tsx" />
        <MarkdownContent content={signinPageContent} />
        <CodeBlock code={signinPageCode} language="typescript" fileName="app/auth/signin/page.tsx" />
        <MarkdownContent content={protectedRoutesContent} />
        <CodeBlock code={middlewareCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={useSessionContent} />
        <CodeBlock code={useSessionCode} language="typescript" fileName="components/ProfileButton.tsx" />
        <MarkdownContent content={getServerSessionContent} />
        <CodeBlock code={getServerSessionCode} language="typescript" fileName="app/dashboard/page.tsx" />
        <MarkdownContent content={clientComponentContent} />
        <CodeBlock code={clientComponentCode} language="typescript" fileName="components/UserProfile.tsx" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
