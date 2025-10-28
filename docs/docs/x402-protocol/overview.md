---
sidebar_position: 1
---

# X402 Protocol Overview

Blockia Pay implements the X402 payment protocol, enabling gasless, secure, and
efficient USDC payments using ERC-3009 authorized transfers. The protocol is
designed for AI agents, automation tools, and seamless payment experiences, with
a focus on machine-readable requirements and robust security.

## What is X402?

X402 is a payment protocol that combines:

- **ERC-3009**: Authorized token transfers for gasless payments
- **Account Abstraction**: Smart accounts with passkey authentication
- **Cross-chain compatibility**: Support for multiple blockchain networks
- **AI-friendly**: Designed for automated payment processing

## Key Features

### ⚡ Gasless Payments

- No gas fees for payers
- Merchant-sponsored transactions
- Seamless user experience

### 🔐 Authorized Transfers

- ERC-3009 compliant signatures
- Secure off-chain authorization
- On-chain settlement

### 🤖 AI Agent Compatible

- Machine-readable payment requirements
- Structured API responses
- Automated payment processing

### 🌐 Cross-Chain Support

- Multiple blockchain networks
- Unified payment interface
- Network abstraction

## Protocol Flow

### 1. Fetch Payment Requirements

**GET `/v1/x402/{linkId}`**

- Returns HTTP 402 with a machine-readable JSON body describing accepted payment
  requirements for the link.
- Example response:

```json
{
  "x402Version": 1,
  "accepts": [
    {
      "scheme": "evm-erc3009",
      "network": "base",
      "maxAmountRequired": 100,
      "resource": "https://api.blockia.pay/v1/payments/x402",
      "description": "Payment for services",
      "mimeType": "application/json",
      "payTo": "0x742d35Cc6634C0532925a3b844Bc454e4438f55e",
      "maxTimeoutSeconds": 360,
      "asset": "USDC"
    }
  ]
}
```

### 2. Submit Payment Payload

**POST `/v1/x402/{linkId}/pay`**

- Submit a signed ERC-3009 payment payload matching the requirements.
- Example request:

```json
{
  "x402Version": 1,
  "scheme": "evm-erc3009",
  "network": "base",
  "payload": {
    "from": "0x...",
    "to": "0x742d35Cc6634C0532925a3b844Bc454e4438f55e",
    "value": "100",
    "nonce": "0x...",
    "validAfter": "1699123456",
    "validBefore": "1699133456",
    "v": 28,
    "r": "0x...",
    "s": "0x..."
  }
}
```

### 3. Settlement

- The server validates the payload, checks signature, nonce, and business rules,
  then broadcasts the transfer on-chain.
- On success, returns transaction hash and settlement details.

## Protocol Versions

### X402 v1

- Basic ERC-3009 support
- Single network payments
- Simple payload structure

### Future Versions

- Multi-network payments
- Batch transactions
- Advanced authorization schemes

## Security Features

### Signature Validation

- ECDSA signature verification
- Nonce replay protection
- Timestamp validation

### Amount Limits

- Configurable maximum amounts
- Timeout protection
- Rate limiting

### Network Security

- Blockchain consensus security
- Smart contract audits
- Multi-signature controls

## Integration Examples

### For AI Agents

```typescript
import { BlockiaAgent } from '@blockia-pay/blockia-agent-sdk';

const agent = new BlockiaAgent({
  privateKey: '0x...',
  apiUrl: 'http://localhost:3000/',
  chainId: 84532,
});

console.log(`🔑 Signer address: ${agent.getSignerAddress()}`);
console.log('');

console.log('📡 Fetching payment requirements...');
const requirementsResponse = await agent.getPaymentLinkInfo(linkId);

console.log('🚀 Processing payment...');
const result = await agent.makePayment(requirementsResponse.accepts);
```

## API Endpoints

- `GET /v1/x402/{linkId}` — Get payment requirements (returns 402)
- `POST /v1/x402/{linkId}/pay` — Submit payment payload

## Business Rules & Error Handling

- Only active, non-expired payment links are payable
- Only USDC on supported networks is accepted (Base, Base Sepolia)
- Nonce must be unique and unused
- Signature must be valid EIP-712 (ERC-3009)
- Amount must match the requirement
- Validity window (`validAfter`, `validBefore`) enforced

### Error Codes

- `402 Payment Required`: Payment requirements included
- `400 Bad Request`: Invalid payload, signature, or parameters
- `403 Forbidden`: Unauthorized or invalid payment attempt
- `409 Conflict`: Nonce already used or duplicate payment
- `404 Not Found`: Link does not exist
- `422 Unprocessable Entity`: Business rule violation (amount, address, etc.)
- `500 Internal Server Error`: Server-side error

Error responses include a machine-readable `error` field and message.
