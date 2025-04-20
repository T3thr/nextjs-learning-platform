import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Pool } from 'pg';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { pgTable, serial, text, timestamp, integer, boolean, primaryKey, index } from 'drizzle-orm/pg-core';

// สร้างการเชื่อมต่อกับฐานข้อมูล PostgreSQL ผ่าน Neon
// ใช้ connection string จาก environment variable
const sql = neon(process.env.DATABASE_URL!);

// สร้างการเชื่อมต่อผ่าน node-postgres สำหรับการ migrate
// ใช้เฉพาะในสคริปต์ migration เพื่อรองรับ Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // จำนวนการเชื่อมต่อสูงสุดใน pool
  idleTimeoutMillis: 30000, // เวลาที่การเชื่อมต่อไม่ได้ใช้งานก่อนปิด
  connectionTimeoutMillis: 2000, // เวลารอการเชื่อมต่อสูงสุด
});

// ตารางผู้ใช้งาน - เก็บข้อมูลผู้ใช้งานทั้งหมด
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'), // เพิ่มฟิลด์รหัสผ่านสำหรับ CredentialsProvider
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  role: text('role', { enum: ['user', 'admin'] }).default('user').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// ตารางบัญชีผู้ใช้งาน - สำหรับ OAuth providers (NextAuth)
export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

// ตารางเซสชัน - จัดการเซสชันของผู้ใช้งาน (NextAuth)
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  sessionToken: text('session_token').notNull().unique(),
});

// ตารางโทเค็นยืนยัน - สำหรับการยืนยันอีเมล (NextAuth)
export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull().unique(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (table) => ({
  compoundKey: primaryKey({ columns: [table.identifier, table.token] }), // ใช้ primaryKey จาก drizzle-orm
}));

// ตารางหมวดหมู่ - จัดกลุ่มบทเรียนและเนื้อหา
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  order: integer('order').notNull(),
  parentId: integer('parent_id').references(() => categories.id, { onDelete: 'set null' }),
}, (table) => ({
  slugIdx: index('categories_slug_idx').on(table.slug), // เพิ่ม index สำหรับ slug เพื่อประสิทธิภาพการค้นหา
}));

// ตารางบทเรียน - เนื้อหาหลักของแพลตฟอร์ม
export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  difficulty: text('difficulty', { enum: ['beginner', 'intermediate', 'advanced'] }).notNull(),
  order: integer('order').notNull(),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
  estimatedMinutes: integer('estimated_minutes').notNull(),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
}, (table) => ({
  slugIdx: index('lessons_slug_idx').on(table.slug), // เพิ่ม index สำหรับ slug
}));

// ตารางแบบฝึกหัด - สำหรับฝึกทักษะการเขียนโค้ด
export const exercises = pgTable('exercises', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  instructions: text('instructions').notNull(),
  starterCode: text('starter_code'),
  solutionCode: text('solution_code').notNull(),
  testCases: text('test_cases').notNull(),
  difficulty: text('difficulty', { enum: ['beginner', 'intermediate', 'advanced'] }).notNull(),
  lessonId: integer('lesson_id').references(() => lessons.id, { onDelete: 'set null' }),
  points: integer('points').default(10).notNull(),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// ตารางแนวทางปฏิบัติ - บทความแนะนำและแนวทางการพัฒนา
export const guidelines = pgTable('guidelines', {
  id: serial('id').primaryKey(),
  topic: text('topic').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// ตารางตัวอย่างโค้ด - ตัวอย่างการใช้งานจริง
export const examples = pgTable('examples', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  code: text('code').notNull(),
  explanation: text('explanation').notNull(),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// ตารางความคืบหน้าของผู้ใช้ - ติดตามความก้าวหน้าในการเรียนรู้
export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: integer('lesson_id').references(() => lessons.id, { onDelete: 'set null' }),
  exerciseId: integer('exercise_id').references(() => exercises.id, { onDelete: 'set null' }),
  completed: boolean('completed').default(false).notNull(),
  score: integer('score').default(0).notNull(),
  completedAt: timestamp('completed_at', { mode: 'date' }),
  attempts: integer('attempts').default(0).notNull(),
  lastAttemptAt: timestamp('last_attempt_at', { mode: 'date' }),
}, (table) => ({
  userIdIdx: index('user_progress_user_id_idx').on(table.userId), // เพิ่ม index สำหรับ userId
}));

// ตารางความสำเร็จ - รางวัลและเหรียญตราสำหรับผู้ใช้
export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  requiredPoints: integer('required_points').notNull(),
  type: text('type', { enum: ['lesson', 'exercise', 'streak', 'special'] }).notNull(),
});

// ตารางข้อเสนอแนะ - ความคิดเห็นของผู้ใช้ต่อเนื้อหา
export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: integer('lesson_id').references(() => lessons.id, { onDelete: 'set null' }),
  exerciseId: integer('exercise_id').references(() => exercises.id, { onDelete: 'set null' }),
  guidelineId: integer('guideline_id').references(() => guidelines.id, { onDelete: 'set null' }),
  exampleId: integer('example_id').references(() => examples.id, { onDelete: 'set null' }),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// ตารางคะแนนของผู้ใช้ - สำหรับระบบ gamification
export const userPoints = pgTable('user_points', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  points: integer('points').default(0).notNull(),
  level: integer('level').default(1).notNull(),
  lastUpdated: timestamp('last_updated', { mode: 'date' }).defaultNow().notNull(),
});

// ตารางความสำเร็จของผู้ใช้ - เก็บข้อมูลความสำเร็จที่ผู้ใช้ได้รับ
export const userAchievements = pgTable('user_achievements', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  achievementId: integer('achievement_id').notNull().references(() => achievements.id, { onDelete: 'restrict' }),
  earnedAt: timestamp('earned_at', { mode: 'date' }).defaultNow().notNull(),
});

// รวม schema ทั้งหมดเพื่อใช้กับ Drizzle ORM
const schema = {
  users,
  accounts,
  sessions,
  verificationTokens,
  categories,
  lessons,
  exercises,
  guidelines,
  examples,
  userProgress,
  achievements,
  feedback,
  userPoints,
  userAchievements,
};

// สร้าง Drizzle ORM client สำหรับการ query ผ่าน Neon HTTP
// เพื่อให้สามารถใช้งาน type-safe queries ได้
export const db = drizzle(sql, { schema });

// สร้าง Drizzle ORM client สำหรับ migration
export const dbMigrate = drizzlePg(pool, { schema });

// ฟังก์ชันสำหรับทดสอบการเชื่อมต่อกับฐานข้อมูล
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('การเชื่อมต่อฐานข้อมูลสำเร็จ:', result[0]);
    return true;
  } catch (error) {
    console.error('การเชื่อมต่อฐานข้อมูลล้มเหลว:', error);
    return false;
  }
}