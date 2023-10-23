"use client";
import '../../app/globals.css'
import styles from './header.module.css';
import Link from 'next/link';
import { MouseEvent, useContext, useEffect } from 'react';
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext';
import Switch from '@mui/material/Switch';

export default function Header() {

    const { toggleTheme, setTheme, theme } = useContext(ThemeContext) as ThemeContextType;

    useEffect(() => {
      const userTheme = localStorage.getItem('theme');
      if(userTheme != null && userTheme != "") {
        setTheme(userTheme);
        localStorage.setItem('theme', theme);
      }
    }, [])

    useEffect(() => {
      localStorage.setItem('theme', theme);
      console.log('setting the theme in local storage: ' + theme);
    }, [theme])

    return (

        <div className="col-span-2 text-right fixed left-16" id="navbar"> 
        <div className="flex flex-col gap-16">
        <div className="text-4xl font-bold">
          @robbettison
        </div>
      
        <ul className="flex flex-col gap-4 text-md font-bold">
            <li className="hover:text-highlighttext">
                <Link href='/' onClick={(e) => closeMenu(e)}>home</Link>
            </li>
            <li className="hover:text-highlighttext">
                <Link href='/contact' onClick={(e) => closeMenu(e)}>contact</Link>
            </li>
            <li className="hover:text-highlighttext">
                <Link href='/services' onClick={(e) => closeMenu(e)}>services (coming soon)</Link>
            </li>
            <li className="hover:text-highlighttext">
                <Link href='/portfolio' onClick={(e) => closeMenu(e)}>portfolio (coming soon)</Link>
            </li>
            <li className="hover:text-highlighttext">
                <Link href='/blog' onClick={(e) => closeMenu(e)}>blog</Link>
            </li>
            <li className='cursor-pointer'>
              <p onClick={toggleTheme}><span className="hover:text-highlighttext">theme: </span>{theme === "light" ? <p>light</p> : <p className="text-highlighttext">dark</p>}</p>
            </li>
        </ul>

        <div className={styles.burger}>
          <img src="/menu-line.svg" className={styles.menuIcon} onClick={(e) => toggleMenu(e)}/>
        </div>
        </div>
      </div>

    )

    function toggleMenu(event: MouseEvent) {
      console.log('toggle menu');
      console.log(document.getElementById("navbar"));
        document.getElementById("navbar")?.getElementsByTagName("ul")[0]?.classList.toggle('open');
    }

    function closeMenu(event: MouseEvent) {
      document.getElementById("navbar")?.getElementsByTagName("ul")[0]?.classList.remove('open');
    }
  }