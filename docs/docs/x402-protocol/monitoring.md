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

## Reconciliation

- Matches on-chain transactions to payment links and API records
- Updates payment status (e.g., PAID, FAILED, EXPIRED) in real time
- Handles edge cases (e.g., duplicate payments, payment amounts, late arrivals)

## Alerting & Observability

- Logs all detected transactions and status changes
- Alerts on failed, delayed, or suspicious transactions
- Provides metrics for payment success rates, latency, and error rates

## Future Enhancements

- Cross-chain monitoring
- Automated dispute detection
- Advanced analytics and reporting dashboards
