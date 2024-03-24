import Link from 'next/link';
import ButtonBouncePrompt from '../animation/ButtonBouncePrompt';
import Socials from '../blog/Socials';

export default function Hero() {

    return (

            <div className="h-screen md:grid md:grid-cols-5 md:grid-rows-5 grid-cols-3 grid-rows-2 relative">
                
                <img src='/IMG_0881.png' className='h-64 md:w-full md:h-full p-4 object-cover md:row-start-2 md:col-start-4 md:col-span-2 md:row-span-2'/>

                <div className='md:row-start-1 md:col-start-1 md:col-span-2 flex flex-row absolute right-8 top-8 md:top-auto md:static'>
                    <Socials />
                </div>
                <p className="md:row-start-2 row-span-2 md:col-start-1 md:col-span-3 text-4xl row-start-1 col-span-3 self-center p-4">
                    Hi, I&apos;m Rob. I&apos;m a software 
                    engineer and 
                    solution architect.
                    Check my <span className="underline hover:text-highlighttext">
                        <Link href="/RobertBettisonCV.pdf" target='_blank'>credentials</Link>
                    </span>.
                </p>
                <ButtonBouncePrompt className='md:col-start-3 md:row-start-4 place-self-center row-start-2 col-start-2'>
                <Link href="/#experience" className="md:col-start-3 md:row-start-3 place-self-center row-start-2 col-start-2">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                        stroke="currentColor" className="w-6 h-6 hover:stroke-highlighttext">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                </Link>
                </ButtonBouncePrompt>

                {/* <img alt='Me'/> */}
            </div>

    )
  }