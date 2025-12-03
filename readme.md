# 🔔 Notification Preference System

_A role-based, multi-channel notification preference engine built with Node.js, Express, TypeScript, Prisma, and PostgreSQL._

---

## 📌 Overview

This project implements a **production-grade Notification Preference System** where:

- Organizations contain customers and admins
- Admins can create **Notification Groups** and **Topics**
- Customers can control **group-level** and **topic-channel-level** preferences
- Supported channels: `email`, `sms`, `push`, `whatsapp`, `chat`, `in_app`
- A centralized **Decision Engine** decides whether a notification should be sent or blocked

This structure mirrors real-world architectures used by fintech and consumer apps like Fampay, CRED, and Razorpay.

---

## 🛠 Tech Stack

| Layer     | Technology           |
| --------- | -------------------- |
| Runtime   | Node.js (ES Modules) |
| Language  | TypeScript           |
| Framework | Express.js           |
| ORM       | Prisma 7             |
| Database  | Neon PostgreSQL      |
| Testing   | Postman Collection   |

---

## 🧠 Core Features

### ✔ Role-Based Access (RBAC)

- **Admins** can create Groups & Topics
- **Customers** cannot
- Middleware: `verifyAdmin`

### ✔ Preferences

- **Group Preference**

  - Enable/disable entire group

- **Topic-Channel Preference**

  - Enable/disable specific channels (e.g. WhatsApp OFF, Email ON)

### ✔ Decision Engine

Determines if a notification is allowed.

Rules:

```
1. User must belong to the organization
2. Topic must belong to group; both must belong to organization
3. If group preference disabled → BLOCK
4. If topic-channel preference missing or disabled → BLOCK
5. Otherwise → ALLOW
```

### ✔ Database Integrity

- Unique constraints across orgs, groups, topics, preferences
- Cascading deletes
- Audit fields: `createdAt`, `updatedAt`

---

## 📂 Project Structure

```
src/
 ├── app.ts
 ├── server.ts
 ├── prisma/
 │     ├── prismaClient.ts
 │     └── schema.prisma
 ├── middleware/
 │     └── verifyAdmin.ts
 ├── repositories/
 │     ├── organization.repository.ts
 │     ├── user.repository.ts
 │     ├── group.repository.ts
 │     ├── topic.repository.ts
 │     └── preference.repository.ts
 ├── services/
 │     ├── organization.service.ts
 │     ├── user.service.ts
 │     ├── group.service.ts
 │     ├── topic.service.ts
 │     └── preference.service.ts
 ├── controllers/
 │     ├── organization.controller.ts
 │     ├── user.controller.ts
 │     ├── group.controller.ts
 │     ├── topic.controller.ts
 │     └── preference.controller.ts
 └── routes/
        ├── organization.routes.ts
        ├── user.routes.ts
        ├── group.routes.ts
        ├── topic.routes.ts
        └── preference.routes.ts
```

---

## 🚀 Running the Project

### 1️⃣ Install deps

```bash
npm install
```

### 2️⃣ Create `.env`

```
DATABASE_URL="your-neon-db-url"
```

### 3️⃣ Push schema

```bash
npx prisma migrate dev --name init
```

### 4️⃣ Start dev server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 📬 API Endpoint Summary

### Organizations

```
POST /orgs
GET /orgs/:id/customers
```

### Users

```
POST /users
```

### Groups (ADMIN ONLY)

```
POST /groups
```

### Topics (ADMIN ONLY)

```
POST /topics
```

### Preferences

```
GET  /preferences/user/:userId
PUT /preferences/group/:groupId/user/:userId
PUT /preferences/topic/:topicId/user/:userId
```

### Decision Engine

```
POST /preferences/decision
```

---

## 🧪 API Testing

A full working Postman collection is included:

```
### 1. Local JSON File
/postman/notification-preference-system-rbac.postman_collection.json

```

### 2. Public Postman Link

[Public Postman Link](https://www.postman.com/balders-9306/workspace/testing/request/33375936-b2c8c4c2-713d-4759-a92a-7bc5213b6e7f?action=share&creator=33375936&ctx=documentation&active-environment=33375936-bc5574aa-2a15-408b-9a14-c433eb99f643)

base url : http://localhost:3000/api

Features:

- Auto-filled environment variables (`orgId`, `adminId`, etc.)
- Strict RBAC test cases
- Topic-channel preference coverage
- Decision engine validation

.

---

## 🏁 Final Summary

This backend demonstrates:

- Clean modular architecture
- Strong relational modeling
- Admin-only role enforcement
- Multi-channel user preference logic
- Robust decision engine
- Full automated test suite
- Scalable, production-ready design

This project reflects real-world patterns used in modern notification systems.

---
