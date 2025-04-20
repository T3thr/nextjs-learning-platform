import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการใช้งาน API Routes ใน Next.js
export default function ApiRoutesExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# API Routes ใน Next.js

API Routes เป็นฟีเจอร์ที่ทรงพลังของ Next.js ที่ช่วยให้คุณสามารถสร้าง API endpoints ภายในแอปพลิเคชัน Next.js ของคุณได้โดยไม่ต้องตั้งค่าเซิร์ฟเวอร์แยกต่างหาก ในตัวอย่างนี้ เราจะแสดงวิธีการใช้งาน API Routes ใน Next.js และการประยุกต์ใช้งานในสถานการณ์ต่างๆ

## ประโยชน์ของ API Routes

1. **ไม่ต้องตั้งค่าเซิร์ฟเวอร์แยกต่างหาก**: สร้าง API endpoints ภายในแอปพลิเคชัน Next.js ได้เลย
2. **ใช้โค้ด TypeScript เดียวกัน**: แชร์โค้ด TypeScript และประเภทข้อมูลระหว่าง frontend และ backend
3. **ความปลอดภัย**: API Routes ทำงานบนเซิร์ฟเวอร์ ช่วยให้คุณสามารถเก็บข้อมูลที่ละเอียดอ่อนไว้ได้อย่างปลอดภัย
4. **Serverless Functions**: API Routes ถูกคอมไพล์เป็น Serverless Functions โดยอัตโนมัติ
5. **ลดความซับซ้อน**: ลดความซับซ้อนในการพัฒนาและการ deploy`;

  // เนื้อหาเกี่ยวกับพื้นฐานของ API Routes
  const apiRoutesBasicsContent = `## พื้นฐานของ API Routes

ใน Next.js 13+ ที่ใช้ App Router, API Routes จะถูกสร้างในโฟลเดอร์ \`app/api\` โดยใช้ไฟล์ \`route.ts\` (หรือ \`route.js\`):`;

  // โค้ดตัวอย่างสำหรับ API Route พื้นฐาน
  const basicApiRouteCode = `// app/api/hello/route.ts
import { NextResponse } from 'next/server';

// ฟังก์ชันสำหรับจัดการคำขอ GET
export async function GET() {
  // สร้างข้อมูลที่จะส่งกลับ
  const data = {
    message: 'สวัสดี, นี่คือ API Route ของ Next.js!',
    timestamp: new Date().toISOString(),
  };
  
  // ส่งข้อมูลกลับในรูปแบบ JSON
  return NextResponse.json(data);
}`;

  // โค้ดตัวอย่างสำหรับการเรียกใช้ API Route
  const fetchApiRouteCode = `// components/HelloApi.tsx
'use client';

import { useState, useEffect } from 'react';

// ประเภทข้อมูลสำหรับการตอบกลับจาก API
interface HelloResponse {
  message: string;
  timestamp: string;
}

// คอมโพเนนต์สำหรับเรียกใช้ API Route
export default function HelloApi() {
  // สร้าง state สำหรับเก็บข้อมูลและสถานะการโหลด
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ใช้ useEffect เพื่อเรียกใช้ API เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    // ฟังก์ชันสำหรับเรียกใช้ API
    const fetchData = async () => {
      try {
        // เรียกใช้ API Route
        const response = await fetch('/api/hello');
        
        // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการเรียกใช้ API');
        }
        
        // แปลงข้อมูลการตอบกลับเป็น JSON
        const result = await response.json();
        
        // บันทึกข้อมูลลงใน state
        setData(result);
      } catch (err) {
        // บันทึกข้อผิดพลาดลงใน state
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
      } finally {
        // ตั้งค่าสถานะการโหลดเป็น false
        setLoading(false);
      }
    };

    // เรียกใช้ฟังก์ชัน fetchData
    fetchData();
  }, []);

  // แสดงข้อความกำลังโหลด
  if (loading) {
    return <div className="p-4 bg-surface rounded-lg">กำลังโหลดข้อมูล...</div>;
  }

  // แสดงข้อความข้อผิดพลาด
  if (error) {
    return <div className="p-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg">{error}</div>;
  }

  // แสดงข้อมูลที่ได้รับจาก API
  return (
    <div className="p-4 bg-surface rounded-lg">
      <h3 className="text-xl font-bold mb-2">การตอบกลับจาก API:</h3>
      <p className="mb-2">{data?.message}</p>
      <p className="text-text-secondary">เวลา: {new Date(data?.timestamp || '').toLocaleString()}</p>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการจัดการคำขอ HTTP ต่างๆ
  const httpMethodsContent = `## การจัดการคำขอ HTTP ต่างๆ

API Routes ใน Next.js สามารถจัดการคำขอ HTTP ต่างๆ ได้ เช่น GET, POST, PUT, DELETE:`;

  // โค้ดตัวอย่างสำหรับการจัดการคำขอ HTTP ต่างๆ
  const httpMethodsCode = `// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ข้อมูลผู้ใช้จำลอง (ในสถานการณ์จริงควรใช้ฐานข้อมูล)
let users = [
  { id: 1, name: 'สมชาย ใจดี', email: 'somchai@example.com' },
  { id: 2, name: 'สมหญิง รักเรียน', email: 'somying@example.com' },
];

// ฟังก์ชันสำหรับจัดการคำขอ GET (ดึงข้อมูลผู้ใช้ทั้งหมด)
export async function GET() {
  return NextResponse.json(users);
}

// ฟังก์ชันสำหรับจัดการคำขอ POST (เพิ่มผู้ใช้ใหม่)
export async function POST(request: NextRequest) {
  try {
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const body = await request.json();
    
    // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
    if (!body.name || !body.email) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ต้องระบุชื่อและอีเมล' },
        { status: 400 }
      );
    }
    
    // สร้างผู้ใช้ใหม่
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
      name: body.name,
      email: body.email,
    };
    
    // เพิ่มผู้ใช้ใหม่ลงในรายการ
    users.push(newUser);
    
    // ส่งข้อมูลผู้ใช้ใหม่กลับ
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'ข้อมูลไม่ถูกต้อง' },
      { status: 400 }
    );
  }
}

// ฟังก์ชันสำหรับจัดการคำขอ PUT (อัปเดตผู้ใช้)
export async function PUT(request: NextRequest) {
  try {
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const body = await request.json();
    
    // ตรวจสอบว่ามี ID หรือไม่
    if (!body.id) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ต้องระบุ ID' },
        { status: 400 }
      );
    }
    
    // หาผู้ใช้ที่ต้องการอัปเดต
    const userIndex = users.findIndex(user => user.id === body.id);
    
    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (userIndex === -1) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      );
    }
    
    // อัปเดตข้อมูลผู้ใช้
    users[userIndex] = {
      ...users[userIndex],
      name: body.name || users[userIndex].name,
      email: body.email || users[userIndex].email,
    };
    
    // ส่งข้อมูลผู้ใช้ที่อัปเดตแล้วกลับ
    return NextResponse.json(users[userIndex]);
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'ข้อมูลไม่ถูกต้อง' },
      { status: 400 }
    );
  }
}

// ฟังก์ชันสำหรับจัดการคำขอ DELETE (ลบผู้ใช้)
export async function DELETE(request: NextRequest) {
  try {
    // ดึง URL จากคำขอ
    const url = new URL(request.url);
    // ดึงพารามิเตอร์ id จาก URL
    const id = parseInt(url.searchParams.get('id') || '');
    
    // ตรวจสอบว่ามี ID หรือไม่
    if (!id) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ต้องระบุ ID' },
        { status: 400 }
      );
    }
    
    // หาผู้ใช้ที่ต้องการลบ
    const userIndex = users.findIndex(user => user.id === id);
    
    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (userIndex === -1) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      );
    }
    
    // ลบผู้ใช้ออกจากรายการ
    users = users.filter(user => user.id !== id);
    
    // ส่งข้อความสำเร็จกลับ
    return NextResponse.json(
      { message: 'ลบผู้ใช้สำเร็จ' },
      { status: 200 }
    );
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'ข้อมูลไม่ถูกต้อง' },
      { status: 400 }
    );
  }
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน API Route ที่มีหลาย HTTP Methods
  const userApiComponentCode = `// components/UserManager.tsx
'use client';

import { useState, useEffect } from 'react';

// ประเภทข้อมูลสำหรับผู้ใช้
interface User {
  id: number;
  name: string;
  email: string;
}

// คอมโพเนนต์สำหรับจัดการผู้ใช้
export default function UserManager() {
  // สร้าง state สำหรับเก็บข้อมูลและสถานะต่างๆ
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<User, 'id'>>({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // ใช้ useEffect เพื่อเรียกใช้ API เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    fetchUsers();
  }, []);

  // ฟังก์ชันสำหรับเรียกใช้ API เพื่อดึงข้อมูลผู้ใช้
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการเรียกใช้ API');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสำหรับเพิ่มผู้ใช้ใหม่
  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'เกิดข้อผิดพลาดในการเพิ่มผู้ใช้');
      }
      
      // รีเซ็ตฟอร์ม
      setFormData({ name: '', email: '' });
      
      // ดึงข้อมูลผู้ใช้ใหม่
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    }
  };

  // ฟังก์ชันสำหรับอัปเดตผู้ใช้
  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingUser) return;
    
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingUser.id,
          name: formData.name,
          email: formData.email,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้');
      }
      
      // รีเซ็ตฟอร์มและสถานะการแก้ไข
      setFormData({ name: '', email: '' });
      setEditingUser(null);
      
      // ดึงข้อมูลผู้ใช้ใหม่
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    }
  };

  // ฟังก์ชันสำหรับลบผู้ใช้
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(\`/api/users?id=\${id}\`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'เกิดข้อผิดพลาดในการลบผู้ใช้');
      }
      
      // ดึงข้อมูลผู้ใช้ใหม่
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    }
  };

  // ฟังก์ชันสำหรับเริ่มการแก้ไขผู้ใช้
  const startEditing = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
  };

  // ฟังก์ชันสำหรับยกเลิกการแก้ไข
  const cancelEditing = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '' });
  };

  // ฟังก์ชันสำหรับอัปเดตข้อมูลฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // แสดงข้อความกำลังโหลด
  if (loading && users.length === 0) {
    return <div className="p-4 bg-surface rounded-lg">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="space-y-6">
      {/* แสดงข้อความข้อผิดพลาด */}
      {error && (
        <div className="p-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg">
          {error}
          <button
            className="ml-2 text-red-600 dark:text-red-400 underline"
            onClick={() => setError(null)}
          >
            ปิด
          </button>
        </div>
      )}

      {/* ฟอร์มสำหรับเพิ่มหรือแก้ไขผู้ใช้ */}
      <div className="bg-surface p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          {editingUser ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
        </h3>
        
        <form onSubmit={editingUser ? updateUser : addUser} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">
              ชื่อ
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-1">
              อีเมล
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-white hover:opacity-90 transition-opacity"
            >
              {editingUser ? 'อัปเดต' : 'เพิ่ม'}
            </button>
            
            {editingUser && (
              <button
                type="button"
                onClick={cancelEditing}
                className="px-4 py-2 rounded-md bg-surface-secondary hover:opacity-90 transition-opacity"
              >
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      </div>

      {/* รายการผู้ใช้ */}
      <div className="bg-surface p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">รายการผู้ใช้</h3>
        
        {users.length === 0 ? (
          <p>ไม่มีผู้ใช้</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-secondary">
                  <th className="py-2 text-left">ID</th>
                  <th className="py-2 text-left">ชื่อ</th>
                  <th className="py-2 text-left">อีเมล</th>
                  <th className="py-2 text-right">การกระทำ</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-surface-secondary">
                    <td className="py-2">{user.id}</td>
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => startEditing(user)}
                        className="text-blue-600 dark:text-blue-400 hover:underline mr-2"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 dark:text-red-400 hover:underline"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Dynamic API Routes
  const dynamicApiRoutesContent = `## Dynamic API Routes

Dynamic API Routes ช่วยให้คุณสามารถสร้าง API endpoints ที่มีพารามิเตอร์ได้:`;

  // โค้ดตัวอย่างสำหรับ Dynamic API Route
  const dynamicApiRouteCode = `// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ข้อมูลผู้ใช้จำลอง (ในสถานการณ์จริงควรใช้ฐานข้อมูล)
const users = [
  { id: 1, name: 'สมชาย ใจดี', email: 'somchai@example.com' },
  { id: 2, name: 'สมหญิง รักเรียน', email: 'somying@example.com' },
];

// ฟังก์ชันสำหรับจัดการคำขอ GET (ดึงข้อมูลผู้ใช้ตาม ID)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // แปลง ID จากสตริงเป็นตัวเลข
  const id = parseInt(params.id);
  
  // หาผู้ใช้ตาม ID
  const user = users.find(user => user.id === id);
  
  // ถ้าไม่พบผู้ใช้
  if (!user) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'ไม่พบผู้ใช้' },
      { status: 404 }
    );
  }
  
  // ส่งข้อมูลผู้ใช้กลับ
  return NextResponse.json(user);
}

// ฟังก์ชันสำหรับจัดการคำขอ PUT (อัปเดตผู้ใช้ตาม ID)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // แปลง ID จากสตริงเป็นตัวเลข
    const id = parseInt(params.id);
    
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const body = await request.json();
    
    // หาผู้ใช้ตาม ID
    const userIndex = users.findIndex(user => user.id === id);
    
    // ถ้าไม่พบผู้ใช้
    if (userIndex === -1) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      );
    }
    
    // อัปเดตข้อมูลผู้ใช้
    users[userIndex] = {
      ...users[userIndex],
      name: body.name || users[userIndex].name,
      email: body.email || users[userIndex].email,
    };
    
    // ส่งข้อมูลผู้ใช้ที่อัปเดตแล้วกลับ
    return NextResponse.json(users[userIndex]);
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'ข้อมูลไม่ถูกต้อง' },
      { status: 400 }
    );
  }
}

// ฟังก์ชันสำหรับจัดการคำขอ DELETE (ลบผู้ใช้ตาม ID)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // แปลง ID จากสตริงเป็นตัวเลข
  const id = parseInt(params.id);
  
  // หาผู้ใช้ตาม ID
  const userIndex = users.findIndex(user => user.id === id);
  
  // ถ้าไม่พบผู้ใช้
  if (userIndex === -1) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'ไม่พบผู้ใช้' },
      { status: 404 }
    );
  }
  
  // ลบผู้ใช้ออกจากรายการ
  users.splice(userIndex, 1);
  
  // ส่งข้อความสำเร็จกลับ
  return NextResponse.json(
    { message: 'ลบผู้ใช้สำเร็จ' },
    { status: 200 }
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน API Routes กับฐานข้อมูล
  const apiWithDatabaseContent = `## การใช้งาน API Routes กับฐานข้อมูล

ในสถานการณ์จริง คุณจะต้องเชื่อมต่อกับฐานข้อมูล ในตัวอย่างนี้ เราจะใช้ Drizzle ORM เพื่อเชื่อมต่อกับฐานข้อมูล SQLite:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Drizzle ORM
  const drizzleSetupCode = `// backend/db/index.ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// สร้างการเชื่อมต่อกับฐานข้อมูล SQLite
const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });

// backend/db/schema/users.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// กำหนดโครงสร้างตาราง users
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});`;

  // โค้ดตัวอย่างสำหรับ API Route ที่ใช้ Drizzle ORM
  const apiWithDrizzleCode = `// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/db';
import { users } from '@/backend/db/schema/users';
import { eq } from 'drizzle-orm';

// ฟังก์ชันสำหรับจัดการคำขอ GET (ดึงข้อมูลผู้ใช้ทั้งหมด)
export async function GET() {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    const allUsers = await db.select().from(users);
    
    // ส่งข้อมูลผู้ใช้กลับ
    return NextResponse.json(allUsers);
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' },
      { status: 500 }
    );
  }
}

// ฟังก์ชันสำหรับจัดการคำขอ POST (เพิ่มผู้ใช้ใหม่)
export async function POST(request: NextRequest) {
  try {
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const body = await request.json();
    
    // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
    if (!body.name || !body.email) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ต้องระบุชื่อและอีเมล' },
        { status: 400 }
      );
    }
    
    // เพิ่มผู้ใช้ใหม่ลงในฐานข้อมูล
    const newUser = await db.insert(users).values({
      name: body.name,
      email: body.email,
    }).returning();
    
    // ส่งข้อมูลผู้ใช้ใหม่กลับ
    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    // ตรวจสอบว่าเป็นข้อผิดพลาดเกี่ยวกับอีเมลซ้ำหรือไม่
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed: users.email')) {
      return NextResponse.json(
        { error: 'อีเมลนี้ถูกใช้งานแล้ว' },
        { status: 400 }
      );
    }
    
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการเพิ่มผู้ใช้' },
      { status: 500 }
    );
  }
}

// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/db';
import { users } from '@/backend/db/schema/users';
import { eq } from 'drizzle-orm';

// ฟังก์ชันสำหรับจัดการคำขอ GET (ดึงข้อมูลผู้ใช้ตาม ID)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // แปลง ID จากสตริงเป็นตัวเลข
    const id = parseInt(params.id);
    
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    
    // ถ้าไม่พบผู้ใช้
    if (user.length === 0) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      );
    }
    
    // ส่งข้อมูลผู้ใช้กลับ
    return NextResponse.json(user[0]);
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' },
      { status: 500 }
    );
  }
}

// ฟังก์ชันสำหรับจัดการคำขอ PUT (อัปเดตผู้ใช้ตาม ID)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // แปลง ID จากสตริงเป็นตัวเลข
    const id = parseInt(params.id);
    
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const body = await request.json();
    
    // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
    if (!body.name && !body.email) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ต้องระบุชื่อหรืออีเมล' },
        { status: 400 }
      );
    }
    
    // สร้างข้อมูลที่จะอัปเดต
    const updateData: { name?: string; email?: string } = {};
    if (body.name) updateData.name = body.name;
    if (body.email) updateData.email = body.email;
    
    // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
    const updatedUser = await db.update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    
    // ถ้าไม่พบผู้ใช้
    if (updatedUser.length === 0) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      );
    }
    
    // ส่งข้อมูลผู้ใช้ที่อัปเดตแล้วกลับ
    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    // ตรวจสอบว่าเป็นข้อผิดพลาดเกี่ยวกับอีเมลซ้ำหรือไม่
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed: users.email')) {
      return NextResponse.json(
        { error: 'อีเมลนี้ถูกใช้งานแล้ว' },
        { status: 400 }
      );
    }
    
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้' },
      { status: 500 }
    );
  }
}

// ฟังก์ชันสำหรับจัดการคำขอ DELETE (ลบผู้ใช้ตาม ID)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // แปลง ID จากสตริงเป็นตัวเลข
    const id = parseInt(params.id);
    
    // ลบผู้ใช้จากฐานข้อมูล
    const deletedUser = await db.delete(users)
      .where(eq(users.id, id))
      .returning();
    
    // ถ้าไม่พบผู้ใช้
    if (deletedUser.length === 0) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      );
    }
    
    // ส่งข้อความสำเร็จกลับ
    return NextResponse.json(
      { message: 'ลบผู้ใช้สำเร็จ' },
      { status: 200 }
    );
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการลบผู้ใช้' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน API Routes กับ External API
  const apiWithExternalApiContent = `## การใช้งาน API Routes กับ External API

API Routes สามารถใช้เป็นตัวกลางในการเรียกใช้ External API ได้ ซึ่งช่วยให้คุณสามารถซ่อน API keys และปรับแต่งการตอบกลับได้:`;

  // โค้ดตัวอย่างสำหรับ API Route ที่เรียกใช้ External API
  const apiWithExternalApiCode = `// app/api/weather/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ฟังก์ชันสำหรับจัดการคำขอ GET (ดึงข้อมูลสภาพอากาศ)
export async function GET(request: NextRequest) {
  try {
    // ดึง URL จากคำขอ
    const url = new URL(request.url);
    // ดึงพารามิเตอร์ city จาก URL
    const city = url.searchParams.get('city');
    
    // ตรวจสอบว่ามีพารามิเตอร์ city หรือไม่
    if (!city) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ต้องระบุชื่อเมือง' },
        { status: 400 }
      );
    }
    
    // API key สำหรับ OpenWeatherMap (ในสถานการณ์จริงควรเก็บไว้ใน .env)
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    
    // เรียกใช้ External API
    const response = await fetch(
      \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}&units=metric\`
    );
    
    // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
    if (!response.ok) {
      // ถ้าไม่พบเมือง
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'ไม่พบข้อมูลสภาพอากาศสำหรับเมืองนี้' },
          { status: 404 }
        );
      }
      
      // ถ้าเกิดข้อผิดพลาดอื่นๆ
      return NextResponse.json(
        { error: 'เกิดข้อผิดพลาดในการเรียกใช้ API สภาพอากาศ' },
        { status: response.status }
      );
    }
    
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const data = await response.json();
    
    // ปรับแต่งข้อมูลการตอบกลับ
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      timestamp: new Date().toISOString(),
    };
    
    // ส่งข้อมูลสภาพอากาศกลับ
    return NextResponse.json(weatherData);
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการเรียกใช้ API สภาพอากาศ' },
      { status: 500 }
    );
  }
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน API Route ที่เรียกใช้ External API
  const weatherComponentCode = `// components/WeatherWidget.tsx
'use client';

import { useState } from 'react';

// ประเภทข้อมูลสำหรับสภาพอากาศ
interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  timestamp: string;
}

// คอมโพเนนต์สำหรับแสดงสภาพอากาศ
export default function WeatherWidget() {
  // สร้าง state สำหรับเก็บข้อมูลและสถานะต่างๆ
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันสำหรับเรียกใช้ API เพื่อดึงข้อมูลสภาพอากาศ
  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ตรวจสอบว่ามีการระบุชื่อเมืองหรือไม่
    if (!city.trim()) {
      setError('กรุณาระบุชื่อเมือง');
      return;
    }
    
    try {
      // ตั้งค่าสถานะการโหลดเป็น true
      setLoading(true);
      // รีเซ็ตข้อผิดพลาด
      setError(null);
      
      // เรียกใช้ API Route
      const response = await fetch(\`/api/weather?city=\${encodeURIComponent(city)}\`);
      
      // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'เกิดข้อผิดพลาดในการเรียกใช้ API');
      }
      
      // แปลงข้อมูลการตอบกลับเป็น JSON
      const data = await response.json();
      
      // บันทึกข้อมูลลงใน state
      setWeather(data);
    } catch (err) {
      // บันทึกข้อผิดพลาดลงใน state
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    } finally {
      // ตั้งค่าสถานะการโหลดเป็น false
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">ตรวจสอบสภาพอากาศ</h3>
      
      {/* ฟอร์มสำหรับค้นหาสภาพอากาศ */}
      <form onSubmit={fetchWeather} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="ระบุชื่อเมือง (เช่น Bangkok, London, Tokyo)"
            className="flex-1 px-4 py-2 rounded-l-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-r-md bg-primary text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
          </button>
        </div>
      </form>
      
      {/* แสดงข้อความข้อผิดพลาด */}
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}
      
      {/* แสดงข้อมูลสภาพอากาศ */}
      {weather && (
        <div className="bg-surface-secondary p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold">{weather.city}, {weather.country}</h4>
              <p className="text-text-secondary">
                อัปเดตล่าสุด: {new Date(weather.timestamp).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center">
              <img
                src={\`https://openweathermap.org/img/wn/\${weather.icon}@2x.png\`}
                alt={weather.description}
                width={64}
                height={64}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-bold">{Math.round(weather.temperature)}°C</p>
              <p className="text-text-secondary">รู้สึกเหมือน: {Math.round(weather.feelsLike)}°C</p>
            </div>
            <div>
              <p className="capitalize">{weather.description}</p>
              <p>ความชื้น: {weather.humidity}%</p>
              <p>ความเร็วลม: {weather.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน API Routes กับ Server Actions
  const apiWithServerActionsContent = `## การใช้งาน API Routes กับ Server Actions

ใน Next.js 14+ คุณสามารถใช้ Server Actions แทน API Routes ได้ในบางกรณี:`;

  // โค้ดตัวอย่างสำหรับ Server Action
  const serverActionCode = `// app/actions/users.ts
'use server';

import { db } from '@/backend/db';
import { users } from '@/backend/db/schema/users';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// ประเภทข้อมูลสำหรับผู้ใช้
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ทั้งหมด
export async function getUsers(): Promise<User[]> {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    const allUsers = await db.select().from(users);
    return allUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้');
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ตาม ID
export async function getUserById(id: number): Promise<User | null> {
  try {
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    
    // ถ้าไม่พบผู้ใช้
    if (user.length === 0) {
      return null;
    }
    
    return user[0];
  } catch (error) {
    console.error(\`Error fetching user with ID \${id}:\`, error);
    throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้');
  }
}

// ประเภทข้อมูลสำหรับการสร้างผู้ใช้
interface CreateUserInput {
  name: string;
  email: string;
}

// ฟังก์ชันสำหรับสร้างผู้ใช้ใหม่
export async function createUser(input: CreateUserInput): Promise<User> {
  try {
    // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
    if (!input.name || !input.email) {
      throw new Error('ต้องระบุชื่อและอีเมล');
    }
    
    // เพิ่มผู้ใช้ใหม่ลงในฐานข้อมูล
    const newUser = await db.insert(users).values({
      name: input.name,
      email: input.email,
    }).returning();
    
    // revalidate ข้อมูลผู้ใช้
    revalidatePath('/users');
    
    return newUser[0];
  } catch (error) {
    // ตรวจสอบว่าเป็นข้อผิดพลาดเกี่ยวกับอีเมลซ้ำหรือไม่
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed: users.email')) {
      throw new Error('อีเมลนี้ถูกใช้งานแล้ว');
    }
    
    console.error('Error creating user:', error);
    throw new Error('เกิดข้อผิดพลาดในการสร้างผู้ใช้');
  }
}

// ประเภทข้อมูลสำหรับการอัปเดตผู้ใช้
interface UpdateUserInput {
  id: number;
  name?: string;
  email?: string;
}

// ฟังก์ชันสำหรับอัปเดตผู้ใช้
export async function updateUser(input: UpdateUserInput): Promise<User> {
  try {
    // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
    if (!input.name && !input.email) {
      throw new Error('ต้องระบุชื่อหรืออีเมล');
    }
    
    // สร้างข้อมูลที่จะอัปเดต
    const updateData: { name?: string; email?: string } = {};
    if (input.name) updateData.name = input.name;
    if (input.email) updateData.email = input.email;
    
    // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
    const updatedUser = await db.update(users)
      .set(updateData)
      .where(eq(users.id, input.id))
      .returning();
    
    // ถ้าไม่พบผู้ใช้
    if (updatedUser.length === 0) {
      throw new Error('ไม่พบผู้ใช้');
    }
    
    // revalidate ข้อมูลผู้ใช้
    revalidatePath('/users');
    revalidatePath(\`/users/\${input.id}\`);
    
    return updatedUser[0];
  } catch (error) {
    // ตรวจสอบว่าเป็นข้อผิดพลาดเกี่ยวกับอีเมลซ้ำหรือไม่
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed: users.email')) {
      throw new Error('อีเมลนี้ถูกใช้งานแล้ว');
    }
    
    console.error(\`Error updating user with ID \${input.id}:\`, error);
    throw new Error('เกิดข้อผิดพลาดในการอัปเดตผู้ใช้');
  }
}

// ฟังก์ชันสำหรับลบผู้ใช้
export async function deleteUser(id: number): Promise<void> {
  try {
    // ลบผู้ใช้จากฐานข้อมูล
    const deletedUser = await db.delete(users)
      .where(eq(users.id, id))
      .returning();
    
    // ถ้าไม่พบผู้ใช้
    if (deletedUser.length === 0) {
      throw new Error('ไม่พบผู้ใช้');
    }
    
    // revalidate ข้อมูลผู้ใช้
    revalidatePath('/users');
  } catch (error) {
    console.error(\`Error deleting user with ID \${id}:\`, error);
    throw new Error('เกิดข้อผิดพลาดในการลบผู้ใช้');
  }
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Server Action
  const serverActionComponentCode = `// components/UserForm.tsx
'use client';

import { useState } from 'react';
import { createUser, updateUser, deleteUser } from '@/app/actions/users';

// ประเภทข้อมูลสำหรับผู้ใช้
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// ประเภทข้อมูลสำหรับ props
interface UserFormProps {
  user?: User;
  onSuccess?: () => void;
}

// คอมโพเนนต์สำหรับฟอร์มผู้ใช้
export default function UserForm({ user, onSuccess }: UserFormProps) {
  // สร้าง state สำหรับเก็บข้อมูลและสถานะต่างๆ
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ฟังก์ชันสำหรับอัปเดตข้อมูลฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันสำหรับส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      if (user) {
        // อัปเดตผู้ใช้
        await updateUser({
          id: user.id,
          name: formData.name,
          email: formData.email,
        });
        
        setSuccess('อัปเดตผู้ใช้สำเร็จ');
      } else {
        // สร้างผู้ใช้ใหม่
        await createUser({
          name: formData.name,
          email: formData.email,
        });
        
        // รีเซ็ตฟอร์ม
        setFormData({ name: '', email: '' });
        setSuccess('สร้างผู้ใช้สำเร็จ');
      }
      
      // เรียกใช้ฟังก์ชัน onSuccess ถ้ามี
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสำหรับลบผู้ใช้
  const handleDelete = async () => {
    if (!user) return;
    
    // ถามยืนยันก่อนลบ
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?')) return;
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // ลบผู้ใช้
      await deleteUser(user.id);
      
      setSuccess('ลบผู้ใช้สำเร็จ');
      
      // เรียกใช้ฟังก์ชัน onSuccess ถ้ามี
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4">
        {user ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
      </h3>
      
      {/* แสดงข้อความข้อผิดพลาด */}
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}
      
      {/* แสดงข้อความสำเร็จ */}
      {success && (
        <div className="p-4 mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-lg">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            ชื่อ
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1">
            อีเมล
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-primary text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'กำลังดำเนินการ...' : user ? 'อัปเดต' : 'เพิ่ม'}
          </button>
          
          {user && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              ลบ
            </button>
          )}
        </div>
      </form>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน API Routes กับ Authentication
  const apiWithAuthContent = `## การใช้งาน API Routes กับ Authentication

API Routes สามารถใช้ในการจัดการการยืนยันตัวตนได้:`;

  // โค้ดตัวอย่างสำหรับ API Route ที่มีการตรวจสอบการยืนยันตัวตน
  const apiWithAuthCode = `// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/db';
import { users } from '@/backend/db/schema/users';
import { eq } from 'drizzle-orm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

// ฟังก์ชันสำหรับจัดการคำขอ POST (เข้าสู่ระบบ)
export async function POST(request: NextRequest) {
  try {
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const body = await request.json();
    
    // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
    if (!body.email || !body.password) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ต้องระบุอีเมลและรหัสผ่าน' },
        { status: 400 }
      );
    }
    
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await db.select().from(users)
      .where(eq(users.email, body.email))
      .limit(1);
    
    // ถ้าไม่พบผู้ใช้
    if (user.length === 0) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }
    
    // ตรวจสอบรหัสผ่าน
    const passwordMatch = await compare(body.password, user[0].password);
    
    // ถ้ารหัสผ่านไม่ถูกต้อง
    if (!passwordMatch) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }
    
    // สร้าง JWT token
    const token = sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );
    
    // บันทึก token ลงใน cookie
    const cookieStore = cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 วัน
      path: '/',
    });
    
    // ส่งข้อมูลผู้ใช้กลับ (ไม่รวมรหัสผ่าน)
    return NextResponse.json({
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
    });
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' },
      { status: 500 }
    );
  }
}

// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// ฟังก์ชันสำหรับจัดการคำขอ POST (ออกจากระบบ)
export async function POST() {
  try {
    // ลบ token จาก cookie
    const cookieStore = cookies();
    cookieStore.delete('token');
    
    // ส่งข้อความสำเร็จกลับ
    return NextResponse.json({ message: 'ออกจากระบบสำเร็จ' });
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการออกจากระบบ' },
      { status: 500 }
    );
  }
}

// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// ฟังก์ชัน middleware
export function middleware(request: NextRequest) {
  // ตรวจสอบว่าเป็น API Route ที่ต้องการตรวจสอบการยืนยันตัวตนหรือไม่
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    // ดึง token จาก cookie
    const token = request.cookies.get('token')?.value;
    
    // ถ้าไม่มี token
    if (!token) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ไม่ได้รับอนุญาต' },
        { status: 401 }
      );
    }
    
    try {
      // ตรวจสอบ token
      const decoded = verify(token, process.env.JWT_SECRET || 'secret');
      
      // เพิ่มข้อมูลผู้ใช้ลงในคำขอ
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', String((decoded as any).id));
      requestHeaders.set('x-user-email', String((decoded as any).email));
      
      // ส่งคำขอต่อไปพร้อมกับข้อมูลผู้ใช้
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ไม่ได้รับอนุญาต' },
        { status: 401 }
      );
    }
  }
  
  // ส่งคำขอต่อไป
  return NextResponse.next();
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ['/api/protected/:path*'],
};

// app/api/protected/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/db';
import { users } from '@/backend/db/schema/users';
import { eq } from 'drizzle-orm';

// ฟังก์ชันสำหรับจัดการคำขอ GET (ดึงข้อมูลโปรไฟล์)
export async function GET(request: NextRequest) {
  try {
    // ดึงข้อมูลผู้ใช้จาก headers
    const userId = request.headers.get('x-user-id');
    
    // ถ้าไม่มีข้อมูลผู้ใช้
    if (!userId) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ไม่ได้รับอนุญาต' },
        { status: 401 }
      );
    }
    
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    }).from(users)
      .where(eq(users.id, parseInt(userId)))
      .limit(1);
    
    // ถ้าไม่พบผู้ใช้
    if (user.length === 0) {
      // ส่งข้อความข้อผิดพลาดกลับ
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      );
    }
    
    // ส่งข้อมูลผู้ใช้กลับ
    return NextResponse.json(user[0]);
  } catch (error) {
    // ส่งข้อความข้อผิดพลาดกลับ
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการใช้งาน API Routes ใน Next.js ดังนี้:

1. พื้นฐานของ API Routes
2. การจัดการคำขอ HTTP ต่างๆ
3. Dynamic API Routes
4. การใช้งาน API Routes กับฐานข้อมูล
5. การใช้งาน API Routes กับ External API
6. การใช้งาน API Routes กับ Server Actions
7. การใช้งาน API Routes กับ Authentication

API Routes เป็นฟีเจอร์ที่ทรงพลังของ Next.js ที่ช่วยให้คุณสามารถสร้าง API endpoints ภายในแอปพลิเคชัน Next.js ของคุณได้โดยไม่ต้องตั้งค่าเซิร์ฟเวอร์แยกต่างหาก ซึ่งช่วยลดความซับซ้อนในการพัฒนาและการ deploy`;

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
            <h1 className="text-3xl font-bold mb-2">API Routes</h1>
            <p className="text-text-secondary">ตัวอย่างการใช้งาน API Routes ใน Next.js</p>
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
        <MarkdownContent content={apiRoutesBasicsContent} />
        <CodeBlock code={basicApiRouteCode} language="typescript" fileName="app/api/hello/route.ts" />
        <CodeBlock code={fetchApiRouteCode} language="typescript" fileName="components/HelloApi.tsx" />
        <MarkdownContent content={httpMethodsContent} />
        <CodeBlock code={httpMethodsCode} language="typescript" fileName="app/api/users/route.ts" />
        <CodeBlock code={userApiComponentCode} language="typescript" fileName="components/UserManager.tsx" />
        <MarkdownContent content={dynamicApiRoutesContent} />
        <CodeBlock code={dynamicApiRouteCode} language="typescript" fileName="app/api/users/[id]/route.ts" />
        <MarkdownContent content={apiWithDatabaseContent} />
        <CodeBlock code={drizzleSetupCode} language="typescript" fileName="backend/db/index.ts" />
        <CodeBlock code={apiWithDrizzleCode} language="typescript" fileName="app/api/users/route.ts" />
        <MarkdownContent content={apiWithExternalApiContent} />
        <CodeBlock code={apiWithExternalApiCode} language="typescript" fileName="app/api/weather/route.ts" />
        <CodeBlock code={weatherComponentCode} language="typescript" fileName="components/WeatherWidget.tsx" />
        <MarkdownContent content={apiWithServerActionsContent} />
        <CodeBlock code={serverActionCode} language="typescript" fileName="app/actions/users.ts" />
        <CodeBlock code={serverActionComponentCode} language="typescript" fileName="components/UserForm.tsx" />
        <MarkdownContent content={apiWithAuthContent} />
        <CodeBlock code={apiWithAuthCode} language="typescript" fileName="app/api/auth/login/route.ts" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
