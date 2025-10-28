---
sidebar_position: 1
---

# API Overview

The Blockia Pay API provides RESTful endpoints for:

- Managing payment links (create, list, pay, refund)
- Sending and receiving payments (on-chain, off-chain)
- Accessing wallet and transaction data
- Exporting transaction history for accounting

The API is designed for developers building payment integrations, dashboards,
and automated payment systems for freelancers, merchants, and platforms.

## Base URL

```
https://api.blockia.pay/v1
```

## Authentication

All API requests require authentication using WebAuthn passkeys or Google OAuth.
See [Authentication](./authentication.md) for full details.

### WebAuthn Passkey Authentication

Blockia Pay uses WebAuthn passkeys for secure, passwordless authentication.

#### Authentication Flow

1. **Generate Challenge**: Request authentication options
2. **User Authentication**: User authenticates with passkey
   (biometric/fingerprint)
3. **Verify Response**: Server verifies the authentication response
4. **Session Token**: Server issues JWT session token via httpOnly cookie

#### Example Flow

```javascript
// 1. Get authentication options
const optionsResponse = await fetch('/v1/auth/options', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' }),
});

const options = await optionsResponse.json();

// 2. Authenticate with passkey
const credential = await navigator.credentials.get({
  publicKey: options.challenge,
});

// 3. Verify authentication
const verifyResponse = await fetch('/v1/auth/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    challengeId: options.challengeId,
    email: 'user@example.com',
    authenticationResponse: credential,
  }),
});
```

### Google OAuth Authentication

Alternative authentication using Google OAuth 2.0.

#### OAuth Flow

```javascript
// Redirect to Google OAuth
window.location.href = '/v1/auth/google/authorize';

// Handle callback (automatic redirect)
```

### Session Management

- **Session Tokens**: JWT tokens stored in httpOnly cookies
- **Expiration**: 1 hour for authentication, 24 hours for wallet sessions
- **Automatic Renewal**: Sessions are renewed on activity

## Transactions API

Blockia Pay tracks all user transactions (on-chain and off-chain) and provides
endpoints to list and export them. See [Transactions API](./transactions.md) for
full details.

### List Transactions

- `GET /v1/transactions` — List and filter your transactions (send, receive,
  payment link, etc.)

### Export Transactions

- `POST /v1/transactions/export` — Export your transactions as CSV, JSON, or
  PDF-like text for accounting or reporting.

See the [Transactions API documentation](./transactions.md) for request/response
examples and business rules.

---

## Request/Response Format

### Content Type

All requests and responses use JSON format:

```bash
Content-Type: application/json
```

### Response Structure

#### Success Response

```json
{
  "data": { ... },
  "meta": {
    "requestId": "req_123456",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

#### Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "amount",
      "issue": "must be positive number"
    }
  },
  "meta": {
    "requestId": "req_123456",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

## Rate Limiting

API requests are rate limited to prevent abuse:

- **Authentication endpoints**: 10 requests per minute
- **Payment operations**: 50 requests per hour
- **General API calls**: 1000 requests per hour

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Pagination

List endpoints (including transactions and payment links) support cursor-based
or offset pagination:

**Example:**

```bash
GET /v1/transactions?limit=50&offset=0
```

or

```bash
GET /v1/payment-links?limit=50&cursor=eyJpZCI6IjEyMyJ9
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "hasNextPage": true,
    "nextCursor": "eyJpZCI6IjQ1NiJ9",
    "limit": 50
  }
}
```

## Error Codes

| Code               | Description                | HTTP Status |
| ------------------ | -------------------------- | ----------- |
| `VALIDATION_ERROR` | Invalid request parameters | 400         |
| `UNAUTHORIZED`     | Authentication required    | 401         |
| `FORBIDDEN`        | Insufficient permissions   | 403         |
| `NOT_FOUND`        | Resource not found         | 404         |
| `CONFLICT`         | Resource conflict          | 409         |
| `RATE_LIMITED`     | Too many requests          | 429         |
| `INTERNAL_ERROR`   | Server error               | 500         |

## SDK Support

While you can use the API directly, we recommend using our official SDKs:

**TypeScript/JavaScript:**

```bash
npm install @blockia-pay/blockia-agent-sdk
```

## Environments

### Production

- **URL**: `https://api.blockia.pay/v1`
- **Rate Limits**: Standard limits apply
- **Data**: Real transactions and data

### Development

- **URL**: `http://localhost:3000/v1` (when running locally)
- **Rate Limits**: No limits
- **Data**: Local test data

## API Versions

The API uses versioning in the URL path:

- **v1** (Current): Initial release with core payment functionality
- **Future versions**: Will be released with breaking changes

Version headers are included in responses:

```
X-API-Version: v1
```

## Testing

### Test Mode

Enable test mode for development:

```bash
curl -H "X-Test-Mode: true" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     https://api.blockia.pay/v1/payment-links
```

### Test Data

Use these test values for development:

```json
{
  "testWallet": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "testAmount": "10.00"
}
```
