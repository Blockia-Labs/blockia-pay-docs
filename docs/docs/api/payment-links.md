---
sidebar_position: 6
---

# Payment Links API

Create and manage shareable payment links for accepting USDC payments on Base
network.

---

## Endpoints

### 1. Create Payment Link

**POST /v1/payment-links**

**Request:**

```json
{
  "userId": "user_...",
  "amount": 50.0,
  "description": "Website Development Services",
  "expiresInHours": 168
}
```

**Response:**

```json
{
  "id": "link_...",
  "amount": 50.0,
  "currency": "USDC",
  "description": "Website Development Services",
  "url": "https://pay.blockia.com/link/abc123...",
  "aiUrl": "https://pay.blockia.com/x402/abc123...",
  "network": "base-sepolia",
  "status": "ACTIVE",
  "expiresAt": "2024-01-08T10:00:00.000Z",
  "createdAt": "2024-01-01T10:00:00.000Z"
}
```

---

### 2. Get Payment Link by ID

`GET /v1/payment-links/\{id\}?userId=user_...`

**Response:**

```json
{
  "id": "link_...",
  "amount": 50.0,
  "currency": "USDC",
  "description": "Website Development Services",
  "url": "https://pay.blockia.com/link/abc123...",
  "aiUrl": "https://pay.blockia.com/x402/abc123...",
  "network": "base-sepolia",
  "status": "ACTIVE",
  "expiresAt": "2024-01-08T10:00:00.000Z",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

---

### 3. List Payment Links

**GET /v1/payment-links?userId=user\_...&limit=20&cursor=...&status=ACTIVE**

**Response:**

```json
{
  "links": [
    {
      "id": "link_...",
      "amount": 50.0,
      "currency": "USDC",
      "description": "Website Development Services",
      "url": "https://pay.blockia.com/link/abc123...",
      "aiUrl": "https://pay.blockia.com/x402/abc123...",
      "network": "base-sepolia",
      "status": "ACTIVE",
      "expiresAt": "2024-01-08T10:00:00.000Z",
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ],
  "nextCursor": "eyJpZCI6ImxpbmtfLi4uIiwib2Zmc2V0IjoyMH0",
  "totalCount": 45,
  "activeCount": 12,
  "pagination": {
    "hasNextPage": true,
    "limit": 20
  }
}
```

---

### 4. Get Payment Link Stats

**GET /v1/payment-links/stats?userId=user\_...**

**Response:**

```json
{
  "totalLinks": 45,
  "activeLinks": 12,
  "paidLinks": 28,
  "expiredLinks": 5,
  "totalEarnings": 1250.5,
  "currency": "USDC"
}
```

---

## Public Payment Link Endpoints

### 1. Get Public Payment Link Data

`GET /api/v1/public/payment-links/{linkId}/data`

**Response:**

```json
{
  "linkId": "abc123...",
  "merchantName": "freelancer@example.com",
  "amount": 50.0,
  "currency": "USDC",
  "network": "base-sepolia",
  "recipientAddress": "0x742d35Cc...",
  "description": "Website Development Services",
  "status": "ACTIVE",
  "expiresAt": "2024-01-08T10:00:00.000Z"
}
```

### 2. Complete Public Payment Link

`POST /api/v1/public/payment-links/{linkId}/complete`

**Request:**

```json
{
  "transactionHash": "0x1234567890abcdef...",
  "clientWalletAddress": "0xabcdef..."
}
```

**Response:**

```json
{
  "success": true,
  "linkId": "abc123...",
  "status": "PENDING"
}
```

---

## Error Responses

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "amount",
      "issue": "must be positive number"
    }
  }
}
```

## Business Rules

- **Amount**: 0 < amount ≤ 1,000,000 USDC (max 6 decimals)
- **Description**: 1-500 characters
- **Expiration**: 1 hour to 90 days
- **Currency**: USDC only
- **Network**: Base Sepolia (testnet) or Base (mainnet)
