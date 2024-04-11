import Link from 'next/link';

export default function Hero() {

    return (

            <div className="hero bg-base-100 h-screen relative text-base-content py-10 min-w-1/2 m-auto">
                
                <div className='hero-content text-base-content text-center flex flex-col'>

                <div className="avatar">
                    <div className="w-[500px] rounded-full">
                        <img src='/IMG_0881.png'/>
                    </div>
                </div>

                
                <p className='text-4xl'>
                    Hi, I&apos;m Rob.
                </p>

                <p>Welcome to my portfolio and blog site.</p>

                <>
                    <div className='flex flex-row gap-3'>
                        <button className='btn btn-large btn-neutral'>
                            <Link href="/RobertBettisonCV.pdf" target='_blank'>My CV</Link>
                        </button>
                        <button className='btn btn-large'>
                            <Link href="/portfolio">Portfolio</Link>
                        </button>
                    </div>
                </>
                </div>
            </div>

    )
  }