"use client";
import Header from '@/components/header/Header';
import { useState } from 'react';
import {ThemeContext} from '../contexts/ThemeContext';
import AuthProvider from '@/contexts/AuthProvider';
import { Analytics } from '@vercel/analytics/react';
import { EdgeStoreProvider } from '@/contexts/EdgeStore';
import Bot from '@/components/chatbot/Bot';
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

export default function GlobalContextsWrapper({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [theme, setTheme] = useState('');

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light"? "dark" :"light"));
    }
    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
      }, [])

    return (

        <AuthProvider>
        <ThemeContext.Provider value={{theme, toggleTheme, setTheme}}>
        <EdgeStoreProvider>
        <html lang="en" data-theme="aqua">
        {/* ${theme === "dark" ? "text-white bg-background-dark" : "text-darkbg bg-gray-200"}`} */}
            <body className={`font-main items-center bg-base-100 text-base-content w-full`}  id={theme}>
                <Header></Header>
                    {children}
                <div>
                    <Bot />
                </div>
                <Analytics />
            </body>
        </html>
        </EdgeStoreProvider>
        </ThemeContext.Provider>
        </AuthProvider>
    )

}