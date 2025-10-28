---
sidebar_position: 3
---

# Authentication API

Blockia Pay uses a passwordless authentication system based on passkeys
(WebAuthn) and JWT sessions. The flow is non-custodial, secure, and
user-friendly.

## Flow Overview

1. **Registration** (`POST /v1/identity/register`): User submits email. User is
   created with status `REGISTERED`.
2. **Email Verification** (`POST /v1/email-verification/verify`): User submits
   OTP from email. On success, user status becomes `WALLET_SETUP_PENDING` and a
   JWT is issued as an httpOnly cookie.
   - Resend OTP: `POST /v1/email-verification/resend`
3. **Wallet Setup (Passkey Registration)**: Passkey registration is handled as
   part of the authentication flow. When a user is eligible, the backend issues
   a WebAuthn challenge via `/v1/auth/options` and verifies the response via
   `/v1/auth/verify`. On success, the user's smart contract wallet is deployed
   and status becomes `ACTIVE`.
4. **Authentication (Login)**:
   - `POST /v1/auth/options`: User submits email. If eligible, receives WebAuthn
     challenge and allowed credentials. If not, response indicates next required
     step (email verification or wallet setup).
   - `POST /v1/auth/verify`: User submits signed WebAuthn response. On success,
     JWT is issued as httpOnly cookie.
5. **Session Management**:
   - `GET /v1/auth/me`: Get current user info (requires JWT).
   - `POST /v1/auth/logout`: Logout and clear session.
6. **Google OAuth (Optional)**:
   - `GET /v1/auth/google/authorize` → `GET /v1/auth/google/callback`: On
     success, JWT is issued as cookie.

---

## WebAuthn Passkey Authentication

### 1. Request Authentication Options

```http
POST /v1/auth/options
Content-Type: application/json
{
  "email": "user@example.com"
}
```

**Response (ready to authenticate):**

```json
{
  "success": true,
  "requiresCompletion": false,
  "challengeId": "ch_...",
  "challenge": "base64-encoded-challenge",
  "timeout": 60000,
  "rp": { "id": "blockia.pay", "name": "Blockia Pay" },
  "allowCredentials": [
    {
      "id": "base64-credential-id",
      "type": "public-key",
      "transports": ["internal"]
    }
  ],
  "userVerification": "preferred"
}
```

**Response (email verification required):**

```json
{
  "success": false,
  "reason": "EMAIL_VERIFICATION_REQUIRED",
  "userId": "user_...",
  "userStatus": "REGISTERED",
  "redirectTo": "/email-verification",
  "emailVerificationSent": false
}
```

**Response (wallet setup required):**

```json
{
  "success": false,
  "reason": "WALLET_SETUP_REQUIRED",
  "userId": "user_...",
  "userStatus": "WALLET_SETUP_PENDING",
  "redirectTo": "/wallet-setup"
}
```

### 2. Browser WebAuthn

Use the browser's WebAuthn API with the challenge:

```js
const credential = await navigator.credentials.get({ publicKey: challenge });
```

### 3. Verify Authentication

```http
POST /v1/auth/verify
Content-Type: application/json
{
  "challengeId": "ch_...",
  "email": "user@example.com",
  "authenticationResponse": { ... }
}
```

**Response (success):**

```json
{
  "verified": true,
  "user": {
    "id": "user_...",
    "email": "user@example.com",
    "status": "ACTIVE",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z",
    "hasWallet": true,
    "walletAddress": "0x123..."
  }
}
```

**Response (failure):**

```json
{
  "verified": false,
  "message": "Authentication failed"
}
```

---

## Google OAuth Authentication

### 1. Initiate OAuth

```http
GET /v1/auth/google/authorize
```

Redirects to Google. Rate limit: 10 requests per 60 seconds.

### 2. OAuth Callback

```http
GET /v1/auth/google/callback?state=...&code=...
```

On success, sets `authToken` cookie and redirects to dashboard.

---

## Session Management

### Get Current User

```http
GET /v1/auth/me
Cookie: authToken=...
```

**Response:**

```json
{
  "id": "user_...",
  "email": "user@example.com",
  "status": "ACTIVE",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z",
  "hasWallet": true,
  "walletAddress": "0x123...",
  "wallet": { "address": "0x123...", "network": "base-sepolia" },
  "permissions": ["CREATE_PAYMENT_LINK", "VIEW_TRANSACTIONS", "MANAGE_WALLET"]
}
```

### Get User Status

```http
GET /v1/auth/status
Cookie: authToken=...
```

**Response:**

```json
{
  "status": "ACTIVE",
  "completedSteps": [
    "registration",
    "email_verification",
    "wallet_setup",
    "activation"
  ]
}
```

### Logout

```http
POST /v1/auth/logout
Cookie: authToken=...
```

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Authentication Cookies

- **Name:** `authToken`
- **Type:** httpOnly, secure (production), sameSite=strict
- **Duration:** 1 hour
- **Set automatically** after successful authentication

## User Statuses

- **REGISTERED**: Registered, must verify email
- **WALLET_SETUP_PENDING**: Email verified, must set up wallet
- **ACTIVE**: Wallet set up, full access

Permissions are assigned based on status.

## Error Handling

- All endpoints return structured error responses with clear messages and codes.
- Example:
  ```json
  { "verified": false, "message": "Authentication failed" }
  ```
- Validation errors for missing/invalid data.

## Security

- Hardware-backed biometric authentication (WebAuthn)
- Cross-device passkey sync (iCloud, Android)
- Rate limiting on OAuth endpoints
- CSRF protection via SameSite cookies
- Session invalidation on logout

## Development Mode

- `NODE_ENV=development`: Secure cookie flag is disabled
