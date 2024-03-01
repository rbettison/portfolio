'use client'

import { useSession } from "next-auth/react";
import { useState } from "react"
import { MessageType } from "./Message";
import Messages from "./Messages";
import { animate, motion } from "framer-motion";

export default function Bot() {

    const [messageToSend, setMessageToSend] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<MessageType[]>([{
        botMessage: true, text: "Hi there! I'm an AI chatbot trained on Rob's professional experience. If you'd like to know anything, you can ask me. So far, I've been trained on Rob's project experience, his education and qualifications, his skills, things he enjoys outside of work and his contact and website information."
    }]);
    const [chatbotOpen, setchatbotOpen] = useState(false);
    const {data: session} = useSession();

    const variants = {
        visible: { y: 0},
        hidden: { y: 455},
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
            className="fixed right-0 bottom-0 sm:flex flex-col hidden"
            animate={chatbotOpen ? "visible" : "hidden"}
            variants={variants}>
        <div className="p-4 flex flex-row justify-center items-center relative gap-2 self-end">
        <div className="font-bold text-2xl">chatbot assistant</div>
        <motion.svg xmlns="http://www.w3.org/2000/svg" 
            whileHover={{rotate: 360}}
            transition={{duration: 1}}
            onClick={() => setchatbotOpen(prev => !prev)}
            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
            stroke="currentColor" className="w-16 h-16 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
        </motion.svg>
        </div>

        <div 
            
            
            className={`p-5 bg-white bg-opacity-60 rounded-xl`}>
            <div>
                <Messages messages={messages} waitingForBot={loading}/>
                <form onSubmit={submit} className="flex flex-row justify-end">
                    <textarea 
                        className="p-1 bg-white w-[300px] rounded-lg min-h-[50px] max-h-[50px] h-[50px]"
                        value={messageToSend} 
                        onChange={(event) => setMessageToSend(event.currentTarget.value)} />
                    <button
                        className={`text-center p-2 bg-blue-200 font-bold rounded-lg max-h-[50px]  h-[50px]`}>
                        send
                    </button>
                </form>
            </div>
            
        </div>
        </motion.div>
        </>
    )
}