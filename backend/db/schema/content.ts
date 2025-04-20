// backend/db/schema/content.ts
import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// ประกาศประเภทสำหรับตาราง categories เพื่อป้องกัน circular reference
export type Category = InferSelectModel<typeof categories>;
export type NewCategory = InferInsertModel<typeof categories>;

// ตารางหมวดหมู่ - จัดกลุ่มบทเรียนและเนื้อหา
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  order: integer('order').notNull(),
  parentId: integer('parent_id').references((): any => categories.id, { onDelete: 'set null' }),
});

// ประกาศประเภทสำหรับตารางอื่นๆ ที่จะใช้
export type Lesson = InferSelectModel<typeof lessons>;
export type Exercise = InferSelectModel<typeof exercises>;
export type Guideline = InferSelectModel<typeof guidelines>;
export type Example = InferSelectModel<typeof examples>;

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
});

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
  score: integer('score'),
  completedAt: timestamp('completed_at', { mode: 'date' }),
  attempts: integer('attempts').default(0).notNull(),
  lastAttemptAt: timestamp('last_attempt_at', { mode: 'date' }),
});