---
sidebar_position: 4
---

# Payment Links

Payment links are shareable URLs that allow clients to pay you instantly in
cryptocurrency. They're the core feature of Blockia Pay, enabling anyone to
accept crypto payments without complex integrations.

## How Payment Links Work

### 1. Create a Link

Generate a payment link through the dashboard or API with:

- Amount and currency
- Payment description
- Merchant name (optional)
- Expiration date (optional)

### 2. Share the Link

Send the URL to your client via email, chat, or social media.

### 3. Client Pays

Your client clicks the link and completes payment using:

- Their existing crypto wallet
- A new smart account (future feature)

### 4. Instant Settlement

Funds arrive directly in your smart account wallet immediately.

## Link Structure

Payment links follow this format:

```
https://pay.blockia.pay/link/{unique-id}
```

The unique ID encodes:

- Payment amount
- Currency (e.g., USDC)
- Merchant wallet address
- Payment description
- Expiration settings

## Supported Currencies

### Primary Currency

- **USDC on Base**: Stablecoin for reliable value and low fees

### Future Support

- Multiple stablecoins (USDT, DAI)
- Other networks (Ethereum, Arbitrum, Optimism, Polygon)

## Payment Flow

### For Existing Crypto Users

1. Click payment link
2. Connect wallet (MetaMask, WalletConnect)
3. Confirm transaction
4. Payment complete
5. Done!

### For New Users

1. Click payment link
2. Create smart account with passkey
3. Fund account (if needed)
4. Confirm payment
5. Done!

## Link Management

### Creating Links

```typescript
// Via API
const link = await createPaymentLink({
  amount: '50.00',
  currency: 'USDC',
  description: 'Website Design Services',
  merchantId: 'user-123',
});
```

### Viewing Active Links

- Dashboard shows all active payment links
- Status tracking (active, pending, paid, expired, disabled)
- Resend or cancel options

### Link Expiration

- Default: 30 days
- Configurable per link
- Automatic cleanup of expired links

## Security Features

### One-Time Payments

Each link can only be paid once to prevent double-charging.

### Amount Validation

Payments must match the exact amount specified in the link.

### Merchant Verification

Links are cryptographically signed to prevent tampering.

## Integration Options

### Dashboard

Create and manage links through the web interface.

### API

Programmatic link creation for automated workflows.

### SDK

Use our Agent SDK for complex payment flows.

## Best Practices

### Clear Descriptions

Use descriptive payment descriptions for better client experience.

### Reasonable Amounts

Start with smaller amounts for testing.

### Multiple Links

Create separate links for different projects or milestones.

### Expiration Management

Set appropriate expiration times based on your business needs.
