import styles from './footer.module.css';

export default function Header() {
    return (
    <div className={styles.socials}>
        <a href="https://github.com/rbettison" target="_blank"><img src="/socials/github.png" alt="Github" /></a>
        <a href="https://twitter.com/rbbttsn" target="_blank"><img src="/socials/twitter.png" alt="Twitter" /></a>
        <a href="https://www.linkedin.com/in/rob-bettison-266916ba/" target="_blank"><img src="/socials/linkedin.png" alt="LinkedIn" /></a>
    </div>
    )
}