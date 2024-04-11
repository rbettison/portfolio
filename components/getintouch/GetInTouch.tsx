'use client'
import styles from './getintouch.module.css';
import { useState, useRef } from 'react';
import Link from 'next/link';

export default function GetInTouch() {
    const [progress, setProgress] = useState("");
    const timerRef = useRef<number>();

    async function handleSubmit(event: any) {
        setProgress("progress");
        event.preventDefault();
        const data = {
            name: String(event.target.name.value),
            email: String(event.target.email.value),
            message: String(event.target.message.value)
        }
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if(response.ok) {
            console.log("Message sent successfully.");
        }
        if(!response.ok) {
            console.log("Error sending message!");
        }
        console.log(data);
        timerRef.current = window.setTimeout(() => {
            setProgress('complete');
            Array.from(document.getElementsByClassName("formInformation"))?.forEach(element => {
                element.setAttribute("hidden", "true");
            });
            document.getElementById("feedback")?.removeAttribute("hidden");
            document.getElementById("submitButton")?.setAttribute("disabled", "");
        }, 2000);
        
    }

    return (
        <div className="h-screen w-full md:grid grid-cols-5 grid-rows-5 mt-8 p-8" id="getintouch">

            <div className="md:row-start-2 col-start-2 col-span-3" >
                <div hidden id="feedback">
                    <h1 className="text-3xl font-bold mb-4">Success!</h1>
                    <h2 className="text-md mb-4">Thanks for reaching out, I&apos;ll be in contact as soon as possible.</h2>
                    <p>In the meantime, check out my <Link href="/blog"><span className="underline hover:text-highlighttext">blog</span></Link>.</p>
                </div>
                <div className='formInformation'>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label className='formInformation input input-bordered flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input type="text" placeholder="name" name="name" required className='formInformation grow' />
                        </label>
                        
                        <label className='formInformation input input-bordered flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input type="text" className="grow formInformation" placeholder="Email" name='email'/>
                        </label>

                        <textarea name="message" className="formInformation textarea textarea-accent" placeholder="message"></textarea>

                        <button type="submit" id="submitButton" className={`btn btn-primary ${progress === '' ? 'cursor-pointer' : ''}`}>{progress === '' ? <span>send</span> : progress === 'complete' ? <span></span> : <span>sending</span>}</button>
                    </form>
                </div>                
            </div>
            </div>
    )
  }