import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงแนวทางการ Deploy แอปพลิเคชัน Next.js
export default function DeploymentGuideline() {
  // เนื้อหาแนวทางในรูปแบบ Markdown
  const guidelineContent = `# การ Deploy แอปพลิเคชัน Next.js

การ Deploy แอปพลิเคชัน Next.js เป็นขั้นตอนสำคัญในการนำแอปพลิเคชันของคุณไปใช้งานจริง ในคู่มือนี้ เราจะแนะนำวิธีการ Deploy แอปพลิเคชัน Next.js ไปยัง Production ตามมาตรฐานองค์กรของเรา

## การเตรียมแอปพลิเคชันสำหรับ Production

ก่อนที่จะ Deploy แอปพลิเคชัน Next.js ไปยัง Production เราควรเตรียมแอปพลิเคชันให้พร้อมดังนี้:`;

  // โค้ดตัวอย่างสำหรับการเตรียมแอปพลิเคชันสำหรับ Production
  const preparationCode = `# 1. ตรวจสอบ dependencies ทั้งหมด
npm outdated
# หรือ
bun outdated

# 2. อัปเดต dependencies ให้เป็นเวอร์ชันล่าสุด (ถ้าจำเป็น)
npm update
# หรือ
bun update

# 3. ตรวจสอบความถูกต้องของโค้ด
npm run lint
# หรือ
bun lint

# 4. รันเทสต์ทั้งหมด (ถ้ามี)
npm test
# หรือ
bun test

# 5. สร้าง build สำหรับ production
npm run build
# หรือ
bun run build`;

  // เนื้อหาเกี่ยวกับการตั้งค่า Environment Variables
  const envVarsContent = `## การตั้งค่า Environment Variables

Environment Variables เป็นส่วนสำคัญในการ Deploy แอปพลิเคชัน Next.js ไปยัง Production เราควรตั้งค่า Environment Variables ให้ถูกต้องดังนี้:

1. สร้างไฟล์ \`.env.production\` สำหรับ Environment Variables ที่ใช้ใน Production:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Environment Variables
  const envVarsCode = `# .env.production
# ตัวอย่าง Environment Variables สำหรับ Production

# Next.js
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://www.example.com

# Database
DATABASE_URL=postgresql://username:password@production-db.example.com:5432/mydatabase

# Authentication
NEXTAUTH_URL=https://www.example.com
NEXTAUTH_SECRET=your-production-nextauth-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret
GITHUB_ID=your-production-github-client-id
GITHUB_SECRET=your-production-github-client-secret

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-production-analytics-id`;

  // เนื้อหาเกี่ยวกับการ Deploy บน Vercel
  const vercelContent = `## การ Deploy บน Vercel

Vercel เป็นแพลตฟอร์มที่เหมาะสมที่สุดสำหรับการ Deploy แอปพลิเคชัน Next.js เนื่องจาก Vercel เป็นบริษัทเดียวกับผู้พัฒนา Next.js

### 1. การติดตั้ง Vercel CLI`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง Vercel CLI
  const vercelCliCode = `# ติดตั้ง Vercel CLI
npm install -g vercel
# หรือ
bun add -g vercel`;

  // เนื้อหาเกี่ยวกับการ Login และ Deploy บน Vercel
  const vercelDeployContent = `### 2. การ Login และ Deploy บน Vercel`;

  // โค้ดตัวอย่างสำหรับการ Login และ Deploy บน Vercel
  const vercelDeployCode = `# Login เข้าสู่ Vercel
vercel login

# Deploy แอปพลิเคชันไปยัง Production
vercel --prod

# หรือถ้าต้องการ Deploy แบบ Preview
vercel`;

  // เนื้อหาเกี่ยวกับการตั้งค่า Vercel ผ่าน vercel.json
  const vercelJsonContent = `### 3. การตั้งค่า Vercel ผ่าน vercel.json

เราสามารถตั้งค่า Vercel ผ่านไฟล์ \`vercel.json\` ได้ดังนี้:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า Vercel ผ่าน vercel.json
  const vercelJsonCode = `// vercel.json
{
  "version": 2,
  "buildCommand": "bun run build",
  "devCommand": "bun dev",
  "installCommand": "bun install",
  "framework": "nextjs",
  "regions": ["sin1"], // Singapore region
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, max-age=0"
        }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/api/proxy/:path*",
      "destination": "https://api.example.com/:path*"
    }
  ]
}`;

  // เนื้อหาเกี่ยวกับการ Deploy บน AWS
  const awsContent = `## การ Deploy บน AWS

AWS เป็นอีกหนึ่งแพลตฟอร์มที่นิยมใช้สำหรับการ Deploy แอปพลิเคชัน Next.js ในองค์กรขนาดใหญ่

### 1. การ Deploy บน AWS Amplify

AWS Amplify เป็นบริการที่ช่วยให้การ Deploy แอปพลิเคชัน Next.js บน AWS ง่ายขึ้น:

1. สร้างไฟล์ \`amplify.yml\` ในโฟลเดอร์หลักของโปรเจค:`;

  // โค้ดตัวอย่างสำหรับการ Deploy บน AWS Amplify
  const amplifyYmlCode = `# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*`;

  // เนื้อหาเกี่ยวกับการ Deploy บน AWS Elastic Beanstalk
  const ebContent = `### 2. การ Deploy บน AWS Elastic Beanstalk

AWS Elastic Beanstalk เป็นอีกหนึ่งบริการที่เหมาะสำหรับการ Deploy แอปพลิเคชัน Next.js:

1. สร้างไฟล์ \`Procfile\` ในโฟลเดอร์หลักของโปรเจค:`;

  // โค้ดตัวอย่างสำหรับการ Deploy บน AWS Elastic Beanstalk
  const procfileCode = `# Procfile
web: npm start`;

  // เนื้อหาเกี่ยวกับการสร้างไฟล์ .ebextensions
  const ebextensionsContent = `2. สร้างโฟลเดอร์ \`.ebextensions\` และไฟล์ \`.ebextensions/nodecommand.config\`:`;

  // โค้ดตัวอย่างสำหรับการสร้างไฟล์ .ebextensions
  const ebextensionsCode = `# .ebextensions/nodecommand.config
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm start"
    NodeVersion: 18.x`;

  // เนื้อหาเกี่ยวกับการ Deploy บน Docker
  const dockerContent = `## การ Deploy บน Docker

Docker เป็นอีกหนึ่งวิธีที่นิยมใช้สำหรับการ Deploy แอปพลิเคชัน Next.js

1. สร้างไฟล์ \`Dockerfile\` ในโฟลเดอร์หลักของโปรเจค:`;

  // โค้ดตัวอย่างสำหรับการ Deploy บน Docker
  const dockerfileCode = `# Dockerfile
# ใช้ Node.js เวอร์ชันล่าสุดเป็น base image
FROM node:18-alpine AS base

# ติดตั้ง dependencies สำหรับ Sharp (สำหรับการจัดการรูปภาพ)
RUN apk add --no-cache libc6-compat

# สร้าง working directory
WORKDIR /app

# ขั้นตอนการติดตั้ง dependencies
FROM base AS deps
COPY package.json bun-lock.yaml* ./
RUN npm install -g bun && bun install --frozen-lockfile

# ขั้นตอนการ build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ตั้งค่า Environment Variables สำหรับการ build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# สร้าง build สำหรับ production
RUN npm run build

# ขั้นตอนการรัน
FROM base AS runner
WORKDIR /app

# ตั้งค่า Environment Variables สำหรับการรัน
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# สร้าง non-root user สำหรับการรัน
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# คัดลอกไฟล์ที่จำเป็นจากขั้นตอนการ build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# เปลี่ยนไปใช้ non-root user
USER nextjs

# เปิด port 3000
EXPOSE 3000

# ตั้งค่า host เป็น 0.0.0.0 เพื่อให้สามารถเข้าถึงได้จากภายนอก
ENV HOST 0.0.0.0

# รันแอปพลิเคชัน
CMD ["node", "server.js"]`;

  // เนื้อหาเกี่ยวกับการสร้างไฟล์ docker-compose.yml
  const dockerComposeContent = `2. สร้างไฟล์ \`docker-compose.yml\` ในโฟลเดอร์หลักของโปรเจค:`;

  // โค้ดตัวอย่างสำหรับการสร้างไฟล์ docker-compose.yml
  const dockerComposeCode = `# docker-compose.yml
version: '3'

services:
  nextjs:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://username:password@db:5432/mydatabase
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-nextauth-secret-key
    depends_on:
      - db
    restart: always
    networks:
      - app-network

  db:
    image: postgres:14-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=username
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mydatabase
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: always
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge`;

  // เนื้อหาเกี่ยวกับการ Deploy บน Kubernetes
  const k8sContent = `## การ Deploy บน Kubernetes

Kubernetes เป็นแพลตฟอร์มที่เหมาะสำหรับการ Deploy แอปพลิเคชัน Next.js ในองค์กรขนาดใหญ่ที่ต้องการความยืดหยุ่นและความสามารถในการขยายขนาด

1. สร้างไฟล์ \`k8s/deployment.yaml\` สำหรับการ Deploy แอปพลิเคชัน:`;

  // โค้ดตัวอย่างสำหรับการ Deploy บน Kubernetes
  const k8sDeploymentCode = `# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nextjs-app
  namespace: default
  labels:
    app: nextjs-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nextjs-app
  template:
    metadata:
      labels:
        app: nextjs-app
    spec:
      containers:
        - name: nextjs-app
          image: your-registry/nextjs-app:latest
          ports:
            - containerPort: 3000
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: nextjs-app-secrets
                  key: database-url
            - name: NEXTAUTH_URL
              value: https://www.example.com
            - name: NEXTAUTH_SECRET
              valueFrom:
                secretKeyRef:
                  name: nextjs-app-secrets
                  key: nextauth-secret
          resources:
            limits:
              cpu: "1"
              memory: "1Gi"
            requests:
              cpu: "0.5"
              memory: "512Mi"
          livenessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5`;

  // เนื้อหาเกี่ยวกับการสร้างไฟล์ service.yaml
  const k8sServiceContent = `2. สร้างไฟล์ \`k8s/service.yaml\` สำหรับการเปิด Service:`;

  // โค้ดตัวอย่างสำหรับการสร้างไฟล์ service.yaml
  const k8sServiceCode = `# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nextjs-app
  namespace: default
spec:
  selector:
    app: nextjs-app
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP`;

  // เนื้อหาเกี่ยวกับการสร้างไฟล์ ingress.yaml
  const k8sIngressContent = `3. สร้างไฟล์ \`k8s/ingress.yaml\` สำหรับการตั้งค่า Ingress:`;

  // โค้ดตัวอย่างสำหรับการสร้างไฟล์ ingress.yaml
  const k8sIngressCode = `# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nextjs-app
  namespace: default
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
    - hosts:
        - www.example.com
      secretName: nextjs-app-tls
  rules:
    - host: www.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nextjs-app
                port:
                  number: 80`;

  // เนื้อหาเกี่ยวกับการสร้างไฟล์ secrets.yaml
  const k8sSecretsContent = `4. สร้างไฟล์ \`k8s/secrets.yaml\` สำหรับการเก็บ Secrets:`;

  // โค้ดตัวอย่างสำหรับการสร้างไฟล์ secrets.yaml
  const k8sSecretsCode = `# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: nextjs-app-secrets
  namespace: default
type: Opaque
data:
  database-url: <base64-encoded-database-url>
  nextauth-secret: <base64-encoded-nextauth-secret>
  # เพิ่ม secrets อื่นๆ ตามต้องการ`;

  // เนื้อหาเกี่ยวกับการ Deploy บน GitHub Actions
  const githubActionsContent = `## การ Deploy ด้วย GitHub Actions

GitHub Actions เป็นเครื่องมือที่ช่วยให้การ Deploy แอปพลิเคชัน Next.js อัตโนมัติเมื่อมีการ Push โค้ดไปยัง GitHub

1. สร้างโฟลเดอร์ \`.github/workflows\` และไฟล์ \`.github/workflows/deploy.yml\`:`;

  // โค้ดตัวอย่างสำหรับการ Deploy ด้วย GitHub Actions (แก้ไขแล้ว)
  const githubActionsCode = `# .github/workflows/deploy.yml
name: Deploy Next.js App

on:
  push:
    branches:
      - main
      - production

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'bun'
      
      - name: Install bun
        uses: bun/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: bun install --frozen-lockfile
      
      - name: Lint
        run: bun lint
      
      - name: Build
        run: bun run build
        env:
          # ตั้งค่า Environment Variables สำหรับการ build
          NEXT_PUBLIC_API_URL: \${{ secrets.NEXT_PUBLIC_API_URL }}
          NEXT_PUBLIC_SITE_URL: \${{ secrets.NEXT_PUBLIC_SITE_URL }}
      
      # Deploy to Vercel
      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/production'
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./
      
      # หรือ Deploy to AWS
      # - name: Configure AWS credentials
      #   uses: aws-actions/configure-aws-credentials@v1
      #   with:
      #     aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
      #     aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
      #     aws-region: ap-southeast-1
      # 
      # - name: Deploy to AWS Amplify
      #   run: |
      #     aws amplify start-deployment --app-id \${{ secrets.AWS_AMPLIFY_APP_ID }} --branch-name main`;

  // เนื้อหาเกี่ยวกับการตรวจสอบประสิทธิภาพหลังการ Deploy
  const performanceContent = `## การตรวจสอบประสิทธิภาพหลังการ Deploy

หลังจาก Deploy แอปพลิเคชัน Next.js ไปยัง Production แล้ว เราควรตรวจสอบประสิทธิภาพของแอปพลิเคชันดังนี้:

1. ใช้ Lighthouse เพื่อตรวจสอบประสิทธิภาพของแอปพลิเคชัน
2. ใช้ WebPageTest เพื่อตรวจสอบประสิทธิภาพของแอปพลิเคชันในสภาพแวดล้อมต่างๆ
3. ใช้ Next.js Analytics เพื่อตรวจสอบ Core Web Vitals ของแอปพลิเคชัน
4. ใช้ Sentry หรือ LogRocket เพื่อตรวจสอบข้อผิดพลาดที่เกิดขึ้นในแอปพลิเคชัน
5. ใช้ Datadog หรือ New Relic เพื่อตรวจสอบประสิทธิภาพของแอปพลิเคชันในระดับ Infrastructure`;

  // เนื้อหาเกี่ยวกับการสร้าง API Route สำหรับตรวจสอบสถานะ
  const healthCheckContent = `## การสร้าง API Route สำหรับตรวจสอบสถานะ

เราควรสร้าง API Route สำหรับตรวจสอบสถานะของแอปพลิเคชันเพื่อให้ระบบ Monitoring สามารถตรวจสอบสถานะของแอปพลิเคชันได้:`;

  // โค้ดตัวอย่างสำหรับการสร้าง API Route สำหรับตรวจสอบสถานะ
  const healthCheckCode = `// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/backend/db';

export async function GET() {
  try {
    // ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
    await db.execute(sql\`SELECT 1\`);
    
    // ส่งข้อมูลสถานะกลับไป
    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    
    // ส่งข้อมูลข้อผิดพลาดกลับไป
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed',
      },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาสรุป
  const summaryContent = `## แนวทางปฏิบัติที่ดีในการ Deploy แอปพลิเคชัน Next.js

1. **เตรียมแอปพลิเคชันให้พร้อมสำหรับ Production** - ตรวจสอบ dependencies, รันเทสต์, และสร้าง build สำหรับ production
2. **ตั้งค่า Environment Variables ให้ถูกต้อง** - ใช้ไฟล์ \`.env.production\` สำหรับ Environment Variables ที่ใช้ใน Production
3. **เลือกแพลตฟอร์มที่เหมาะสม** - เลือกแพลตฟอร์มที่เหมาะสมกับความต้องการขององค์กร เช่น Vercel, AWS, Docker, หรือ Kubernetes
4. **ใช้ CI/CD เพื่อการ Deploy อัตโนมัติ** - ใช้ GitHub Actions หรือเครื่องมืออื่นๆ เพื่อการ Deploy อัตโนมัติ
5. **ตรวจสอบประสิทธิภาพหลังการ Deploy** - ใช้เครื่องมือต่างๆ เพื่อตรวจสอบประสิทธิภาพของแอปพลิเคชันหลังการ Deploy
6. **สร้าง API Route สำหรับตรวจสอบสถานะ** - สร้าง API Route สำหรับตรวจสอบสถานะของแอปพลิเคชันเพื่อให้ระบบ Monitoring สามารถตรวจสอบสถานะของแอปพลิเคชันได้
7. **ใช้ CDN สำหรับการส่งมอบเนื้อหา** - ใช้ CDN เช่น Cloudflare, AWS CloudFront, หรือ Vercel Edge Network เพื่อเพิ่มประสิทธิภาพในการส่งมอบเนื้อหา
8. **ใช้ Docker สำหรับความสม่ำเสมอในการ Deploy** - ใช้ Docker เพื่อให้มั่นใจว่าแอปพลิเคชันจะทำงานเหมือนกันในทุกสภาพแวดล้อม
9. **ใช้ Kubernetes สำหรับการขยายขนาดและความยืดหยุ่น** - ใช้ Kubernetes เพื่อการขยายขนาดและความยืดหยุ่นในการ Deploy แอปพลิเคชัน
10. **ใช้ Monitoring และ Logging** - ใช้ Monitoring และ Logging เพื่อตรวจสอบประสิทธิภาพและข้อผิดพลาดของแอปพลิเคชัน

## ขั้นตอนต่อไป

หลังจากที่คุณได้เรียนรู้เกี่ยวกับการ Deploy แอปพลิเคชัน Next.js แล้ว คุณสามารถศึกษาแนวทางต่อไปนี้:

1. [ตัวอย่างการใช้งาน Next.js](/examples) - ดูตัวอย่างการใช้งาน Next.js ในสถานการณ์ต่างๆ`;

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
            <h1 className="text-3xl font-bold mb-2">การ Deploy แอปพลิเคชัน Next.js</h1>
            <p className="text-text-secondary">แนวทางการ Deploy แอปพลิเคชัน Next.js ไปยัง Production</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              50 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาแนวทาง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={guidelineContent} />
        <CodeBlock code={preparationCode} language="bash" fileName="การเตรียมแอปพลิเคชันสำหรับ Production" />
        <MarkdownContent content={envVarsContent} />
        <CodeBlock code={envVarsCode} language="bash" fileName=".env.production" />
        <MarkdownContent content={vercelContent} />
        <CodeBlock code={vercelCliCode} language="bash" fileName="การติดตั้ง Vercel CLI" />
        <MarkdownContent content={vercelDeployContent} />
        <CodeBlock code={vercelDeployCode} language="bash" fileName="การ Login และ Deploy บน Vercel" />
        <MarkdownContent content={vercelJsonContent} />
        <CodeBlock code={vercelJsonCode} language="json" fileName="vercel.json" />
        <MarkdownContent content={awsContent} />
        <CodeBlock code={amplifyYmlCode} language="yaml" fileName="amplify.yml" />
        <MarkdownContent content={ebContent} />
        <CodeBlock code={procfileCode} language="bash" fileName="Procfile" />
        <MarkdownContent content={ebextensionsContent} />
        <CodeBlock code={ebextensionsCode} language="yaml" fileName=".ebextensions/nodecommand.config" />
        <MarkdownContent content={dockerContent} />
        <CodeBlock code={dockerfileCode} language="dockerfile" fileName="Dockerfile" />
        <MarkdownContent content={dockerComposeContent} />
        <CodeBlock code={dockerComposeCode} language="yaml" fileName="docker-compose.yml" />
        <MarkdownContent content={k8sContent} />
        <CodeBlock code={k8sDeploymentCode} language="yaml" fileName="k8s/deployment.yaml" />
        <MarkdownContent content={k8sServiceContent} />
        <CodeBlock code={k8sServiceCode} language="yaml" fileName="k8s/service.yaml" />
        <MarkdownContent content={k8sIngressContent} />
        <CodeBlock code={k8sIngressCode} language="yaml" fileName="k8s/ingress.yaml" />
        <MarkdownContent content={k8sSecretsContent} />
        <CodeBlock code={k8sSecretsCode} language="yaml" fileName="k8s/secrets.yaml" />
        <MarkdownContent content={githubActionsContent} />
        <CodeBlock code={githubActionsCode} language="yaml" fileName=".github/workflows/deploy.yml" />
        <MarkdownContent content={performanceContent} />
        <MarkdownContent content={healthCheckContent} />
        <CodeBlock code={healthCheckCode} language="typescript" fileName="app/api/health/route.ts" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}