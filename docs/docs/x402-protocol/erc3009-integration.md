---
sidebar_position: 2
---

gasless, secure token transfers. This integration allows payers to authorize
payments off-chain while ensuring on-chain settlement.

# ERC-3009 Integration

Blockia Pay's X402 Protocol leverages the ERC-3009 (Authorized Transfer)
standard to enable gasless, secure USDC payments. Payers sign an off-chain
authorization, and a relayer (sponsored by the merchant) submits the transfer
on-chain, paying the gas.

## What is ERC-3009?

ERC-3009 is an Ethereum standard for authorized token transfers that enables:

- **Gasless payments**: Payers don't need ETH for gas
- **Off-chain authorization**: Signatures created without blockchain interaction
- **On-chain settlement**: Transfers executed by authorized parties
- **Replay protection**: Nonce-based security prevents duplicate transactions

## How ERC-3009 Works in X402

### 1. Authorization Flow

1. **Payer** requests payment requirements from the API
   (`GET /v1/x402/{linkId}`)
2. **Payer** creates and signs an ERC-3009 payload off-chain (EIP-712 signature)
3. **Payer** submits the signed payload to the API
   (`POST /v1/x402/{linkId}/pay`)
4. **Relayer** (Blockia backend) validates the signature, nonce, and business
   rules
5. **Relayer** broadcasts the transferWithAuthorization to the USDC contract
6. **Blockchain** settles the transfer; relayer returns the transaction hash

### 2. Signature Creation

The ERC-3009 payload must match the following structure:

```typescript
interface ERC3009PaymentPayload {
  from: string; // Payer's address
  to: string; // Merchant's address
  value: string; // Amount in smallest unit (as string)
  nonce: string; // Unique 32-byte hex nonce
  validAfter: string; // Unix timestamp (seconds)
  validBefore: string; // Unix timestamp (seconds)
  v: number; // Signature recovery id
  r: string; // Signature r value
  s: string; // Signature s value
}
```

## Implementation Details

### Smart Contract Integration

X402 only supports ERC-3009 compliant tokens (USDC) that implement:

```solidity
function transferWithAuthorization(
  address from,
  address to,
  uint256 value,
  uint256 validAfter,
  uint256 validBefore,
  bytes32 nonce,
  uint8 v,
  bytes32 r,
  bytes32 s
) external;
```

### Relayer Architecture

The Blockia relayer:

- Validates the ERC-3009 signature (EIP-712)
- Checks nonce uniqueness (no replay)
- Verifies amount, recipient, and validity window
- Executes the transfer on-chain (pays gas)
- Returns transaction hash and status

### Nonce Management

- Each nonce must be unique per payer address and token
- Nonces are tracked and checked before broadcast
- Used nonces cannot be reused (replay protection)

## Security Considerations

### Signature Validation

- EIP-712 domain separator and chainId checked
- ECDSA signature recovery and address match

### Timestamp Validation

- `validAfter`/`validBefore` enforced by backend and contract

### Amount Validation

- Must match payment link requirements (no over/underpayment)

## Error Handling

Common error responses:

- `INVALID_SIGNATURE`: Signature verification failed
- `NONCE_USED`: Nonce already used
- `EXPIRED_TRANSFER`: Transfer validity period expired
- `AMOUNT_EXCEEDS_MAXIMUM`: Amount exceeds allowed
- `INVALID_PAYLOAD_STRUCTURE`: Payload does not match schema

## Testing

### Test Environment

- Base Sepolia testnet
- Test USDC contracts
- Mock relayer for local development

### Integration Tests

```typescript
describe('ERC-3009 Integration', () => {
  it('should validate correct signatures', async () => {
    const payload = createValidPayload();
    const result = await verifier.verify(payload);
    expect(result.valid).toBe(true);
  });

  it('should reject invalid signatures', async () => {
    const payload = createInvalidPayload();
    const result = await verifier.verify(payload);
    expect(result.valid).toBe(false);
  });
});
```

## Performance & Monitoring

### Batch Processing

- (Planned) Multiple transfers in a single transaction

### Caching

- Nonce and signature validation caching
- Rate limiting for spam protection

### Monitoring

- Transfer success rates
- Gas usage and error tracking

## Future Enhancements

### Multi-Token Support

- Support for additional ERC-3009 tokens
- Custom token integration

### Advanced Features

- Conditional transfers
- Time-locked payments
- Multi-signature authorization

### Cross-Chain Expansion

- Bridge integration
- Multi-chain nonce management
