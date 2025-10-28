import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  documentationSidebar: [
    {
      type: 'category',
      label: 'Blockia Pay',
      items: [
        'blockia-pay/overview',
        'blockia-pay/getting-started',
        'blockia-pay/smart-wallets',
        'blockia-pay/payment-links',
        'blockia-pay/dashboard',
      ],
    },
    {
      type: 'category',
      label: 'X402 Protocol',
      items: [
        'x402-protocol/overview',
        'x402-protocol/erc3009-integration',
        'x402-protocol/signature-validation',
        'x402-protocol/broadcasting',
        'x402-protocol/monitoring', // Ensure this ID exists
      ],
    },
    {
      type: 'category',
      label: 'Agent SDK',
      items: ['agent-sdk/blockia-agent-sdk'],
    },
    {
      type: 'category',
      label: 'MCP Server',
      items: ['mcp-server/overview'],
    },
    {
      type: 'category',
      label: 'N8N Node',
      items: ['blockia-pay-node/overview'],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/health',
        'api/authentication',
        'api/wallets',
        'api/networks',
        'api/payment-links',
        'api/x402',
        'api/transactions',
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
