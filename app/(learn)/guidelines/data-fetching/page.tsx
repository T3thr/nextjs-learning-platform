import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงแนวทางการดึงข้อมูลและการจัดการ API ใน Next.js
export default function DataFetchingGuideline() {
  // เนื้อหาแนวทางในรูปแบบ Markdown
  const guidelineContent = `# การดึงข้อมูลและการจัดการ API

การดึงข้อมูล (Data Fetching) และการจัดการ API เป็นส่วนสำคัญในการพัฒนาแอปพลิเคชัน Next.js ที่มีประสิทธิภาพ ใน Next.js 13+ มีวิธีการดึงข้อมูลใหม่ที่ใช้ประโยชน์จาก React Server Components ในคู่มือนี้ เราจะแนะนำวิธีการดึงข้อมูลและการสร้าง API Routes ใน Next.js ตามมาตรฐานองค์กรของเรา

## การดึงข้อมูลใน Server Components

React Server Components (RSC) เป็นคุณสมบัติใหม่ใน Next.js 13+ ที่ช่วยให้เราสามารถดึงข้อมูลได้โดยตรงในคอมโพเนนต์โดยไม่ต้องใช้ hooks เช่น \`useEffect\` หรือ \`useState\`:`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลใน Server Components
  const serverComponentsCode = `// app/users/page.tsx
// Server Component (ค่าเริ่มต้น)
async function getUsers() {
  // ดึงข้อมูลโดยตรงจาก server
  const res = await fetch('https://api.example.com/users');
  
  // ตรวจสอบสถานะการตอบกลับ
  if (!res.ok) {
    // สร้าง error ที่จะถูกจัดการโดย error.tsx ที่ใกล้ที่สุด
    throw new Error('Failed to fetch users');
  }
  
  return res.json();
}

export default async function UsersPage() {
  // ดึงข้อมูลโดยตรงในคอมโพเนนต์
  const users = await getUsers();
  
  return (
    <div>
      <h1>ผู้ใช้ทั้งหมด</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลแบบขนาน
  const parallelFetchingContent = `## การดึงข้อมูลแบบขนาน

เราสามารถดึงข้อมูลหลายรายการพร้อมกันเพื่อปรับปรุงประสิทธิภาพ:`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลแบบขนาน
  const parallelFetchingCode = `// app/dashboard/page.tsx
async function getUser(userId) {
  const res = await fetch(\`https://api.example.com/users/\${userId}\`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

async function getProjects(userId) {
  const res = await fetch(\`https://api.example.com/users/\${userId}/projects\`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

async function getNotifications(userId) {
  const res = await fetch(\`https://api.example.com/users/\${userId}/notifications\`);
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

export default async function DashboardPage({ params }) {
  const userId = '123'; // สมมติว่าได้จาก params หรือ session
  
  // ดึงข้อมูลแบบขนาน
  const [user, projects, notifications] = await Promise.all([
    getUser(userId),
    getProjects(userId),
    getNotifications(userId),
  ]);
  
  return (
    <div>
      <h1>แดชบอร์ดของ {user.name}</h1>
      
      <h2>โปรเจคของคุณ</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      
      <h2>การแจ้งเตือน</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลใน Client Components
  const clientComponentsContent = `## การดึงข้อมูลใน Client Components

ในบางกรณี เราอาจต้องการดึงข้อมูลในฝั่ง Client เช่น เมื่อต้องการดึงข้อมูลหลังจากการกระทำของผู้ใช้:`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลใน Client Components
  const clientComponentsCode = `// app/components/SearchForm.tsx
"use client"

import { useState } from 'react';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
      
      if (!res.ok) {
        throw new Error('การค้นหาล้มเหลว');
      }
      
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหา..."
            className="input flex-1"
          />
          <button type="submit" className="btn btn-primary">
            ค้นหา
          </button>
        </div>
      </form>
      
      {loading && <p>กำลังค้นหา...</p>}
      
      {error && <p className="text-red-500">{error}</p>}
      
      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">ผลการค้นหา</h2>
          <ul className="space-y-2">
            {results.map((result) => (
              <li key={result.id} className="p-2 border rounded">
                <h3 className="font-bold">{result.title}</h3>
                <p>{result.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {!loading && !error && results.length === 0 && query.trim() && (
        <p>ไม่พบผลลัพธ์สำหรับ "{query}"</p>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้ SWR
  const swrContent = `## การใช้ SWR สำหรับการดึงข้อมูลในฝั่ง Client

SWR เป็นไลบรารีสำหรับการดึงข้อมูลที่พัฒนาโดยทีม Next.js ซึ่งมีคุณสมบัติที่ดีเช่น การแคชข้อมูล, การโหลดซ้ำอัตโนมัติ, และการจัดการข้อผิดพลาด:`;

  // โค้ดตัวอย่างสำหรับการใช้ SWR
  const swrCode = `// ติดตั้ง SWR
// npm install swr
// หรือ
// bun add swr

// app/components/UserProfile.tsx
"use client"

import useSWR from 'swr';

// ฟังก์ชันสำหรับดึงข้อมูล
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function UserProfile({ userId }) {
  // ใช้ SWR สำหรับการดึงข้อมูล
  const { data, error, isLoading } = useSWR(
    \`/api/users/\${userId}\`,
    fetcher
  );
  
  if (isLoading) return <div>กำลังโหลด...</div>;
  if (error) return <div>เกิดข้อผิดพลาด: {error.message}</div>;
  if (!data) return <div>ไม่พบข้อมูลผู้ใช้</div>;
  
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-2">{data.name}</h2>
      <p className="text-text-secondary mb-2">{data.email}</p>
      <div className="flex items-center gap-2">
        <span className="badge bg-primary text-white">
          {data.role}
        </span>
        <span className="text-sm text-text-secondary">
          สมาชิกตั้งแต่: {new Date(data.createdAt).toLocaleDateString('th-TH')}
        </span>
      </div>
    </div>
  );
}

// การใช้งาน SWR กับข้อมูลที่ต้องการอัปเดตบ่อย
// app/components/Notifications.tsx
"use client"

import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Notifications() {
  // ดึงข้อมูลและรีเฟรชทุก 5 วินาที
  const { data, error, isLoading } = useSWR(
    '/api/notifications',
    fetcher,
    { refreshInterval: 5000 } // รีเฟรชทุก 5 วินาที
  );
  
  if (isLoading) return <div>กำลังโหลด...</div>;
  if (error) return <div>เกิดข้อผิดพลาด: {error.message}</div>;
  if (!data) return <div>ไม่มีการแจ้งเตือน</div>;
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">การแจ้งเตือน</h2>
      <ul className="space-y-2">
        {data.map((notification) => (
          <li key={notification.id} className="p-2 border rounded">
            <p>{notification.message}</p>
            <span className="text-sm text-text-secondary">
              {new Date(notification.createdAt).toLocaleTimeString('th-TH')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้ React Query
  const reactQueryContent = `## การใช้ React Query สำหรับการจัดการสถานะเซิร์ฟเวอร์

React Query (TanStack Query) เป็นอีกหนึ่งไลบรารีที่ได้รับความนิยมสำหรับการจัดการสถานะเซิร์ฟเวอร์ ซึ่งมีคุณสมบัติที่ครอบคลุมมากกว่า SWR:`;

  // โค้ดตัวอย่างสำหรับการใช้ React Query
  const reactQueryCode = `// ติดตั้ง React Query
// npm install @tanstack/react-query
// หรือ
// bun add @tanstack/react-query

// app/providers.tsx
"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 นาที
        refetchOnWindowFocus: false,
      },
    },
  }));
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// app/layout.tsx
import Providers from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// app/components/ProductList.tsx
"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ฟังก์ชันสำหรับดึงข้อมูล
const fetchProducts = async () => {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

// ฟังก์ชันสำหรับเพิ่มสินค้า
const addProduct = async (newProduct) => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });
  
  if (!res.ok) throw new Error('Failed to add product');
  return res.json();
};

export default function ProductList() {
  const queryClient = useQueryClient();
  
  // ใช้ useQuery สำหรับการดึงข้อมูล
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  // ใช้ useMutation สำหรับการเพิ่มข้อมูล
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // เมื่อเพิ่มสินค้าสำเร็จ ให้ดึงข้อมูลใหม่
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  
  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      name: formData.get('name'),
      price: Number(formData.get('price')),
    };
    
    mutation.mutate(newProduct);
    e.target.reset();
  };
  
  if (isLoading) return <div>กำลังโหลด...</div>;
  if (error) return <div>เกิดข้อผิดพลาด: {error.message}</div>;
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">รายการสินค้า</h2>
      
      <form onSubmit={handleAddProduct} className="mb-4 p-4 border rounded">
        <h3 className="font-bold mb-2">เพิ่มสินค้าใหม่</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block mb-1">ชื่อสินค้า</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="input w-full"
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1">ราคา</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              className="input w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'กำลังเพิ่ม...' : 'เพิ่มสินค้า'}
        </button>
      </form>
      
      {mutation.isError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          เกิดข้อผิดพลาด: {mutation.error.message}
        </div>
      )}
      
      {products.length === 0 ? (
        <p>ไม่มีสินค้า</p>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="p-2 border rounded flex justify-between items-center">
              <span>{product.name}</span>
              <span className="font-bold">{product.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการสร้าง API Routes
  const apiRoutesContent = `## การสร้าง API Routes

Next.js มีระบบ API Routes ที่ช่วยให้เราสามารถสร้าง API endpoints ได้ง่ายๆ ใน App Router เราใช้ Route Handlers:`;

  // โค้ดตัวอย่างสำหรับการสร้าง API Routes
  const apiRoutesCode = `// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/backend/db/schema';

// GET /api/users
export async function GET(request: Request) {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    const allUsers = await db.select().from(users);
    
    // ส่งข้อมูลกลับไปในรูปแบบ JSON
    return NextResponse.json(allUsers);
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(request: Request) {
  try {
    // รับข้อมูลจาก request body
    const body = await request.json();
    
    // ตรวจสอบข้อมูล
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // เพิ่มผู้ใช้ใหม่ในฐานข้อมูล
    const newUser = await db.insert(users).values({
      name: body.name,
      email: body.email,
      role: body.role || 'user',
    }).returning();
    
    // ส่งข้อมูลผู้ใช้ใหม่กลับไป
    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/backend/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/users/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // ดึงข้อมูลผู้ใช้จาก ID
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    // ถ้าไม่พบผู้ใช้
    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // ส่งข้อมูลผู้ใช้กลับไป
    return NextResponse.json(user[0]);
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error(\`Error fetching user \${params.id}:\`, error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const body = await request.json();
    
    // อัปเดตข้อมูลผู้ใช้
    const updatedUser = await db.update(users)
      .set({
        name: body.name,
        email: body.email,
        role: body.role,
      })
      .where(eq(users.id, userId))
      .returning();
    
    // ถ้าไม่พบผู้ใช้
    if (updatedUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // ส่งข้อมูลผู้ใช้ที่อัปเดตแล้วกลับไป
    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error(\`Error updating user \${params.id}:\`, error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // ลบผู้ใช้
    const deletedUser = await db.delete(users)
      .where(eq(users.id, userId))
      .returning();
    
    // ถ้าไม่พบผู้ใช้
    if (deletedUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // ส่งข้อความสำเร็จกลับไป
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error(\`Error deleting user \${params.id}:\`, error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาเกี่ยวกับการใช้ zod สำหรับการตรวจสอบข้อมูล
  const zodValidationContent = `## การใช้ zod สำหรับการตรวจสอบข้อมูล

zod เป็นไลบรารีสำหรับการตรวจสอบข้อมูลที่มีประสิทธิภาพและใช้งานง่าย:`;

  // โค้ดตัวอย่างสำหรับการใช้ zod
  const zodValidationCode = `// ติดตั้ง zod
// npm install zod
// หรือ
// bun add zod

// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { products } from '@/backend/db/schema';

// สร้าง schema สำหรับตรวจสอบข้อมูล
const productSchema = z.object({
  name: z.string().min(1, 'ชื่อสินค้าต้องไม่ว่างเปล่า'),
  description: z.string().optional(),
  price: z.number().positive('ราคาต้องเป็นจำนวนบวก'),
  stock: z.number().int().nonnegative('จำนวนสินค้าต้องไม่ติดลบ'),
  categoryId: z.string().uuid('รหัสหมวดหมู่ไม่ถูกต้อง'),
});

// POST /api/products
export async function POST(request: Request) {
  try {
    // รับข้อมูลจาก request body
    const body = await request.json();
    
    // ตรวจสอบข้อมูลด้วย zod
    const validationResult = productSchema.safeParse(body);
    
    // ถ้าข้อมูลไม่ถูกต้อง
    if (!validationResult.success) {
      return NextResponse.json(
        { errors: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // ข้อมูลที่ผ่านการตรวจสอบแล้ว
    const validatedData = validationResult.data;
    
    // เพิ่มสินค้าใหม่ในฐานข้อมูล
    const newProduct = await db.insert(products).values({
      name: validatedData.name,
      description: validatedData.description || null,
      price: validatedData.price,
      stock: validatedData.stock,
      categoryId: validatedData.categoryId,
    }).returning();
    
    // ส่งข้อมูลสินค้าใหม่กลับไป
    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาเกี่ยวกับการใช้ Middleware สำหรับการตรวจสอบการยืนยันตัวตน
  const authMiddlewareContent = `## การใช้ Middleware สำหรับการตรวจสอบการยืนยันตัวตน

เราสามารถใช้ Middleware เพื่อตรวจสอบการยืนยันตัวตนก่อนที่จะเข้าถึง API Routes:`;

  // โค้ดตัวอย่างสำหรับการใช้ Middleware
  const authMiddlewareCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // ตรวจสอบว่าเป็น API route หรือไม่
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // ยกเว้น routes ที่ไม่ต้องการการยืนยันตัวตน
    if (
      request.nextUrl.pathname.startsWith('/api/auth') ||
      request.nextUrl.pathname === '/api/public'
    ) {
      return NextResponse.next();
    }
    
    // ตรวจสอบ token จาก NextAuth.js
    const token = await getToken({ req: request });
    
    // ถ้าไม่มี token
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // ตรวจสอบสิทธิ์สำหรับ admin routes
    if (
      request.nextUrl.pathname.startsWith('/api/admin') &&
      token.role !== 'admin'
    ) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
  }
  
  return NextResponse.next();
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ['/api/:path*'],
};`;

  // เนื้อหาเกี่ยวกับการใช้ API Routes กับ External APIs
  const externalApisContent = `## การใช้ API Routes กับ External APIs

เราสามารถใช้ API Routes เป็นตัวกลางในการติดต่อกับ External APIs เพื่อซ่อน API keys และเพิ่มความปลอดภัย:`;

  // โค้ดตัวอย่างสำหรับการใช้ API Routes กับ External APIs
  const externalApisCode = `// app/api/weather/route.ts
import { NextResponse } from 'next/server';

// API key จาก environment variable
const API_KEY = process.env.WEATHER_API_KEY;

export async function GET(request: Request) {
  try {
    // รับพารามิเตอร์จาก URL
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    
    // ตรวจสอบว่ามีพารามิเตอร์ city หรือไม่
    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }
    
    // เรียกใช้ External API
    const response = await fetch(
      \`https://api.weatherapi.com/v1/current.json?key=\${API_KEY}&q=\${city}&aqi=no\`
    );
    
    // ตรวจสอบสถานะการตอบกลับ
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || 'Failed to fetch weather data' },
        { status: response.status }
      );
    }
    
    // รับข้อมูลจาก External API
    const data = await response.json();
    
    // ปรับโครงสร้างข้อมูลก่อนส่งกลับ
    const weatherData = {
      location: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      updatedAt: data.current.last_updated,
    };
    
    // ส่งข้อมูลกลับไป
    return NextResponse.json(weatherData);
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาสรุป
  const summaryContent = `## แนวทางปฏิบัติที่ดีในการดึงข้อมูลและการจัดการ API

1. **ใช้ Server Components สำหรับการดึงข้อมูลเริ่มต้น** - ใช้ Server Components เพื่อดึงข้อมูลที่จำเป็นสำหรับการแสดงผลครั้งแรก
2. **ดึงข้อมูลแบบขนาน** - ใช้ Promise.all เพื่อดึงข้อมูลหลายรายการพร้อมกัน
3. **ใช้ SWR หรือ React Query สำหรับการดึงข้อมูลในฝั่ง Client** - ใช้ไลบรารีเหล่านี้เพื่อจัดการการแคชข้อมูลและการโหลดซ้ำ
4. **สร้าง API Routes ที่มีโครงสร้างดี** - แบ่ง API Routes ตามทรัพยากรและใช้ HTTP methods อย่างเหมาะสม
5. **ตรวจสอบข้อมูลด้วย zod** - ใช้ zod เพื่อตรวจสอบข้อมูลที่รับเข้ามา
6. **ใช้ Middleware สำหรับการตรวจสอบการยืนยันตัวตน** - ใช้ Middleware เพื่อตรวจสอบการยืนยันตัวตนก่อนที่จะเข้าถึง API Routes
7. **ซ่อน API keys ด้วย API Routes** - ใช้ API Routes เป็นตัวกลางในการติดต่อกับ External APIs

## ขั้นตอนต่อไป

หลังจากที่คุณได้เรียนรู้เกี่ยวกับการดึงข้อมูลและการจัดการ API ใน Next.js แล้ว คุณสามารถศึกษาแนวทางต่อไปนี้:

1. [การยืนยันตัวตนด้วย NextAuth.js](/guidelines/authentication) - เรียนรู้วิธีการใช้งาน NextAuth.js สำหรับการยืนยันตัวตน
2. [การเชื่อมต่อฐานข้อมูลด้วย Drizzle ORM](/guidelines/database-integration) - เรียนรู้วิธีการใช้งาน Drizzle ORM สำหรับการเชื่อมต่อฐานข้อมูล
3. [การ Deploy แอปพลิเคชัน Next.js](/guidelines/deployment) - เรียนรู้วิธีการ Deploy แอปพลิเคชัน Next.js ไปยัง Production`;

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
            <h1 className="text-3xl font-bold mb-2">การดึงข้อมูลและการจัดการ API</h1>
            <p className="text-text-secondary">แนวทางการดึงข้อมูลและการสร้าง API Routes ใน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              35 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาแนวทาง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={guidelineContent} />
        <CodeBlock code={serverComponentsCode} language="typescript" fileName="Server Components" />
        <MarkdownContent content={parallelFetchingContent} />
        <CodeBlock code={parallelFetchingCode} language="typescript" fileName="การดึงข้อมูลแบบขนาน" />
        <MarkdownContent content={clientComponentsContent} />
        <CodeBlock code={clientComponentsCode} language="typescript" fileName="Client Components" />
        <MarkdownContent content={swrContent} />
        <CodeBlock code={swrCode} language="typescript" fileName="การใช้ SWR" />
        <MarkdownContent content={reactQueryContent} />
        <CodeBlock code={reactQueryCode} language="typescript" fileName="การใช้ React Query" />
        <MarkdownContent content={apiRoutesContent} />
        <CodeBlock code={apiRoutesCode} language="typescript" fileName="API Routes" />
        <MarkdownContent content={zodValidationContent} />
        <CodeBlock code={zodValidationCode} language="typescript" fileName="การใช้ zod" />
        <MarkdownContent content={authMiddlewareContent} />
        <CodeBlock code={authMiddlewareCode} language="typescript" fileName="Middleware" />
        <MarkdownContent content={externalApisContent} />
        <CodeBlock code={externalApisCode} language="typescript" fileName="External APIs" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
