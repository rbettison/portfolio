"use client";
import Header from '@/components/header/Header';
import { useState } from 'react';
import {ThemeContext} from '../contexts/ThemeContext';
import AuthProvider from '@/contexts/AuthProvider';
import { Analytics } from '@vercel/analytics/react';
import { EdgeStoreProvider } from '@/contexts/EdgeStore';

export default function GlobalContextsWrapper({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [theme, setTheme] = useState('');

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light"? "dark" :"light"));
    }

    return (

        <AuthProvider>
        <ThemeContext.Provider value={{theme, toggleTheme, setTheme}}>
        <EdgeStoreProvider>
        <html lang="en">
            <body className={`font-main flex flex-col items-center ${theme === "dark" ? "text-white bg-background-dark" : "text-darkbg bg-gray-200"}`} id={theme}>
            <div className="md:grid grid-cols-12 grid-rows-2 w-full flex flex-col h-screen relative">
            <Header></Header>
            <div className="col-start-4 col-span-5 row-start-1 row-span-2 pl-4 pr-4">
                {children}
                </div>
                </div>
                <Analytics />
            </body>
        </html>
        </EdgeStoreProvider>
        </ThemeContext.Provider>
        </AuthProvider>
    )

}