"use client";
import styles from './getintouch.module.css';

export default function GetInTouch() {


    async function handleSubmit(event: any) {
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

    }

    return (
            <div id="getintouch" className={styles.container}>
                <h1>Get in touch.</h1>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>Name</label>
                    <input name="name" required></input>
                    <label>Email address</label>
                    <input name="email" required></input>
                    <label>Message</label>
                    <textarea name="message" rows="10" cols="40" required></textarea>
                    <button type="submit">Send</button>
                </form>
                
            </div>
    )
  }