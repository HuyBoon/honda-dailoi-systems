# Honda Đại Lợi System - Technical Documentation

Welcome to the definitive technical guide for the **Honda Đại Lợi System**. This document outlines the architecture, setup process, and core logic of the entire monorepo.

---

## 🏗️ Project Architecture
The system is built as a **Monorepo** to share types and logic efficiently across three main pillars:

| Component | Technology | Path | Purpose |
| :--- | :--- | :--- | :--- |
| **API** | NestJS + Prisma + PostgreSQL | `/apps/api` | The brain. Handles business logic, DB, and Auth. |
| **Storefront** | Next.js (App Router) + Tailwind | `/apps/storefront` | Customer-facing premium e-commerce site. |
| **Admin** | Vite + React + RTK Query | `/apps/admin` | Inventory and Order management for staff. |

---

## 🛠️ Technology Stack
- **Backend**: NestJS (Modular Architecture), JWT Authentication, RBAC (Role-Based Access Control).
- **Database**: PostgreSQL with Prisma ORM.
- **Frontend (Customer)**: Next.js 14, Framer Motion (Animations), Zustand (State Management), Tailwind CSS.
- **Frontend (Staff)**: React, Redux Toolkit Query, Lucide Icons.
- **Storage**: Local file system (Multer) with a dedicated `/uploads` directory.

---

## 🚀 Local Setup Instructions

### 1. Environment Configuration
Create a `.env` file in `apps/api`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/honda_db"
JWT_SECRET="your-secret-key"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

### 2. Database Initialization
```bash
cd apps/api
npx prisma generate
npx prisma migrate dev
npx prisma db seed # Seeds 100+ Honda parts and categories
```

### 3. Running the Project
Open three terminal windows:
```bash
# Terminal 1 (API)
cd apps/api && npm run start:dev

# Terminal 2 (Storefront)
cd apps/storefront && npm run dev

# Terminal 3 (Admin)
cd apps/admin && npm run dev
```

---

## 📊 Data Model (Prisma)
Key entities in the system:
- **User**: Handles authentication for both Customers and Staff (ADMIN, MANAGER, CUSTOMER roles).
- **Part**: The core product entity (Name, SKU, Price, Stock, Category).
- **Order**: Tracks sales, payment status (COD/MOMO), and shipping addresses.
- **Customer**: Profile linked to a User, storing phone and address history.
- **InventoryTransaction**: A ledger tracking every STOCK IN/OUT event.

---

## 🔄 Core Logic Flows

### 1. The Checkout Flow
1. **Cart Selection**: User adds items to cart (stored in Zustand + Persisted in LocalStorage).
2. **Order Creation**: 
   - `OrdersService` verifies all `partId`s exist.
   - Generates a unique `orderNumber` (e.g., `HD-20240503-0001`).
   - Links the user as a `customer` (not staff).
3. **Stock Depletion**: When an order is marked as `COMPLETED`, the system automatically decrements `stockQuantity` and creates an `EXPORT` transaction in the ledger.

### 2. Authentication & RBAC
- **Storefront**: Users register as `CUSTOMER`.
- **Admin**: Only users with `ADMIN` or `MANAGER` roles can access inventory/transaction modules.
- **JWT**: Every request includes a Bearer token. `OptionalJwtAuthGuard` is used for storefront pages that work for both guests and logged-in users.

---

## ✨ Key Features Implemented

### 💎 Premium "Pathway" Design
The Storefront uses a custom design system characterized by:
- **Cinematic Headers**: High-impact brand imagery with slow-zoom animations.
- **Glassmorphism**: Translucent navbars and cards.
- **Bento Grids**: Modern layout for features and categories.

### 🛒 Synchronized Shopping
- **Persistent Cart**: Items stay in your cart even if you refresh the page.
- **Guest-to-User Merge**: If you shop as a guest and then log in, your items are automatically merged into your cloud profile.

### 🔍 SEO Optimization
- **Sitemap.ts**: Dynamically generates `sitemap.xml` for search engines.
- **Robots.ts**: Controls indexing priorities.
- **Semantic HTML**: Proper H1-H6 hierarchy for all product pages.

---

## 📂 File Structure Highlights
- `/apps/storefront/lib/api.ts`: Centralized fetch wrapper for all API calls.
- `/apps/api/src/modules/orders`: Robust transaction-based order processing.
- `/apps/api/prisma/seed.ts`: Powerful script to populate the DB with realistic Honda data.

---

*Document Version: 1.0.0 | Last Updated: May 2026*
