'use client'
import { useSession } from "next-auth/react";
import { useState } from "react";
import BlogForm from "./BlogForm";

export default function BlogClientComponent({blog , children} : {blog : string, children : React.ReactNode}) {

    const [editing, setEditing] = useState(false);
    const {data: session} = useSession();

    const toggleEdit = () => {
        setEditing(!editing);
    }

    return (
        <>
        {session && !editing ? <><button onClick={toggleEdit}>Edit</button> {children} </> :
            (session && editing ? 
            
            <>
            <button onClick={toggleEdit}>Stop Edit</button>  
            <BlogForm blog={blog}/>
            </>
            
            : children)}
        </>
    )
}