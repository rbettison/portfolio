"use client"

import { usePost } from "@/contexts/PostProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileState, MultiFileDropzone } from "./MultiFile";
import { useEdgeStore } from "@/contexts/EdgeStore";

// {blog} : {blog: string}
export default function BlogForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const [images, setImages] = useState<{url: string}[]>([]);
    
    const { edgestore } = useEdgeStore();
    const { blog, setBlog } = usePost();



    

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
        const newFileStates = structuredClone(fileStates);
        const fileState = newFileStates.find(
            (fileState) => fileState.key === key,
        );
        if (fileState) {
            fileState.progress = progress;
        }
        return newFileStates;
        });
    }
    

    async function submit(event: React.SyntheticEvent<HTMLFormElement>) {
        setLoading(true);
        event.preventDefault();

        console.log('creating blog: ' + JSON.stringify(blog));

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
            likes: [],
            images: []
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


            <MultiFileDropzone
                value={fileStates}
                onChange={(files) => {
                setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                setFileStates([...fileStates, ...addedFiles]);
                await Promise.all(
                    addedFiles.map(async (addedFileState) => {
                    try {
                        const res = await edgestore.publicFiles.upload({
                        file: addedFileState.file,
                        onProgressChange: async (progress) => {
                            updateFileProgress(addedFileState.key, progress);
                            if (progress === 100) {
                            // wait 1 second to set it to complete
                            // so that the user can see the progress bar at 100%
                            await new Promise((resolve) => setTimeout(resolve, 1000));
                            updateFileProgress(addedFileState.key, 'COMPLETE');
                            }
                        },
                        })
                        return res;
                    } catch (err) {
                        updateFileProgress(addedFileState.key, 'ERROR');
                    }
                    }),
                ).then((images) => {

                    let newData = blog;
                    let imageUrls = images.map((img) => {
                        return img?.url === undefined ? "" : img.url;
                    });
                    if(imageUrls.length > 0) {
                        newData['images'] = [...blog.images, ...imageUrls]
                    }
                    setBlog(newData);

                });
                }}
            />


            {loading? <p>Submitting</p> : <button type="submit">Submit</button>}
        </form>
            {<button onClick={deleteBlog} className="mt-48 mb-24 font-bold text-red-600 text-lg self-center">delete permanently</button>}
        </div>
    )
}