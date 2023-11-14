import { useState } from "react"

export default function CommentForm({loading, error, onSubmit, autoFocus = false, initialValue = ""}: 
    {
        loading: boolean, 
        error: string, 
        onSubmit: (message: string) => Promise<string>,
        autoFocus?: boolean,
        initialValue?: string}) {
    const [message, setMessage] = useState(initialValue);

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(message).then(() => setMessage(""));
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-row gap-4">
            <textarea 
                autoFocus={autoFocus}
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                className="w-4/5"/>
            <button type="submit"
                className="p-4 border border-currentTextColor">{loading? "Loading" : "Post"}</button>
            <div>{error}</div>
        </form>
    )
}