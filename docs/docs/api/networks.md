---
sidebar_position: 5
slug: /api/networks
title: Networks API
---

# Networks API

The Networks API provides information about supported blockchain networks and
currencies for the Blockia Pay platform. This is used by the frontend to display
available networks and payment options.

## Endpoints

### 1. Get Enabled Networks

**GET /v1/networks**

Returns all enabled networks with display configuration for the frontend.

**Response Example:**

```json
{
  "success": true,
  "data": {
    "networks": [
      {
        "id": "base",
        "name": "base",
        "chainId": 8453,
        "enabled": true,
        "displayName": "Base",
        "color": "#4C0182",
        "icon": "🔵",
        "explorerUrl": "https://basescan.org/tx/",
        "description": "Fast, low-cost network for everyday transactions"
      },
      {
        "id": "base-sepolia",
        "name": "base-sepolia",
        "chainId": 84532,
        "enabled": true,
        "displayName": "Base Sepolia (Sandbox)",
        "color": "#4CD9C4",
        "icon": "🧪",
        "explorerUrl": "https://sepolia.basescan.org/tx/",
        "description": "Testnet for development and testing - no real funds"
      }
      // ...other networks
    ]
  },
  "message": "Networks retrieved successfully"
}
```

- `displayName`, `color`, `icon`, `explorerUrl`, and `description` are provided
  for frontend display.

### 2. Get Supported Currencies

**GET /v1/networks/currencies**

Returns the list of supported currencies. For MVP, only USDC is supported.

**Response Example:**

```json
{
  "success": true,
  "data": {
    "currencies": [
      {
        "code": "USDC",
        "name": "USD Coin",
        "symbol": "$",
        "decimals": 6,
        "icon": "💵",
        "description": "Stablecoin pegged to US Dollar"
      }
    ]
  },
  "message": "Currencies retrieved successfully"
}
```

## Usage

- Use `/v1/networks` to display available blockchain networks and their branding
  in the UI.
- Use `/v1/networks/currencies` to show supported payment currencies.

## Notes

- Only enabled networks are returned.
- Display configuration is provided for a consistent frontend experience.
- For MVP, only USDC is supported as a payment currency.
