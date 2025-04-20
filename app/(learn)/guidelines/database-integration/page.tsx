import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงแนวทางการเชื่อมต่อฐานข้อมูลด้วย Drizzle ORM
export default function DatabaseIntegrationGuideline() {
  // เนื้อหาแนวทางในรูปแบบ Markdown
  const guidelineContent = `# การเชื่อมต่อฐานข้อมูลด้วย Drizzle ORM

การเชื่อมต่อฐานข้อมูลเป็นส่วนสำคัญในการพัฒนาแอปพลิเคชัน Next.js ที่มีประสิทธิภาพ Drizzle ORM เป็น TypeScript ORM ที่มีประสิทธิภาพสูงและใช้งานง่าย ในคู่มือนี้ เราจะแนะนำวิธีการใช้งาน Drizzle ORM สำหรับการเชื่อมต่อฐานข้อมูลใน Next.js ตามมาตรฐานองค์กรของเรา

## การติดตั้ง Drizzle ORM

เริ่มต้นด้วยการติดตั้ง Drizzle ORM และไดรเวอร์ฐานข้อมูล:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง Drizzle ORM
  const installationCode = `# ติดตั้ง Drizzle ORM และไดรเวอร์ PostgreSQL
npm install drizzle-orm pg
npm install -D drizzle-kit @types/pg
# หรือ
bun add drizzle-orm pg
bun add -D drizzle-kit @types/pg

# สำหรับ SQLite
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit @types/better-sqlite3
# หรือ
bun add drizzle-orm better-sqlite3
bun add -D drizzle-kit @types/better-sqlite3

# สำหรับ MySQL
npm install drizzle-orm mysql2
npm install -D drizzle-kit @types/mysql2
# หรือ
bun add drizzle-orm mysql2
bun add -D drizzle-kit @types/mysql2`;

  // เนื้อหาเกี่ยวกับการตั้งค่า Drizzle ORM
  const setupContent = `## การตั้งค่า Drizzle ORM

หลังจากติดตั้ง Drizzle ORM แล้ว เราจะตั้งค่าการเชื่อมต่อฐานข้อมูล:

1. สร้างไฟล์ \`drizzle.config.ts\` ในโฟลเดอร์หลักของโปรเจค:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Drizzle ORM
  const drizzleConfigCode = `// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// โหลด environment variables จาก .env.local
dotenv.config({ path: '.env.local' });

// ตรวจสอบว่ามี DATABASE_URL หรือไม่
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

export default {
  schema: './src/backend/db/schema/*',
  out: './src/backend/db/migrations',
  driver: 'pg', // หรือ 'mysql', 'sqlite'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;`;

  // เนื้อหาเกี่ยวกับการตั้งค่า Environment Variables
  const envVarsContent = `2. ตั้งค่า Environment Variables ใน \`.env.local\`:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Environment Variables
  const envVarsCode = `# .env.local
DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase

# สำหรับ SQLite
# DATABASE_URL=sqlite:./mydatabase.db

# สำหรับ MySQL
# DATABASE_URL=mysql://username:password@localhost:3306/mydatabase`;

  // เนื้อหาเกี่ยวกับการสร้างการเชื่อมต่อฐานข้อมูล
  const dbConnectionContent = `3. สร้างการเชื่อมต่อฐานข้อมูล:`;

  // โค้ดตัวอย่างสำหรับการสร้างการเชื่อมต่อฐานข้อมูล
  const dbConnectionCode = `// src/backend/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// สร้าง connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// สร้าง Drizzle ORM instance
export const db = drizzle(pool, { schema });

// สำหรับ SQLite
// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';
// import * as schema from './schema';
// 
// const sqlite = new Database(process.env.DATABASE_URL.replace('sqlite:', ''));
// export const db = drizzle(sqlite, { schema });

// สำหรับ MySQL
// import { drizzle } from 'drizzle-orm/mysql2';
// import mysql from 'mysql2/promise';
// import * as schema from './schema';
// 
// const pool = mysql.createPool(process.env.DATABASE_URL);
// export const db = drizzle(pool, { schema });`;

  // เนื้อหาเกี่ยวกับการสร้าง Schema
  const schemaContent = `## การสร้าง Schema

เราจะสร้าง Schema สำหรับฐานข้อมูลของเรา:

1. สร้างโฟลเดอร์ \`src/backend/db/schema\` และสร้างไฟล์ Schema:`;

  // โค้ดตัวอย่างสำหรับการสร้าง Schema
  const usersSchemaCode = `// src/backend/db/schema/users.ts
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// สร้างตาราง users
export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()), // สร้าง CUID2 เป็น primary key
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }),
  image: text('image'),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  emailVerified: timestamp('email_verified'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// สำหรับ SQLite
// import {
//   sqliteTable,
//   text,
//   integer,
// } from 'drizzle-orm/sqlite-core';
// import { createId } from '@paralleldrive/cuid2';
// 
// export const users = sqliteTable('users', {
//   id: text('id').primaryKey().$defaultFn(() => createId()),
//   name: text('name').notNull(),
//   email: text('email').notNull().unique(),
//   password: text('password'),
//   image: text('image'),
//   role: text('role').notNull().default('user'),
//   emailVerified: integer('email_verified', { mode: 'timestamp' }),
//   createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
//   updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().defaultNow(),
// });

// สำหรับ MySQL
// import {
//   mysqlTable,
//   varchar,
//   text,
//   timestamp,
// } from 'drizzle-orm/mysql-core';
// import { createId } from '@paralleldrive/cuid2';
// 
// export const users = mysqlTable('users', {
//   id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
//   name: varchar('name', { length: 255 }).notNull(),
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   password: varchar('password', { length: 255 }),
//   image: text('image'),
//   role: varchar('role', { length: 50 }).notNull().default('user'),
//   emailVerified: timestamp('email_verified'),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// });`;

  // โค้ดตัวอย่างสำหรับการสร้าง Schema ของตาราง posts
  const postsSchemaCode = `// src/backend/db/schema/posts.ts
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { relations } from 'drizzle-orm';

// สร้างตาราง posts
export const posts = pgTable('posts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  published: boolean('published').default(false).notNull(),
  authorId: text('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// สร้าง relations
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

// สร้างตาราง comments
export const comments = pgTable('comments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  content: text('content').notNull(),
  postId: text('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  authorId: text('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// สร้าง relations
export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}));`;

  // โค้ดตัวอย่างสำหรับการสร้างไฟล์ index.ts สำหรับ export schema ทั้งหมด
  const schemaIndexCode = `// src/backend/db/schema/index.ts
// Export schema ทั้งหมด
export * from './users';
export * from './posts';
// Export schema อื่นๆ ที่มี`;

  // เนื้อหาเกี่ยวกับการสร้าง Migrations
  const migrationsContent = `## การสร้าง Migrations

เราจะใช้ \`drizzle-kit\` เพื่อสร้าง Migrations:

1. เพิ่ม script ใน \`package.json\`:`;

  // โค้ดตัวอย่างสำหรับการเพิ่ม script ใน package.json
  const packageJsonCode = `// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "drizzle-kit generate:pg", // หรือ generate:sqlite, generate:mysql
    "db:migrate": "tsx src/scripts/migrate.ts",
    "db:studio": "drizzle-kit studio"
  }
}`;

  // เนื้อหาเกี่ยวกับการสร้างไฟล์ migrate.ts
  const migrateScriptContent = `2. สร้างไฟล์ \`src/scripts/migrate.ts\` สำหรับการ migrate ฐานข้อมูล:`;

  // โค้ดตัวอย่างสำหรับการสร้างไฟล์ migrate.ts
  const migrateScriptCode = `// src/scripts/migrate.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// โหลด environment variables จาก .env.local
dotenv.config({ path: '.env.local' });

// ตรวจสอบว่ามี DATABASE_URL หรือไม่
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

// ฟังก์ชันสำหรับการ migrate ฐานข้อมูล
async function main() {
  console.log('Migration started...');
  
  // สร้าง connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  
  // สร้าง Drizzle ORM instance
  const db = drizzle(pool);
  
  // ทำการ migrate
  await migrate(db, { migrationsFolder: 'src/backend/db/migrations' });
  
  // ปิด connection
  await pool.end();
  
  console.log('Migration completed successfully!');
}

// รัน migration
main().catch((err) => {
  console.error('Migration failed!');
  console.error(err);
  process.exit(1);
});

// สำหรับ SQLite
// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
// import Database from 'better-sqlite3';
// import * as dotenv from 'dotenv';
// 
// dotenv.config({ path: '.env.local' });
// 
// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL is not defined');
// }
// 
// async function main() {
//   console.log('Migration started...');
//   
//   const sqlite = new Database(process.env.DATABASE_URL.replace('sqlite:', ''));
//   const db = drizzle(sqlite);
//   
//   await migrate(db, { migrationsFolder: 'src/backend/db/migrations' });
//   
//   console.log('Migration completed successfully!');
// }
// 
// main().catch((err) => {
//   console.error('Migration failed!');
//   console.error(err);
//   process.exit(1);
// });

// สำหรับ MySQL
// import { drizzle } from 'drizzle-orm/mysql2';
// import { migrate } from 'drizzle-orm/mysql2/migrator';
// import mysql from 'mysql2/promise';
// import * as dotenv from 'dotenv';
// 
// dotenv.config({ path: '.env.local' });
// 
// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL is not defined');
// }
// 
// async function main() {
//   console.log('Migration started...');
//   
//   const pool = mysql.createPool(process.env.DATABASE_URL);
//   const db = drizzle(pool);
//   
//   await migrate(db, { migrationsFolder: 'src/backend/db/migrations' });
//   
//   await pool.end();
//   
//   console.log('Migration completed successfully!');
// }
// 
// main().catch((err) => {
//   console.error('Migration failed!');
//   console.error(err);
//   process.exit(1);
// });`;

  // เนื้อหาเกี่ยวกับการใช้งาน Drizzle ORM
  const usageContent = `## การใช้งาน Drizzle ORM

เราสามารถใช้ Drizzle ORM ในแอปพลิเคชัน Next.js ได้ดังนี้:

### 1. การใช้งานใน Server Components`;

  // โค้ดตัวอย่างสำหรับการใช้งานใน Server Components
  const serverComponentsCode = `// app/users/page.tsx
import { db } from '@/backend/db';
import { users } from '@/backend/db/schema';

export default async function UsersPage() {
  // ดึงข้อมูลผู้ใช้ทั้งหมด
  const allUsers = await db.select().from(users);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ผู้ใช้ทั้งหมด</h1>
      <ul className="space-y-2">
        {allUsers.map((user) => (
          <li key={user.id} className="p-4 border rounded">
            <h2 className="font-bold">{user.name}</h2>
            <p className="text-text-secondary">{user.email}</p>
            <p className="text-sm text-primary">{user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// app/users/[id]/page.tsx
import { db } from '@/backend/db';
import { users } from '@/backend/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function UserPage({ params }: { params: { id: string } }) {
  // ดึงข้อมูลผู้ใช้จาก ID
  const user = await db.select().from(users).where(eq(users.id, params.id)).limit(1);
  
  // ถ้าไม่พบผู้ใช้
  if (user.length === 0) {
    notFound();
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ข้อมูลผู้ใช้</h1>
      <div className="p-4 border rounded">
        <h2 className="font-bold">{user[0].name}</h2>
        <p className="text-text-secondary">{user[0].email}</p>
        <p className="text-sm text-primary">{user[0].role}</p>
        <p className="text-sm text-text-secondary">
          สมาชิกตั้งแต่: {new Date(user[0].createdAt).toLocaleDateString('th-TH')}
        </p>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งานใน API Routes
  const apiRoutesContent = `### 2. การใช้งานใน API Routes`;

  // โค้ดตัวอย่างสำหรับการใช้งานใน API Routes
  const apiRoutesCode = `// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/backend/db';
import { users } from '@/backend/db/schema';
import { z } from 'zod';
import { hash } from 'bcrypt';

// สร้าง schema สำหรับตรวจสอบข้อมูล
const userSchema = z.object({
  name: z.string().min(1, 'ชื่อต้องไม่ว่างเปล่า'),
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(8, 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร'),
  role: z.enum(['user', 'admin']).optional(),
});

// GET /api/users
export async function GET(request: Request) {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมด
    const allUsers = await db.select().from(users);
    
    // ส่งข้อมูลกลับไปในรูปแบบ JSON
    return NextResponse.json(allUsers);
  } catch (error) {
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
    
    // ตรวจสอบข้อมูลด้วย zod
    const validationResult = userSchema.safeParse(body);
    
    // ถ้าข้อมูลไม่ถูกต้อง
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    // ข้อมูลที่ผ่านการตรวจสอบแล้ว
    const { name, email, password, role = 'user' } = validationResult.data;
    
    // ตรวจสอบว่าอีเมลซ้ำหรือไม่
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'อีเมลนี้ถูกใช้งานแล้ว' },
        { status: 400 }
      );
    }
    
    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await hash(password, 10);
    
    // เพิ่มผู้ใช้ใหม่ในฐานข้อมูล
    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role,
    }).returning();
    
    // ส่งข้อมูลผู้ใช้ใหม่กลับไป (ไม่รวมรหัสผ่าน)
    const { password: _, ...userWithoutPassword } = newUser[0];
    
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/backend/db';
import { users } from '@/backend/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// สร้าง schema สำหรับตรวจสอบข้อมูล
const updateUserSchema = z.object({
  name: z.string().min(1, 'ชื่อต้องไม่ว่างเปล่า').optional(),
  email: z.string().email('อีเมลไม่ถูกต้อง').optional(),
  role: z.enum(['user', 'admin']).optional(),
});

// GET /api/users/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ดึงข้อมูลผู้ใช้จาก ID
    const user = await db.select().from(users).where(eq(users.id, params.id)).limit(1);
    
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
    // รับข้อมูลจาก request body
    const body = await request.json();
    
    // ตรวจสอบข้อมูลด้วย zod
    const validationResult = updateUserSchema.safeParse(body);
    
    // ถ้าข้อมูลไม่ถูกต้อง
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    // ข้อมูลที่ผ่านการตรวจสอบแล้ว
    const { name, email, role } = validationResult.data;
    
    // สร้าง object สำหรับอัปเดต
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    
    // อัปเดตข้อมูลผู้ใช้
    const updatedUser = await db.update(users)
      .set(updateData)
      .where(eq(users.id, params.id))
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
    // ลบผู้ใช้
    const deletedUser = await db.delete(users)
      .where(eq(users.id, params.id))
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
    console.error(\`Error deleting user \${params.id}:\`, error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Relations
  const relationsContent = `### 3. การใช้งาน Relations

Drizzle ORM รองรับการทำ Relations ระหว่างตาราง:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Relations
  const relationsCode = `// app/posts/[id]/page.tsx
import { db } from '@/backend/db';
import { posts, users, comments } from '@/backend/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: { id: string } }) {
  // ดึงข้อมูลบทความพร้อมกับข้อมูลผู้เขียน
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, params.id),
    with: {
      author: true,
    },
  });
  
  // ถ้าไม่พบบทความ
  if (!post) {
    notFound();
  }
  
  // ดึงข้อมูลความคิดเห็นพร้อมกับข้อมูลผู้เขียน
  const postComments = await db.query.comments.findMany({
    where: eq(comments.postId, params.id),
    with: {
      author: true,
    },
    orderBy: (comments, { desc }) => [desc(comments.createdAt)],
  });
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="flex items-center text-text-secondary mb-4">
        <span>โดย {post.author.name}</span>
        <span className="mx-2">•</span>
        <span>{new Date(post.createdAt).toLocaleDateString('th-TH')}</span>
      </div>
      
      <div className="prose max-w-none mb-8">
        {post.content}
      </div>
      
      <h2 className="text-xl font-bold mb-4">ความคิดเห็น ({postComments.length})</h2>
      
      {postComments.length === 0 ? (
        <p className="text-text-secondary">ยังไม่มีความคิดเห็น</p>
      ) : (
        <ul className="space-y-4">
          {postComments.map((comment) => (
            <li key={comment.id} className="p-4 border rounded">
              <div className="flex items-center mb-2">
                <span className="font-bold">{comment.author.name}</span>
                <span className="mx-2 text-text-secondary">•</span>
                <span className="text-sm text-text-secondary">
                  {new Date(comment.createdAt).toLocaleString('th-TH')}
                </span>
              </div>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Transactions
  const transactionsContent = `### 4. การใช้งาน Transactions

Drizzle ORM รองรับการทำ Transactions เพื่อให้มั่นใจว่าการดำเนินการหลายอย่างจะสำเร็จหรือล้มเหลวพร้อมกัน:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Transactions
  const transactionsCode = `// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/backend/db';
import { posts, users } from '@/backend/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

// สร้าง schema สำหรับตรวจสอบข้อมูล
const postSchema = z.object({
  title: z.string().min(1, 'หัวข้อต้องไม่ว่างเปล่า'),
  content: z.string().min(1, 'เนื้อหาต้องไม่ว่างเปล่า'),
  published: z.boolean().optional(),
});

// POST /api/posts
export async function POST(request: Request) {
  try {
    // ตรวจสอบการยืนยันตัวตน
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // รับข้อมูลจาก request body
    const body = await request.json();
    
    // ตรวจสอบข้อมูลด้วย zod
    const validationResult = postSchema.safeParse(body);
    
    // ถ้าข้อมูลไม่ถูกต้อง
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    // ข้อมูลที่ผ่านการตรวจสอบแล้ว
    const { title, content, published = false } = validationResult.data;
    
    // ใช้ transaction เพื่อให้มั่นใจว่าทั้งการเพิ่มบทความและการอัปเดตจำนวนบทความของผู้ใช้จะสำเร็จหรือล้มเหลวพร้อมกัน
    const result = await db.transaction(async (tx) => {
      // เพิ่มบทความใหม่
      const newPost = await tx.insert(posts).values({
        title,
        content,
        published,
        authorId: session.user.id,
      }).returning();
      
      // อัปเดตจำนวนบทความของผู้ใช้ (สมมติว่ามีคอลัมน์ postCount)
      // await tx.update(users)
      //   .set({ postCount: sql\`\${users.postCount} + 1\` })
      //   .where(eq(users.id, session.user.id));
      
      return newPost[0];
    });
    
    // ส่งข้อมูลบทความใหม่กลับไป
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Prepared Statements
  const preparedStatementsContent = `### 5. การใช้งาน Prepared Statements

Drizzle ORM รองรับการทำ Prepared Statements เพื่อป้องกัน SQL Injection:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Prepared Statements
  const preparedStatementsCode = `// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/backend/db';
import { posts } from '@/backend/db/schema';
import { sql, ilike } from 'drizzle-orm';

// GET /api/search?q=keyword
export async function GET(request: Request) {
  try {
    // รับพารามิเตอร์จาก URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    // ถ้าไม่มีคำค้นหา
    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }
    
    // สร้าง prepared statement
    const searchQuery = db.select()
      .from(posts)
      .where(
        sql\`to_tsvector('thai', \${posts.title} || ' ' || \${posts.content}) @@ plainto_tsquery('thai', \${query})\`
      )
      .limit(20);
    
    // หรือใช้ ilike สำหรับการค้นหาอย่างง่าย
    // const searchQuery = db.select()
    //   .from(posts)
    //   .where(
    //     or(
    //       ilike(posts.title, \`%\${query}%\`),
    //       ilike(posts.content, \`%\${query}%\`)
    //     )
    //   )
    //   .limit(20);
    
    // ดำเนินการค้นหา
    const results = await searchQuery;
    
    // ส่งผลลัพธ์กลับไป
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error searching posts:', error);
    return NextResponse.json(
      { error: 'Failed to search posts' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาสรุป
  const summaryContent = `## แนวทางปฏิบัติที่ดีในการเชื่อมต่อฐานข้อมูลด้วย Drizzle ORM

1. **ใช้ Drizzle ORM สำหรับการเชื่อมต่อฐานข้อมูล** - Drizzle ORM เป็น TypeScript ORM ที่มีประสิทธิภาพสูงและใช้งานง่าย
2. **สร้าง Schema ที่มีโครงสร้างดี** - ออกแบบ Schema ให้มีโครงสร้างที่ดีและใช้ TypeScript เพื่อให้ได้ประโยชน์จาก Type Safety
3. **ใช้ Migrations สำหรับการจัดการโครงสร้างฐานข้อมูล** - ใช้ Migrations เพื่อจัดการการเปลี่ยนแปลงโครงสร้างฐานข้อมูล
4. **ใช้ Relations เพื่อจัดการความสัมพันธ์ระหว่างตาราง** - ใช้ Relations เพื่อจัดการความสัมพันธ์ระหว่างตาราง
5. **ใช้ Transactions เพื่อให้มั่นใจว่าการดำเนินการหลายอย่างจะสำเร็จหรือล้มเหลวพร้อมกัน** - ใช้ Transactions เพื่อรักษาความสมบูรณ์ของข้อมูล
6. **ใช้ Prepared Statements เพื่อป้องกัน SQL Injection** - ใช้ Prepared Statements เพื่อป้องกัน SQL Injection
7. **ตรวจสอบข้อมูลอย่างเข้มงวด** - ใช้ zod เพื่อตรวจสอบข้อมูลที่รับเข้ามา

## ขั้นตอนต่อไป

หลังจากที่คุณได้เรียนรู้เกี่ยวกับการเชื่อมต่อฐานข้อมูลด้วย Drizzle ORM แล้ว คุณสามารถศึกษาแนวทางต่อไปนี้:

1. [การ Deploy แอปพลิเคชัน Next.js](/guidelines/deployment) - เรียนรู้วิธีการ Deploy แอปพลิเคชัน Next.js ไปยัง Production`;

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
            <h1 className="text-3xl font-bold mb-2">การเชื่อมต่อฐานข้อมูลด้วย Drizzle ORM</h1>
            <p className="text-text-secondary">แนวทางการใช้งาน Drizzle ORM สำหรับการเชื่อมต่อฐานข้อมูลใน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              45 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาแนวทาง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={guidelineContent} />
        <CodeBlock code={installationCode} language="bash" fileName="การติดตั้ง Drizzle ORM" />
        <MarkdownContent content={setupContent} />
        <CodeBlock code={drizzleConfigCode} language="typescript" fileName="drizzle.config.ts" />
        <MarkdownContent content={envVarsContent} />
        <CodeBlock code={envVarsCode} language="bash" fileName=".env.local" />
        <MarkdownContent content={dbConnectionContent} />
        <CodeBlock code={dbConnectionCode} language="typescript" fileName="src/backend/db/index.ts" />
        <MarkdownContent content={schemaContent} />
        <CodeBlock code={usersSchemaCode} language="typescript" fileName="src/backend/db/schema/users.ts" />
        <CodeBlock code={postsSchemaCode} language="typescript" fileName="src/backend/db/schema/posts.ts" />
        <CodeBlock code={schemaIndexCode} language="typescript" fileName="src/backend/db/schema/index.ts" />
        <MarkdownContent content={migrationsContent} />
        <CodeBlock code={packageJsonCode} language="json" fileName="package.json" />
        <MarkdownContent content={migrateScriptContent} />
        <CodeBlock code={migrateScriptCode} language="typescript" fileName="src/scripts/migrate.ts" />
        <MarkdownContent content={usageContent} />
        <CodeBlock code={serverComponentsCode} language="typescript" fileName="Server Components" />
        <MarkdownContent content={apiRoutesContent} />
        <CodeBlock code={apiRoutesCode} language="typescript" fileName="API Routes" />
        <MarkdownContent content={relationsContent} />
        <CodeBlock code={relationsCode} language="typescript" fileName="Relations" />
        <MarkdownContent content={transactionsContent} />
        <CodeBlock code={transactionsCode} language="typescript" fileName="Transactions" />
        <MarkdownContent content={preparedStatementsContent} />
        <CodeBlock code={preparedStatementsCode} language="typescript" fileName="Prepared Statements" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
