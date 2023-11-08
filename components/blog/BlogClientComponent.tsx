'use client'
import { useSession } from "next-auth/react";
import { useState } from "react";
import BlogForm from "./BlogForm";
import PostProvider, { usePost } from "@/contexts/PostProvider";

export default function BlogClientComponent({ children} : { children : React.ReactNode}) {

    const [editing, setEditing] = useState(false);
    const {data: session} = useSession();

    const toggleEdit = () => {
        setEditing(!editing);
    }

    return (
        <>
        
            <PostProvider>

            {session && session.user.role ==="admin" && !editing ? <><button onClick={toggleEdit}>Edit</button> {children} </> :
                (session && session.user.role ==="admin" && editing ? 
                
                <>
                <button onClick={toggleEdit}>Stop Edit</button>  
                <BlogForm />
                </>
                
                : children)}
            </PostProvider>

        </>
    )
}