# Backend API

A modern backend API built with Bun runtime and Hono framework, featuring JWT authentication and MySQL database integration.

## Tech Stack

### Runtime & Framework

- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[Hono](https://hono.dev/)** - Fast, lightweight web framework for the edge

### Database & ORM

- **[MySQL](https://www.mysql.com/)** - Relational database management system
- **[Prisma](https://www.prisma.io/)** - Modern database toolkit and ORM
- **[Docker](https://www.docker.com/)** - Containerization for MySQL database

### Validation & Security

- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[JWT (JSON Web Tokens)](https://jwt.io/)** - Secure authentication via Hono JWT middleware

### Development

- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **Hot Reload** - Development server with automatic restart

## Features

- ✅ User registration and authentication
- ✅ JWT-based authorization middleware
- ✅ Input validation with Zod schemas
- ✅ Database operations with Prisma ORM
- ✅ RESTful API endpoints
- ✅ TypeScript support
- ✅ Docker containerized MySQL database

## Getting Started

### Prerequisites

- Bun runtime installed
- Docker and Docker Compose

### Installation

Install dependencies:

```sh
bun install
```

### Database Setup

Start MySQL database with Docker:

```sh
docker-compose up -d
```

Run database migrations:

```sh
bunx prisma migrate dev
```

Generate Prisma client:

```sh
bunx prisma generate
```

### Development

Run the development server:

```sh
bun run dev
```

Run with debugging:

```sh
bun run debug
```

### Database Access

Access MySQL database directly:

```sh
docker exec -it mysql mysql -u root -p
```

View database with Prisma Studio:

```sh
bunx prisma studio
```

## API Endpoints

### Authentication

- `POST /api/register` - User registration
- `POST /api/login` - User login

### Users (Protected)

- `GET /api/users` - Get all users (requires JWT token)

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="mysql://root:password@localhost:3306/your_database"
JWT_SECRET="your-super-secret-jwt-key"
```

## Project Structure

```
src/
├── controllers/        # Request handlers
├── middlewares/       # Custom middleware (auth, validation)
├── routes/           # API route definitions
├── schemas/          # Zod validation schemas
├── types/            # TypeScript type definitions
└── utils/            # Utility functions

prisma/
├── schema.prisma     # Database schema
└── migrations/       # Database migrations
```

## Server

The server runs on http://localhost:3000

## Scripts

- `bun run dev` - Start development server with hot reload
- `bun run debug` - Start server with debugging enabled
- `bunx prisma studio` - Open Prisma Studio database browser
- `bunx prisma migrate dev` - Run database migrations
- `bunx prisma generate` - Generate Prisma client
