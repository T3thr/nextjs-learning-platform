import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการทำ Infinite Scroll ใน Next.js
export default function InfiniteScrollExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# การทำ Infinite Scroll ใน Next.js

Infinite Scroll (การเลื่อนไม่สิ้นสุด) เป็นเทคนิคที่ช่วยให้ผู้ใช้สามารถเลื่อนดูข้อมูลได้อย่างต่อเนื่องโดยไม่ต้องกดปุ่มเพื่อโหลดข้อมูลเพิ่มเติม ซึ่งช่วยเพิ่มประสบการณ์การใช้งานให้ดีขึ้น ในตัวอย่างนี้ เราจะแสดงวิธีการทำ Infinite Scroll ใน Next.js ด้วยหลายวิธี

## วิธีการทำ Infinite Scroll ใน Next.js

1. การทำ Infinite Scroll แบบพื้นฐานด้วย Intersection Observer API
2. การทำ Infinite Scroll ด้วย React Query
3. การทำ Infinite Scroll ด้วย SWR
4. การทำ Infinite Scroll ด้วย React Virtualized
5. การทำ Infinite Scroll ที่รองรับ Server Components`;

  // เนื้อหาเกี่ยวกับการทำ Infinite Scroll แบบพื้นฐานด้วย Intersection Observer API
  const basicInfiniteScrollContent = `## การทำ Infinite Scroll แบบพื้นฐานด้วย Intersection Observer API

Intersection Observer API เป็น Web API ที่ช่วยให้เราสามารถตรวจจับเมื่อองค์ประกอบ (element) ปรากฏในหน้าจอ ซึ่งเหมาะสำหรับการทำ Infinite Scroll:`;

  // โค้ดตัวอย่างสำหรับการทำ Infinite Scroll แบบพื้นฐานด้วย Intersection Observer API
  const basicInfiniteScrollCode = `// components/BasicInfiniteScroll.tsx
"use client"

import { useState, useEffect, useRef, useCallback } from 'react';

// กำหนด type สำหรับข้อมูลโพสต์
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function BasicInfiniteScroll() {
  // สร้าง state สำหรับเก็บข้อมูลโพสต์
  const [posts, setPosts] = useState<Post[]>([]);
  
  // สร้าง state สำหรับเก็บหน้าปัจจุบัน
  const [page, setPage] = useState(1);
  
  // สร้าง state สำหรับเก็บสถานะการโหลด
  const [loading, setLoading] = useState(false);
  
  // สร้าง state สำหรับเก็บสถานะว่ามีข้อมูลเพิ่มเติมหรือไม่
  const [hasMore, setHasMore] = useState(true);
  
  // สร้าง state สำหรับเก็บข้อผิดพลาด
  const [error, setError] = useState<string | null>(null);
  
  // สร้าง ref สำหรับองค์ประกอบที่จะใช้ตรวจจับการเลื่อน
  const observer = useRef<IntersectionObserver | null>(null);
  
  // สร้าง ref สำหรับองค์ประกอบสุดท้ายในรายการ
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // ถ้ากำลังโหลด ไม่ต้องทำอะไร
      if (loading) return;
      
      // ถ้ามี observer อยู่แล้ว ให้ยกเลิกการติดตาม
      if (observer.current) observer.current.disconnect();
      
      // สร้าง observer ใหม่
      observer.current = new IntersectionObserver((entries) => {
        // ถ้าองค์ประกอบสุดท้ายปรากฏในหน้าจอ และยังมีข้อมูลเพิ่มเติม
        if (entries[0].isIntersecting && hasMore) {
          // เพิ่มหน้า
          setPage((prevPage) => prevPage + 1);
        }
      });
      
      // ถ้ามีองค์ประกอบสุดท้าย ให้ติดตาม
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  
  // ฟังก์ชันสำหรับการโหลดข้อมูลโพสต์
  const fetchPosts = useCallback(async () => {
    // ตั้งค่าสถานะการโหลดเป็น true
    setLoading(true);
    
    // ตั้งค่าข้อผิดพลาดเป็น null
    setError(null);
    
    try {
      // โหลดข้อมูลโพสต์จาก API
      const response = await fetch(
        \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=10\`
      );
      
      // ถ้าการตอบกลับไม่สำเร็จ
      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
      
      // แปลงข้อมูลการตอบกลับเป็น JSON
      const data: Post[] = await response.json();
      
      // ถ้าไม่มีข้อมูลเพิ่มเติม
      if (data.length === 0) {
        setHasMore(false);
      } else {
        // เพิ่มข้อมูลโพสต์ใหม่เข้าไปใน state
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
    } catch (error) {
      // ถ้าเกิดข้อผิดพลาด
      setError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
      console.error('Error fetching posts:', error);
    } finally {
      // ตั้งค่าสถานะการโหลดเป็น false
      setLoading(false);
    }
  }, [page]);
  
  // ใช้ useEffect เพื่อโหลดข้อมูลโพสต์เมื่อหน้าเปลี่ยน
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">โพสต์ล่าสุด</h2>
      
      {/* แสดงข้อผิดพลาด */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}
      
      {/* แสดงรายการโพสต์ */}
      <div className="space-y-4">
        {posts.map((post, index) => {
          // ถ้าเป็นโพสต์สุดท้าย ให้ใช้ ref
          if (posts.length === index + 1) {
            return (
              <div
                ref={lastPostElementRef}
                key={post.id}
                className="p-4 bg-surface-secondary rounded-lg"
              >
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-text-secondary">{post.body}</p>
              </div>
            );
          } else {
            return (
              <div key={post.id} className="p-4 bg-surface-secondary rounded-lg">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-text-secondary">{post.body}</p>
              </div>
            );
          }
        })}
      </div>
      
      {/* แสดงสถานะการโหลด */}
      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* แสดงข้อความเมื่อไม่มีข้อมูลเพิ่มเติม */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center p-4 text-text-secondary">
          ไม่มีโพสต์เพิ่มเติม
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการทำ Infinite Scroll ด้วย React Query
  const reactQueryInfiniteScrollContent = `## การทำ Infinite Scroll ด้วย React Query

React Query เป็นไลบรารีที่ช่วยในการจัดการข้อมูลและสถานะการโหลด ซึ่งมีฟีเจอร์ \`useInfiniteQuery\` ที่ออกแบบมาสำหรับการทำ Infinite Scroll โดยเฉพาะ:

ติดตั้ง React Query:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง React Query
  const reactQueryInstallCode = `npm install @tanstack/react-query
# หรือ
bun add @tanstack/react-query`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า React Query Provider
  const reactQueryProviderCode = `// app/providers.tsx
"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  // สร้าง QueryClient ใหม่สำหรับแต่ละ request ใน client component
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // ตั้งค่า staleTime เพื่อลดการโหลดข้อมูลซ้ำ
        staleTime: 60 * 1000, // 1 นาที
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้ React Query Provider ใน layout
  const reactQueryLayoutCode = `// app/layout.tsx
import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}`;

  // โค้ดตัวอย่างสำหรับการทำ Infinite Scroll ด้วย React Query
  const reactQueryInfiniteScrollCode = `// components/ReactQueryInfiniteScroll.tsx
"use client"

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useCallback } from 'react';

// กำหนด type สำหรับข้อมูลโพสต์
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// ฟังก์ชันสำหรับการโหลดข้อมูลโพสต์
const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await fetch(
    \`https://jsonplaceholder.typicode.com/posts?_page=\${pageParam}&_limit=10\`
  );
  
  if (!response.ok) {
    throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
  }
  
  return response.json();
};

export default function ReactQueryInfiniteScroll() {
  // สร้าง ref สำหรับองค์ประกอบที่จะใช้ตรวจจับการเลื่อน
  const observer = useRef<IntersectionObserver | null>(null);
  
  // ใช้ useInfiniteQuery hook จาก React Query
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      // ถ้าไม่มีข้อมูลในหน้าล่าสุด หรือมีข้อมูลน้อยกว่า 10 รายการ
      // แสดงว่าไม่มีหน้าถัดไป
      return lastPage.length === 0 || lastPage.length < 10
        ? undefined
        : allPages.length + 1;
    },
    initialPageParam: 1,
  });
  
  // สร้าง ref สำหรับองค์ประกอบสุดท้ายในรายการ
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // ถ้ากำลังโหลด ไม่ต้องทำอะไร
      if (isFetchingNextPage) return;
      
      // ถ้ามี observer อยู่แล้ว ให้ยกเลิกการติดตาม
      if (observer.current) observer.current.disconnect();
      
      // สร้าง observer ใหม่
      observer.current = new IntersectionObserver((entries) => {
        // ถ้าองค์ประกอบสุดท้ายปรากฏในหน้าจอ และยังมีข้อมูลเพิ่มเติม
        if (entries[0].isIntersecting && hasNextPage) {
          // โหลดหน้าถัดไป
          fetchNextPage();
        }
      });
      
      // ถ้ามีองค์ประกอบสุดท้าย ให้ติดตาม
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );
  
  // แสดงข้อความกำลังโหลด
  if (status === 'pending') {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // แสดงข้อผิดพลาด
  if (status === 'error') {
    return (
      <div className="p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-lg">
        {error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'}
      </div>
    );
  }
  
  // รวมข้อมูลโพสต์จากทุกหน้า
  const posts = data.pages.flat();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">โพสต์ล่าสุด (React Query)</h2>
      
      {/* แสดงรายการโพสต์ */}
      <div className="space-y-4">
        {posts.map((post: Post, index: number) => {
          // ถ้าเป็นโพสต์สุดท้าย ให้ใช้ ref
          if (posts.length === index + 1) {
            return (
              <div
                ref={lastPostElementRef}
                key={post.id}
                className="p-4 bg-surface-secondary rounded-lg"
              >
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-text-secondary">{post.body}</p>
              </div>
            );
          } else {
            return (
              <div key={post.id} className="p-4 bg-surface-secondary rounded-lg">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-text-secondary">{post.body}</p>
              </div>
            );
          }
        })}
      </div>
      
      {/* แสดงสถานะการโหลด */}
      {isFetchingNextPage && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* แสดงข้อความเมื่อไม่มีข้อมูลเพิ่มเติม */}
      {!hasNextPage && posts.length > 0 && (
        <div className="text-center p-4 text-text-secondary">
          ไม่มีโพสต์เพิ่มเติม
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการทำ Infinite Scroll ด้วย SWR
  const swrInfiniteScrollContent = `## การทำ Infinite Scroll ด้วย SWR

SWR เป็นไลบรารีสำหรับการโหลดข้อมูลที่พัฒนาโดยทีม Next.js ซึ่งมีฟีเจอร์ \`useSWRInfinite\` ที่ออกแบบมาสำหรับการทำ Infinite Scroll:

ติดตั้ง SWR:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง SWR
  const swrInstallCode = `npm install swr
# หรือ
bun add swr`;

  // โค้ดตัวอย่างสำหรับการทำ Infinite Scroll ด้วย SWR
  const swrInfiniteScrollCode = `// components/SWRInfiniteScroll.tsx
"use client"

import useSWRInfinite from 'swr/infinite';
import { useEffect, useRef, useCallback } from 'react';

// กำหนด type สำหรับข้อมูลโพสต์
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// ฟังก์ชันสำหรับการโหลดข้อมูลโพสต์
const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
  }
  
  return response.json();
};

export default function SWRInfiniteScroll() {
  // สร้าง ref สำหรับองค์ประกอบที่จะใช้ตรวจจับการเลื่อน
  const observer = useRef<IntersectionObserver | null>(null);
  
  // ฟังก์ชันสำหรับการสร้าง key ในแต่ละหน้า
  const getKey = (pageIndex: number, previousPageData: Post[] | null) => {
    // ถ้าหน้าก่อนหน้าไม่มีข้อมูล หรือมีข้อมูลน้อยกว่า 10 รายการ
    // แสดงว่าไม่มีหน้าถัดไป
    if (previousPageData && previousPageData.length === 0) return null;
    
    // สร้าง URL สำหรับการโหลดข้อมูล
    return \`https://jsonplaceholder.typicode.com/posts?_page=\${pageIndex + 1}&_limit=10\`;
  };
  
  // ใช้ useSWRInfinite hook จาก SWR
  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite<Post[]>(
    getKey,
    fetcher
  );
  
  // คำนวณว่ามีข้อมูลเพิ่มเติมหรือไม่
  const hasNextPage = data && data[data.length - 1]?.length === 10;
  
  // รวมข้อมูลโพสต์จากทุกหน้า
  const posts = data ? data.flat() : [];
  
  // สร้าง ref สำหรับองค์ประกอบสุดท้ายในรายการ
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // ถ้ากำลังโหลด ไม่ต้องทำอะไร
      if (isValidating) return;
      
      // ถ้ามี observer อยู่แล้ว ให้ยกเลิกการติดตาม
      if (observer.current) observer.current.disconnect();
      
      // สร้าง observer ใหม่
      observer.current = new IntersectionObserver((entries) => {
        // ถ้าองค์ประกอบสุดท้ายปรากฏในหน้าจอ และยังมีข้อมูลเพิ่มเติม
        if (entries[0].isIntersecting && hasNextPage) {
          // เพิ่มขนาด size เพื่อโหลดหน้าถัดไป
          setSize((prevSize) => prevSize + 1);
        }
      });
      
      // ถ้ามีองค์ประกอบสุดท้าย ให้ติดตาม
      if (node) observer.current.observe(node);
    },
    [isValidating, hasNextPage, setSize]
  );
  
  // แสดงข้อความกำลังโหลดในครั้งแรก
  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // แสดงข้อผิดพลาด
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-lg">
        {error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">โพสต์ล่าสุด (SWR)</h2>
      
      {/* แสดงรายการโพสต์ */}
      <div className="space-y-4">
        {posts.map((post: Post, index: number) => {
          // ถ้าเป็นโพสต์สุดท้าย ให้ใช้ ref
          if (posts.length === index + 1) {
            return (
              <div
                ref={lastPostElementRef}
                key={post.id}
                className="p-4 bg-surface-secondary rounded-lg"
              >
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-text-secondary">{post.body}</p>
              </div>
            );
          } else {
            return (
              <div key={post.id} className="p-4 bg-surface-secondary rounded-lg">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-text-secondary">{post.body}</p>
              </div>
            );
          }
        })}
      </div>
      
      {/* แสดงสถานะการโหลด */}
      {isValidating && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* แสดงข้อความเมื่อไม่มีข้อมูลเพิ่มเติม */}
      {!hasNextPage && posts.length > 0 && (
        <div className="text-center p-4 text-text-secondary">
          ไม่มีโพสต์เพิ่มเติม
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการทำ Infinite Scroll ด้วย React Virtualized
  const reactVirtualizedContent = `## การทำ Infinite Scroll ด้วย React Virtualized

React Virtualized เป็นไลบรารีที่ช่วยในการแสดงรายการข้อมูลจำนวนมากโดยการแสดงเฉพาะข้อมูลที่อยู่ในหน้าจอเท่านั้น ซึ่งช่วยเพิ่มประสิทธิภาพในการแสดงผล:

ติดตั้ง React Virtualized:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง React Virtualized
  const reactVirtualizedInstallCode = `npm install react-window react-window-infinite-loader
# หรือ
bun add react-window react-window-infinite-loader`;

  // โค้ดตัวอย่างสำหรับการทำ Infinite Scroll ด้วย React Virtualized
  const reactVirtualizedCode = `// components/VirtualizedInfiniteScroll.tsx
"use client"

import { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

// กำหนด type สำหรับข้อมูลโพสต์
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function VirtualizedInfiniteScroll() {
  // สร้าง state สำหรับเก็บข้อมูลโพสต์
  const [posts, setPosts] = useState<Post[]>([]);
  
  // สร้าง state สำหรับเก็บสถานะการโหลด
  const [loading, setLoading] = useState(false);
  
  // สร้าง state สำหรับเก็บสถานะว่ามีข้อมูลเพิ่มเติมหรือไม่
  const [hasMore, setHasMore] = useState(true);
  
  // สร้าง state สำหรับเก็บข้อผิดพลาด
  const [error, setError] = useState<string | null>(null);
  
  // จำนวนรายการทั้งหมดที่จะแสดง
  const itemCount = hasMore ? posts.length + 1 : posts.length;
  
  // ฟังก์ชันสำหรับการโหลดข้อมูลโพสต์
  const loadMoreItems = async () => {
    // ถ้ากำลังโหลด หรือไม่มีข้อมูลเพิ่มเติม ไม่ต้องทำอะไร
    if (loading || !hasMore) return;
    
    // ตั้งค่าสถานะการโหลดเป็น true
    setLoading(true);
    
    try {
      // คำนวณหน้าปัจจุบัน
      const page = Math.floor(posts.length / 10) + 1;
      
      // โหลดข้อมูลโพสต์จาก API
      const response = await fetch(
        \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=10\`
      );
      
      // ถ้าการตอบกลับไม่สำเร็จ
      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
      
      // แปลงข้อมูลการตอบกลับเป็น JSON
      const data: Post[] = await response.json();
      
      // ถ้าไม่มีข้อมูลเพิ่มเติม
      if (data.length === 0) {
        setHasMore(false);
      } else {
        // เพิ่มข้อมูลโพสต์ใหม่เข้าไปใน state
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
    } catch (error) {
      // ถ้าเกิดข้อผิดพลาด
      setError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
      console.error('Error fetching posts:', error);
    } finally {
      // ตั้งค่าสถานะการโหลดเป็น false
      setLoading(false);
    }
  };
  
  // ฟังก์ชันสำหรับตรวจสอบว่ารายการถูกโหลดหรือยัง
  const isItemLoaded = (index: number) => {
    return !hasMore || index < posts.length;
  };
  
  // ฟังก์ชันสำหรับการแสดงรายการ
  const Item = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    // ถ้ารายการยังไม่ถูกโหลด
    if (!isItemLoaded(index)) {
      return (
        <div style={style} className="p-4 bg-surface-secondary rounded-lg animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
        </div>
      );
    }
    
    // ถ้ารายการถูกโหลดแล้ว
    const post = posts[index];
    
    return (
      <div style={style} className="p-4 bg-surface-secondary rounded-lg">
        <h3 className="text-lg font-bold">{post.title}</h3>
        <p className="text-text-secondary">{post.body}</p>
      </div>
    );
  };
  
  // โหลดข้อมูลโพสต์ครั้งแรก
  useEffect(() => {
    loadMoreItems();
  }, []);
  
  // แสดงข้อผิดพลาด
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-lg">
        {error}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">โพสต์ล่าสุด (Virtualized)</h2>
      
      {/* แสดงรายการโพสต์ */}
      <div className="h-[600px]">
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
          threshold={5}
        >
          {({ onItemsRendered, ref }) => (
            <List
              ref={ref}
              onItemsRendered={onItemsRendered}
              height={600}
              width="100%"
              itemCount={itemCount}
              itemSize={150}
              className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
            >
              {Item}
            </List>
          )}
        </InfiniteLoader>
      </div>
      
      {/* แสดงข้อความเมื่อไม่มีข้อมูลเพิ่มเติม */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center p-4 text-text-secondary">
          ไม่มีโพสต์เพิ่มเติม
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการทำ Infinite Scroll ที่รองรับ Server Components
  const serverComponentsInfiniteScrollContent = `## การทำ Infinite Scroll ที่รองรับ Server Components

ใน Next.js 13+ เราสามารถใช้ Server Components ร่วมกับ Client Components เพื่อทำ Infinite Scroll ได้ โดยการแยกส่วนการโหลดข้อมูลและการแสดงผล:`;

  // โค้ดตัวอย่างสำหรับการทำ Infinite Scroll ที่รองรับ Server Components
  const serverComponentsInfiniteScrollCode = `// lib/posts.ts
// ฟังก์ชันสำหรับการโหลดข้อมูลโพสต์
export async function getPosts(page: number = 1, limit: number = 10) {
  // โหลดข้อมูลโพสต์จาก API
  const response = await fetch(
    \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=\${limit}\`,
    { next: { revalidate: 60 } } // ตั้งค่า revalidate ทุก 60 วินาที
  );
  
  // ถ้าการตอบกลับไม่สำเร็จ
  if (!response.ok) {
    throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
  }
  
  // แปลงข้อมูลการตอบกลับเป็น JSON
  return response.json();
}

// components/PostList.tsx
// Server Component สำหรับการโหลดข้อมูลโพสต์
import { getPosts } from '@/lib/posts';
import InfiniteScrollClient from './InfiniteScrollClient';

// กำหนด type สำหรับข้อมูลโพสต์
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default async function PostList() {
  // โหลดข้อมูลโพสต์หน้าแรกจาก Server
  const initialPosts = await getPosts();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">โพสต์ล่าสุด (Server Components)</h2>
      
      {/* ส่งข้อมูลโพสต์หน้าแรกไปยัง Client Component */}
      <InfiniteScrollClient initialPosts={initialPosts} />
    </div>
  );
}

// components/InfiniteScrollClient.tsx
// Client Component สำหรับการทำ Infinite Scroll
"use client"

import { useState, useEffect, useRef, useCallback } from 'react';

// กำหนด type สำหรับข้อมูลโพสต์
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface InfiniteScrollClientProps {
  initialPosts: Post[];
}

export default function InfiniteScrollClient({ initialPosts }: InfiniteScrollClientProps) {
  // สร้าง state สำหรับเก็บข้อมูลโพสต์
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
  // สร้าง state สำหรับเก็บหน้าปัจจุบัน
  const [page, setPage] = useState(2); // เริ่มจากหน้า 2 เพราะหน้า 1 โหลดจาก Server แล้ว
  
  // สร้าง state สำหรับเก็บสถานะการโหลด
  const [loading, setLoading] = useState(false);
  
  // สร้าง state สำหรับเก็บสถานะว่ามีข้อมูลเพิ่มเติมหรือไม่
  const [hasMore, setHasMore] = useState(true);
  
  // สร้าง state สำหรับเก็บข้อผิดพลาด
  const [error, setError] = useState<string | null>(null);
  
  // สร้าง ref สำหรับองค์ประกอบที่จะใช้ตรวจจับการเลื่อน
  const observer = useRef<IntersectionObserver | null>(null);
  
  // สร้าง ref สำหรับองค์ประกอบสุดท้ายในรายการ
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // ถ้ากำลังโหลด ไม่ต้องทำอะไร
      if (loading) return;
      
      // ถ้ามี observer อยู่แล้ว ให้ยกเลิกการติดตาม
      if (observer.current) observer.current.disconnect();
      
      // สร้าง observer ใหม่
      observer.current = new IntersectionObserver((entries) => {
        // ถ้าองค์ประกอบสุดท้ายปรากฏในหน้าจอ และยังมีข้อมูลเพิ่มเติม
        if (entries[0].isIntersecting && hasMore) {
          // เพิ่มหน้า
          setPage((prevPage) => prevPage + 1);
        }
      });
      
      // ถ้ามีองค์ประกอบสุดท้าย ให้ติดตาม
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  
  // ฟังก์ชันสำหรับการโหลดข้อมูลโพสต์
  const fetchPosts = useCallback(async () => {
    // ตั้งค่าสถานะการโหลดเป็น true
    setLoading(true);
    
    // ตั้งค่าข้อผิดพลาดเป็น null
    setError(null);
    
    try {
      // โหลดข้อมูลโพสต์จาก API
      const response = await fetch(
        \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=10\`
      );
      
      // ถ้าการตอบกลับไม่สำเร็จ
      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
      
      // แปลงข้อมูลการตอบกลับเป็น JSON
      const data: Post[] = await response.json();
      
      // ถ้าไม่มีข้อมูลเพิ่มเติม
      if (data.length === 0) {
        setHasMore(false);
      } else {
        // เพิ่มข้อมูลโพสต์ใหม่เข้าไปใน state
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
    } catch (error) {
      // ถ้าเกิดข้อผิดพลาด
      setError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
      console.error('Error fetching posts:', error);
    } finally {
      // ตั้งค่าสถานะการโหลดเป็น false
      setLoading(false);
    }
  }, [page]);
  
  // ใช้ useEffect เพื่อโหลดข้อมูลโพสต์เมื่อหน้าเปลี่ยน
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  return (
    <div className="space-y-4">
      {/* แสดงข้อผิดพลาด */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}
      
      {/* แสดงรายการโพสต์ */}
      <div className="space-y-4">
        {posts.map((post, index) => {
          // ถ้าเป็นโพสต์สุดท้าย ให้ใช้ ref
          if (posts.length === index + 1) {
            return (
              <div
                ref={lastPostElementRef}
                key={post.id}
                className="p-4 bg-surface-secondary rounded-lg"
              >
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-text-secondary">{post.body}</p>
              </div>
            );
          } else {
            return (
              <div key={post.id} className="p-4 bg-surface-secondary rounded-lg">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-text-secondary">{post.body}</p>
              </div>
            );
          }
        })}
      </div>
      
      {/* แสดงสถานะการโหลด */}
      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* แสดงข้อความเมื่อไม่มีข้อมูลเพิ่มเติม */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center p-4 text-text-secondary">
          ไม่มีโพสต์เพิ่มเติม
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการทำ Infinite Scroll ใน Next.js ดังนี้:

1. การทำ Infinite Scroll แบบพื้นฐานด้วย Intersection Observer API
2. การทำ Infinite Scroll ด้วย React Query ซึ่งช่วยจัดการสถานะการโหลดและการแคชข้อมูล
3. การทำ Infinite Scroll ด้วย SWR ซึ่งเป็นไลบรารีที่พัฒนาโดยทีม Next.js
4. การทำ Infinite Scroll ด้วย React Virtualized ซึ่งช่วยเพิ่มประสิทธิภาพในการแสดงผลรายการข้อมูลจำนวนมาก
5. การทำ Infinite Scroll ที่รองรับ Server Components ใน Next.js 13+

การทำ Infinite Scroll เป็นเทคนิคที่ช่วยเพิ่มประสบการณ์การใช้งานให้ดีขึ้น โดยเฉพาะในแอปพลิเคชันที่มีรายการข้อมูลจำนวนมาก เช่น โซเชียลมีเดีย, บล็อก, หรือร้านค้าออนไลน์`;

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
            <h1 className="text-3xl font-bold mb-2">Infinite Scroll</h1>
            <p className="text-text-secondary">ตัวอย่างการทำ Infinite Scroll ใน Next.js ด้วยหลายวิธี</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              25 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาตัวอย่าง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={exampleContent} />
        <MarkdownContent content={basicInfiniteScrollContent} />
        <CodeBlock code={basicInfiniteScrollCode} language="typescript" fileName="components/BasicInfiniteScroll.tsx" />
        <MarkdownContent content={reactQueryInfiniteScrollContent} />
        <CodeBlock code={reactQueryInstallCode} language="bash" fileName="การติดตั้ง React Query" />
        <CodeBlock code={reactQueryProviderCode} language="typescript" fileName="app/providers.tsx" />
        <CodeBlock code={reactQueryLayoutCode} language="typescript" fileName="app/layout.tsx" />
        <CodeBlock code={reactQueryInfiniteScrollCode} language="typescript" fileName="components/ReactQueryInfiniteScroll.tsx" />
        <MarkdownContent content={swrInfiniteScrollContent} />
        <CodeBlock code={swrInstallCode} language="bash" fileName="การติดตั้ง SWR" />
        <CodeBlock code={swrInfiniteScrollCode} language="typescript" fileName="components/SWRInfiniteScroll.tsx" />
        <MarkdownContent content={reactVirtualizedContent} />
        <CodeBlock code={reactVirtualizedInstallCode} language="bash" fileName="การติดตั้ง React Virtualized" />
        <CodeBlock code={reactVirtualizedCode} language="typescript" fileName="components/VirtualizedInfiniteScroll.tsx" />
        <MarkdownContent content={serverComponentsInfiniteScrollContent} />
        <CodeBlock code={serverComponentsInfiniteScrollCode} language="typescript" fileName="components/ServerComponentsInfiniteScroll.tsx" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
