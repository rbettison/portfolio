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
import Socials from '../blog/Socials';

const width = 300;

export default function Header() {

    const { toggleTheme, setTheme, theme } = useContext(ThemeContext) as ThemeContextType;
    const[menuOpen,setMenuOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const[mobDevice,setMobDevice] = useState(false);


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
          setMobDevice(false);
        } else {
          setMobDevice(true);
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

<div className='z-20'>
        <div className='fixed top-4 left-4 flex flex-row justify-between items-center' id="topHeader">
        <div className="dropdown mb-72">
          <div tabIndex={0} role="button" className="btn m-1">
            Theme
            <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
            <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default"/></li>
            <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro"/></li>
            <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk"/></li>
            <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine"/></li>
            <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua"/></li>
          </ul>
        </div>
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
              strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 sm:h-0 z-50"
              onClick={(e) => toggleMenu(e)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        </div>

        <div className='fixed top-4 right-4 flex flex-row'>
        <div>
          <Socials />
        </div>
        </div>
      
        <a.div style={{ right: -width + x.get(), x }} 
                {...bind()} className={`sm:hidden backdrop-blur-none blur-none touch-none fixed md:flex flex-col gap-4 text-md font-bold text-left md:text-left 
                         md:fixed md:left-auto md:top-auto top-0 h-screen md:h-auto md:w-auto p-4 md:p-0 z-40 w-[300px]
                        ${theme === "light" ? "bg-gray-300" : "bg-purple-700"}  md:bg-inherit pt-24 md:pt-0`} id="navbar">
          <ul>
          <Trail open={menuOpen}>
            <li className={`hover:text-highlighttext ${pathname === '/' ? 'sm:border-l-4 border-r-4 sm:border-r-0 border-current sm:pl-2 pr-2':""}`}>
                <Link href='/' onClick={closeMenu}>home</Link>
            </li>
            <li className={`hover:text-highlighttext ${pathname === '/contact' ? 'sm:border-l-4 sm:border-r-0 border-r-4 border-current sm:pl-2 pr-2':""}`}>
                <Link href='/contact' onClick={closeMenu}>contact</Link>
            </li>
            {/* <li className={`hover:text-highlighttext ${pathname === '/services' ? 'sm:border-l-4 sm:border-r-0 border-r-4 border-current sm:pl-2 pr-2':""}`}>
                <Link href='/services' onClick={closeMenu}>services</Link>
            </li> */}
            <li className={`hover:text-highlighttext ${pathname === '/portfolio' ? 'sm:border-l-4 sm:border-r-0 border-r-4 border-current sm:pl-2 pr-2':""}`}>
                <Link href='/portfolio' onClick={closeMenu}>portfolio</Link>
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

        <ul className='fixed top-4 inset-x-0 mx-auto w-1/5 text-md font-bold hidden bg-base-200 text-base-content menu lg:menu-horizontal rounded-box justify-center'>
            <li>
                <Link href='/'>home</Link>
            </li>
            <li>
                <Link href='/contact'>contact</Link>
            </li>

            <li>
              <details open={moreOpen}>
                <summary>more</summary>
                <ul>
                  <li>
                    <Link href='/portfolio'>portfolio</Link>
                  </li>
                  <li>
                    <Link href='/blog'>blog</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
                {
                  session ? <button onClick={() => signOut()} className='relative'>
                              <p>Hi, {session.user?.name}</p>
                              {session.user.image ? <img className="absolute sm:left-20 right-20" src={session.user.image} /> : <></>}
                              <p>sign out</p>
                            </button> 
                          :
                            <button onClick={() => signIn()} className="hover:text-highlighttext">log in</button>
                }
                </li>

          </ul>
          </div>
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
      close(1);
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

