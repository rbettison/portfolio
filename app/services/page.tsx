'use client'
import Link from "next/link";
import React, { useRef } from "react";
import { MotionValue, motion, useScroll, useSpring, useTransform } from "framer-motion";

const Page = ({ title, 
    description, 
    serviceNumber, 
    totalServices,
    nextService, 
    prevService,
    svgIcon,
    page } : 
    {   title: string, 
        description: React.ReactNode,
        totalServices: number,
        nextService?: string,
        prevService?: string,
        serviceNumber: number,
        svgIcon: React.ReactNode,
        page: String}) => {

function useParallax(value: MotionValue<number>, distance: number, offset: number) {
    return useTransform(value, [0,1], [-distance + offset, distance + offset]);
}            
const ref = useRef(null);
const {scrollYProgress} = useScroll({target: ref});
const x = useParallax(scrollYProgress, 1000, 0);
        

return (
<div className="h-screen flex flex-col justify-center items-center w-1/2 m-auto gap-4 ">

<div className="my-64 h-full flex flex-col justify-center items-center p-4  shadow-lg bg-neutral text-neutral-content">
<div ref={ref} className="w-64 font-bold sm:text-4xl text-xl relative text-left">
    <p className="md:absolute md:-left-16 md:top-0">{serviceNumber}</p>
    <p>{title}</p>
</div>

<div className="sm:text-md text-3xl text-left">
    {description}
</div>


<motion.div style={{x}} className="relative text-primary-content">
{svgIcon}
</motion.div>
</div>
</div>
)
}

export default function Services() {

    const totalServices = 3;
    const page = "services";

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return(
        <>

            {/* scroll snap doesn't work here in tailwind css --> have added to globals.css for now instead */}
                <Page 
                page={page}
                    totalServices={totalServices}
                    title="website builds" 
                    description={<p>Solidly built and sumptuously designed websites. My background in technology consulting drives me to gain an understanding of the why behind your need for a website to deliver something bespoke to the hilt.</p>}
                    serviceNumber={1}
                    svgIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 right-4 absolute">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>}
                    nextService="technology consulting"
                />
                <Page 
                                page={page}

                    totalServices={totalServices}
                    title="technology consulting" 
                    description={<p>I have 6 years of experience in the technology consulting industry, working as a software engineer, solution architect and scrum lead. I&apos;ve learnt the hard way that a problem shared is a problem halved. If you&apos;ve got a particular nut that&apos;s proving difficult to crack, I can lend a helping hand.</p>} 
                    serviceNumber={2}
                    svgIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 right-4 absolute">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                            </svg>}
                    nextService="professional writing"
                    prevService="website builds"
                />
                <Page 
                                page={page}

                    totalServices={totalServices}
                    title={"professional writing"} 
                    description={<p>Let me help realise your article ideas or requirements for copy. I write blog posts for this site which you can see <Link href="/blog" className="hover:text-highlighttext underline">here</Link>.</p>} 
                    serviceNumber={3}
                    svgIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 right-4 absolute">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>}
                    prevService="technology consulting"
                />
                <motion.div style={{scaleX}} className="fixed left-0 right-0 bottom-12 h-4 bg-currentTextColor">

                </motion.div>

            </>
    )
}

export {Page}