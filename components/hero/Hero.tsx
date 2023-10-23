import Link from 'next/link';

export default function Hero() {
    return (

            <div className="min-h-screen grid grid-cols-5 grid-rows-5">
                <p className="row-start-2 col-start-2 col-span-3 text-4xl">
                    Hi, I&apos;m Rob. I&apos;m a software 
                    engineer and 
                    solution architect.
                    Check my <span className="underline hover:text-highlighttext">
                        <Link href="/RobertBettisonCV.pdf" target='_blank'>credentials.
                        </Link>
                    </span>
                </p>
                <Link href="/#experience" className="col-start-3 row-start-3 place-self-center">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                        stroke="currentColor" className="w-6 h-6 hover:stroke-highlighttext">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                </Link>
                {/* <img alt='Me'/> */}
            </div>

    )
  }