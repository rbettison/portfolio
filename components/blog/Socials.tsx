'use client'

import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext"
import Link from "next/link"
import { useContext } from "react"

export default function Socials() {

    const { theme } = useContext(ThemeContext) as ThemeContextType;

    return (
        <div className='flex flex-row'>
          <Link href="https://twitter.com/robbettison" target="_blank" className='w-auto h-full flex items-end'>
              <img className="h-12" src="/socials/twitter.png" />
          </Link>
          <Link href="https://medium.com/@rob.bettison94" target="_blank" className='w-auto h-full flex items-end'>
              {theme === "light" ? <img className="h-12" src='/socials/Medium-Symbol-Black-RGB@1x.png'/> : 
                  <img className="h-12" src='/socials/Medium-Symbol-White-RGB@1x.png'/>}
          </Link>
        </div>
    )
}
