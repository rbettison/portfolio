import styles from './hero.module.css';

export default function Hero() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <p className={styles.description}>Hi, I'm Rob. I'm a full-stack software 
                    engineer and 
                    solution architect
                     who <span className={styles.highlight}>
                        loves</span>  working with people 
                    to bring ideas to life.</p>
                <img />
                <button className={styles.cv}>My CV</button>
            </div>
        </div>
    )
  }