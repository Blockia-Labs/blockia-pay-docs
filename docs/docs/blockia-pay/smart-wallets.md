---
sidebar_position: 3
---

# Smart Account Wallets

Blockia Pay uses smart account wallets powered by Ethereum Account Abstraction
(ERC-4337) to provide a seamless user experience without the complexity of
traditional crypto wallets.

## What is a Smart Account?

A smart account is a programmable wallet contract deployed on the blockchain
that acts as your crypto wallet. Unlike traditional Externally Owned Accounts
(EOAs), smart accounts can execute complex logic and support advanced features.

## Key Benefits

### 🔐 Passkey Authentication

- Authenticate using device biometrics (fingerprint, FaceID)
- No seed phrases or private keys to manage
- Secure hardware-based authentication

### ⚡ Gasless Transactions

- Paymaster service sponsors gas fees
- Users can transact without holding ETH
- Seamless payment experience

### 🛡️ Enhanced Security

- Multi-signature capabilities
- Social recovery options
- Spending limits and transaction policies

### 🔄 Cross-Device Sync

- Access your wallet from any device
- iCloud and Android passkey syncing
- Consistent experience across platforms

## How It Works

### 1. Account Creation

When you sign up, Blockia Pay deploys a smart contract wallet on the Base
network using your passkey as the authentication mechanism.

### 2. Authentication

Instead of managing private keys, you authenticate transactions using:

- Biometric verification (fingerprint/face)
- Device PIN
- Hardware security modules

### 3. Transaction Execution

The smart account receives UserOperations (the account abstraction standard) and
executes them through a bundler service.

## Supported Networks

- **Base**: Primary network for low-cost transactions
- **Cross-chain**: Future support for multiple networks

## Wallet Management

### Viewing Balance

Check your wallet balance in the dashboard or connect to external wallets like
MetaMask.

### Exporting Funds

Withdraw funds to any compatible wallet address at any time.

### Recovery Options

- Device-based recovery
- Social recovery (future feature)
- Backup codes for account restoration (future feature)

## Technical Details

### ERC-4337 Implementation

Our smart accounts implement the ERC-4337 standard for account abstraction,
ensuring compatibility with the broader ecosystem.

### Passkey Integration

We use WebAuthn standard for passkey authentication, providing the highest level
of security and user experience.

### Base Network

All wallets are deployed on Base for optimal performance and cost-efficiency.
