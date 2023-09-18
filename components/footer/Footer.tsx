import GetInTouch from '../getintouch/GetInTouch';
import styles from './footer.module.css';
import Image from 'next/image';

export default function Header() {
    return (
    <div className={styles.container}>
        <GetInTouch />

        <div className={styles.socials}>
            <a href="https://github.com/rbettison" target="_blank"><Image src="/socials/github.png" alt="Github" /></a>
            <a href="https://twitter.com/rbbttsn" target="_blank"><Image src="/socials/twitter.png" alt="Twitter" /></a>
            <a href="https://www.linkedin.com/in/rob-bettison-266916ba/" target="_blank"><Image src="/socials/linkedin.png" alt="LinkedIn" /></a>
            <p><span className={styles.name}>Robert Bettison</span></p>
            <p><span className={styles.email}>bettison.rob1@gmail.com</span></p>
            <p><span className={styles.mobile}>+447875634079</span></p>
        </div>
    </div>
    )
}