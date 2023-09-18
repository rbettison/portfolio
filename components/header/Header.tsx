import styles from './header.module.css';
import Link from 'next/link';

export default function Header() {
    return (
      <div className={styles.container}>
      <nav className={styles.nav}> 
                  <span className={styles.left}>Robert Bettison</span>
 
        <ul className={styles.menu}>
            <li>
                <Link href='/'>Home</Link>
            </li>
            {/* <li>
                <Link href='/#experience'>Experience</Link>
            </li> */}
            {/* <li>
                <Link href='/#portfolio'>Porfolio</Link>
            </li> */}
            <li>
                <Link href='/contact'>Contact</Link>
            </li>
            <li>
                <Link href='/blog'>Blog</Link>
            </li>
        </ul>
      </nav>
      </div>
    )
  }