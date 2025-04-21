import React from 'react';
import ProgressDashboard from '@/components/ProgressDashboard';
import Leaderboard from '@/components/Leaderboard';
import AchievementCard from '@/components/AchievementCard';
import Link from 'next/link';

// หน้าแดชบอร์ดสำหรับติดตามความคืบหน้าของผู้ใช้
export default function DashboardPage() {
  // ข้อมูลความสำเร็จตัวอย่าง (ในโปรเจคจริงควรดึงจากฐานข้อมูล)
  const achievements = [
    {
      name: 'เริ่มต้นการเรียนรู้',
      description: 'เรียนบทเรียนแรกเสร็จสมบูรณ์',
      icon: '🚀',
      isEarned: true,
      progress: 1,
      requiredPoints: 1,
    },
    {
      name: 'นักเรียนขยัน',
      description: 'เรียนบทเรียน 5 บทเสร็จสมบูรณ์',
      icon: '📚',
      isEarned: false,
      progress: 2,
      requiredPoints: 5,
    },
    {
      name: 'นักแก้ปัญหา',
      description: 'ทำแบบฝึกหัด 3 ข้อเสร็จสมบูรณ์',
      icon: '🧩',
      isEarned: true,
      progress: 3,
      requiredPoints: 3,
    },
    {
      name: 'ผู้เชี่ยวชาญ Next.js',
      description: 'เรียนบทเรียนทั้งหมดเสร็จสมบูรณ์',
      icon: '🏆',
      isEarned: false,
      progress: 2,
      requiredPoints: 10,
    },
    {
      name: 'นักพัฒนาระดับสูง',
      description: 'ทำแบบฝึกหัดระดับสูง 3 ข้อเสร็จสมบูรณ์',
      icon: '⭐',
      isEarned: false,
      progress: 1,
      requiredPoints: 3,
    },
    {
      name: 'ผู้ช่วยเหลือชุมชน',
      description: 'ช่วยเหลือผู้เรียนคนอื่น 5 ครั้ง',
      icon: '🤝',
      isEarned: false,
      progress: 2,
      requiredPoints: 5,
    },
  ];

  // ข้อมูลกิจกรรมล่าสุดตัวอย่าง
  const recentActivities = [
    {
      id: '1',
      type: 'lesson',
      title: 'เรียนบทเรียน "แนะนำ Next.js" เสร็จสมบูรณ์',
      date: '20 เม.ย. 2025',
      points: 10,
    },
    {
      id: '2',
      type: 'exercise',
      title: 'ทำแบบฝึกหัด "สร้างหน้าแรกด้วย Next.js" เสร็จสมบูรณ์',
      date: '20 เม.ย. 2025',
      points: 10,
    },
    {
      id: '3',
      type: 'achievement',
      title: 'ได้รับความสำเร็จ "เริ่มต้นการเรียนรู้"',
      date: '20 เม.ย. 2025',
      points: 5,
    },
    {
      id: '4',
      type: 'lesson',
      title: 'เรียนบทเรียน "พื้นฐาน App Router" เสร็จสมบูรณ์',
      date: '20 เม.ย. 2025',
      points: 10,
    },
    {
      id: '5',
      type: 'exercise',
      title: 'ทำแบบฝึกหัด "สร้างเส้นทางแบบไดนามิกด้วย App Router" เสร็จสมบูรณ์',
      date: '20 เม.ย. 2025',
      points: 15,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">แดชบอร์ด</h1>
        <p className="text-text-secondary">ติดตามความคืบหน้าและความสำเร็จของคุณ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* คอลัมน์ซ้าย: ความคืบหน้า */}
        <div className="lg:col-span-2 space-y-8">
          {/* แดชบอร์ดความคืบหน้า */}
          <ProgressDashboard />

          {/* กิจกรรมล่าสุด */}
          <div className="bg-surface p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">กิจกรรมล่าสุด</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start border-b border-text-secondary/10 pb-4 last:border-0 last:pb-0">
                  {/* ไอคอนตามประเภทกิจกรรม */}
                  <div className="mr-3 mt-1">
                    {activity.type === 'lesson' && (
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                      </div>
                    )}
                    {activity.type === 'exercise' && (
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                        </svg>
                      </div>
                    )}
                    {activity.type === 'achievement' && (
                      <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 text-yellow-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* รายละเอียดกิจกรรม */}
                  <div className="flex-grow">
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-text-secondary">{activity.date}</div>
                  </div>
                  
                  {/* คะแนนที่ได้รับ */}
                  <div className="text-primary font-medium">
                    +{activity.points} คะแนน
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ปุ่มนำทางไปยังหน้าอื่นๆ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/lessons" className="block">
              <div className="bg-surface p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-500 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">บทเรียน</h3>
                    <p className="text-text-secondary">เรียนรู้ Next.js ตั้งแต่พื้นฐานจนถึงขั้นสูง</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/exercises" className="block">
              <div className="bg-surface p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">แบบฝึกหัด</h3>
                    <p className="text-text-secondary">ฝึกทักษะการพัฒนา Next.js ด้วยแบบฝึกหัดที่หลากหลาย</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* คอลัมน์ขวา: อันดับและความสำเร็จ */}
        <div className="space-y-8">
          {/* อันดับผู้เรียน */}
          <Leaderboard limit={5} />
          
          {/* ความสำเร็จ */}
          <div className="bg-surface p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">ความสำเร็จ</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <AchievementCard
                  key={index}
                  name={achievement.name}
                  description={achievement.description}
                  icon={achievement.icon}
                  isEarned={achievement.isEarned}
                  progress={achievement.progress}
                  requiredPoints={achievement.requiredPoints}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
