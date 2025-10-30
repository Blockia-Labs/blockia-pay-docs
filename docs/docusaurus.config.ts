import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Blockia Pay',
  tagline: "The Infrastructure for Tomorrow's Financial System",
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://blockia-labs.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/blockia-pay-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Blockia-Labs', // Usually your GitHub org/user name.
  projectName: 'blockia-pay-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Blockia-Labs/blockia-pay/tree/main/apps/docs/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Blockia Pay',
      logo: {
        alt: 'Blockia Pay Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'documentationSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/Blockia-Labs/blockia-pay',
          label: 'GitHub',
          position: 'right',
        },
      ],
      style: 'primary',
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Product',
          items: [
            {
              label: 'Blockia Pay',
              to: '/docs/blockia-pay/overview',
            },
            {
              label: 'X402 Protocol',
              to: '/docs/x402-protocol/overview',
            },
            {
              label: 'Agent SDK',
              to: '/docs/agent-sdk/overview',
            },
            {
              label: 'MCP Server',
              to: '/docs/mcp-server/overview',
            },
            {
              label: 'N8N Node',
              to: '/docs/blockia-pay-node/overview',
            },
          ],
        },
        {
          title: 'Developer',
          items: [
            {
              label: 'API Reference',
              to: '/docs/api/overview',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Blockia-Labs/blockia-pay',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Blockia-Labs/blockia-pay',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Blockia Labs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.nightOwlLight,
      additionalLanguages: [
        'typescript',
        'javascript',
        'json',
        'bash',
        'solidity',
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
