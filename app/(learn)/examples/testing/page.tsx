import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการใช้งาน Testing ใน Next.js
export default function TestingExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# การทดสอบ (Testing) ใน Next.js

การทดสอบเป็นส่วนสำคัญในการพัฒนาแอปพลิเคชัน Next.js ที่มีคุณภาพสูง ในตัวอย่างนี้ เราจะเรียนรู้เทคนิคต่างๆ ในการทดสอบแอปพลิเคชัน Next.js

## ประเภทของการทดสอบใน Next.js

1. **Unit Testing**: การทดสอบหน่วยย่อยของโค้ด เช่น ฟังก์ชัน หรือคอมโพเนนต์
2. **Integration Testing**: การทดสอบการทำงานร่วมกันของหลายๆ หน่วย
3. **End-to-End Testing**: การทดสอบแอปพลิเคชันทั้งหมดเสมือนผู้ใช้จริง
4. **API Testing**: การทดสอบ API Routes
5. **Snapshot Testing**: การทดสอบการเปลี่ยนแปลงของ UI`;

  // เนื้อหาเกี่ยวกับการทดสอบหน่วย (Unit Testing)
  const unitTestingContent = `## การทดสอบหน่วย (Unit Testing)

การทดสอบหน่วยเป็นการทดสอบหน่วยย่อยของโค้ด เช่น ฟังก์ชัน หรือคอมโพเนนต์ โดยใช้ Jest และ React Testing Library:`;

  // โค้ดตัวอย่างสำหรับการทดสอบฟังก์ชัน
  const functionTestingCode = `// app/utils/helpers.ts
// ฟังก์ชันสำหรับแปลงราคาเป็นสกุลเงินไทย
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(price);
}

// ฟังก์ชันสำหรับตรวจสอบว่าเป็นอีเมลที่ถูกต้องหรือไม่
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

// ฟังก์ชันสำหรับคำนวณส่วนลด
export function calculateDiscount(price: number, discountPercent: number): number {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('ส่วนลดต้องอยู่ระหว่าง 0 ถึง 100');
  }
  
  const discount = price * (discountPercent / 100);
  return price - discount;
}`;

  // โค้ดตัวอย่างสำหรับการทดสอบฟังก์ชัน
  const functionTestCode = `// __tests__/utils/helpers.test.ts
import { formatPrice, isValidEmail, calculateDiscount } from '@/app/utils/helpers';

// กลุ่มการทดสอบสำหรับฟังก์ชัน formatPrice
describe('formatPrice', () => {
  // ทดสอบการแปลงราคาเป็นสกุลเงินไทย
  it('แปลงราคาเป็นสกุลเงินไทยได้ถูกต้อง', () => {
    // เรียกใช้ฟังก์ชันที่ต้องการทดสอบ
    const result = formatPrice(1000);
    
    // ตรวจสอบผลลัพธ์
    expect(result).toBe('฿1,000.00');
  });
  
  // ทดสอบการแปลงราคาที่มีทศนิยม
  it('แปลงราคาที่มีทศนิยมได้ถูกต้อง', () => {
    // เรียกใช้ฟังก์ชันที่ต้องการทดสอบ
    const result = formatPrice(1000.50);
    
    // ตรวจสอบผลลัพธ์
    expect(result).toBe('฿1,000.50');
  });
  
  // ทดสอบการแปลงราคาที่เป็น 0
  it('แปลงราคาที่เป็น 0 ได้ถูกต้อง', () => {
    // เรียกใช้ฟังก์ชันที่ต้องการทดสอบ
    const result = formatPrice(0);
    
    // ตรวจสอบผลลัพธ์
    expect(result).toBe('฿0.00');
  });
});

// กลุ่มการทดสอบสำหรับฟังก์ชัน isValidEmail
describe('isValidEmail', () => {
  // ทดสอบอีเมลที่ถูกต้อง
  it('ตรวจสอบอีเมลที่ถูกต้องได้ถูกต้อง', () => {
    // เรียกใช้ฟังก์ชันที่ต้องการทดสอบ
    const result = isValidEmail('test@example.com');
    
    // ตรวจสอบผลลัพธ์
    expect(result).toBe(true);
  });
  
  // ทดสอบอีเมลที่ไม่ถูกต้อง
  it('ตรวจสอบอีเมลที่ไม่ถูกต้องได้ถูกต้อง', () => {
    // เรียกใช้ฟังก์ชันที่ต้องการทดสอบ
    const result1 = isValidEmail('test');
    const result2 = isValidEmail('test@');
    const result3 = isValidEmail('test@example');
    
    // ตรวจสอบผลลัพธ์
    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  });
});

// กลุ่มการทดสอบสำหรับฟังก์ชัน calculateDiscount
describe('calculateDiscount', () => {
  // ทดสอบการคำนวณส่วนลด
  it('คำนวณส่วนลดได้ถูกต้อง', () => {
    // เรียกใช้ฟังก์ชันที่ต้องการทดสอบ
    const result = calculateDiscount(1000, 10);
    
    // ตรวจสอบผลลัพธ์
    expect(result).toBe(900);
  });
  
  // ทดสอบการคำนวณส่วนลดที่เป็น 0%
  it('คำนวณส่วนลดที่เป็น 0% ได้ถูกต้อง', () => {
    // เรียกใช้ฟังก์ชันที่ต้องการทดสอบ
    const result = calculateDiscount(1000, 0);
    
    // ตรวจสอบผลลัพธ์
    expect(result).toBe(1000);
  });
  
  // ทดสอบการคำนวณส่วนลดที่เป็น 100%
  it('คำนวณส่วนลดที่เป็น 100% ได้ถูกต้อง', () => {
    // เรียกใช้ฟังก์ชันที่ต้องการทดสอบ
    const result = calculateDiscount(1000, 100);
    
    // ตรวจสอบผลลัพธ์
    expect(result).toBe(0);
  });
  
  // ทดสอบการคำนวณส่วนลดที่ไม่ถูกต้อง
  it('ส่งข้อผิดพลาดเมื่อส่วนลดไม่ถูกต้อง', () => {
    // ตรวจสอบว่าฟังก์ชันส่งข้อผิดพลาดเมื่อส่วนลดน้อยกว่า 0
    expect(() => calculateDiscount(1000, -10)).toThrow('ส่วนลดต้องอยู่ระหว่าง 0 ถึง 100');
    
    // ตรวจสอบว่าฟังก์ชันส่งข้อผิดพลาดเมื่อส่วนลดมากกว่า 100
    expect(() => calculateDiscount(1000, 110)).toThrow('ส่วนลดต้องอยู่ระหว่าง 0 ถึง 100');
  });
});`;

  // โค้ดตัวอย่างสำหรับคอมโพเนนต์ที่ต้องการทดสอบ
  const componentCode = `// app/components/Button.tsx
'use client';

import React from 'react';

// ประเภทของ props ที่รับเข้ามา
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

// คอมโพเนนต์ Button
export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
}: ButtonProps) {
  // กำหนด class ตาม variant
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  
  // กำหนด class ตาม size
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };
  
  // กำหนด class สำหรับปุ่มที่ถูก disabled
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';
  
  // รวม class ทั้งหมด
  const buttonClasses = \`
    \${variantClasses[variant]}
    \${sizeClasses[size]}
    \${disabledClasses}
    rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
  \`;
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      data-testid="button"
    >
      {children}
    </button>
  );
}`;

  // โค้ดตัวอย่างสำหรับการทดสอบคอมโพเนนต์
  const componentTestCode = `// __tests__/components/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/app/components/Button';

// กลุ่มการทดสอบสำหรับคอมโพเนนต์ Button
describe('Button', () => {
  // ทดสอบการแสดงผลปุ่มพื้นฐาน
  it('แสดงผลปุ่มพื้นฐานได้ถูกต้อง', () => {
    // แสดงผลคอมโพเนนต์
    render(<Button>ทดสอบ</Button>);
    
    // ค้นหาปุ่มด้วย data-testid
    const button = screen.getByTestId('button');
    
    // ตรวจสอบว่าปุ่มแสดงข้อความที่ถูกต้อง
    expect(button).toHaveTextContent('ทดสอบ');
    
    // ตรวจสอบว่าปุ่มมี class ที่ถูกต้อง
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('px-4 py-2');
    expect(button).not.toHaveClass('opacity-50');
    expect(button).not.toHaveClass('cursor-not-allowed');
  });
  
  // ทดสอบการแสดงผลปุ่มที่มี variant เป็น secondary
  it('แสดงผลปุ่มที่มี variant เป็น secondary ได้ถูกต้อง', () => {
    // แสดงผลคอมโพเนนต์
    render(<Button variant="secondary">ทดสอบ</Button>);
    
    // ค้นหาปุ่มด้วย data-testid
    const button = screen.getByTestId('button');
    
    // ตรวจสอบว่าปุ่มมี class ที่ถูกต้อง
    expect(button).toHaveClass('bg-gray-200');
    expect(button).not.toHaveClass('bg-primary');
  });
  
  // ทดสอบการแสดงผลปุ่มที่มี size เป็น large
  it('แสดงผลปุ่มที่มี size เป็น large ได้ถูกต้อง', () => {
    // แสดงผลคอมโพเนนต์
    render(<Button size="large">ทดสอบ</Button>);
    
    // ค้นหาปุ่มด้วย data-testid
    const button = screen.getByTestId('button');
    
    // ตรวจสอบว่าปุ่มมี class ที่ถูกต้อง
    expect(button).toHaveClass('px-6 py-3');
    expect(button).not.toHaveClass('px-4 py-2');
  });
  
  // ทดสอบการแสดงผลปุ่มที่ถูก disabled
  it('แสดงผลปุ่มที่ถูก disabled ได้ถูกต้อง', () => {
    // แสดงผลคอมโพเนนต์
    render(<Button disabled>ทดสอบ</Button>);
    
    // ค้นหาปุ่มด้วย data-testid
    const button = screen.getByTestId('button');
    
    // ตรวจสอบว่าปุ่มมี attribute disabled
    expect(button).toBeDisabled();
    
    // ตรวจสอบว่าปุ่มมี class ที่ถูกต้อง
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });
  
  // ทดสอบการคลิกปุ่ม
  it('เรียกใช้ฟังก์ชัน onClick เมื่อคลิกปุ่ม', () => {
    // สร้าง mock function
    const handleClick = jest.fn();
    
    // แสดงผลคอมโพเนนต์
    render(<Button onClick={handleClick}>ทดสอบ</Button>);
    
    // ค้นหาปุ่มด้วย data-testid
    const button = screen.getByTestId('button');
    
    // จำลองการคลิกปุ่ม
    fireEvent.click(button);
    
    // ตรวจสอบว่าฟังก์ชัน onClick ถูกเรียกใช้
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  // ทดสอบการคลิกปุ่มที่ถูก disabled
  it('ไม่เรียกใช้ฟังก์ชัน onClick เมื่อคลิกปุ่มที่ถูก disabled', () => {
    // สร้าง mock function
    const handleClick = jest.fn();
    
    // แสดงผลคอมโพเนนต์
    render(<Button onClick={handleClick} disabled>ทดสอบ</Button>);
    
    // ค้นหาปุ่มด้วย data-testid
    const button = screen.getByTestId('button');
    
    // จำลองการคลิกปุ่ม
    fireEvent.click(button);
    
    // ตรวจสอบว่าฟังก์ชัน onClick ไม่ถูกเรียกใช้
    expect(handleClick).not.toHaveBeenCalled();
  });
});`;

  // เนื้อหาเกี่ยวกับการทดสอบการทำงานร่วมกัน (Integration Testing)
  const integrationTestingContent = `## การทดสอบการทำงานร่วมกัน (Integration Testing)

การทดสอบการทำงานร่วมกันเป็นการทดสอบการทำงานร่วมกันของหลายๆ หน่วย:`;

  // โค้ดตัวอย่างสำหรับคอมโพเนนต์ที่ต้องการทดสอบการทำงานร่วมกัน
  const integrationComponentCode = `// app/components/ProductList.tsx
'use client';

import React, { useState } from 'react';
import { formatPrice } from '@/app/utils/helpers';

// ประเภทของสินค้า
interface Product {
  id: number;
  name: string;
  price: number;
}

// ประเภทของ props ที่รับเข้ามา
interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

// คอมโพเนนต์ ProductList
export default function ProductList({ products, onAddToCart }: ProductListProps) {
  // สถานะสำหรับเก็บสินค้าที่เลือก
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // ฟังก์ชันสำหรับเลือกสินค้า
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };
  
  // ฟังก์ชันสำหรับเพิ่มสินค้าลงในตะกร้า
  const handleAddToCart = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct);
      setSelectedProduct(null);
    }
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">รายการสินค้า</h2>
      
      <ul className="space-y-2" data-testid="product-list">
        {products.map(product => (
          <li
            key={product.id}
            className={\`p-3 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 \${
              selectedProduct?.id === product.id ? 'bg-gray-100 dark:bg-gray-800 border-primary' : ''
            }\`}
            onClick={() => handleSelectProduct(product)}
            data-testid={\`product-item-\${product.id}\`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{product.name}</span>
              <span className="text-primary">{formatPrice(product.price)}</span>
            </div>
          </li>
        ))}
      </ul>
      
      {selectedProduct && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">สินค้าที่เลือก</h3>
          <p>ชื่อ: {selectedProduct.name}</p>
          <p>ราคา: {formatPrice(selectedProduct.price)}</p>
          <button
            className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            onClick={handleAddToCart}
            data-testid="add-to-cart-button"
          >
            เพิ่มลงในตะกร้า
          </button>
        </div>
      )}
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับคอมโพเนนต์ ShoppingCart
  const shoppingCartComponentCode = `// app/components/ShoppingCart.tsx
'use client';

import React from 'react';
import { formatPrice } from '@/app/utils/helpers';

// ประเภทของสินค้าในตะกร้า
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// ประเภทของ props ที่รับเข้ามา
interface ShoppingCartProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

// คอมโพเนนต์ ShoppingCart
export default function ShoppingCart({ items, onRemoveItem, onClearCart }: ShoppingCartProps) {
  // คำนวณราคารวม
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">ตะกร้าสินค้า</h2>
        {items.length > 0 && (
          <button
            className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={onClearCart}
            data-testid="clear-cart-button"
          >
            ล้างตะกร้า
          </button>
        )}
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400" data-testid="empty-cart-message">
          ไม่มีสินค้าในตะกร้า
        </p>
      ) : (
        <>
          <ul className="space-y-2" data-testid="cart-items">
            {items.map(item => (
              <li
                key={item.id}
                className="p-3 border rounded-md"
                data-testid={\`cart-item-\${item.id}\`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      x{item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-primary mr-2">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      className="p-1 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() => onRemoveItem(item.id)}
                      data-testid={\`remove-item-\${item.id}\`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">ราคารวม:</span>
              <span className="text-lg font-bold text-primary" data-testid="total-price">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับคอมโพเนนต์ ShoppingApp
  const shoppingAppComponentCode = `// app/components/ShoppingApp.tsx
'use client';

import React, { useState } from 'react';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';

// ประเภทของสินค้า
interface Product {
  id: number;
  name: string;
  price: number;
}

// ประเภทของสินค้าในตะกร้า
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// คอมโพเนนต์ ShoppingApp
export default function ShoppingApp() {
  // สินค้าตัวอย่าง
  const sampleProducts: Product[] = [
    { id: 1, name: 'สินค้า A', price: 100 },
    { id: 2, name: 'สินค้า B', price: 200 },
    { id: 3, name: 'สินค้า C', price: 300 },
  ];
  
  // สถานะสำหรับเก็บสินค้าในตะกร้า
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // ฟังก์ชันสำหรับเพิ่มสินค้าลงในตะกร้า
  const handleAddToCart = (product: Product) => {
    // ตรวจสอบว่าสินค้านี้มีในตะกร้าแล้วหรือไม่
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // ถ้ามีสินค้านี้ในตะกร้าแล้ว ให้เพิ่มจำนวน
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // ถ้ายังไม่มีสินค้านี้ในตะกร้า ให้เพิ่มสินค้าใหม่
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  
  // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // ฟังก์ชันสำหรับล้างตะกร้า
  const handleClearCart = () => {
    setCartItems([]);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductList
        products={sampleProducts}
        onAddToCart={handleAddToCart}
      />
      
      <ShoppingCart
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับการทดสอบการทำงานร่วมกัน
  const integrationTestCode = `// __tests__/integration/ShoppingApp.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingApp from '@/app/components/ShoppingApp';

// กลุ่มการทดสอบสำหรับ ShoppingApp
describe('ShoppingApp Integration', () => {
  // ทดสอบการแสดงผลแอปพลิเคชันเริ่มต้น
  it('แสดงผลแอปพลิเคชันเริ่มต้นได้ถูกต้อง', () => {
    // แสดงผลคอมโพเนนต์
    render(<ShoppingApp />);
    
    // ตรวจสอบว่ามีรายการสินค้า
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    
    // ตรวจสอบว่ามีสินค้า 3 รายการ
    expect(screen.getByTestId('product-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-item-3')).toBeInTheDocument();
    
    // ตรวจสอบว่าตะกร้าสินค้าว่างเปล่า
    expect(screen.getByTestId('empty-cart-message')).toBeInTheDocument();
    expect(screen.queryByTestId('cart-items')).not.toBeInTheDocument();
  });
  
  // ทดสอบการเพิ่มสินค้าลงในตะกร้า
  it('เพิ่มสินค้าลงในตะกร้าได้ถูกต้อง', () => {
    // แสดงผลคอมโพเนนต์
    render(<ShoppingApp />);
    
    // คลิกที่สินค้าเพื่อเลือก
    fireEvent.click(screen.getByTestId('product-item-1'));
    
    // ตรวจสอบว่าสินค้าถูกเลือก
    expect(screen.getByText('สินค้าที่เลือก')).toBeInTheDocument();
    expect(screen.getByText('ชื่อ: สินค้า A')).toBeInTheDocument();
    
    // คลิกปุ่ม "เพิ่มลงในตะกร้า"
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    
    // ตรวจสอบว่าสินค้าถูกเพิ่มลงในตะกร้า
    expect(screen.queryByTestId('empty-cart-message')).not.toBeInTheDocument();
    expect(screen.getByTestId('cart-items')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(screen.getByText('สินค้า A')).toBeInTheDocument();
    expect(screen.getByText('x1')).toBeInTheDocument();
    
    // ตรวจสอบราคารวม
    expect(screen.getByTestId('total-price')).toHaveTextContent('฿100.00');
  });
  
  // ทดสอบการเพิ่มสินค้าหลายรายการลงในตะกร้า
  it('เพิ่มสินค้าหลายรายการลงในตะกร้าได้ถูกต้อง', () => {
    // แสดงผลคอมโพเนนต์
    render(<ShoppingApp />);
    
    // เพิ่มสินค้า A ลงในตะกร้า
    fireEvent.click(screen.getByTestId('product-item-1'));
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    
    // เพิ่มสินค้า B ลงในตะกร้า
    fireEvent.click(screen.getByTestId('product-item-2'));
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    
    // ตรวจสอบว่ามีสินค้า 2 รายการในตะกร้า
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
    
    // ตรวจสอบราคารวม
    expect(screen.getByTestId('total-price')).toHaveTextContent('฿300.00');
  });
  
  // ทดสอบการเพิ่มสินค้าเดิมลงในตะกร้าซ้ำ
  it('เพิ่มสินค้าเดิมลงในตะกร้าซ้ำได้ถูกต้อง', () => {
    // แสดงผลคอมโพเนนต์
    render(<ShoppingApp />);
    
    // เพิ่มสินค้า A ลงในตะกร้า
    fireEvent.click(screen.getByTestId('product-item-1'));
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    
    // เพิ่มสินค้า A ลงในตะกร้าอีกครั้ง
    fireEvent.click(screen.getByTestId('product-item-1'));
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    
    // ตรวจสอบว่ามีสินค้า A ในตะกร้า 1 รายการ แต่จำนวนเป็น 2
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(screen.getByText('x2')).toBeInTheDocument();
    
    // ตรวจสอบราคารวม
    expect(screen.getByTestId('total-price')).toHaveTextContent('฿200.00');
  });
  
  // ทดสอบการลบสินค้าออกจากตะกร้า
  it('ลบสินค้าออกจากตะกร้าได้ถูกต้อง', () => {
    // แสดงผลคอมโพเนนต์
    render(<ShoppingApp />);
    
    // เพิ่มสินค้า A และ B ลงในตะกร้า
    fireEvent.click(screen.getByTestId('product-item-1'));
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    fireEvent.click(screen.getByTestId('product-item-2'));
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    
    // ลบสินค้า A ออกจากตะกร้า
    fireEvent.click(screen.getByTestId('remove-item-1'));
    
    // ตรวจสอบว่าสินค้า A ถูกลบออกจากตะกร้า
    expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
    
    // ตรวจสอบราคารวม
    expect(screen.getByTestId('total-price')).toHaveTextContent('฿200.00');
  });
  
  // ทดสอบการล้างตะกร้า
  it('ล้างตะกร้าได้ถูกต้อง', () => {
    // แสดงผลคอมโพเนนต์
    render(<ShoppingApp />);
    
    // เพิ่มสินค้า A และ B ลงในตะกร้า
    fireEvent.click(screen.getByTestId('product-item-1'));
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    fireEvent.click(screen.getByTestId('product-item-2'));
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    
    // ล้างตะกร้า
    fireEvent.click(screen.getByTestId('clear-cart-button'));
    
    // ตรวจสอบว่าตะกร้าว่างเปล่า
    expect(screen.getByTestId('empty-cart-message')).toBeInTheDocument();
    expect(screen.queryByTestId('cart-items')).not.toBeInTheDocument();
  });
});`;

  // เนื้อหาเกี่ยวกับการทดสอบ API Routes
  const apiTestingContent = `## การทดสอบ API Routes

การทดสอบ API Routes เป็นการทดสอบ API ที่สร้างขึ้นใน Next.js:`;

  // โค้ดตัวอย่างสำหรับ API Route
  const apiRouteCode = `// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ประเภทของสินค้า
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// ข้อมูลสินค้าตัวอย่าง
const products: Product[] = [
  { id: 1, name: 'สินค้า A', price: 100, stock: 10 },
  { id: 2, name: 'สินค้า B', price: 200, stock: 5 },
  { id: 3, name: 'สินค้า C', price: 300, stock: 3 },
];

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าทั้งหมด
export async function GET(request: NextRequest) {
  // ดึงค่า query parameter
  const { searchParams } = new URL(request.url);
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  
  // กรองสินค้าตาม query parameter
  let filteredProducts = [...products];
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      product => product.price >= parseInt(minPrice)
    );
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      product => product.price <= parseInt(maxPrice)
    );
  }
  
  // ส่งข้อมูลสินค้ากลับไป
  return NextResponse.json(filteredProducts);
}

// ฟังก์ชันสำหรับเพิ่มสินค้าใหม่
export async function POST(request: NextRequest) {
  try {
    // รับข้อมูลสินค้าใหม่จาก request body
    const newProduct: Omit<Product, 'id'> = await request.json();
    
    // ตรวจสอบข้อมูลสินค้า
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }
    
    // สร้าง ID ใหม่
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    // เพิ่มสินค้าใหม่
    const product: Product = {
      id: newId,
      name: newProduct.name,
      price: newProduct.price,
      stock: newProduct.stock,
    };
    
    products.push(product);
    
    // ส่งข้อมูลสินค้าที่เพิ่มกลับไป
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    // ส่งข้อผิดพลาดกลับไป
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า' },
      { status: 500 }
    );
  }
}`;

  // โค้ดตัวอย่างสำหรับ API Route ที่รับ ID
  const apiRouteWithIdCode = `// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ประเภทของสินค้า
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// ข้อมูลสินค้าตัวอย่าง (ใช้ข้อมูลเดียวกับไฟล์ app/api/products/route.ts)
const products: Product[] = [
  { id: 1, name: 'สินค้า A', price: 100, stock: 10 },
  { id: 2, name: 'สินค้า B', price: 200, stock: 5 },
  { id: 3, name: 'สินค้า C', price: 300, stock: 3 },
];

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าตาม ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // แปลง ID เป็นตัวเลข
  const id = parseInt(params.id);
  
  // ค้นหาสินค้าตาม ID
  const product = products.find(p => p.id === id);
  
  // ถ้าไม่พบสินค้า
  if (!product) {
    return NextResponse.json(
      { error: 'ไม่พบสินค้า' },
      { status: 404 }
    );
  }
  
  // ส่งข้อมูลสินค้ากลับไป
  return NextResponse.json(product);
}

// ฟังก์ชันสำหรับอัปเดตสินค้า
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // แปลง ID เป็นตัวเลข
    const id = parseInt(params.id);
    
    // ค้นหาสินค้าตาม ID
    const productIndex = products.findIndex(p => p.id === id);
    
    // ถ้าไม่พบสินค้า
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'ไม่พบสินค้า' },
        { status: 404 }
      );
    }
    
    // รับข้อมูลสินค้าที่อัปเดตจาก request body
    const updatedProduct: Omit<Product, 'id'> = await request.json();
    
    // ตรวจสอบข้อมูลสินค้า
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.stock) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }
    
    // อัปเดตสินค้า
    products[productIndex] = {
      id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      stock: updatedProduct.stock,
    };
    
    // ส่งข้อมูลสินค้าที่อัปเดตกลับไป
    return NextResponse.json(products[productIndex]);
  } catch (error) {
    // ส่งข้อผิดพลาดกลับไป
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัปเดตสินค้า' },
      { status: 500 }
    );
  }
}

// ฟังก์ชันสำหรับลบสินค้า
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // แปลง ID เป็นตัวเลข
  const id = parseInt(params.id);
  
  // ค้นหาสินค้าตาม ID
  const productIndex = products.findIndex(p => p.id === id);
  
  // ถ้าไม่พบสินค้า
  if (productIndex === -1) {
    return NextResponse.json(
      { error: 'ไม่พบสินค้า' },
      { status: 404 }
    );
  }
  
  // ลบสินค้า
  const deletedProduct = products[productIndex];
  products.splice(productIndex, 1);
  
  // ส่งข้อมูลสินค้าที่ลบกลับไป
  return NextResponse.json(deletedProduct);
}`;

  // โค้ดตัวอย่างสำหรับการทดสอบ API Routes
  const apiTestCode = `// __tests__/api/products.test.ts
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/products/route';

// Mock NextRequest
function createMockRequest(url: string, body?: any): NextRequest {
  const request = {
    url,
    json: jest.fn().mockResolvedValue(body),
  } as unknown as NextRequest;
  
  return request;
}

// กลุ่มการทดสอบสำหรับ API Route /api/products
describe('Products API', () => {
  // ทดสอบการดึงข้อมูลสินค้าทั้งหมด
  it('GET /api/products ดึงข้อมูลสินค้าทั้งหมดได้ถูกต้อง', async () => {
    // สร้าง mock request
    const request = createMockRequest('http://localhost:3000/api/products');
    
    // เรียกใช้ฟังก์ชัน GET
    const response = await GET(request);
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อมูลสินค้าทั้งหมด
    expect(response.status).toBe(200);
    expect(data).toHaveLength(3);
    expect(data[0].name).toBe('สินค้า A');
    expect(data[1].name).toBe('สินค้า B');
    expect(data[2].name).toBe('สินค้า C');
  });
  
  // ทดสอบการดึงข้อมูลสินค้าที่มีราคาขั้นต่ำ
  it('GET /api/products?minPrice=200 ดึงข้อมูลสินค้าที่มีราคาขั้นต่ำได้ถูกต้อง', async () => {
    // สร้าง mock request
    const request = createMockRequest('http://localhost:3000/api/products?minPrice=200');
    
    // เรียกใช้ฟังก์ชัน GET
    const response = await GET(request);
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อมูลสินค้าที่มีราคาตั้งแต่ 200 ขึ้นไป
    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0].name).toBe('สินค้า B');
    expect(data[1].name).toBe('สินค้า C');
  });
  
  // ทดสอบการดึงข้อมูลสินค้าที่มีราคาสูงสุด
  it('GET /api/products?maxPrice=200 ดึงข้อมูลสินค้าที่มีราคาสูงสุดได้ถูกต้อง', async () => {
    // สร้าง mock request
    const request = createMockRequest('http://localhost:3000/api/products?maxPrice=200');
    
    // เรียกใช้ฟังก์ชัน GET
    const response = await GET(request);
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อมูลสินค้าที่มีราคาไม่เกิน 200
    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0].name).toBe('สินค้า A');
    expect(data[1].name).toBe('สินค้า B');
  });
  
  // ทดสอบการดึงข้อมูลสินค้าที่มีราคาระหว่าง minPrice และ maxPrice
  it('GET /api/products?minPrice=100&maxPrice=200 ดึงข้อมูลสินค้าที่มีราคาระหว่าง minPrice และ maxPrice ได้ถูกต้อง', async () => {
    // สร้าง mock request
    const request = createMockRequest('http://localhost:3000/api/products?minPrice=100&maxPrice=200');
    
    // เรียกใช้ฟังก์ชัน GET
    const response = await GET(request);
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อมูลสินค้าที่มีราคาระหว่าง 100 ถึง 200
    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0].name).toBe('สินค้า A');
    expect(data[1].name).toBe('สินค้า B');
  });
  
  // ทดสอบการเพิ่มสินค้าใหม่
  it('POST /api/products เพิ่มสินค้าใหม่ได้ถูกต้อง', async () => {
    // สร้าง mock request
    const newProduct = {
      name: 'สินค้า D',
      price: 400,
      stock: 2,
    };
    
    const request = createMockRequest('http://localhost:3000/api/products', newProduct);
    
    // เรียกใช้ฟังก์ชัน POST
    const response = await POST(request);
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อมูลสินค้าที่เพิ่ม
    expect(response.status).toBe(201);
    expect(data.id).toBe(4);
    expect(data.name).toBe('สินค้า D');
    expect(data.price).toBe(400);
    expect(data.stock).toBe(2);
    
    // ตรวจสอบว่าสินค้าถูกเพิ่มเข้าไปในรายการสินค้า
    const getRequest = createMockRequest('http://localhost:3000/api/products');
    const getResponse = await GET(getRequest);
    const products = await getResponse.json();
    
    expect(products).toHaveLength(4);
    expect(products[3].name).toBe('สินค้า D');
  });
  
  // ทดสอบการเพิ่มสินค้าใหม่ที่ข้อมูลไม่ครบถ้วน
  it('POST /api/products ส่งข้อผิดพลาดเมื่อข้อมูลไม่ครบถ้วน', async () => {
    // สร้าง mock request
    const invalidProduct = {
      name: 'สินค้า E',
      // ไม่มี price และ stock
    };
    
    const request = createMockRequest('http://localhost:3000/api/products', invalidProduct);
    
    // เรียกใช้ฟังก์ชัน POST
    const response = await POST(request);
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อผิดพลาด
    expect(response.status).toBe(400);
    expect(data.error).toBe('กรุณากรอกข้อมูลให้ครบถ้วน');
  });
});`;

  // โค้ดตัวอย่างสำหรับการทดสอบ API Routes ที่รับ ID
  const apiWithIdTestCode = `// __tests__/api/products-id.test.ts
import { NextRequest } from 'next/server';
import { GET, PUT, DELETE } from '@/app/api/products/[id]/route';

// Mock NextRequest
function createMockRequest(url: string, body?: any): NextRequest {
  const request = {
    url,
    json: jest.fn().mockResolvedValue(body),
  } as unknown as NextRequest;
  
  return request;
}

// กลุ่มการทดสอบสำหรับ API Route /api/products/[id]
describe('Products ID API', () => {
  // ทดสอบการดึงข้อมูลสินค้าตาม ID
  it('GET /api/products/1 ดึงข้อมูลสินค้าตาม ID ได้ถูกต้อง', async () => {
    // สร้าง mock request
    const request = createMockRequest('http://localhost:3000/api/products/1');
    
    // เรียกใช้ฟังก์ชัน GET
    const response = await GET(request, { params: { id: '1' } });
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อมูลสินค้าที่ถูกต้อง
    expect(response.status).toBe(200);
    expect(data.id).toBe(1);
    expect(data.name).toBe('สินค้า A');
    expect(data.price).toBe(100);
    expect(data.stock).toBe(10);
  });
  
  // ทดสอบการดึงข้อมูลสินค้าที่ไม่มีอยู่
  it('GET /api/products/999 ส่งข้อผิดพลาดเมื่อไม่พบสินค้า', async () => {
    // สร้าง mock request
    const request = createMockRequest('http://localhost:3000/api/products/999');
    
    // เรียกใช้ฟังก์ชัน GET
    const response = await GET(request, { params: { id: '999' } });
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อผิดพลาด
    expect(response.status).toBe(404);
    expect(data.error).toBe('ไม่พบสินค้า');
  });
  
  // ทดสอบการอัปเดตสินค้า
  it('PUT /api/products/1 อัปเดตสินค้าได้ถูกต้อง', async () => {
    // สร้าง mock request
    const updatedProduct = {
      name: 'สินค้า A (อัปเดต)',
      price: 150,
      stock: 5,
    };
    
    const request = createMockRequest('http://localhost:3000/api/products/1', updatedProduct);
    
    // เรียกใช้ฟังก์ชัน PUT
    const response = await PUT(request, { params: { id: '1' } });
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อมูลสินค้าที่อัปเดต
    expect(response.status).toBe(200);
    expect(data.id).toBe(1);
    expect(data.name).toBe('สินค้า A (อัปเดต)');
    expect(data.price).toBe(150);
    expect(data.stock).toBe(5);
  });
  
  // ทดสอบการอัปเดตสินค้าที่ไม่มีอยู่
  it('PUT /api/products/999 ส่งข้อผิดพลาดเมื่อไม่พบสินค้า', async () => {
    // สร้าง mock request
    const updatedProduct = {
      name: 'สินค้าที่ไม่มีอยู่',
      price: 999,
      stock: 999,
    };
    
    const request = createMockRequest('http://localhost:3000/api/products/999', updatedProduct);
    
    // เรียกใช้ฟังก์ชัน PUT
    const response = await PUT(request, { params: { id: '999' } });
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อผิดพลาด
    expect(response.status).toBe(404);
    expect(data.error).toBe('ไม่พบสินค้า');
  });
  
  // ทดสอบการอัปเดตสินค้าที่ข้อมูลไม่ครบถ้วน
  it('PUT /api/products/1 ส่งข้อผิดพลาดเมื่อข้อมูลไม่ครบถ้วน', async () => {
    // สร้าง mock request
    const invalidProduct = {
      name: 'สินค้า A (อัปเดต)',
      // ไม่มี price และ stock
    };
    
    const request = createMockRequest('http://localhost:3000/api/products/1', invalidProduct);
    
    // เรียกใช้ฟังก์ชัน PUT
    const response = await PUT(request, { params: { id: '1' } });
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อผิดพลาด
    expect(response.status).toBe(400);
    expect(data.error).toBe('กรุณากรอกข้อมูลให้ครบถ้วน');
  });
  
  // ทดสอบการลบสินค้า
  it('DELETE /api/products/2 ลบสินค้าได้ถูกต้อง', async () => {
    // สร้าง mock request
    const request = createMockRequest('http://localhost:3000/api/products/2');
    
    // เรียกใช้ฟังก์ชัน DELETE
    const response = await DELETE(request, { params: { id: '2' } });
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อมูลสินค้าที่ลบ
    expect(response.status).toBe(200);
    expect(data.id).toBe(2);
    expect(data.name).toBe('สินค้า B');
  });
  
  // ทดสอบการลบสินค้าที่ไม่มีอยู่
  it('DELETE /api/products/999 ส่งข้อผิดพลาดเมื่อไม่พบสินค้า', async () => {
    // สร้าง mock request
    const request = createMockRequest('http://localhost:3000/api/products/999');
    
    // เรียกใช้ฟังก์ชัน DELETE
    const response = await DELETE(request, { params: { id: '999' } });
    const data = await response.json();
    
    // ตรวจสอบว่าได้รับข้อผิดพลาด
    expect(response.status).toBe(404);
    expect(data.error).toBe('ไม่พบสินค้า');
  });
});`;

  // เนื้อหาเกี่ยวกับการทดสอบแบบ End-to-End
  const e2eTestingContent = `## การทดสอบแบบ End-to-End (E2E Testing)

การทดสอบแบบ End-to-End เป็นการทดสอบแอปพลิเคชันทั้งหมดเสมือนผู้ใช้จริง โดยใช้ Playwright หรือ Cypress:`;

  // โค้ดตัวอย่างสำหรับการทดสอบแบบ End-to-End ด้วย Playwright
  const playwrightTestCode = `// e2e/shopping-app.spec.ts
import { test, expect } from '@playwright/test';

// กลุ่มการทดสอบสำหรับ ShoppingApp
test.describe('ShoppingApp E2E', () => {
  // ทดสอบการแสดงผลแอปพลิเคชันเริ่มต้น
  test('แสดงผลแอปพลิเคชันเริ่มต้นได้ถูกต้อง', async ({ page }) => {
    // เข้าสู่หน้าเว็บ
    await page.goto('/shopping');
    
    // ตรวจสอบว่ามีรายการสินค้า
    await expect(page.getByTestId('product-list')).toBeVisible();
    
    // ตรวจสอบว่ามีสินค้า 3 รายการ
    await expect(page.getByTestId('product-item-1')).toBeVisible();
    await expect(page.getByTestId('product-item-2')).toBeVisible();
    await expect(page.getByTestId('product-item-3')).toBeVisible();
    
    // ตรวจสอบว่าตะกร้าสินค้าว่างเปล่า
    await expect(page.getByTestId('empty-cart-message')).toBeVisible();
    await expect(page.getByTestId('cart-items')).not.toBeVisible();
  });
  
  // ทดสอบการเพิ่มสินค้าลงในตะกร้า
  test('เพิ่มสินค้าลงในตะกร้าได้ถูกต้อง', async ({ page }) => {
    // เข้าสู่หน้าเว็บ
    await page.goto('/shopping');
    
    // คลิกที่สินค้าเพื่อเลือก
    await page.getByTestId('product-item-1').click();
    
    // ตรวจสอบว่าสินค้าถูกเลือก
    await expect(page.getByText('สินค้าที่เลือก')).toBeVisible();
    await expect(page.getByText('ชื่อ: สินค้า A')).toBeVisible();
    
    // คลิกปุ่ม "เพิ่มลงในตะกร้า"
    await page.getByTestId('add-to-cart-button').click();
    
    // ตรวจสอบว่าสินค้าถูกเพิ่มลงในตะกร้า
    await expect(page.getByTestId('empty-cart-message')).not.toBeVisible();
    await expect(page.getByTestId('cart-items')).toBeVisible();
    await expect(page.getByTestId('cart-item-1')).toBeVisible();
    await expect(page.getByText('สินค้า A')).toBeVisible();
    await expect(page.getByText('x1')).toBeVisible();
    
    // ตรวจสอบราคารวม
    await expect(page.getByTestId('total-price')).toHaveText('฿100.00');
  });
  
  // ทดสอบการเพิ่มสินค้าหลายรายการลงในตะกร้า
  test('เพิ่มสินค้าหลายรายการลงในตะกร้าได้ถูกต้อง', async ({ page }) => {
    // เข้าสู่หน้าเว็บ
    await page.goto('/shopping');
    
    // เพิ่มสินค้า A ลงในตะกร้า
    await page.getByTestId('product-item-1').click();
    await page.getByTestId('add-to-cart-button').click();
    
    // เพิ่มสินค้า B ลงในตะกร้า
    await page.getByTestId('product-item-2').click();
    await page.getByTestId('add-to-cart-button').click();
    
    // ตรวจสอบว่ามีสินค้า 2 รายการในตะกร้า
    await expect(page.getByTestId('cart-item-1')).toBeVisible();
    await expect(page.getByTestId('cart-item-2')).toBeVisible();
    
    // ตรวจสอบราคารวม
    await expect(page.getByTestId('total-price')).toHaveText('฿300.00');
  });
  
  // ทดสอบการลบสินค้าออกจากตะกร้า
  test('ลบสินค้าออกจากตะกร้าได้ถูกต้อง', async ({ page }) => {
    // เข้าสู่หน้าเว็บ
    await page.goto('/shopping');
    
    // เพิ่มสินค้า A และ B ลงในตะกร้า
    await page.getByTestId('product-item-1').click();
    await page.getByTestId('add-to-cart-button').click();
    await page.getByTestId('product-item-2').click();
    await page.getByTestId('add-to-cart-button').click();
    
    // ลบสินค้า A ออกจากตะกร้า
    await page.getByTestId('remove-item-1').click();
    
    // ตรวจสอบว่าสินค้า A ถูกลบออกจากตะกร้า
    await expect(page.getByTestId('cart-item-1')).not.toBeVisible();
    await expect(page.getByTestId('cart-item-2')).toBeVisible();
    
    // ตรวจสอบราคารวม
    await expect(page.getByTestId('total-price')).toHaveText('฿200.00');
  });
  
  // ทดสอบการล้างตะกร้า
  test('ล้างตะกร้าได้ถูกต้อง', async ({ page }) => {
    // เข้าสู่หน้าเว็บ
    await page.goto('/shopping');
    
    // เพิ่มสินค้า A และ B ลงในตะกร้า
    await page.getByTestId('product-item-1').click();
    await page.getByTestId('add-to-cart-button').click();
    await page.getByTestId('product-item-2').click();
    await page.getByTestId('add-to-cart-button').click();
    
    // ล้างตะกร้า
    await page.getByTestId('clear-cart-button').click();
    
    // ตรวจสอบว่าตะกร้าว่างเปล่า
    await expect(page.getByTestId('empty-cart-message')).toBeVisible();
    await expect(page.getByTestId('cart-items')).not.toBeVisible();
  });
});`;

  // เนื้อหาเกี่ยวกับการทดสอบ Snapshot
  const snapshotTestingContent = `## การทดสอบ Snapshot (Snapshot Testing)

การทดสอบ Snapshot เป็นการทดสอบการเปลี่ยนแปลงของ UI:`;

  // โค้ดตัวอย่างสำหรับการทดสอบ Snapshot
  const snapshotTestCode = `// __tests__/components/Button.snapshot.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import Button from '@/app/components/Button';

// กลุ่มการทดสอบสำหรับ Button Snapshot
describe('Button Snapshot', () => {
  // ทดสอบ snapshot ของปุ่มพื้นฐาน
  it('ตรงกับ snapshot ของปุ่มพื้นฐาน', () => {
    // แสดงผลคอมโพเนนต์
    const { container } = render(<Button>ทดสอบ</Button>);
    
    // ตรวจสอบว่าตรงกับ snapshot
    expect(container).toMatchSnapshot();
  });
  
  // ทดสอบ snapshot ของปุ่มที่มี variant เป็น secondary
  it('ตรงกับ snapshot ของปุ่มที่มี variant เป็น secondary', () => {
    // แสดงผลคอมโพเนนต์
    const { container } = render(<Button variant="secondary">ทดสอบ</Button>);
    
    // ตรวจสอบว่าตรงกับ snapshot
    expect(container).toMatchSnapshot();
  });
  
  // ทดสอบ snapshot ของปุ่มที่มี variant เป็น danger
  it('ตรงกับ snapshot ของปุ่มที่มี variant เป็น danger', () => {
    // แสดงผลคอมโพเนนต์
    const { container } = render(<Button variant="danger">ทดสอบ</Button>);
    
    // ตรวจสอบว่าตรงกับ snapshot
    expect(container).toMatchSnapshot();
  });
  
  // ทดสอบ snapshot ของปุ่มที่มี size เป็น small
  it('ตรงกับ snapshot ของปุ่มที่มี size เป็น small', () => {
    // แสดงผลคอมโพเนนต์
    const { container } = render(<Button size="small">ทดสอบ</Button>);
    
    // ตรวจสอบว่าตรงกับ snapshot
    expect(container).toMatchSnapshot();
  });
  
  // ทดสอบ snapshot ของปุ่มที่มี size เป็น large
  it('ตรงกับ snapshot ของปุ่มที่มี size เป็น large', () => {
    // แสดงผลคอมโพเนนต์
    const { container } = render(<Button size="large">ทดสอบ</Button>);
    
    // ตรวจสอบว่าตรงกับ snapshot
    expect(container).toMatchSnapshot();
  });
  
  // ทดสอบ snapshot ของปุ่มที่ถูก disabled
  it('ตรงกับ snapshot ของปุ่มที่ถูก disabled', () => {
    // แสดงผลคอมโพเนนต์
    const { container } = render(<Button disabled>ทดสอบ</Button>);
    
    // ตรวจสอบว่าตรงกับ snapshot
    expect(container).toMatchSnapshot();
  });
});`;

  // เนื้อหาเกี่ยวกับการตั้งค่า Jest
  const jestConfigContent = `## การตั้งค่า Jest

การตั้งค่า Jest สำหรับการทดสอบใน Next.js:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Jest
  const jestConfigCode = `// jest.config.js
const nextJest = require('next/jest');

// สร้างฟังก์ชันสำหรับตั้งค่า Next.js
const createJestConfig = nextJest({
  // ตำแหน่งของแอปพลิเคชัน Next.js
  dir: './',
});

// ตั้งค่า Jest
const customJestConfig = {
  // ตำแหน่งของไฟล์ setup
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // ตำแหน่งของไฟล์ที่ต้องการทดสอบ
  testEnvironment: 'jest-environment-jsdom',
  
  // กำหนด module name mapper
  moduleNameMapper: {
    // กำหนด alias
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  
  // กำหนด coverage
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  
  // กำหนด threshold ของ coverage
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// สร้างและส่งออกค่าตั้งค่า Jest
module.exports = createJestConfig(customJestConfig);`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Jest Setup
  const jestSetupCode = `// jest.setup.js
// นำเข้า jest-dom
import '@testing-library/jest-dom';

// Mock Next.js components
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    forEach: jest.fn(),
    entries: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
  }),
  usePathname: () => '/test',
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  
  observe() {
    return null;
  }
  
  unobserve() {
    return null;
  }
  
  disconnect() {
    return null;
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});`;

  // เนื้อหาเกี่ยวกับการตั้งค่า Playwright
  const playwrightConfigContent = `## การตั้งค่า Playwright

การตั้งค่า Playwright สำหรับการทดสอบแบบ End-to-End ใน Next.js:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Playwright
  const playwrightConfigCode = `// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

// ตั้งค่า Playwright
export default defineConfig({
  // ตำแหน่งของไฟล์ที่ต้องการทดสอบ
  testDir: './e2e',
  
  // จำนวนครั้งที่ทดสอบซ้ำเมื่อล้มเหลว
  retries: process.env.CI ? 2 : 0,
  
  // จำนวน worker ที่ใช้ในการทดสอบ
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter
  reporter: [
    ['html'],
    ['list'],
  ],
  
  // ตั้งค่า global setup
  globalSetup: './e2e/global-setup.ts',
  
  // ตั้งค่า global teardown
  globalTeardown: './e2e/global-teardown.ts',
  
  // ตั้งค่า use
  use: {
    // Base URL
    baseURL: 'http://localhost:3000',
    
    // บันทึกวิดีโอเมื่อทดสอบล้มเหลว
    video: 'on-first-retry',
    
    // บันทึกหน้าจอเมื่อทดสอบล้มเหลว
    screenshot: 'only-on-failure',
    
    // บันทึก trace เมื่อทดสอบล้มเหลว
    trace: 'on-first-retry',
  },
  
  // ตั้งค่า projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  // ตั้งค่า web server
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Playwright Global Setup
  const playwrightGlobalSetupCode = `// e2e/global-setup.ts
import { chromium } from '@playwright/test';

// Global setup
async function globalSetup() {
  // สร้าง browser
  const browser = await chromium.launch();
  
  // สร้าง context
  const context = await browser.newContext();
  
  // สร้าง page
  const page = await context.newPage();
  
  // เข้าสู่หน้าเว็บ
  await page.goto('http://localhost:3000');
  
  // ทำการล็อกอิน (ถ้าจำเป็น)
  // await page.fill('input[name="email"]', 'test@example.com');
  // await page.fill('input[name="password"]', 'password');
  // await page.click('button[type="submit"]');
  
  // บันทึก storage state
  await page.context().storageState({ path: './e2e/storage-state.json' });
  
  // ปิด browser
  await browser.close();
}

export default globalSetup;`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้เทคนิคต่างๆ ในการทดสอบแอปพลิเคชัน Next.js ดังนี้:

1. การทดสอบหน่วย (Unit Testing)
   - การทดสอบฟังก์ชัน
   - การทดสอบคอมโพเนนต์

2. การทดสอบการทำงานร่วมกัน (Integration Testing)
   - การทดสอบการทำงานร่วมกันของหลายๆ คอมโพเนนต์

3. การทดสอบ API Routes
   - การทดสอบ API Routes ที่รับ query parameter
   - การทดสอบ API Routes ที่รับ ID

4. การทดสอบแบบ End-to-End (E2E Testing)
   - การทดสอบแอปพลิเคชันทั้งหมดเสมือนผู้ใช้จริง

5. การทดสอบ Snapshot (Snapshot Testing)
   - การทดสอบการเปลี่ยนแปลงของ UI

6. การตั้งค่า Jest และ Playwright
   - การตั้งค่า Jest สำหรับการทดสอบหน่วยและการทดสอบการทำงานร่วมกัน
   - การตั้งค่า Playwright สำหรับการทดสอบแบบ End-to-End

การทดสอบเป็นส่วนสำคัญในการพัฒนาแอปพลิเคชัน Next.js ที่มีคุณภาพสูง ซึ่งจะช่วยให้คุณมั่นใจว่าแอปพลิเคชันของคุณทำงานได้อย่างถูกต้องและมีประสิทธิภาพ`;

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
            <h1 className="text-3xl font-bold mb-2">การทดสอบ (Testing)</h1>
            <p className="text-text-secondary">ตัวอย่างการทดสอบใน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับสูง
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
        <MarkdownContent content={unitTestingContent} />
        <CodeBlock code={functionTestingCode} language="typescript" fileName="app/utils/helpers.ts" />
        <CodeBlock code={functionTestCode} language="typescript" fileName="__tests__/utils/helpers.test.ts" />
        <CodeBlock code={componentCode} language="tsx" fileName="app/components/Button.tsx" />
        <CodeBlock code={componentTestCode} language="tsx" fileName="__tests__/components/Button.test.tsx" />
        <MarkdownContent content={integrationTestingContent} />
        <CodeBlock code={integrationComponentCode} language="tsx" fileName="app/components/ProductList.tsx" />
        <CodeBlock code={shoppingCartComponentCode} language="tsx" fileName="app/components/ShoppingCart.tsx" />
        <CodeBlock code={shoppingAppComponentCode} language="tsx" fileName="app/components/ShoppingApp.tsx" />
        <CodeBlock code={integrationTestCode} language="tsx" fileName="__tests__/integration/ShoppingApp.test.tsx" />
        <MarkdownContent content={apiTestingContent} />
        <CodeBlock code={apiRouteCode} language="typescript" fileName="app/api/products/route.ts" />
        <CodeBlock code={apiRouteWithIdCode} language="typescript" fileName="app/api/products/[id]/route.ts" />
        <CodeBlock code={apiTestCode} language="typescript" fileName="__tests__/api/products.test.ts" />
        <CodeBlock code={apiWithIdTestCode} language="typescript" fileName="__tests__/api/products-id.test.ts" />
        <MarkdownContent content={e2eTestingContent} />
        <CodeBlock code={playwrightTestCode} language="typescript" fileName="e2e/shopping-app.spec.ts" />
        <MarkdownContent content={snapshotTestingContent} />
        <CodeBlock code={snapshotTestCode} language="tsx" fileName="__tests__/components/Button.snapshot.test.tsx" />
        <MarkdownContent content={jestConfigContent} />
        <CodeBlock code={jestConfigCode} language="javascript" fileName="jest.config.js" />
        <CodeBlock code={jestSetupCode} language="javascript" fileName="jest.setup.js" />
        <MarkdownContent content={playwrightConfigContent} />
        <CodeBlock code={playwrightConfigCode} language="typescript" fileName="playwright.config.ts" />
        <CodeBlock code={playwrightGlobalSetupCode} language="typescript" fileName="e2e/global-setup.ts" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
