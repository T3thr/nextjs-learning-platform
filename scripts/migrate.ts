import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { dbMigrate } from '@/backend/db';

// สคริปต์สำหรับการทำ migration ฐานข้อมูล
async function main() {
  console.log('เริ่มต้นการทำ migration ฐานข้อมูล...');
  try {
    await migrate(dbMigrate, { migrationsFolder: './backend/db/migrations' });
    console.log('การทำ migration เสร็จสิ้นสำเร็จ!');
  } catch (error) {
    console.error('การทำ migration ล้มเหลว:', error);
    process.exit(1);
  }
}

main();