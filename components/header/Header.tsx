"use client";
import styles from './header.module.css';
import Link from 'next/link';
import { MouseEvent } from 'react';


export default function Header() {
    return (
      <div className={styles.container}>
        <div className={styles.menu}> 
        <div className={styles.left}>Robert Bettison</div>
 
        <ul className={styles.nav} id="navbar">
            <li>
                <Link href='/' onClick={(e) => closeMenu(e)}>Home</Link>
            </li>
            <li>
                <Link href='/contact' onClick={(e) => closeMenu(e)}>Contact</Link>
            </li>
            <li>
                <Link href='/blog' onClick={(e) => closeMenu(e)}>Blog</Link>
            </li>
        </ul>

        <div className={styles.burger}>
          <img src="/menu-line.svg" className={styles.menuIcon} onClick={(e) => toggleMenu(e)}/>
        </div>
      </div>
      </div>
    )

    function toggleMenu(event: MouseEvent) {
        document.getElementById("navbar")?.classList.toggle('open');
    }

    function closeMenu(event: MouseEvent) {
      document.getElementById("navbar")?.classList.remove('open');
    }
  }