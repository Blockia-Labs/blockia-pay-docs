---
sidebar_position: 3
---

# Signature Validation

X402 Protocol implements strict signature and business rule validation for
ERC-3009 authorized transfers. This ensures only valid, non-replayable, and
authorized payments are settled on-chain.

## Validation Process

### 1. Payload Structure Validation

The backend validates the payload structure using a strict schema (pseudo-code):

```
payloadSchema = {
  from: ethereumAddress,
  to: ethereumAddress,
  value: string (digits only),
  nonce: string (0x-prefixed 64 hex chars),
  validAfter: string (digits only),
  validBefore: string (digits only),
  v: integer (0-255),
  r: string (0x-prefixed 64 hex chars),
  s: string (0x-prefixed 64 hex chars)
}
```

### 2. Business Rule Validation

#### Amount Validation

- Must be a positive integer
- Cannot exceed the payment link's required amount
- Must match the payment link exactly (no partial/overpayment)

#### Timestamp Validation

- `validAfter` must be `<=` current time
- `validBefore` must be `>` current time
- Maximum validity window enforced (default: 6 hours)

#### Address Validation

- `from` and `to` must be valid Ethereum addresses
- `to` must match the merchant's wallet address

### 3. Nonce Validation

Nonces prevent replay attacks. The backend checks:

Pseudo-code:

```
if (nonce already used for this address) {
  throw ValidationError('Nonce already used')
}
```

### 4. Signature Verification

The backend reconstructs the EIP-712 domain separator and transfer digest, then
recovers the address from the signature:

```
recoveredAddress = recoverAddress(digest, signature)
if (recoveredAddress.toLowerCase() != payload.from.toLowerCase()) {
  throw ValidationError('Invalid signature')
}
```

## Error Types

### Validation Errors

#### `INVALID_PAYLOAD_STRUCTURE`

```json
{
  "error": "INVALID_PAYLOAD_STRUCTURE",
  "message": "Payload does not match expected schema",
  "details": {
    "field": "value",
    "issue": "must be positive integer"
  }
}
```

#### `INVALID_SIGNATURE`

```json
{
  "error": "INVALID_SIGNATURE",
  "message": "Signature verification failed",
  "details": {
    "expected": "0x123...",
    "recovered": "0x456..."
  }
}
```

#### `NONCE_ALREADY_USED`

```json
{
  "error": "NONCE_ALREADY_USED",
  "message": "Payment nonce has already been processed",
  "details": {
    "nonce": "0x789...",
    "usedAt": "2024-01-01T12:00:00Z"
  }
}
```

#### `PAYMENT_EXPIRED`

```json
{
  "error": "PAYMENT_EXPIRED",
  "message": "Payment validity period has expired",
  "details": {
    "validBefore": "1704067200",
    "currentTime": "1704067300"
  }
}
```

#### `AMOUNT_EXCEEDS_MAXIMUM`

```json
{
  "error": "AMOUNT_EXCEEDS_MAXIMUM",
  "message": "Payment amount exceeds maximum allowed",
  "details": {
    "amount": "1000000000",
    "maximum": "500000000"
  }
}
```

## Security Measures

### Rate Limiting & Monitoring

- Per-IP and per-wallet rate limits
- Exponential backoff for repeated failures
- All validation attempts and failures are logged and monitored

## Testing Validation

### Unit Tests (pseudo-code)

```
Test: should validate correct ERC-3009 signatures
  - create valid payload
  - validate(payload) => valid

Test: should reject expired transfers
  - create expired payload
  - validate(payload) => throws PAYMENT_EXPIRED

Test: should prevent nonce reuse
  - create valid payload
  - validate(payload) // first use
  - validate(payload) => throws NONCE_ALREADY_USED
```

### Integration Tests (pseudo-code)

```
Test: should process valid payments
  - create payment link
  - create signed payload for link
  - process payment
  - expect success and txHash
```

## Performance Considerations

### Caching & Optimization

- Domain separator/type hash caching
- Recently used nonces caching
- Batch/parallel validation for high throughput

## Future Improvements

### Advanced Validation

- Multi-signature and threshold signature support
- Hardware security module integration

### Enhanced Security

- Zero-knowledge proofs
- Privacy-preserving validation
