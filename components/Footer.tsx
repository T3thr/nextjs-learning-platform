"use client";

import Link from 'next/link';

// คอมโพเนนต์ Footer สำหรับแสดงส่วนท้ายของเว็บไซต์
export default function Footer() {
  // ปีปัจจุบันสำหรับลิขสิทธิ์
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* คอลัมน์ที่ 1: เกี่ยวกับแพลตฟอร์ม */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Next.js Learning Platform</h3>
            <p className="text-text-secondary">
              แพลตฟอร์มการเรียนรู้ที่ครอบคลุมสำหรับนักพัฒนา Next.js ตั้งแต่ระดับเริ่มต้นจนถึงระดับสูง
            </p>
          </div>

          {/* คอลัมน์ที่ 2: ลิงก์ด่วน */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/lessons" className="text-text-secondary hover:text-primary transition-colors">
                  บทเรียน
                </Link>
              </li>
              <li>
                <Link href="/exercises" className="text-text-secondary hover:text-primary transition-colors">
                  แบบฝึกหัด
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-text-secondary hover:text-primary transition-colors">
                  แนวทางปฏิบัติ
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-text-secondary hover:text-primary transition-colors">
                  ตัวอย่าง
                </Link>
              </li>
            </ul>
          </div>

          {/* คอลัมน์ที่ 3: ทรัพยากร */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ทรัพยากร</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://nextjs.org/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  เอกสาร Next.js
                </a>
              </li>
              <li>
                <a 
                  href="https://react.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  เอกสาร React
                </a>
              </li>
              <li>
                <a 
                  href="https://tailwindcss.com/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  เอกสาร Tailwind CSS
                </a>
              </li>
              <li>
                <a 
                  href="https://orm.drizzle.team/docs/overview" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  เอกสาร Drizzle ORM
                </a>
              </li>
            </ul>
          </div>

          {/* คอลัมน์ที่ 4: ติดต่อ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ติดต่อ</h3>
            <p className="text-text-secondary mb-2">
              มีคำถามหรือข้อเสนอแนะ? ติดต่อเราได้ที่
            </p>
            <a 
              href="mailto:support@nextjslearning.example.com"
              className="text-primary hover:underline"
            >
              support@nextjslearning.example.com
            </a>
          </div>
        </div>

        {/* ส่วนลิขสิทธิ์ */}
        <div className="mt-8 pt-8 border-t border-text-secondary/10">
          <p className="text-center text-text-secondary">
            &copy; {currentYear} Next.js Learning Platform. สงวนลิขสิทธิ์.
          </p>
        </div>
      </div>
    </footer>
  );
}
