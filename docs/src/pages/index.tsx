import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <p className={styles.heroDescription}>
              Accept payments in seconds. No banks. No delays. Just pure
              financial infrastructure.
            </p>
            <div className={styles.heroButtons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/blockia-pay/overview"
              >
                Get Started 🚀
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/blockia-pay/overview"
              >
                View Documentation 📚
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.paymentFlow}>
              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>🔗</div>
                <div className={styles.stepText}>Create Payment Link</div>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>📱</div>
                <div className={styles.stepText}>Share with Client</div>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowStep}>
                <div className={styles.stepIcon}>💰</div>
                <div className={styles.stepText}>Receive Payment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <h2>Core Infrastructure</h2>
          <p>Building the future of digital payments</p>
        </div>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Instant Global Payments</h3>
            <p>
              Accept payments from anywhere in seconds with direct blockchain
              settlement.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔐</div>
            <h3>Smart Account Wallets</h3>
            <p>
              Passkey authentication with no seed phrases required. Secure and
              user-friendly.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💸</div>
            <h3>Non-Custodial Settlement</h3>
            <p>
              Funds go directly to your wallet. You maintain full control at all
              times.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔗</div>
            <h3>Payment Links</h3>
            <p>
              Shareable URLs for seamless crypto payments. No complex
              integrations needed.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Financial Dashboard</h3>
            <p>
              Real-time payment tracking and analytics for complete financial
              visibility.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏗️</div>
            <h3>Developer APIs</h3>
            <p>
              Build on tomorrow's financial infrastructure with our
              comprehensive APIs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className="text--center">
          <h2>Ready to Build the Future?</h2>
          <p>
            Join developers building the next generation of financial
            infrastructure.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/blockia-pay/overview"
            >
              Start Building 🚀
            </Link>
            <Link
              className="button button--outline button--lg"
              to="https://github.com/Blockia-Labs/blockia-pay"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="Blockia Pay is a next-generation fintech infrastructure company bridging traditional capital markets with the future of digital assets."
    >
      <HomepageHeader />
      <main>
        <FeatureSection />
        <CTASection />
      </main>
    </Layout>
  );
}
