# Next.js Learning Platform

A comprehensive learning platform for junior developers to grow into senior engineers, tailored to enterprise-scale applications. This platform includes interactive lessons, exercises, guidelines, and code examples, with a dashboard for progress tracking.

## Features

- **Interactive Lessons**: Comprehensive Next.js lessons from basics to advanced topics
- **Coding Exercises**: Hands-on exercises with interactive code editors
- **Progress Tracking**: Dashboard to monitor your learning journey
- **Gamification**: Achievement system, learning streaks, and level progression
- **Authentication**: Secure login with multiple providers (Email, GitHub, Google)
- **Dark/Light Mode**: Customizable theme preferences
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with dark/light mode support
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Context API
- **Code Highlighting**: Syntax highlighting for code examples

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/nextjs-learning-platform.git
cd nextjs-learning-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/nextjs_learning

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth Providers (optional)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Run database migrations:
```bash
npm run db:migrate
```

5. Seed the database with initial content:
```bash
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs-learning-platform/
├── app/                    # Next.js App Router
│   ├── (learn)/            # Learning content routes
│   │   ├── lessons/        # Lesson pages
│   │   └── exercises/      # Exercise pages
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication API
│   │   └── progress/       # Progress tracking API
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # User dashboard
│   └── layout.tsx          # Root layout
├── backend/                # Backend code
│   └── db/                 # Database configuration and schema
├── components/             # React components
├── context/                # React context providers
├── public/                 # Static assets
├── scripts/                # Database scripts
└── styles/                 # Global styles
```

## Documentation

- [Architecture](./architecture.md) - Overall system architecture
- [Database Schema](./database-schema.md) - Database design
- [UI/UX & Gamification](./ui-ux-gamification.md) - UI/UX design and gamification elements
- [Learning Content Structure](./learning-content-structure.md) - Content organization

## Development

- Run tests:
```bash
npm test
```

- Build for production:
```bash
npm run build
```

- Start production server:
```bash
npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
"# nextjs-learning-platform" 
