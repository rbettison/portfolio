'use client'
import { animated, useSpring } from "@react-spring/web";

export default function ObjectHighlight({children, className} : {children : React.ReactNode, className: string}) {
    const [props, api] = useSpring(() => ({
        from:{scale: 1},
        config: {
            duration: 100
        }
    }), [])

    function handleMouseEnter() {
        console.log('here');
        api.start({
            to: {scale: 2}
        })
    }

    function handleMouseLeave() {
        console.log('leave');
        api.start({
            to: {scale: 1}
        })
    }


    return(
            <animated.div 
                className={className}
                style={props} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                    {children}
             </animated.div>
    )

}