import Link from "next/link";

export default function Services() {
    return(
        <div className="container">
        <div className="md:grid grid-cols-5 grid-rows-5 h-screen flex flex-col mt-16 md:mt-0 pl-8 md:pl-0 pr-8 md:pr-0">
            <div className="font-bold row-start-2 col-start-2 col-span-3 text-4xl relative mb-8 md:mb-0">
                <p className="md:absolute md:-left-16 md:top-0">1</p>
                <p>website builds</p>
            </div>
            <p className="row-start-3 col-start-2 col-span-3 text-lg mb-16 md:mb-0">Solidly built and sumptuously designed websites. My background in technology consulting drives me to gain an understanding of the why behind your need for a website to deliver something bespoke to the hilt.</p>
            <Link href="/services/#techConsulting" className="col-start-3 row-start-4 place-self-center">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="w-6 h-6 hover:stroke-highlighttext">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                </svg>
            </Link>
        </div>    

        <div className="md:grid grid-cols-5 grid-rows-5 h-screen flex flex-col pl-8 md:pl-0 pr-8 md:pr-0" id="techConsulting">

            <Link href="/services/#navbar" className="row-start-1 col-start-3 place-self-center mt-12 md:mt-0 mb-8 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                    viewBox="0 0 24 24" strokeWidth="1.5" 
                    stroke="currentColor" className="w-6 h-6 hover:stroke-highlighttext">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                </svg>
            </Link>

            <div className="font-bold row-start-2 col-start-2 col-span-3 text-4xl relative mb-8 md:mb-0">
                <p className="md:absolute md:-left-16 md:top-0">2</p>
                <p>technology consulting</p>
            </div>

            <p className="row-start-3 col-start-2 col-span-3 text-lg">I have 6 years of experience in the technology consulting industry, working as a software engineer, solution architect and scrum lead. I&apos;ve learnt the hard way that a problem shared is a problem halved. If you&apos;ve got a particular nut that&apos;s proving difficult to crack, I can lend a helping hand. </p>
            <Link href="/services/#profWriting" className="col-start-3 row-start-4 place-self-center mt-4 md:mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="w-6 h-6 hover:stroke-highlighttext">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                </svg>
            </Link>
        </div>  

        <div className="md:grid grid-cols-5 grid-rows-5 h-screen flex flex-col pl-8 md:pl-0 pr-8 md:pr-0" id="profWriting">

            <Link href="/services/#techConsulting" className="row-start-1 col-start-3 place-self-center mt-12 md:mt-0 mb-8 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                    viewBox="0 0 24 24" strokeWidth="1.5" 
                    stroke="currentColor" className="w-6 h-6 hover:stroke-highlighttext">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                </svg>
            </Link>

            <div className="font-bold row-start-2 col-start-2 col-span-3 text-4xl relative mb-8 md:mb-0">
                <p className="md:absolute md:-left-16 md:top-0">3</p>
                <p>professional writing</p>
            </div>

            <p className="row-start-3 col-start-2 col-span-3 text-lg">Let me help realise your article ideas or requirements for copy. I write blog posts for this site which you can see <Link href="/blog" className="hover:text-highlighttext underline">here</Link>.</p>
        </div>   
        </div>
    )
}