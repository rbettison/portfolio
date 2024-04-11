'use client'

import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react"
import { MessageType } from "./Message";
import Messages from "./Messages";
import { motion } from "framer-motion";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";

export default function Bot() {

    const { theme } = useContext(ThemeContext) as ThemeContextType;

    const [messageToSend, setMessageToSend] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<MessageType[]>([{
        botMessage: true, text: "Hi there! I'm an AI chatbot trained on Rob's professional experience. If you'd like to know anything, you can ask me. So far, I've been trained on Rob's project experience, his education and qualifications, his skills, things he enjoys outside of work and his contact and website information."
    }]);
    const [chatbotOpen, setchatbotOpen] = useState(false);
    const {data: session} = useSession();

    useEffect(() => {
        chatbotOpen ? disableBg() : enableBg();
    }, [chatbotOpen])

    const variants = {
        visible: { y: 0},
        hidden: { y: 450},
    }

    function disableBg() {
        const element = document.querySelector("body");
        element?.classList.add("noscroll");
    }

    function enableBg() {
        const element = document.querySelector("body");
        element?.classList.remove("noscroll");
    }
    

    const submit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            setMessageToSend("");
            let newMessages = [{text: messageToSend, botMessage: false}, ...messages]
            setMessages(newMessages);
            let resp = await fetch('api/chatbot/' + (session?.user?.id ? session?.user?.id : "1"), {
                method: 'POST',
                body: JSON.stringify({message: messageToSend})
            })
    
            let respJson = await resp.json();
            let botResp = respJson.message.queryResult.responseMessages[0].text.text;
            newMessages = [{text: botResp, botMessage: true}, ...newMessages]

            setLoading(false);
            setMessages(newMessages);
            
        } catch (err) {
            console.log('Error getting chatbot response: ' + err)
        }
    }

    return (
        <>
        <motion.div 
            className="fixed left-0 bottom-0 flex flex-col z-30"
            animate={chatbotOpen ? "visible" : "hidden"}
            variants={variants}>
        <div className="p-4 flex flex-row justify-center items-center relative gap-2 self-start">
            <label className="swap swap-rotate">
    
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />
                
                {/* cross icon */}
                <svg
                    onClick={() => setchatbotOpen(prev => !prev)} 
                    className="swap-on fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                
                {/* bot icon */}
                <div className="chat-start flex flex-row gap-2 swap-off" onClick={() => setchatbotOpen(prev => !prev)}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <motion.svg 
                            transition={{duration: 1}}
                            className="h-6 w-6 m-2 cursor-pointer "
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Robot--Streamline-Ultimate.svg">
                            <desc>Robot Streamline Icon: https://streamlinehq.com</desc>
                            <path d="M0.75 23.25v-1.5a1.5 1.5 0 0 1 3 0v1.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M21.75 20.25v-4.5a1.5 1.5 0 0 0 -1.5 -1.5H3.75a1.5 1.5 0 0 0 -1.5 1.5v4.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M23.25 23.25v-1.5a1.5 1.5 0 0 0 -3 0v1.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            <path d="M18 19.026a3.006 3.006 0 0 0 1.5 -2.6V11.25a7.5 7.5 0 0 0 -15 0v5.176a3 3 0 0 0 1.5 2.6 12.01 12.01 0 0 0 12 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m9 9 0 1.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m15 9 0 1.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            <path d="m12 3.75 0 -3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                        </motion.svg>  
                    </div>
                </div>
                
                </div>      
            </label> 
        </div>

        <div 
            className={`p-5 bg-base-300 text-base-content rounded-xl w-screen sm:w-[400px]`}>
            <div>
                <Messages messages={messages} waitingForBot={loading}/>
                <form onSubmit={submit} className="flex flex-row justify-end">
                    <textarea 
                        className={`p-1 bg-base-200 text-base-content  w-[300px] rounded-lg min-h-[50px] max-h-[50px] h-[50px] textarea textarea-secondary
                            `}
                        value={messageToSend} 
                        onChange={(event) => setMessageToSend(event.currentTarget.value)} 
                        placeholder={"message"}
                        />
                       
                    <button
                        className={`btn btn-primary font-bold rounded-lg max-h-[50px]  h-[50px]`}>
                        send
                    </button>
                </form>
            </div>
            
        </div>
        </motion.div>
        </>
    )
}