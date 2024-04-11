"use client";
import Link from 'next/link';
import styles from './posts.module.css';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { animate } from 'framer-motion';

export default function Posts(props: {posts: any[] }) {

    const {data: session} = useSession();

    const allPosts = props.posts;
    const allTags = new Set<string>(['all']);
    allPosts.forEach((post) => {
        post.tags.forEach((tag: string) => {
            allTags.add(tag);
        })
    })
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState(false);
    const [limit, setLimit] = useState(4);
    const paginationArr = new Array(Number(Math.ceil(allPosts.length / limit))).fill(0);
    const [posts, setPosts] = useState(props.posts.filter((post, index) => index >= ((page - 1) * limit) && index < (page * limit)));
    const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set([]));
    const [searchTerm, setSearchTerm] = useState("");

    const toggleFilter = (event: any) => {
        if(selectedChips.size === 0) {
            // hideSearchAndSlideAll();
        }
        if(event.target.innerText === 'all') {
            console.log('here');
            if(selectedChips.has('all')) {
                console.log('here has all');
                selectedChips.clear();
            } else {
                allTags.forEach((tag) => {
                    selectedChips.add(tag);
                })
            }
        } else {
            selectedChips.has(event.target.innerText) ? 
                selectedChips.delete(event.target.innerText) && selectedChips.delete('all') :
                    setSelectedChips(selectedChips.add(event.target.innerText));

            if(selectedChips.size === allTags.size - 1) selectedChips.add('all');
        }

        let postsFiltered = allPosts.filter((post) => {
            return post.tags.some((x: string) => selectedChips.has(x))
        })
        setFilters(true);
        setPosts(postsFiltered);
    }

    let tagData  = Array.from(allTags).map((tag, index) => {
        return {
            id: index,
            tagName: tag,
        }
    })

    function setPostsOnPage(page: number) {
        setPage(page);
        setPosts(allPosts.filter((post, index) => index >= ((page - 1) * limit) && index < (page * limit)))
    }

    const handleChangePage = (page: number) => {
        setPostsOnPage(page);
    }

    const resetFilters = () => {
        setSelectedChips(new Set([]));
        setFilters(false);
        setPostsOnPage(page);
        setSearchTerm("");
        resetTagsAndPosts();
    }

    const handleSearch = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log('here!');
        setFilters(true);
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        const searchLowerCase = searchTerm.toLowerCase()
        const filteredPosts = 
            allPosts.filter((post) => post.title.toLowerCase().includes(searchLowerCase));

        console.log('filteredPosts: ' + JSON.stringify(filteredPosts));
        setPosts(filteredPosts);
        hideTagsAndSlidePosts();
    }

    const resetTagsAndPosts = () => {
        const search: HTMLElement | null = document.getElementById("search");
        const posts: HTMLElement | null = document.getElementById("posts");
        const tags: HTMLElement | null = document.getElementById("tags");

        if(search!=null) {
            animate(search, {opacity: 1, y: 0}, {duration: 0.5})
        }
        if(tags!=null) {
            animate(tags, {opacity: 1, y: 0}, {duration: 0.5})
        }
        if(posts!=null) {
            animate(posts, {opacity: 1, y: 0}, {duration: 0.5})
        }
    }

    const hideSearchAndSlideAll = () => {
        const search: HTMLElement | null = document.getElementById("search");
        const posts: HTMLElement | null = document.getElementById("posts");
        const tags: HTMLElement | null = document.getElementById("tags");

        if(search!=null) {
            animate(search, {opacity: 0}, {duration: 0.5})
        }
        if(posts!=null) {
            animate(posts, {y: -50}, {duration: 0.5})
        }
        if(tags!=null) {
            animate(tags, {y: -50}, {duration: 0.5})
        }
    }

    const hideTagsAndSlidePosts = () => {
        const tags: HTMLElement | null = document.getElementById("tags");
        // const posts: HTMLElement | null = document.getElementById("posts");
        if(tags!=null) {
            animate([[tags, {opacity: 0}, {duration: 0.5}],[tags, {display: "none"}, {delay: 0.5}]])
        }
        // if(posts!=null) {
        //     animate(posts, {y: -150}, {duration: 0.5})
        // }
    }

    return (
    <>
        {session && session.user.role ==="admin" ? <Link href="/blog/new" className="font-bold text-highlighttext">new blog</Link> : <></>}
        <div className="max-h-screen flex flex-col gap-2 pt-20 w-1/2 min-w-1/2 m-auto items-start justify-start ">

        
                <div className='min-w-full flex justify-between items-center mb-8'>
                    <div className='flex sm:flex-row items-center flex-col gap-2' id="search">
                        <input onChange={handleSearch} value={searchTerm} type='text' placeholder='search for blog titles or content' className='input input-bordered w-56 sm:w-96'></input>
                    </div>
                    {!filters ? 
                    <div className='join'>
                    {paginationArr.map((i, index) => {
                        return (
                            <button value={index + 1} onClick={(event) => handleChangePage(Number(event.currentTarget.value))} 
                                className={`${page === index + 1 && "btn-active"} join-item btn`}>
                                {index + 1}
                            </button>
                        )
                    })}
                    </div> 
                    :
                    <button onClick={resetFilters}>Reset filters</button>
                    }
                    </div>
               
        

                
        
        <div className="flex flex-row gap-4 flex-wrap" id="tags">
        {tagData.map((entry: {tagName: string, id: number}) => 
                                <div key={entry.id} 
                                    className={`text-md font-bold badge ${selectedChips.has(entry.tagName) ? 'badge-secondary' : ''} cursor-pointer`}
                                    onClick={toggleFilter}
                                    >
                                    {entry.tagName}
                                </div>)}
        </div>
        <div className="min-w-full mb-8 max-h-full" id="posts">

        {posts?.map((entry: any) => {
                return (
                    <div key={entry._id} >
                    <Link href={`/blog/${entry.url}`} >
                    <div className={styles.posts}>
                        <h2 className="text-3xl font-bold max-h-10 overflow-y-hidden">{entry.title}</h2>
                        <h3 className="text-md max-h-6 overflow-y-hidden">{entry.description}</h3>
                        <h4 className="text-sm">{new Date(entry.created).toLocaleString('default', { day:'2-digit', month: 'long', year:'numeric' })}</h4>
                        <div className="flex flex-row gap-4">
                            {entry.tags.map((tag: string) => {
                                return(
                                    <p key={tag} 
                                        className={`text-sm font-bold ${selectedChips.has(tag) ? 'text-highlighttext' : ''}`}>
                                        {tag}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    </Link>
                    </div>
                )
            })
        }
        </div>
        <div className='w-full flex justify-end'>
        <div className='join '>
                    {paginationArr.map((i, index) => {
                        return (
                            <button value={index + 1} onClick={(event) => handleChangePage(Number(event.currentTarget.value))} 
                                className={`${page === index + 1 && "btn-active"} join-item btn`}>
                                {index + 1}
                            </button>
                        )
                    })}
                    </div>
        </div>
        </div>
    </>
    )
}