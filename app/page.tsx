import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-24">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Next.js Learning Platform
        </h1>
        
        <p className="text-xl text-center mb-12 text-text-secondary">
          A comprehensive platform for junior developers to grow into senior engineers
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="card hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4">เรียนรู้ Next.js</h2>
            <p className="mb-4">เริ่มต้นการเรียนรู้ Next.js ตั้งแต่พื้นฐานไปจนถึงการพัฒนาแอปพลิเคชันระดับองค์กร</p>
            <Link href="/lessons" className="btn btn-primary inline-block">
              เริ่มเรียนรู้
            </Link>
          </div>
          
          <div className="card hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4">แบบฝึกหัด</h2>
            <p className="mb-4">ฝึกฝนทักษะการเขียนโค้ดด้วยแบบฝึกหัดที่ออกแบบมาเพื่อพัฒนาทักษะของคุณ</p>
            <Link href="/exercises" className="btn btn-primary inline-block">
              ทำแบบฝึกหัด
            </Link>
          </div>
          
          <div className="card hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4">แนวทางปฏิบัติ</h2>
            <p className="mb-4">เรียนรู้แนวทางปฏิบัติที่ดีที่สุดสำหรับการพัฒนา Next.js ในระดับองค์กร</p>
            <Link href="/guidelines" className="btn btn-primary inline-block">
              อ่านแนวทาง
            </Link>
          </div>
          
          <div className="card hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4">ตัวอย่างโค้ด</h2>
            <p className="mb-4">ศึกษาตัวอย่างโค้ดที่ใช้งานจริงพร้อมคำอธิบายโดยละเอียด</p>
            <Link href="/examples" className="btn btn-primary inline-block">
              ดูตัวอย่าง
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <Link href="/dashboard" className="btn btn-secondary">
            ไปที่แดชบอร์ด
          </Link>
        </div>
      </div>
    </main>
  );
}
