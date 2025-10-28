---
id: transactions
slug: /api/transactions
sidebar_label: Transactions API
sidebar_position: 8
---

# Transactions API

The Transactions API allows authenticated users to list and export their
on-chain and off-chain payment transactions. All endpoints require
authentication via JWT (see [Authentication](./authentication.md)).

## List Transactions

**GET** `/v1/transactions`

Retrieve a paginated, filterable list of transactions for the authenticated
user.

### Query Parameters

- `limit` (number, optional): Max results (default 50, max 100)
- `offset` (number, optional): Pagination offset (default 0)
- `types` (string[], optional): Filter by transaction types (`SEND`, `RECEIVE`,
  `PAYMENT_LINK`)
- `statuses` (string[], optional): Filter by status (`CONFIRMED`, `FAILED`,
  etc.)
- `networks` (string[], optional): Filter by network (e.g., `base`,
  `base-sepolia`)
- `currencies` (string[], optional): Filter by currency (e.g., `USDC`)
- `dateFrom` (ISO8601 string, optional): Start date
- `dateTo` (ISO8601 string, optional): End date
- `search` (string, optional): Search by description or hash
- `amountMin` (number, optional): Minimum amount
- `amountMax` (number, optional): Maximum amount

### Response

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "string",
        "type": "SEND",
        "amount": "100.00",
        "currency": "USDC",
        "network": "base",
        "status": "CONFIRMED",
        "description": "string",
        "title": "string",
        "clientWalletAddress": "0x...",
        "transactionHash": "0x...",
        "blockNumber": 123456,
        "confirmedAt": "2025-10-24T12:34:56.000Z",
        "detectedAt": "2025-10-24T12:34:56.000Z",
        "metadata": { "txHash": "0x..." }
      }
    ],
    "pagination": {
      "total": 1,
      "limit": 50,
      "offset": 0,
      "hasMore": false
    }
  },
  "message": "Transactions retrieved successfully"
}
```

### Errors

- 401 Unauthorized: Missing or invalid JWT
- 400 Bad Request: Invalid query params

---

## Export Transactions

**POST** `/v1/transactions/export`

Export all user transactions in CSV, JSON, or PDF-like text format.

### Request Body

```json
{
  "format": "csv" | "json" | "pdf",
  "types": ["SEND", "RECEIVE", "PAYMENT_LINK"] // optional
}
```

### Response

- `csv`: `text/csv` file download
- `json`: `application/json` file download
- `pdf`: `text/plain` file download (simple text report)

#### Example CSV Header

```
Date,Type,Amount,Currency,Status,Network,Description,Transaction Hash
```

### Errors

- 401 Unauthorized: Missing or invalid JWT
- 400 Bad Request: Invalid or missing format

---

## Business Rules

- Only authenticated users can access their own transactions.
- Export is limited to 10,000 transactions per request.
- Transaction types and statuses are defined by the platform and may expand.
