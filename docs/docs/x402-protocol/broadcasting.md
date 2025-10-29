---
sidebar_position: 4
---

# Broadcasting

X402 Protocol broadcasting is responsible for securely transmitting validated
payment payloads to the blockchain for settlement. The Blockia relayer service
handles all on-chain execution, gas sponsorship, and transaction monitoring.

## Relayer Responsibilities

- Receives validated ERC-3009 payloads from the backend
- Checks relayer account balance and chain status
- Broadcasts `transferWithAuthorization` to the USDC contract
- Waits for transaction confirmation and returns the tx hash
- Handles errors (insufficient balance, network issues, contract reverts)

## On-Chain Execution

The relayer submits the transaction using the correct chain and contract
address, ensuring:

- Correct EIP-712 domain separator and chainId
- Gas fees are paid by the relayer (merchant-sponsored)
- Only valid, non-replayed, and non-expired payloads are broadcast

## Error Handling

If broadcasting fails, the relayer returns a detailed error to the backend,
which is surfaced to the API client. Common errors include:

- Relayer has insufficient funds
- Smart contract rejected the transfer
- RPC/network issues

## Monitoring & Observability

- All broadcast attempts are logged with status and tx hash
- Relayer balance and health are monitored
