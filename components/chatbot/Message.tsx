export type MessageType = {
    text: string,
    botMessage: boolean
}

export default function Message({message}: {message: MessageType}) {

    const getTime = () => {
        let date = Date.now();
        const options = { hour: 'numeric', minute: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate;
    }

    return (
        <div className={`chat  ${message.botMessage ? "chat-start" : "chat-end"}`}>
            <div className={`chat-header gap-3 items-center flex ${message.botMessage ? "flex-row" : "flex-row-reverse"}`}>
                    {message.botMessage ? "Chum Chatbot" : "Me"}
                    <time className="text-xs opacity-50">{getTime()}</time>
            </div>
            {message.botMessage && 
            <>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <svg 
                            className="h-6 w-6"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Robot--Streamline-Ultimate.svg">
                            <desc>Robot Streamline Icon: https://streamlinehq.com</desc>
                            <path d="M0.75 23.25v-1.5a1.5 1.5 0 0 1 3 0v1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><path d="M21.75 20.25v-4.5a1.5 1.5 0 0 0 -1.5 -1.5H3.75a1.5 1.5 0 0 0 -1.5 1.5v4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><path d="M23.25 23.25v-1.5a1.5 1.5 0 0 0 -3 0v1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                            <path d="M18 19.026a3.006 3.006 0 0 0 1.5 -2.6V11.25a7.5 7.5 0 0 0 -15 0v5.176a3 3 0 0 0 1.5 2.6 12.01 12.01 0 0 0 12 0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><path d="m9 9 0 1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><path d="m15 9 0 1.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                            <path d="m12 3.75 0 -3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                        </svg>
                    </div>
                </div>
            </>
            }
            <div className={`chat-bubble w-4/5 
                ${message.botMessage  ? "bg-neutral text-neutral-content" : "bg-accent text-accent-content"}`}>
                {message.text}
            </div>
            <div className="chat-footer opacity-50">
                Delivered
            </div>
        </div>
    )
}