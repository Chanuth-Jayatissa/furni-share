# FurniShare

FurniShare is a sustainability-focused web app that connects people donating furniture with people who need it. The project supports donor/recipient account flows, donation and collection dashboards, and a Next.js/PostgreSQL foundation for furniture listing workflows.

## Features

- Landing page for the FurniShare concept.
- Sign-up and sign-in flows.
- Dashboard pages for donating and collecting furniture.
- Profile page area.
- PostgreSQL connection helper for database-backed features.
- Responsive styling with Tailwind CSS.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- PostgreSQL / Neon serverless
- Tailwind CSS
- bcrypt / bcryptjs

## Project Structure

- app/page.tsx - landing page
- app/dashboard - dashboard, donate, collect, and profile pages
- app/login - sign-in and sign-up flows
- app/ui - shared UI components
- lib/db.ts - PostgreSQL connection helper
- middleware.ts - route middleware

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Set a database connection string for database-backed features:

```bash
DATABASE_URL=your_postgres_connection_string
```

Useful commands:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Status

Hackathon/product prototype. The app demonstrates the sustainability marketplace concept and account/listing flow foundations.
