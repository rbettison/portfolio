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
    const[moreOpen, setMoreOpen] = useState(false);

    const {data: session} = useSession()

    useEffect(() => {
      localStorage.setItem('theme', theme);
      console.log('setting the theme in local storage: ' + theme);
    }, [theme])
    return (
<>

<div className='z-50'>
        

        <div className='fixed top-4 right-4 flex flex-row z-50'>
        <div>
          <Socials />
        </div>
        </div>

        <svg 
          onClick={() => setMenuOpen(prev => !prev)}
          className={`fill-current sm:hidden top-4 left-4 fixed z-50`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>

        <ul className={`${!menuOpen && "hidden"} fixed sm:top-4 top-12 inset-x-0 sm:mx-auto left-4 sm:w-1/4 w-[200px] text-md font-bold bg-base-200 text-base-content menu lg:menu-horizontal rounded-box justify-center z-50`}>
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
                  <li>
                    <details open className="dropdown">
                      <summary>
                        Theme
                      </summary>
                      <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default"/></li>
                        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro"/></li>
                        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk"/></li>
                        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine"/></li>
                        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua"/></li>
                      </ul>
                    </details>
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

    function disableBg() {
      const element = document.querySelector("body");
      element?.classList.add("noscroll");
    }

    function enableBg() {
      const element = document.querySelector("body");
      element?.classList.remove("noscroll");
    }
    
  }

