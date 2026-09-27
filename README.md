# Resol

Resol is a reminder and productivity app with calendar planning, notes, agenda tracking, AI assistance, notifications, account management, chat, and online meeting support.

## Features

- Reminder and task list management
- Notes and agenda planner
- Interactive calendar with visual reminder indicators
- AI assistant for planning and summarization
- Notifications and alerts
- User authentication and profiles
- Real-time chat
- Video meeting integration

## Tech stack

- Frontend: React + Vite + CSS
- Backend: Node.js + Express + Socket.IO
- Database: PostgreSQL-ready schema
- Container support: Docker Compose

## Project structure

- `frontend/` – React web app
- `backend/` – API and real-time server
- `database/` – SQL schema
- `docs/` – additional planning notes

## Quick start

1. Copy `.env.example` to `.env` and update the values.
2. Start dependencies:
   ```bash
   docker compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the app:
   ```bash
   npm run dev
   ```

## Production-style notes

- The app is scaffolded as a starter monorepo with a realistic architecture for a production product.
- Authentication, AI, chat, and meetings are implemented as starter API endpoints and client UI scaffolds.
- You can connect it to your database, AI API, and video provider in later iterations.

## License

MIT
