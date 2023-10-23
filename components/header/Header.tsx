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

        <div className="col-span-2 md:text-right md:fixed md:left-16 p-4" id="navbar"> 
        <div className="flex flex-col md:gap-16 gap-4">
        <div className='flex flex-row justify-between items-center'>
        <div className="text-4xl font-bold">
          @robbettison
        </div>
        <div className={styles.burger}>
          <img src="/menu-line.svg" className={styles.menuIcon} onClick={(e) => toggleMenu(e)}/>
        </div>
        </div>
      
        <ul className={`md:flex flex-col gap-4 text-md font-bold text-right md:text-left hidden fixed md:left-auto md:top-auto md:static right-4 top-12 p-4 md:p-0 ${theme === "light" ? "bg-gray-300" : "bg-purple-700"} md:bg-inherit`} id="navbar">
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
              <p onClick={toggleTheme}><span className="hover:text-highlighttext">theme: </span>{theme === "light" ? <span className="text-highlighttext">light</span> : <span>dark</span>}</p>
            </li>
        </ul>
        </div>
      </div>

    )

    function toggleMenu(event: MouseEvent) {
      console.log('toggle menu');
      console.log(document.getElementById("navbar"));
        document.getElementById("navbar")?.getElementsByTagName("ul")[0]?.classList.toggle('hidden');
    }

    function closeMenu(event: MouseEvent) {
      document.getElementById("navbar")?.getElementsByTagName("ul")[0]?.classList.toggle('hidden');
    }
  }