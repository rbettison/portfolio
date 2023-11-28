"use client";
import Link from 'next/link';
import styles from './posts.module.css';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Posts(props: {posts: any[] }) {

    const {data: session} = useSession();
    console.log('IN POSTS')

    console.log('user session: ' + JSON.stringify(session));

    const allPosts = props.posts;
    const allTags = new Set<string>(['all']);
    allPosts.forEach((post) => {
        post.tags.forEach((tag: string) => {
            allTags.add(tag);
        })
    })
    const [posts, setPosts] = useState(props.posts);
    const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set([]));

    const toggleFilter = (event: any) => {
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

        setPosts(postsFiltered);
    }

    let tagData  = Array.from(allTags).map((tag, index) => {
        return {
            id: index,
            tagName: tag,
        }
    })

    return (
    <>
        {session && session.user.role ==="admin" ? <Link href="/blog/new" className="font-bold text-highlighttext">new blog</Link> : <></>}
        <div className="p-4 flex flex-col gap-8 mt-8 min-w-full items-start justify-start">
        <div className="flex flex-row gap-4 flex-wrap">
        {tagData.map((entry: {tagName: string, id: number}) => 
                                <p key={entry.id} 
                                    className={`text-md font-bold ${selectedChips.has(entry.tagName) ? 'text-highlighttext' : ''} cursor-pointer`}
                                    onClick={toggleFilter}
                                    >
                                    
                                    {entry.tagName}
                                </p>)}
        </div>
        <div className="min-w-full">

        {posts?.map((entry: any) => {
                return (
                    <section key={entry._id}>
                    <Link href={`/blog/${entry.url}`} >
                    <div className={styles.posts}>
                        <h2 className="text-3xl mb-4 font-bold">{entry.title}</h2>
                        <h3 className="text-md mb-4">{entry.description}</h3>
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
                    </section>
                )
            })
        }
        </div>
        </div>
    </>
    )
}