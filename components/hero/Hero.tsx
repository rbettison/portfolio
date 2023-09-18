import styles from './hero.module.css';
import Link from 'next/link';

export default function Hero() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <p className={styles.description}>Hi, I&apos;m Rob. I&apos;m a full-stack software 
                    engineer and 
                    solution architect
                     who <span className={styles.highlight}>
                        loves</span>  working with people 
                    to bring ideas to life.</p>
                <img alt='Me'/>
                <button className={styles.cv}><Link href="/RobertBettisonCV.pdf" target='_blank'>My CV</Link></button>
            </div>
        </div>
    )
  }