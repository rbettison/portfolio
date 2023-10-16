"use client";
import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { useEffect, useState } from 'react';
import {ThemeContext} from '../contexts/ThemeContext';
 
const plusJakartaSans = Plus_Jakarta_Sans({
  weight: '400',
  subsets: ['latin'],
})

// export const metadata: Metadata = {
//   title: 'Rob Bettison',
//   description: 'Welcome to Rob Bettison\'s Portfolio',
// }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState('');

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light"? "dark" :"light"));
  }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme, setTheme}}>
      <html lang="en">
        <body className="font-main text-white bg-primarybg flex flex-col items-center" id={theme}>
          <div className="grid grid-cols-12 grid-rows-2 mt-8 w-full">
          <Header></Header>
          <div className="col-start-4 col-span-5 pl-4 pr-4">
            {children}
            </div>
            {/* <Footer></Footer> */}
            </div>
          </body>
      </html>
    </ThemeContext.Provider>
  )
}
