'use client'
import { animated, useSpring } from "@react-spring/web";

export default function ButtonBouncePrompt({children, className} : {children : React.ReactNode, className: string}) {
    let styles = useSpring({
        from: {transform: "translateY(-5px)"},
        to: {transform: "translateY(5px)"},
        loop: true,
        config: {
            duration: 1000
        }
    })


    return(
        <animated.div className={className} style={styles}>
            {children}
        </animated.div>
    )

}