---
sidebar_position: 2
---

# Getting Started

Welcome to Blockia Pay! This guide will help you get up and running with
accepting crypto payments in minutes.

## Prerequisites

Before you begin, ensure you have:

- Node.js ≥20.0.0
- pnpm ≥9.0.0
- Docker & Docker Compose (for local development)

## Quick Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Blockia-Labs/blockia-pay.git
cd blockia-pay

# Install dependencies
pnpm install
```

### 2. Environment Setup

```bash
# Copy environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Start PostgreSQL database
pnpm db:start

# Run database migrations
pnpm db:migrate
```

### 3. Start Development Servers

```bash
# Start all services
pnpm dev
```

This will start:

- API server on `http://localhost:3000`
- Web dashboard on `http://localhost:4000`
- PostgreSQL database

### 4. Verify Installation

```bash
# Check API health
curl http://localhost:3000/health
```

## Your First Payment Link

### 1. Create an Account

Visit `http://localhost:4000` and create your account using passkey
authentication.

### 2. Set Up Your Wallet

The platform will automatically create a smart account wallet for you on the
Base network.

### 3. Create a Payment Link

1. Navigate to the dashboard
2. Click "Create Payment Link"
3. Enter payment details:
   - Amount (e.g., 50 USDC)
   - Description (e.g., "Website Design Services")
   - Currency (USDC on Base)

### 4. Share the Link

Copy the generated payment URL and share it with your client. The link will look
like:

```
https://pay.blockia.pay/link/abcd1234
```

### 5. Receive Payment

Your client can click the link and pay instantly using their own wallet or by
creating a new smart account.

## Next Steps

- [Learn about Smart Wallets](./smart-wallets)
- [Explore Payment Links](./payment-links)
- [Set up your Dashboard](./dashboard)
- [Integrate with our APIs](../api/overview)
