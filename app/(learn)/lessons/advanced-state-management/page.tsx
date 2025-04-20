import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงรายละเอียดบทเรียนการจัดการสถานะขั้นสูง
export default function AdvancedStateManagementPage() {
  // เนื้อหาบทเรียนในรูปแบบ Markdown
  const lessonContent = `# การจัดการสถานะขั้นสูง

การจัดการสถานะ (State Management) เป็นส่วนสำคัญในการพัฒนาแอปพลิเคชัน Next.js ขนาดใหญ่ โดยเฉพาะเมื่อแอปพลิเคชันมีความซับซ้อนและมีการแชร์ข้อมูลระหว่างคอมโพเนนต์จำนวนมาก

## ทางเลือกในการจัดการสถานะใน Next.js

Next.js มีทางเลือกหลายวิธีในการจัดการสถานะ:

- **React Context + useReducer** - สำหรับการจัดการสถานะภายในแอปพลิเคชัน
- **Zustand** - ไลบรารีจัดการสถานะที่เรียบง่ายและมีประสิทธิภาพ
- **Redux Toolkit** - สำหรับแอปพลิเคชันที่มีความซับซ้อนสูง
- **Jotai** - ไลบรารีจัดการสถานะแบบอะตอมิก
- **TanStack Query (React Query)** - สำหรับการจัดการข้อมูลจาก API
- **SWR** - สำหรับการดึงข้อมูลและแคชข้อมูล

แต่ละวิธีมีข้อดีและข้อเสียแตกต่างกัน ในบทเรียนนี้เราจะเรียนรู้วิธีการใช้งานแต่ละวิธีและเมื่อไหร่ควรใช้วิธีใด`;

  // โค้ดตัวอย่างสำหรับ React Context + useReducer
  const contextReducerCode = `// context/CartContext.tsx
"use client"

import React, { createContext, useContext, useReducer } from 'react';

// กำหนด type สำหรับสินค้าในตะกร้า
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// กำหนด type สำหรับสถานะของตะกร้า
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// กำหนด type สำหรับ actions ที่สามารถทำกับตะกร้า
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// สร้าง initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// สร้าง reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // ถ้าสินค้ามีอยู่แล้ว เพิ่มจำนวน
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
      } else {
        // ถ้าสินค้ายังไม่มี เพิ่มสินค้าใหม่
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // คำนวณจำนวนสินค้าและราคารวมใหม่
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((item) => item.id !== action.payload.id);
      
      // คำนวณจำนวนสินค้าและราคารวมใหม่
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      // คำนวณจำนวนสินค้าและราคารวมใหม่
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// สร้าง context
interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// สร้าง provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // สร้าง actions
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// สร้าง custom hook สำหรับใช้งาน context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// วิธีการใช้งาน
// 1. ครอบ CartProvider ที่ component ระดับบน
// app/layout.tsx
// import { CartProvider } from '@/context/CartContext';
// 
// export default function RootLayout({ children }) {
//   return (
//     <html lang="th">
//       <body>
//         <CartProvider>
//           {children}
//         </CartProvider>
//       </body>
//     </html>
//   );
// }

// 2. ใช้งานใน component
// "use client"
// import { useCart } from '@/context/CartContext';
//
// export default function ProductCard({ product }) {
//   const { addItem } = useCart();
//
//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <p>{product.price} บาท</p>
//       <button onClick={() => addItem(product)}>
//         เพิ่มลงตะกร้า
//       </button>
//     </div>
//   );
// }`;

  // เนื้อหาเกี่ยวกับ Zustand
  const zustandContent = `## Zustand

Zustand เป็นไลบรารีจัดการสถานะที่เรียบง่าย มีขนาดเล็ก และมีประสิทธิภาพสูง ซึ่งเหมาะสำหรับแอปพลิเคชัน Next.js ที่ต้องการความเรียบง่ายแต่มีประสิทธิภาพ:`;

  // โค้ดตัวอย่างสำหรับ Zustand
  const zustandCode = `// store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// กำหนด type สำหรับสินค้าในตะกร้า
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// กำหนด type สำหรับ store
interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// สร้าง store ด้วย Zustand
export const useCartStore = create<CartStore>()(
  // ใช้ persist middleware เพื่อเก็บข้อมูลใน localStorage
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // เพิ่มสินค้าลงตะกร้า
      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === item.id
          );

          let newItems: CartItem[];

          if (existingItemIndex >= 0) {
            // ถ้าสินค้ามีอยู่แล้ว เพิ่มจำนวน
            newItems = [...state.items];
            newItems[existingItemIndex].quantity += 1;
          } else {
            // ถ้าสินค้ายังไม่มี เพิ่มสินค้าใหม่
            newItems = [...state.items, { ...item, quantity: 1 }];
          }

          // คำนวณจำนวนสินค้าและราคารวมใหม่
          const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return { items: newItems, totalItems, totalPrice };
        }),

      // ลบสินค้าออกจากตะกร้า
      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          
          // คำนวณจำนวนสินค้าและราคารวมใหม่
          const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return { items: newItems, totalItems, totalPrice };
        }),

      // อัปเดตจำนวนสินค้า
      updateQuantity: (id, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          
          // คำนวณจำนวนสินค้าและราคารวมใหม่
          const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return { items: newItems, totalItems, totalPrice };
        }),

      // ล้างตะกร้า
      clearCart: () =>
        set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'cart-storage', // ชื่อสำหรับเก็บใน localStorage
    }
  )
);

// วิธีการใช้งาน
// "use client"
// import { useCartStore } from '@/store/cartStore';
//
// export default function ProductCard({ product }) {
//   const addItem = useCartStore((state) => state.addItem);
//
//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <p>{product.price} บาท</p>
//       <button onClick={() => addItem(product)}>
//         เพิ่มลงตะกร้า
//       </button>
//     </div>
//   );
// }`;

  // เนื้อหาเกี่ยวกับ TanStack Query (React Query)
  const reactQueryContent = `## TanStack Query (React Query)

TanStack Query (เดิมคือ React Query) เป็นไลบรารีที่ช่วยในการจัดการข้อมูลจาก API ซึ่งมีคุณสมบัติที่เป็นประโยชน์มากมาย เช่น การแคชข้อมูล การโหลดข้อมูลซ้ำอัตโนมัติ การจัดการข้อผิดพลาด และอื่นๆ:`;

  // โค้ดตัวอย่างสำหรับ TanStack Query
  const reactQueryCode = `// app/providers.tsx
"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
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
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าทั้งหมด
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า');
  }
  return response.json();
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าตาม ID
async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(\`/api/products/\${id}\`);
  if (!response.ok) {
    throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า');
  }
  return response.json();
}

// ฟังก์ชันสำหรับเพิ่มสินค้าใหม่
async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
  }
  return response.json();
}

// Hook สำหรับดึงข้อมูลสินค้าทั้งหมด
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}

// Hook สำหรับดึงข้อมูลสินค้าตาม ID
export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // ทำงานเมื่อมี id เท่านั้น
  });
}

// Hook สำหรับเพิ่มสินค้าใหม่
export function useAddProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // เมื่อเพิ่มสินค้าสำเร็จ ให้ invalidate query เพื่อโหลดข้อมูลใหม่
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// วิธีการใช้งาน
// "use client"
// import { useProducts, useAddProduct } from '@/hooks/useProducts';
//
// export default function ProductList() {
//   const { data: products, isLoading, error } = useProducts();
//   const addProductMutation = useAddProduct();
//
//   if (isLoading) return <div>กำลังโหลด...</div>;
//   if (error) return <div>เกิดข้อผิดพลาด: {error.message}</div>;
//
//   return (
//     <div>
//       <h1>รายการสินค้า</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>{product.name} - {product.price} บาท</li>
//         ))}
//       </ul>
//       <button
//         onClick={() => {
//           addProductMutation.mutate({
//             name: 'สินค้าใหม่',
//             price: 100,
//             description: 'รายละเอียดสินค้าใหม่',
//           });
//         }}
//       >
//         เพิ่มสินค้าใหม่
//       </button>
//     </div>
//   );
// }`;

  // เนื้อหาเกี่ยวกับ SWR
  const swrContent = `## SWR

SWR เป็นไลบรารีสำหรับการดึงข้อมูลที่พัฒนาโดยทีม Next.js ซึ่งมีคุณสมบัติคล้ายกับ React Query แต่มีขนาดเล็กกว่าและใช้งานง่ายกว่า:`;

  // โค้ดตัวอย่างสำหรับ SWR
  const swrCode = `// hooks/useSWR.ts
import useSWR from 'swr';

// ฟังก์ชัน fetcher สำหรับใช้กับ SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
  }
  return response.json();
};

// Hook สำหรับดึงข้อมูลสินค้าทั้งหมด
export function useProducts() {
  return useSWR('/api/products', fetcher);
}

// Hook สำหรับดึงข้อมูลสินค้าตาม ID
export function useProduct(id: string) {
  return useSWR(id ? \`/api/products/\${id}\` : null, fetcher);
}

// วิธีการใช้งาน
// "use client"
// import { useProducts } from '@/hooks/useSWR';
//
// export default function ProductList() {
//   const { data: products, error, isLoading } = useProducts();
//
//   if (isLoading) return <div>กำลังโหลด...</div>;
//   if (error) return <div>เกิดข้อผิดพลาด: {error.message}</div>;
//
//   return (
//     <div>
//       <h1>รายการสินค้า</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>{product.name} - {product.price} บาท</li>
//         ))}
//       </ul>
//     </div>
//   );
// }`;

  // เนื้อหาเกี่ยวกับการเลือกใช้ไลบรารีจัดการสถานะ
  const choosingLibraryContent = `## การเลือกใช้ไลบรารีจัดการสถานะ

การเลือกใช้ไลบรารีจัดการสถานะขึ้นอยู่กับความต้องการของแอปพลิเคชัน:

- **React Context + useReducer** - เหมาะสำหรับแอปพลิเคชันขนาดเล็กถึงขนาดกลางที่ต้องการใช้เฉพาะ React โดยไม่ต้องติดตั้งไลบรารีเพิ่มเติม
- **Zustand** - เหมาะสำหรับแอปพลิเคชันที่ต้องการความเรียบง่ายแต่มีประสิทธิภาพสูง
- **Redux Toolkit** - เหมาะสำหรับแอปพลิเคชันขนาดใหญ่ที่มีสถานะซับซ้อนและต้องการเครื่องมือที่ครบครัน
- **Jotai** - เหมาะสำหรับแอปพลิเคชันที่ต้องการจัดการสถานะแบบอะตอมิก
- **TanStack Query (React Query)** - เหมาะสำหรับการจัดการข้อมูลจาก API ที่ต้องการคุณสมบัติขั้นสูง
- **SWR** - เหมาะสำหรับการจัดการข้อมูลจาก API ที่ต้องการความเรียบง่าย

ในแอปพลิเคชันขนาดใหญ่ คุณอาจใช้หลายวิธีร่วมกัน เช่น ใช้ Zustand สำหรับสถานะทั่วไปของแอปพลิเคชัน และใช้ TanStack Query สำหรับการจัดการข้อมูลจาก API`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในบทเรียนนี้ คุณได้เรียนรู้เกี่ยวกับ:

- ทางเลือกต่างๆ ในการจัดการสถานะใน Next.js
- การใช้งาน React Context + useReducer สำหรับการจัดการสถานะ
- การใช้งาน Zustand สำหรับการจัดการสถานะอย่างมีประสิทธิภาพ
- การใช้งาน TanStack Query (React Query) สำหรับการจัดการข้อมูลจาก API
- การใช้งาน SWR สำหรับการดึงข้อมูลอย่างง่าย
- การเลือกใช้ไลบรารีจัดการสถานะให้เหมาะสมกับแอปพลิเคชัน

การเลือกใช้วิธีการจัดการสถานะที่เหมาะสมจะช่วยให้แอปพลิเคชัน Next.js ของคุณมีประสิทธิภาพสูง บำรุงรักษาได้ง่าย และรองรับการขยายขนาดได้ดี

ในบทเรียนถัดไป เราจะเรียนรู้เกี่ยวกับการเพิ่มประสิทธิภาพ Next.js`;

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของบทเรียน */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/lessons" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการบทเรียน
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">การจัดการสถานะขั้นสูง</h1>
            <p className="text-text-secondary">เรียนรู้เทคนิคการจัดการสถานะขั้นสูงใน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs mr-2">
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
      
      {/* เนื้อหาบทเรียน */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={lessonContent} lessonId="5" />
        <CodeBlock code={contextReducerCode} language="typescript" fileName="context/CartContext.tsx" />
        <MarkdownContent content={zustandContent} />
        <CodeBlock code={zustandCode} language="typescript" fileName="store/cartStore.ts" />
        <MarkdownContent content={reactQueryContent} />
        <CodeBlock code={reactQueryCode} language="typescript" fileName="TanStack Query Example" />
        <MarkdownContent content={swrContent} />
        <CodeBlock code={swrCode} language="typescript" fileName="hooks/useSWR.ts" />
        <MarkdownContent content={choosingLibraryContent} />
        <MarkdownContent content={summaryContent} />
        
        {/* ปุ่มนำทาง */}
        <div className="mt-12 pt-6 border-t border-text-secondary/10 flex justify-between">
          <Link href="/lessons/enterprise-architecture" className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            บทเรียนก่อนหน้า: สถาปัตยกรรมระดับองค์กร
          </Link>
          <Link href="/lessons/nextjs-optimization" className="btn btn-primary">
            บทเรียนถัดไป: การเพิ่มประสิทธิภาพ Next.js
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* แบบฝึกหัดที่เกี่ยวข้อง */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">แบบฝึกหัดที่เกี่ยวข้อง</h2>
        <div className="bg-surface p-6 rounded-lg">
          <Link href="/exercises/5" className="block hover:bg-background rounded-lg p-4 transition-colors">
            <h3 className="font-bold mb-1">สร้างระบบจัดการสถานะด้วย Zustand</h3>
            <p className="text-text-secondary">ฝึกการสร้างระบบจัดการสถานะด้วย Zustand ใน Next.js</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
