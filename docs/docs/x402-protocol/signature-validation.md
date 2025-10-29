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
