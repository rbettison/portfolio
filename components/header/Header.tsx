"use client";
import '../../app/globals.css'
import styles from './header.module.css';
import Link from 'next/link';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext';
import { usePathname } from 'next/navigation';

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

    const pathname = usePathname();

    return (

        <div className="col-span-2 md:text-right md:fixed md:left-16 p-4" id="navbar"> 
        <div className="flex flex-col md:gap-16 gap-4">
        <div className='flex flex-row justify-between items-center'>
        <Link href="/">
        <div className="text-4xl font-bold">
          @robbettison
        </div>
        </Link>
        <div className={styles.burger}>
          <img src="/menu-line.svg" className={styles.menuIcon} onClick={(e) => toggleMenu(e)}/>
        </div>
        </div>
      
        <ul className={`md:flex flex-col gap-4 text-md font-bold text-right md:text-left hidden fixed md:left-auto md:top-auto md:static right-4 top-12 p-4 md:p-0 z-40 ${theme === "light" ? "bg-gray-300" : "bg-purple-700"} md:bg-inherit`} id="navbar">
            <li className={`hover:text-highlighttext ${pathname === '/' ? 'border-l-4 border-current pl-2':""}`}>
                <Link href='/' onClick={(e) => closeMenu(e)}>home</Link>
            </li>
            <li className={`hover:text-highlighttext ${pathname === '/contact' ? 'border-l-4 border-current pl-2':""}`}>
                <Link href='/contact' onClick={(e) => closeMenu(e)}>contact</Link>
            </li>
            <li className={`hover:text-highlighttext ${pathname === '/services' ? 'border-l-4 border-current pl-2':""}`}>
                <Link href='/services' onClick={(e) => closeMenu(e)}>services</Link>
            </li>
            <li className={`hover:text-highlighttext ${pathname === '/portfolio' ? 'border-l-4 border-current pl-2':""}`}>
                <Link href='/portfolio' onClick={(e) => closeMenu(e)}>portfolio (coming soon)</Link>
            </li>
            <li className={`hover:text-highlighttext ${pathname?.includes('/blog') ? 'border-l-4 border-current pl-2':""}`}>
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