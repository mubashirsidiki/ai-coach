# 🤖 AI Career Coach

A modern full-stack application built with cutting-edge technologies to help guide your career path.

[![Watch Tutorial](https://img.shields.io/badge/Watch-Tutorial-red)](https://youtu.be/UbXpRv5ApKA)

![sensai](https://github.com/user-attachments/assets/eee79242-4056-4d19-b655-2873788979e1)

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/) with Turbopack
- [Neon DB](https://neon.tech/) for PostgreSQL
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Prisma](https://www.prisma.io/) as ORM
- [Inngest](https://www.inngest.com/) for background jobs
- [Shadcn UI](https://ui.shadcn.com/) for components
- [Clerk](https://clerk.com/) for authentication

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Auth Redirects
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# AI
GEMINI_API_KEY=
```

### 2. Installation

Make sure you have **Node.js 18 or later** installed, then:

```bash
npm install
```

### 3. Database Setup

Initialize your database with Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db push    
```

### 4. Development Server

Run the development server with:

```bash
npm run dev
```

### 5. Production

Build and start for production:

```bash
npm run build
npm run start
```

## 📝 License

This project is open-source and available under the MIT license.
