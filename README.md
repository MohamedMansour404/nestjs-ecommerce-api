<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
</p>

<h1 align="center">E-Commerce API</h1>

<p align="center">
  A scalable RESTful API for e-commerce applications built with NestJS
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeORM-0.3-FE0803?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Pre--Production-yellow?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Version-0.0.1-blue?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/License-Private-red?style=flat-square" alt="License" />
</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Development Roadmap](#-development-roadmap)
- [Scripts](#-scripts)

---

## 🎯 Overview

This is a **pre-production** e-commerce backend API providing a solid foundation for online retail platforms. The project currently implements **authentication** and **user management** systems, with e-commerce features planned for future development.

### Current Capabilities

| Module | Description | Status |
|--------|-------------|--------|
| **Authentication** | JWT-based auth with register, login, password reset | ✅ Complete |
| **User Management** | Full CRUD with pagination, filtering, sorting | ✅ Complete |
| **Role-Based Access** | Admin and User roles with protected endpoints | ✅ Complete |
| **Email Service** | Transactional emails for password reset | ✅ Complete |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (NestJS)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Swagger   │  │    CORS     │  │   Rate Limiting     │  │
│  │   /swagger  │  │  Configured │  │   5 req/60s         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Modules                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │    Auth     │  │    User     │  │      Shared         │  │
│  │   Module    │──│   Module    │──│   (Guards, JWT)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                     users table                          ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🔐 Authentication
- **User Registration** — Email/password with validation (name: 3-30 chars, password: 6-20 chars)
- **User Login** — Credential verification returning JWT token
- **Password Reset Flow** — Email-based 6-digit code with 10-minute expiry
- **JWT Tokens** — 7-day expiration with secure payload (id, email, name, role)

### 👤 User Management
- **CRUD Operations** — Create, Read, Update, Delete users
- **Pagination** — Configurable page size (default: 10, max: 1000)
- **Filtering** — By name, email, role (case-insensitive)
- **Sorting** — Any field with ASC/DESC order
- **Role-Based Access** — Admin-only operations vs owner access

### 🛡 Security
- **Password Hashing** — bcryptjs with configurable salt rounds
- **Rate Limiting** — 5 requests per 60 seconds (global)
- **CORS Protection** — Configurable allowed origins
- **Input Validation** — Whitelist-based with class-validator
- **Serialization** — Password excluded from responses

### 📧 Email Service
- **Gmail Integration** — SMTP transport via nodemailer
- **HTML Templates** — Professional password reset emails
- **Verification Codes** — SHA-256 hashed storage

---

## 🛠 Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Runtime** | Node.js | 18+ |
| **Framework** | NestJS | 11.0 |
| **Language** | TypeScript | 5.7 |
| **Database** | PostgreSQL | 16+ |
| **ORM** | TypeORM | 0.3.27 |
| **Authentication** | @nestjs/jwt | 11.0 |
| **Validation** | class-validator | 0.14 |
| **Documentation** | @nestjs/swagger | 11.2 |
| **Email** | @nestjs-modules/mailer | 2.0 |
| **Security** | bcryptjs, @nestjs/throttler | Latest |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **PostgreSQL** 14+ (local or cloud instance)
- **Gmail Account** with App Password (for email service)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ecommerce-api

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your values

# Start development server
npm run start:dev
```

### Verify Installation

```bash
# API should respond at
curl http://localhost:3000/api/v1

# Swagger documentation at
open http://localhost:3000/swagger
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@host:5432/database_name

# JWT Configuration
JWT_SECRET=your-secure-secret-key-min-32-chars

# Email Service (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Server Configuration
PORT=3000
NODE_ENV=development

# Security
SALT_ROUNDS=10
CORS_ORIGIN=http://localhost:3000,http://localhost:4200
```

> ⚠️ **Gmail Setup**: Use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password. Enable 2FA first.

---

## 📚 API Reference

**Base URL:** `http://localhost:3000/api/v1`

**Swagger UI:** `http://localhost:3000/swagger`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT | ❌ |
| `POST` | `/auth/reset-password` | Request password reset code | ❌ |
| `POST` | `/auth/verify-reset-code` | Verify the reset code | ❌ |
| `POST` | `/auth/change-password` | Set new password with code | ❌ |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/users` | Create new user | 🔒 Admin |
| `GET` | `/users` | List all users (paginated) | 🔒 Admin |
| `GET` | `/users/:id` | Get user by ID | 🔒 Admin/Owner |
| `GET` | `/users/email?email=` | Get user by email | 🔒 Admin/User |
| `PATCH` | `/users/:id` | Update user | 🔒 Admin/Owner |
| `DELETE` | `/users/:id` | Delete user | 🔒 Admin |

### Request Examples

**Register:**
```json
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123",
  "phoneNumber": "+201234567890",
  "gender": "male"
}
```

**Login:**
```json
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Authorization Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**List Users with Pagination:**
```
GET /api/v1/users?page=1&limit=10&sortField=name&sortOrder=asc&name=john
```

---

## 📁 Project Structure

```
src/
├── auth/                       # Authentication module
│   ├── dto/
│   │   ├── login.dto.ts        # Login request validation
│   │   ├── register.dto.ts     # Registration validation
│   │   └── password-reset.dto.ts
│   ├── auth.controller.ts      # Auth route handlers
│   ├── auth.service.ts         # Auth business logic
│   └── auth.module.ts
│
├── user/                       # User management module
│   ├── dto/
│   │   ├── create-user.dto.ts  # Admin user creation
│   │   ├── update-user.dto.ts  # User updates
│   │   └── get-users-query.dto.ts
│   ├── entities/
│   │   └── user.entity.ts      # TypeORM entity (14 fields)
│   ├── user.controller.ts      # User route handlers
│   ├── user.service.ts         # User CRUD operations
│   └── user.module.ts
│
├── shared/                     # Shared security infrastructure
│   ├── guards/
│   │   ├── auth.guard.ts       # JWT authentication
│   │   ├── auth-roles.guard.ts # Role-based authorization
│   │   └── base-auth.guard.ts  # Abstract guard base
│   ├── decorators/
│   │   └── user-role.decorator.ts
│   └── shared.module.ts
│
├── templates/                  # Email templates
│   └── reset-password.template.ts
│
├── utils/                      # Utilities
│   ├── enums.ts                # UserType, GenderType
│   ├── types.ts                # JWTPayloadType
│   ├── hash.ts                 # Password hashing
│   └── constants.ts
│
├── app.module.ts               # Root application module
└── main.ts                     # Application bootstrap
```

---

## 🔒 Security

### Implemented Measures

| Feature | Implementation |
|---------|---------------|
| **Password Storage** | bcryptjs with configurable salt rounds |
| **Token Security** | JWT with secret from environment |
| **Rate Limiting** | 5 requests per 60 seconds per IP |
| **Input Sanitization** | Whitelist validation, forbid unknown fields |
| **CORS** | Configurable allowed origins |
| **Response Filtering** | Password excluded via class-transformer |
| **Reset Codes** | SHA-256 hashed, 10-minute expiry |
| **User Enumeration** | Generic responses for password reset |

### User Entity Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Primary key, auto-generated |
| `name` | varchar(30) | Required, 3-30 characters |
| `email` | varchar | Required, unique |
| `password` | varchar(255) | Hashed, excluded from responses |
| `role` | enum | 'admin' or 'user' |
| `avatar` | varchar | Optional, URL |
| `age` | integer | Optional |
| `phoneNumber` | varchar(20) | Optional, Egyptian format |
| `address` | varchar | Optional |
| `active` | boolean | Default: false |
| `gender` | enum | 'male' or 'female' |
| `verificationCode` | varchar | Hashed reset code |
| `verificationCodeExpires` | timestamp | Code expiry time |
| `createdAt` | timestamp | Auto-generated |
| `updatedAt` | timestamp | Auto-updated |

---

## 📋 Development Roadmap

| Phase | Features | Status |
|-------|----------|--------|
| **Phase 1** | Auth + User Management | ✅ Complete |
| **Phase 2** | Product Catalog | 🔜 Planned |
| **Phase 3** | Shopping Cart | 🔜 Planned |
| **Phase 4** | Order Processing | 🔜 Planned |
| **Phase 5** | Payment Integration | 🔜 Planned |
| **Phase 6** | Reviews & Ratings | 🔜 Planned |

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start with hot-reload |
| `npm run start:debug` | Start with debugger |
| `npm run build` | Build for production |
| `npm run start:prod` | Run production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run e2e tests |
| `npm run test:cov` | Generate coverage report |

---

## 🤝 Contributing

This is a private project. Contact the repository owner for contribution guidelines.

---

## 📄 License

This project is **UNLICENSED** — All rights reserved.

---

<p align="center">
  Built with ❤️ using <a href="https://nestjs.com/">NestJS</a>
</p>
