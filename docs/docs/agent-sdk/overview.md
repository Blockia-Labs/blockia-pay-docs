---
id: blockia-agent-sdk
slug: /agent-sdk/overview
sidebar_label: Blockia Agent SDK
---

# Blockia Agent SDK

The Blockia Agent SDK provides a TypeScript/JavaScript client for interacting
with the Blockia Pay API and automating ERC-3009 payments. It is designed for
developers building payment bots, integrations, and automation tools.

## Installation

```bash
npm install @blockia-pay/blockia-agent-sdk
```

## Features

- Fetch payment requirements for a pay link (EIP-402/X402)
- Create and sign ERC-3009 payment payloads
- Submit payments to the Blockia API
- Query token balances
- Select payment requirements by network, asset, or scheme
- Full TypeScript types and error handling

## Quick Start Example

```typescript
import { BlockiaAgent } from '@blockia-pay/blockia-agent-sdk';

const agent = new BlockiaAgent({
  privateKey: '0xYOUR_PRIVATE_KEY',
  apiUrl: 'https://api.blockia.pay/v1',
  chainId: 84532, // Base Sepolia
});

// Fetch payment requirements for a link
const requirementsResponse = await agent.getPaymentLinkInfo('LINK_ID');

// Make a payment (convenience method)
const result = await agent.makePayment(requirementsResponse.accepts);

if (result.success) {
  console.log('Payment successful! Tx:', result.txHash);
} else {
  console.error('Payment failed:', result.error);
}
```

## API Reference

### `BlockiaAgent` Class

#### Constructor

```typescript
new BlockiaAgent(config: BlockiaAgentConfig)
```

- `privateKey`: Signer private key (hex string)
- `apiUrl`: Blockia API base URL
- `chainId`: EVM chain ID (e.g., 84532 for Base Sepolia)

#### Methods

- `getSignerAddress(): string` — Returns the signer's address
- `getBalance(tokenAddress, ownerAddress): Promise<BalanceResponse>` — Get token
  balance
- `getPaymentLinkInfo(linkId): Promise<PaymentRequirementsResponse>` — Fetch
  payment requirements for a pay link
- `makePayment(requirements: PaymentRequirements[]): Promise<PaymentResponse>` —
  Convenience: select, sign, and submit payment
- `createPaymentPayload(requirement: PaymentRequirements): Promise<ERC3009Payload>`
  — Create a signed ERC-3009 payload
- `submitPayment(requirement, payload): Promise<PaymentResponse>` — Submit a
  signed payment
- `selectPaymentRequirement(requirements, options): Promise<PaymentRequirements>`
  — Select a requirement by network, asset, or scheme

See
[types.ts](https://github.com/Blockia-Labs/blockia-pay/blob/main/packages/blockia-agent-sdk/src/types.ts)
for all type definitions.

## Example: Simple Payment Script

```typescript
import { BlockiaAgent } from '@blockia-pay/blockia-agent-sdk';

const agent = new BlockiaAgent({
  privateKey: '0xYOUR_PRIVATE_KEY',
  apiUrl: 'http://localhost:3000/',
  chainId: 84532,
});

const requirementsResponse = await agent.getPaymentLinkInfo('LINK_ID');
const result = await agent.makePayment(requirementsResponse.accepts);

if (result.success) {
  console.log('Payment successful! Tx:', result.txHash);
} else {
  console.error('Payment failed:', result.error);
}
```

## Error Handling

All errors extend `BlockiaError`:

- `ValidationError`: Invalid input or insufficient balance
- `NetworkError`: API/network issues
- `PaymentError`: Payment failed

## Advanced Usage

- Use `createPaymentPayload()` and `submitPayment()` for custom flows
- Use `selectPaymentRequirement()` to filter requirements by network, asset, or
  scheme
- Supports custom signer implementations via the `ISigner` interface

## Supported Networks

- Base Mainnet (8453)
- Base Sepolia (84532)
- See `chain-config.ts` for all supported EVM networks

## Resources

- [GitHub: blockia-pay/blockia-agent-sdk](https://www.npmjs.com/package/@blockia-pay/blockia-agent-sdk)
