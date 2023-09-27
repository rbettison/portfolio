'use client'
import styles from './getintouch.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
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
        // const response = await fetch("/api/contact", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // })
        // if(response.ok) {
        //     console.log("Message sent successfully.");
        // }
        // if(!response.ok) {
        //     console.log("Error sending message!");
        // }
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
            <div id="getintouch" className={styles.container}>
                <div hidden id="feedback" className={styles.feedback}>
                    <h1>Success!</h1>
                    <h2>Thanks for reaching out, I'll be in contact as soon as possible.</h2>
                    <p>In the meantime, check out my <Link href="/blog"><span>blog</span></Link>.</p>
                </div>
                <div>
                    <h1 className='formInformation'>Get in touch.</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label className='formInformation'>Name</label>
                        <input name="name" required className='formInformation'></input>
                        <label className='formInformation'>Email address</label>
                        <input name="email" required className='formInformation'></input>
                        <label className='formInformation'>Message</label>
                        <textarea name="message" rows={10} cols={40} required className='formInformation'></textarea>
                        <button type="submit" id="submitButton">
                            {progress === '' ? <span>Send</span> : 
                            progress === 'complete' ? <CheckIcon /> : <CircularProgress /> } 
                        </button>
                    </form>
                </div>
                
            </div>
    )
  }