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
        <div className={styles.tagContainer}>
        {tagData.map((entry: {tagName: string, id: number}) => 
                                <Chip key={entry.id} 
                                        label={entry.tagName} 
                                        variant={selectedChips.has(entry.tagName) ? "filled" : "outlined"}
                                        clickable={true}
                                        onClick={toggleFilter}/>)}
        </div>
        <div className={styles.postContainer}>

        {posts?.map((entry: any) => {
                return (
                    <Link href={`/blog/${entry._id}`} key={entry._id}>
                    <div className={styles.card}>
                        <h2>{entry.title}</h2>
                        <h3>{entry.description}</h3>
                        <h4 className={styles.mainBlogPageDate}>{new Date(entry.created).toLocaleDateString()}</h4>
                        <div className={styles.blogTags}>
                            {entry.tags.map((tag: string) => {
                                return(
                                    <Chip key={tag} label={tag} size='small'></Chip>
                                );
                            })}
                        </div>
                    </div>
                    </Link>
                )
            })
        }
        </div>
    </>
    )
}