import styles from "./contact.module.css";
import Link from "next/link";

const Contact = (props: any) => {

    return (
      // <main className={styles.main}>
        <div className={styles.container}>
            <div className={styles.innerContainer}>
        <h1>Contact.</h1>
        <div className={styles.contactDetails}>
        <p>✉️ <span>bettison.rob1@gmail.com</span></p>
        <p>📞 <span>+447875634079</span></p>
        </div>
        <p className={styles.strapline}>I&apos;m always on the lookout for <span className={styles.highlight}>exciting</span> collaborations, projects and opportunities.</p>
        <button className={styles.cv}><Link href="/RobertBettisonCV.pdf" target='_blank'>My CV</Link></button>
        
        </div>
        <img alt="Me"/>

        </div>
      // </main>
    )
  }

  export default Contact;