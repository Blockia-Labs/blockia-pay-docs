---
sidebar_position: 1
---

# Blockia Pay MCP Server

The Blockia Pay MCP Server exposes Blockia Pay payment workflows to any Model
Context Protocol (MCP) compatible client. It lets autonomous agents (for example
Claude Desktop) check balances and execute payment links using the same
infrastructure that powers the Blockia Agent SDK. Currently supports USDC
currency Base Sepolia network.

## Capabilities

- `check_balance`: fetches the configured wallet's USDC balance on Base Sepolia
  to verify funds before a payment.
- `process_payment_link`: accepts a full pay-link URL, resolves its payment
  requirements, executes the payment, and returns the transaction result.
- Shared agent logic: all tools delegate to `@blockia-pay/blockia-agent-sdk`,
  ensuring consistent signing, validation, and error handling with other Blockia
  automation surfaces.

## Example Queries

- Hi, please check my account's balance..
- Hi, please pay this payment link:
  http://localhost:4000/x402/NiXLmM2SCwXGJ47m0ARVEhl3ii6OJyWx

## Prerequisites

- A funded wallet private key with Base Sepolia USDC for covering payments.
- An MCP-compatible client capable of spawning STDIO processes (for example
  Claude Desktop or other MCP clients).

## Configuration

Set the required environment variable before launching the server:

| Variable      | Required | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| `PRIVATE_KEY` | ✅       | Hex-encoded signer key used for payments and balance checks. |

## Typical agent flow

1. Call `check_balance` to confirm the wallet holds sufficient USDC.
2. Call `process_payment_link` with the full payment link URL (for example
   `http://localhost:4000/x402/<linkId>`).
3. The tool extracts the link ID, retrieves X402 requirements, signs, and
   broadcasts the payment using ERC-3009 semantics.
4. The structured response includes the link ID, resolved requirements, and the
   payment result payload.

If `process_payment_link` fails it returns structured error details that the
client can surface to the operator or use for recovery strategies.

## Claude Desktop example

Add the server to
`~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "blockia-pay": {
      "command": "npx",
      "args": ["-y", "@blockia-pay/blockia-mcp-server"],
      "env": {
        "PRIVATE_KEY": "your-private-key"
      }
    }
  }
}
```

Claude Desktop will launch the server on demand, negotiate the STDIO MCP
session, and expose the `check_balance` and `process_payment_link` tools inside
conversations.

## Troubleshooting

- **Balance mismatch**: confirm the wallet is funded with Base Sepolia USDC.
- **Invalid payment link**: ensure you pass the full link URL; the server parses
  the ID from the path segment.
- **Transport issues**: MCP clients must support STDIO processes.
