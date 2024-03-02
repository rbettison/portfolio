export type MessageType = {
    text: string,
    botMessage: boolean
}

export default function Message({message}: {message: MessageType}) {

    return (
        <div className={`flex flex-row gap-2 ${message.botMessage ? "justify-start" : "justify-end"}`}>
            {message.botMessage && 
            <svg 
                className="h-6 w-6"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Robot--Streamline-Ultimate.svg">
                <desc>Robot Streamline Icon: https://streamlinehq.com</desc>
                <path d="M0.75 23.25v-1.5a1.5 1.5 0 0 1 3 0v1.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M21.75 20.25v-4.5a1.5 1.5 0 0 0 -1.5 -1.5H3.75a1.5 1.5 0 0 0 -1.5 1.5v4.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M23.25 23.25v-1.5a1.5 1.5 0 0 0 -3 0v1.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                <path d="M18 19.026a3.006 3.006 0 0 0 1.5 -2.6V11.25a7.5 7.5 0 0 0 -15 0v5.176a3 3 0 0 0 1.5 2.6 12.01 12.01 0 0 0 12 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m9 9 0 1.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m15 9 0 1.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                <path d="m12 3.75 0 -3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
		    </svg>}
            <div className={`p-2 border-2 rounded-lg w-4/5 
                ${message.botMessage ? "bg-blue-300 self-start" : "bg-green-300 self-start"}`}>
                    
                
                {message.text}
                
            </div>
        </div>
    )
}