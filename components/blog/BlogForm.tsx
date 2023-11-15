"use client"

import { usePost } from "@/contexts/PostProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Blog = {
    [key: string]: number | string | string[],
    title: string,
    description: string,
    author: string,
    body: string,
    created: string,
    tags: string[],
    url: string
}

// {blog} : {blog: string}
export default function BlogForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { blog, setBlog } = usePost();
    

    async function submit(event: React.SyntheticEvent<HTMLFormElement>) {
        setLoading(true);
        event.preventDefault();

        let createdBlog = await fetch("/api/blog", {
            method: 'POST',
            body: JSON.stringify(blog)
        })

        setLoading(false);
        setBlog({
            _id:"",
            title: "",
            description: "",
            author: "",
            body: "",
            created: "",
            tags: [],
            url: "",
            comments: [],
            likes: []
        })
        let jsonBlog = await createdBlog.json();

        let redirectUrl = "/blog/" + jsonBlog.blog.url;

        router.push(redirectUrl);
    }

    async function deleteBlog() {
        let deleteResp = await fetch("/api/blog", {
            method: 'DELETE',
            body: JSON.stringify({"_id": blog._id})
        });
        console.log("Blog deleted... " + deleteResp)

        let redirectUrl = "/blog";

        router.push(redirectUrl);

    }

    function handle(event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {

        const newData = {...blog};
        if(event.target.id === 'tags') {
            let array : string[] = event.target.value.split(",");
            newData[event.target.id] = array;
        } else {
            newData[event.target.id] = event.target.value; 
        }
        setBlog(newData);
        console.log(JSON.stringify(blog));
    }

    return (

        <div>
        <form onSubmit={submit} className="flex flex-col gap-8 w-full">
            <div>
                <div className="font-bold">
                title
                </div>
                <input className="text-darkbg w-full" onChange={handle} id="title" value={blog.title} 
                    type="text"  name="title" />
            </div>

            <div>
                <div className="font-bold">
                description
                </div>
                <input className="text-darkbg w-full" onChange={handle} id="description" value={blog.description} 
                    type="text" name="description" />
            </div>

            <div>
                <div className="font-bold">
                author
                </div>
                <input className="text-darkbg w-full" onChange={handle} id="author" value={blog.author} 
                    type="text" name="author" />
            </div>
        

            <div>
                <div className="font-bold">
                body
                </div>
                <textarea className="text-darkbg w-full h-48" onChange={handle} id="body" value={blog.body} 
                    name="body" />
            </div>

            <div>
                <div className="font-bold">
                    created
                </div>
                <input className="text-darkbg w-full" onChange={handle} id="created" value={blog.created} 
                    type="text" name="created" />
            </div>


            <div>
                <div className="font-bold">
                    tags
                </div>
                <input className="text-darkbg w-full" onChange={handle} id="tags" value={blog.tags} 
                    type="text" name="tags" />
            </div>

            <div>
                <div className="font-bold">
                    url
                </div>
                <input className="text-darkbg w-full" onChange={handle} id="url" value={blog.url} 
                    type="text" name="url" />
            </div>


            {loading? <p>Submitting</p> : <button type="submit">Submit</button>}
        </form>
            {<button onClick={deleteBlog} className="mt-48 mb-24 font-bold text-red-600 text-lg self-center">delete permanently</button>}
        </div>
    )
}