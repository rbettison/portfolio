"use client";
import '../../app/globals.css'
import Link from 'next/link';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import Trail from '../animation/Trail';
import { a, config, useSpring } from '@react-spring/web';
import {useDrag} from "@use-gesture/react";

const width = 300;

export default function Header() {

    const { toggleTheme, setTheme, theme } = useContext(ThemeContext) as ThemeContextType;
    const[menuOpen,setMenuOpen] = useState(false);


    const [{ x }, api] = useSpring(() => ({ x: width }))

    const open = ({ canceled } : { canceled: boolean}) => {
      // when cancel is true, it means that the user passed the upwards threshold
      // so we change the spring config to create a nice wobbly effect
      api.start({ x: 0, immediate: false, config: canceled ? config.wobbly : config.stiff })

    }
    const close = (velocity = 0) => {
      api.start({ x: width, immediate: false, config: { ...config.stiff, velocity} })

    }

    const bind = useDrag(
      ({ last, velocity: [vx, ], direction: [dx, ], offset: [ox, ], cancel, canceled }) => {

        // if the user drags up passed a threshold, then we cancel
        // the drag so that the sheet resets to its open position
        if (ox < -20) cancel()

        // when the user releases the sheet, we check whether it passed
        // the threshold for it to close, or if we reset it to its open positino
        if (last) {
          // console.log('ox: ' + ox);
          if(ox > width * 0.5 || (vx > 0.5 && dx > 0)) {
            setMenuOpen(false);
            close(vx)
            enableBg();
          } else {
            setMenuOpen(true)
            open({ canceled })
            disableBg();
          }
        }
        // when the user keeps dragging, we just move the sheet according to
        // the cursor position
        else api.start({ x: ox, immediate: true })
      },
      { from: () => [0, x.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
    );

    const {data: session} = useSession()

    useEffect(() => {
      // listening on window width to set menu open/closed respectively
      if (typeof window != 'undefined') {
        if(window.innerWidth > 600) setMenuOpen(true);
        window.addEventListener('resize', windowWidth);
      }
      function windowWidth() {
        if (window.innerWidth > 600) {
          setMenuOpen(true);
        } else {
          setMenuOpen(false);
        }
      }
      return () => window.removeEventListener('resize', windowWidth);
    });

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

    const toggleThemeFn = () => {
      toggleTheme();
      closeMenu();
    }

    return (
<>
        <section className="col-span-2 md:text-right md:fixed md:left-16 p-4 z-40"> 
        <div className="flex flex-col md:gap-16 gap-4">
        <div className='flex flex-row justify-between items-center'>
          <Link href="/">
            <div className={`text-4xl font-bold ${menuOpen ? "blur-md" : "blur-none"}`}>
              @robbettison
            </div>
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
              stroke-width="1.5" stroke="currentColor" className="w-6 h-6 sm:h-0 z-50"
              onClick={(e) => toggleMenu(e)}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        </div>
      
        <a.div style={{ right: -width + x.get(), x }} 
                {...bind()} className={`backdrop-blur-none blur-none touch-none fixed md:flex flex-col gap-4 text-md font-bold text-left md:text-left 
                         md:fixed md:left-auto md:top-auto top-0 h-screen md:h-auto md:w-auto p-4 md:p-0 z-40 w-[300px]
                        ${theme === "light" ? "bg-gray-300" : "bg-purple-700"}  md:bg-inherit pt-24 md:pt-0`} id="navbar">
          <ul className='filter-none'>
          <Trail open={menuOpen}>
            <li className={`hover:text-highlighttext ${pathname === '/' ? 'sm:border-l-4 border-r-4 sm:border-r-0 border-current sm:pl-2 pr-2':""}`}>
                <Link href='/' onClick={closeMenu}>home</Link>
            </li>
            <li className={`hover:text-highlighttext ${pathname === '/contact' ? 'sm:border-l-4 sm:border-r-0 border-r-4 border-current sm:pl-2 pr-2':""}`}>
                <Link href='/contact' onClick={closeMenu}>contact</Link>
            </li>
            <li className={`hover:text-highlighttext ${pathname === '/services' ? 'sm:border-l-4 sm:border-r-0 border-r-4 border-current sm:pl-2 pr-2':""}`}>
                <Link href='/services' onClick={closeMenu}>services</Link>
            </li>
            <li className={`hover:text-highlighttext ${pathname === '/portfolio' ? 'sm:border-l-4 sm:border-r-0 border-r-4 border-current sm:pl-2 pr-2':""}`}>
                <Link href='/portfolio' onClick={closeMenu}>portfolio (coming soon)</Link>
            </li>
            <li className={`hover:text-highlighttext ${pathname?.includes('/blog') ? 'sm:border-l-4 sm:border-r-0 border-r-4 border-current sm:pl-2 pr-2':""}`}>
                <Link href='/blog' onClick={closeMenu}>blog</Link>
            </li>
            <li className='cursor-pointer'>
              <p onClick={toggleThemeFn}><span className="hover:text-highlighttext">theme: </span>{theme === "light" ? <span className="text-highlighttext">light</span> : <span>dark</span>}</p>
            </li>
            <li className='relative'>
                {
                  session ? <>
                              <p>Hi, {session.user?.name}</p>
                              {session.user.image ? <img className="absolute sm:left-20 right-20" src={session.user.image} /> : <></>}
                              <button onClick={() => signOut()} className="hover:text-highlighttext">sign out</button>
                            </> 
                          :
                            <button onClick={() => signIn()} className="hover:text-highlighttext">log in</button>
                }
            </li>
          </Trail>
          </ul>
        </a.div>
        </div>
      </section>
      </>

    )

    function toggleMenu(event: MouseEvent) {
      console.log('menuOpen: ' +menuOpen);
      setMenuOpen(prev => !prev);
      if(!menuOpen) {
        console.log('opening menu ')
        open({canceled: false});
        disableBg();
      } else {
        console.log('closing menu');
        close()
        enableBg();
      }
      console.log(document.getElementById("navbar"));
    }

    function closeMenu() {
      setMenuOpen(false);
      close();
      enableBg();
    }

    function disableBg() {
      const element = document.querySelector("body");
      element?.classList.add("noscroll");
    }

    function enableBg() {
      const element = document.querySelector("body");
      element?.classList.remove("noscroll");
    }
    
  }

