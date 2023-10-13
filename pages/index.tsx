import React from 'react'
import styles from '../styles/RemixProLanding.module.css';
import logo from '../public/remx.png'
import Link from 'next/link';

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <img src='https://bafybeicnopvadeu4yonrlufr7kvsgyh6qxe4ovjvp6ixavcolldy3le5nq.ipfs.w3s.link/remx.png' alt="Remix Pro Logo" className={styles.logo} />
        <h1 className={styles.title}>Welcome to Remx Pro</h1>
        <p className={styles.subtitle}>Unlock the power of creativity with Remx Pro.</p>
        <div className={styles.buttonGroup}>
          <Link href="/flow" className={styles.buttonPrimary}>
            Get Started
          </Link>
          <a href="#" className={styles.buttonSecondary}>
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default index