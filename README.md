# PulseOps - Enterprise Monitoring Dashboard

PulseOps is a modern, production-grade DevOps Monitoring Dashboard SaaS designed to feel like an enterprise internal engineering platform. It provides real-time telemetry, log streaming, incident management, and AI-powered incident analysis.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Database ORM:** Prisma
- **Database:** Neon PostgreSQL
- **Caching/Queue:** Upstash Redis
- **Real-time Engine:** Socket.io (Node.js Telemetry Server)
- **Charts:** Recharts
- **Authentication:** NextAuth.js
- **Validation:** Zod

## ✨ Features

- **Real-time Telemetry:** Live updates of CPU, RAM, Latency, and RPS across all services.
- **Terminal Logs:** Real-time streaming log viewer with severity filtering and auto-scroll.
- **Incident Management:** Track incidents with AI-powered root-cause analysis and remediation suggestions.
- **Analytics:** Historical metrics tracking and visualizations.
- **Global Search:** Command Palette (Ctrl+K or `/?`) to navigate resources instantly.
- **Dark/Light Mode:** Enterprise-grade "Datadog-inspired" theme supporting both modes.
- **Audit Logs:** Full tracking of user and system events.

## 🛠 Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   # Database (Neon PostgreSQL)
   DATABASE_URL="postgresql://user:pass@ep-cool-db.us-east-2.aws.neon.tech/pulseops?sslmode=require"

   # Redis (Upstash)
   UPSTASH_REDIS_REST_URL="https://relieved-puma-12345.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="token_here"

   # NextAuth
   NEXTAUTH_SECRET="your-super-secret-string-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Database Initialization:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the Development Servers:**
   This will start both the Next.js app and the Telemetry Websocket Server concurrently.
   ```bash
   npm run dev
   ```
   *The app will be available at [http://localhost:3000](http://localhost:3000)*
   *The Telemetry server will run on port 3001.*

## 🚀 Deployment (Vercel)

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Add the Environment Variables from your `.env` file to the Vercel project settings.
5. In the Vercel Build settings, set the Install Command to:
   ```bash
   npm install && npx prisma generate
   ```
6. (Optional) For the real-time WebSocket functionality, Vercel Serverless Functions do not natively support long-lived Socket.io connections. You will need to deploy `telemetry-server.js` to a platform that supports long-lived WebSockets, such as **Railway**, **Render**, or **Fly.io**, and update the Socket connection URL in `src/hooks/use-socket.ts`.

## 🏗 Architecture Details

- **Service Layer Pattern:** Business logic is decoupled from React components.
- **Real-time Simulation:** The `telemetry-server.js` acts as a mock backend that generates highly realistic infrastructure spikes, incidents, and logs.
- **Theme System:** CSS variables define strict tokens for UI consistency, ensuring professional rendering in both light and dark modes.
