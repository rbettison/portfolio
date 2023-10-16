"use client";
import Link from 'next/link';
import styles from './posts.module.css';
import {Chip} from '@mui/material';
import { useState } from 'react';

export default function Posts(props: {posts: any[] }) {
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
        <div className="p-4 flex flex-col gap-8 mt-8 min-w-full items-start justify-start">
        <div className="flex flex-row gap-4">
        {tagData.map((entry: {tagName: string, id: number}) => 
                                <p key={entry.id} 
                                    className={`text-md font-bold ${selectedChips.has(entry.tagName) ? 'text-highlighttext' : 'text-white'} cursor-pointer`}
                                    onClick={toggleFilter}
                                    >
                                    
                                    {entry.tagName}
                                </p>)}
        </div>
        <div className="min-w-full">

        {posts?.map((entry: any) => {
                return (
                    <Link href={`/blog/${entry._id}`} key={entry._id}>
                    <div className="flex flex-col pb-12 pt-4 box-border border-b border-white hover:border-highlighttext w-full min-w-full">
                        <h2 className="text-3xl mb-4 font-bold">{entry.title}</h2>
                        <h3 className="text-md mb-4">{entry.description}</h3>
                        <h4 className="text-sm">{new Date(entry.created).toLocaleString('default', { day:'2-digit', month: 'long', year:'numeric' })}</h4>
                        <div className="flex flex-row gap-4">
                            {entry.tags.map((tag: string) => {
                                return(
                                    <p key={tag} 
                                        className={`text-sm font-bold ${selectedChips.has(tag) ? 'text-highlighttext' : 'text-white'}`}>
                                        {tag}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    </Link>
                )
            })
        }
        </div>
        </div>
    </>
    )
}