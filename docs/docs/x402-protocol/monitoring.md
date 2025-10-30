---
sidebar_position: 5
---

# Monitoring

X402 Protocol includes robust transaction monitoring to ensure all payments are
reliably detected, reconciled, and reported.

## Transaction Monitoring

- Watches all relevant wallet addresses and payment links across supported
  networks
- Subscribes to blockchain events (USDC Transfer, block confirmations)
- Detects incoming and outgoing payments, including relayed ERC-3009 transfers
- Provides transactions history with transaction details

## Reconciliation

- Matches on-chain transactions to payment links and API records
- Updates payment status (e.g., PAID, FAILED, EXPIRED) in real time
- Handles edge cases (e.g., duplicate payments, payment amounts, late arrivals)
