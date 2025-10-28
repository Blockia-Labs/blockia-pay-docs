---
sidebar_position: 4
---

# Wallets API

Manage smart account wallets, view balances, and handle wallet setup.

## Start Wallet Setup

Initiate the wallet setup process for an authenticated user.

```bash
POST /v1/wallets/setup/start
Authorization: Cookie authToken=...
Content-Type: application/json
```

### Request Body

```json
{
  "network": "base-sepolia"
}
```

### Parameters

| Field     | Type   | Required | Default        | Description                   |
| --------- | ------ | -------- | -------------- | ----------------------------- |
| `network` | string | No       | "base-sepolia" | Network for wallet deployment |

### Response

```json
{
  "userId": "user_12345678-1234-1234-1234-123456789abc",
  "passkeyChallenge": {
    "challenge": "base64-encoded-challenge-data",
    "timeout": 60000,
    "rp": {
      "name": "Blockia Pay",
      "id": "blockia.pay"
    },
    "user": {
      "id": "user_12345678-1234-1234-1234-123456789abc",
      "name": "user@example.com",
      "displayName": "user@example.com"
    },
    "pubKeyCredParams": [
      {
        "alg": -7,
        "type": "public-key"
      }
    ],
    "authenticatorSelection": {
      "authenticatorAttachment": "platform",
      "userVerification": "required",
      "requireResidentKey": true
    },
    "attestation": "direct"
  },
  "nextStep": "complete-wallet-setup",
  "instructions": "Use the passkey challenge to register your passkey, then call /v1/wallets/setup/complete"
}
```

## Complete Wallet Setup

Complete the wallet setup process with passkey registration and smart wallet
deployment.

```bash
POST /v1/wallets/setup/complete
Authorization: Cookie authToken=...
Content-Type: application/json
```

### Request Body

```json
{
  "challengeId": "ch_12345678-1234-1234-1234-123456789abc",
  "network": "base-sepolia",
  "passkeyResponse": {
    "id": "credential-id-base64",
    "rawId": "raw-id-base64",
    "response": {
      "clientDataJSON": "client-data-json-base64",
      "attestationObject": "attestation-object-base64"
    },
    "type": "public-key"
  }
}
```

### Parameters

| Field             | Type   | Required | Description                            |
| ----------------- | ------ | -------- | -------------------------------------- |
| `challengeId`     | string | Yes      | Challenge ID from setup/start response |
| `network`         | string | No       | Network for wallet deployment          |
| `passkeyResponse` | object | Yes      | WebAuthn credential response           |

### Response

```json
{
  "user": {
    "id": "user_12345678-1234-1234-1234-123456789abc",
    "email": "user@example.com",
    "status": "ACTIVE",
    "permissions": ["CREATE_PAYMENT_LINK", "VIEW_TRANSACTIONS", "MANAGE_WALLET"]
  },
  "wallet": {
    "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "isNewWallet": true,
    "network": "base-sepolia"
  },
  "status": "wallet-setup-complete",
  "message": "Smart wallet successfully created. You are now signed in.",
  "autoSignedIn": true
}
```

## Get Wallet Balance

Retrieve the USDC balance and wallet address for the authenticated user.

```bash
GET /v1/wallets/balance?network=base-sepolia
Cookie: authToken=...
```

### Query Parameters

| Parameter | Type   | Required | Default        | Description                 |
| --------- | ------ | -------- | -------------- | --------------------------- |
| `network` | string | No       | "base-sepolia" | Network to check balance on |

### Response

```json
{
  "wallet": {
    "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "network": "base-sepolia"
  },
  "balance": {
    "token": "USDC",
    "amount": "1250.50",
    "decimals": 6,
    "symbol": "$"
  }
}
```

## Wallet Architecture

### Smart Account Wallets

Blockia Pay uses ERC-4337 compatible smart account wallets:

- **Deployment**: Lazy deployment on first use
- **Security**: Controlled by WebAuthn passkeys
- **Network**: Base Sepolia (testnet) and Base (mainnet)
- **Assets**: Primarily USDC with multi-asset support

### Passkey Integration

Wallets are secured using WebAuthn passkeys:

- **Biometric Authentication**: Fingerprint, FaceID, or PIN
- **Cross-Device Sync**: iCloud Keychain, Android passkeys
- **Hardware Security**: Keys stored in secure enclaves
- **Recovery**: Social recovery mechanisms (future feature)

### Wallet Creation Flow

1. **Start Setup**: Generate passkey challenge
2. **User Registration**: User creates passkey credential
3. **Complete Setup**: Deploy smart wallet contract
4. **Auto Sign-in**: User is automatically signed in

## Error Responses

### Wallet Setup Errors

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid passkey response"
  }
}
```

### Balance Check Errors

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Wallet not found for user"
  }
}
```

## Rate Limiting

- **Wallet Setup**: 10 requests per hour
- **Balance Check**: 100 requests per hour

## Business Rules

- **Network Support**: Currently base-sepolia and base
- **Passkey Required**: All wallet operations require valid passkey
- **Single Wallet**: Users can have one wallet per network
- **Lazy Deployment**: Wallets are deployed on first transaction
- **Balance Updates**: Real-time balance updates via blockchain

## SDK Usage

```typescript
import { BlockiaPay } from '@blockia-pay/blockia-agent-sdk';

// Initialize SDK
const client = new BlockiaPay();

// Start wallet setup
const setup = await client.wallets.startSetup({
  network: 'base-sepolia',
});

// Complete setup with passkey
const wallet = await client.wallets.completeSetup({
  challengeId: setup.challengeId,
  passkeyResponse: credentialResponse,
});

// Check balance
const balance = await client.wallets.getBalance({
  network: 'base-sepolia',
});
```
