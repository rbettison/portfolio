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
                <div>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label className='formInformation'>name</label>
                        <input name="name" required className='formInformation'></input>
                        <label className='formInformation'>email address</label>
                        <input name="email" required className='formInformation'></input>
                        <label className='formInformation'>message</label>
                        <textarea name="message" rows={10} cols={40} required className='formInformation'></textarea>
                        <button type="submit" id="submitButton" className={`text-xl font-bold hover:text-highlighttext ${progress === '' ? 'cursor-pointer' : ''}`}>{progress === '' ? <span>send</span> : progress === 'complete' ? <span></span> : <span>sending</span>}</button>
                        {/* <button type="submit" id="submitButton">
                            {progress === '' ? <span>Send</span> : 
                            progress === 'complete' ? <CheckIcon /> : <CircularProgress /> } 
                        </button> */}
                    </form>
                </div>
                
            </div>
            </div>
    )
  }