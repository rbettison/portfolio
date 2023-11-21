'use client'
import * as React from 'react'
import {
  useSpringRef,
  animated,
  useTransition,
  useSpring,
} from '@react-spring/web'
import { useState } from 'react';

export default function Carousel({IMAGES} : {IMAGES: string[]}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const springApi = useSpringRef();
  const [paused, setPaused] = useState(false)

  const transitions = useTransition([activeIndex], {
    from: {
      opacity: 0,
      // clipPath: 'polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)',
    },
    enter: {
      opacity: 1,
      // clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)',
    },
    leave: {
      opacity: 0,
      // clipPath: 'polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)',
    },
    onRest: (_springs, _ctrl, item) => {
      console.log('item:' + item);
      if (activeIndex === item) {
        setActiveIndex(activeIndex === IMAGES.length - 1 ? 0 : activeIndex + 1)
      }
    },
    exitBeforeEnter: true,
    config: {
      duration: 2000,
    },
    delay: 500,
    ref: springApi,
  })

  React.useLayoutEffect(() => {

    springApi.start()
  }, [activeIndex, springApi])

  function handlePause() {
    springApi.pause();
    setPaused(true)
  }

  function handleResume() {
    springApi.resume();
    setPaused(false)
  }

  // function handleResetAnimationIndex(index: React.SetStateAction<number>) {
  //   console.log('resetting animation');
  //   // springApi.stop();
  //   setActiveIndex(index);
  //   // springApi.start();
  //   // setActiveIndex(index);
  //   // springApi.start();
  // }

  return (
    <>
    <div className='w-full h-96'>
        <div className='overflow-hidden flex flex-row justify-center items-center w-7/8 h-full'>
            {transitions((springs, item) => (
                <animated.div className="overflow-hidden h-full" style={springs}>
                    <img className="w-auto h-full" src={IMAGES[item]}/>
                </animated.div>
            ))}
        </div>
        
    </div>
    {
        !paused ?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handlePause}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleResume}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        </svg>

    }


    <div className='flex flex-row'>
    {IMAGES.map((img, index) => {

        return (
            <div key={img} className="h-16 w-16">
                <img src={img}/>
            </div>
        )
    }
    )}

</div>
</>
  )
}