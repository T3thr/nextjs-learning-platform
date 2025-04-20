'use client'
import React from 'react';
import CodeEditor from '@/components/CodeEditor';
import Link from 'next/link';

// หน้าแสดงรายละเอียดแบบฝึกหัดสร้างโครงสร้างโปรเจคระดับองค์กร
export default function EnterpriseArchitectureExercisePage() {
  // ข้อมูลแบบฝึกหัด
  const exercise = {
    id: '5',
    title: 'สร้างโครงสร้างโปรเจคระดับองค์กร',
    description: 'ฝึกการจัดโครงสร้างโปรเจค Next.js สำหรับแอปพลิเคชันขนาดใหญ่',
    difficulty: 'advanced',
    points: 30,
    lessonId: '4',
    lessonTitle: 'สถาปัตยกรรมระดับองค์กร',
    instructions: `# สร้างโครงสร้างโปรเจคระดับองค์กร

ในแบบฝึกหัดนี้ คุณจะได้ฝึกการจัดโครงสร้างโปรเจค Next.js สำหรับแอปพลิเคชันขนาดใหญ่ระดับองค์กร โดยใช้ความรู้ที่ได้เรียนมาจากบทเรียน "สถาปัตยกรรมระดับองค์กร"

## ขั้นตอน

1. ออกแบบโครงสร้างโฟลเดอร์ที่เหมาะสมสำหรับแอปพลิเคชันขนาดใหญ่
2. สร้างโมดูลแยกตามฟีเจอร์ (Feature-based Modules)
3. ออกแบบเลเยอร์การเข้าถึงข้อมูล (Data Access Layer)
4. กำหนดการจัดการสถานะแบบรวมศูนย์ (Centralized State Management)
5. สร้างระบบการตรวจสอบสิทธิ์และการอนุญาต (Authentication & Authorization)

## เกณฑ์การให้คะแนน

- ออกแบบโครงสร้างโฟลเดอร์ที่เหมาะสม (6 คะแนน)
- สร้างโมดูลแยกตามฟีเจอร์ได้อย่างเหมาะสม (6 คะแนน)
- ออกแบบเลเยอร์การเข้าถึงข้อมูลที่มีประสิทธิภาพ (6 คะแนน)
- กำหนดการจัดการสถานะแบบรวมศูนย์ได้อย่างเหมาะสม (6 คะแนน)
- สร้างระบบการตรวจสอบสิทธิ์และการอนุญาตที่ปลอดภัย (6 คะแนน)`,
    starterCode: `// โครงสร้างโปรเจค Next.js สำหรับแอปพลิเคชันขนาดใหญ่
// เขียนโค้ดตัวอย่างที่แสดงโครงสร้างโปรเจคและความสัมพันธ์ระหว่างโมดูลต่างๆ

// ตัวอย่างโครงสร้างโฟลเดอร์
/*
app/
  (routes)
  api/
  layout.tsx
  page.tsx
components/
modules/
lib/
*/

// เขียนโค้ดตัวอย่างสำหรับการเข้าถึงข้อมูลและการจัดการสถานะ`,
    solutionCode: `// โครงสร้างโปรเจค Next.js สำหรับแอปพลิเคชันขนาดใหญ่

// โครงสร้างโฟลเดอร์
/*
app/
  (auth)/                  # กลุ่มเส้นทางสำหรับการยืนยันตัวตน
    login/
    register/
    forgot-password/
  (dashboard)/             # กลุ่มเส้นทางสำหรับแดชบอร์ด
    layout.tsx
    page.tsx
    settings/
    analytics/
  api/                     # API Routes
    auth/
      [...nextauth]/
    users/
    products/
  layout.tsx
  page.tsx
  
modules/                   # โมดูลแยกตามฟีเจอร์
  users/
    components/            # คอมโพเนนต์เฉพาะของโมดูล
    hooks/                 # ฮุคเฉพาะของโมดูล
    services/              # เซอร์วิสเฉพาะของโมดูล
    types.ts               # ไทป์เฉพาะของโมดูล
    utils.ts               # ยูทิลิตี้เฉพาะของโมดูล
  products/
    components/
    hooks/
    services/
    types.ts
    utils.ts
  orders/
    components/
    hooks/
    services/
    types.ts
    utils.ts
    
components/                # คอมโพเนนต์ที่ใช้ร่วมกัน
  ui/                      # UI คอมโพเนนต์พื้นฐาน
    Button.tsx
    Input.tsx
    Modal.tsx
  layout/                  # คอมโพเนนต์เลย์เอาท์
    Header.tsx
    Sidebar.tsx
    Footer.tsx
  forms/                   # คอมโพเนนต์ฟอร์ม
    Form.tsx
    FormField.tsx
    
lib/                       # โค้ดที่ใช้ร่วมกัน
  api/                     # เลเยอร์การเข้าถึงข้อมูล
    client.ts              # API Client
    endpoints.ts           # API Endpoints
  auth/                    # การยืนยันตัวตนและการอนุญาต
    auth.ts
    permissions.ts
  db/                      # การเชื่อมต่อฐานข้อมูล
    index.ts
    schema/
  state/                   # การจัดการสถานะแบบรวมศูนย์
    store.ts
    slices/
  utils/                   # ยูทิลิตี้ทั่วไป
    formatting.ts
    validation.ts
    
types/                     # ไทป์ที่ใช้ร่วมกัน
  index.ts
  api.ts
  auth.ts
  
config/                    # การตั้งค่าต่างๆ
  env.ts
  constants.ts
  routes.ts
*/

// ตัวอย่างเลเยอร์การเข้าถึงข้อมูล (Data Access Layer)
// lib/api/client.ts
export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // เพิ่ม Token สำหรับการยืนยันตัวตน
  setAuthToken(token: string) {
    this.headers['Authorization'] = \`Bearer \${token}\`;
  }

  // ลบ Token เมื่อออกจากระบบ
  clearAuthToken() {
    delete this.headers['Authorization'];
  }

  // เมธอดสำหรับการเรียก API
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(\`\${this.baseUrl}\${endpoint}\`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.headers,
    });
    
    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }
    
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }
    
    return response.json();
  }

  // เพิ่มเมธอดอื่นๆ ตามต้องการ (PUT, DELETE, ฯลฯ)
}

// ตัวอย่างการจัดการสถานะแบบรวมศูนย์ด้วย Context API
// lib/state/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { ApiClient } from '@/lib/api/client';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiClient = new ApiClient('/api');

  // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อโหลดแอป
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          apiClient.setAuthToken(token);
          const userData = await apiClient.get<User>('/auth/me');
          setUser(userData);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // ฟังก์ชันเข้าสู่ระบบ
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await apiClient.post<{ user: User; token: string }>('/auth/login', {
        email,
        password,
      });
      
      localStorage.setItem('auth_token', response.token);
      apiClient.setAuthToken(response.token);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชันออกจากระบบ
  const logout = () => {
    localStorage.removeItem('auth_token');
    apiClient.clearAuthToken();
    setUser(null);
  };

  // ฟังก์ชันลงทะเบียน
  const register = async (userData: any) => {
    setIsLoading(true);
    
    try {
      const response = await apiClient.post<{ user: User; token: string }>('/auth/register', userData);
      
      localStorage.setItem('auth_token', response.token);
      apiClient.setAuthToken(response.token);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// ฮุคสำหรับใช้งาน AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// ตัวอย่างการใช้งานในคอมโพเนนต์
// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/state/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // แสดงข้อความแจ้งเตือน
    }
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6">เข้าสู่ระบบ</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">อีเมล</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">รหัสผ่าน</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );
}`,
    testCases: `// ตรวจสอบว่ามีการออกแบบโครงสร้างโฟลเดอร์
expect(code).toContain("app/");
expect(code).toContain("modules/");
expect(code).toContain("components/");
expect(code).toContain("lib/");

// ตรวจสอบว่ามีการสร้างเลเยอร์การเข้าถึงข้อมูล
expect(code).toContain("ApiClient");

// ตรวจสอบว่ามีการจัดการสถานะแบบรวมศูนย์
expect(code).toContain("AuthContext");`,
  };

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของแบบฝึกหัด */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/exercises" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการแบบฝึกหัด
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{exercise.title}</h1>
            <p className="text-text-secondary">{exercise.description}</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs mr-2">
              ระดับสูง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
              </svg>
              {exercise.points} คะแนน
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* คำอธิบายแบบฝึกหัด */}
        <div className="lg:col-span-1">
          <div className="bg-surface p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">คำอธิบาย</h2>
            <div className="prose dark:prose-invert">
              <p>{exercise.description}</p>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">บทเรียนที่เกี่ยวข้อง</h3>
              <Link href={`/lessons/${exercise.lessonId}`} className="text-primary hover:underline">
                {exercise.lessonTitle}
              </Link>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">คำแนะนำ</h3>
              <div className="text-sm">
                {exercise.instructions.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(2)}</h2>;
                  } else if (line.startsWith('## ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-3 mb-2">{line.substring(3)}</h3>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4 list-disc">{line.substring(2)}</li>;
                  } else if (line.match(/^\d+\. /)) {
                    return <li key={index} className="ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
                  } else if (line.trim() === '') {
                    return <div key={index} className="h-2"></div>;
                  } else {
                    return <p key={index} className="mb-2">{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* โค้ดเอดิเตอร์ */}
        <div className="lg:col-span-2">
          <CodeEditor
            starterCode={exercise.starterCode}
            solutionCode={exercise.solutionCode}
            testCases={exercise.testCases}
            onSubmit={(code, isCorrect) => {
              if (isCorrect) {
                // ในโปรเจคจริงควรบันทึกความคืบหน้าลงฐานข้อมูล
                console.log('แบบฝึกหัดถูกต้อง!');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
