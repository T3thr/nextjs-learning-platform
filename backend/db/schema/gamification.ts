import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { examples, exercises, guidelines, lessons } from './content';

// ตารางความสำเร็จ - รางวัลและเหรียญตราสำหรับผู้ใช้
export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  points: integer('points').default(0).notNull(),
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