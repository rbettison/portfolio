import Link from 'next/link';

export default function Hero() {

    return (

            <div className="hero bg-base-100 h-screen relative text-base-content py-10 sm:min-w-1/2 w-full m-auto z-10">
                
                <div className='hero-content text-base-content text-center flex sm:flex-row flex-col'>

                <div className="avatar">
                    <div className="sm:w-[450px] w-[300px] rounded-full">
                        <img src='/IMG_0881.png'/>
                    </div>
                </div>

                    <div className='flex flex-col items-center'>
                    <p className='text-4xl font-bold underline'>
                        Hi, I&apos;m Rob.
                    </p>

                    <p className='text-sm font-bold'>Welcome to my portfolio and blog site.</p>


                        <div className='flex flex-row gap-3 mt-8'>
                            <button className='btn btn-large btn-neutral'>
                                <Link href="/RobertBettisonCV.pdf" target='_blank'>My CV</Link>
                            </button>
                            <button className='btn btn-large'>
                                <Link href="/portfolio">Portfolio</Link>
                            </button>
                        </div>
                    </div> 

                </div>
            </div>

    )
  }