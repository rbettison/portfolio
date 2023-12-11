import { a, useTrail } from "@react-spring/web"
import React from "react"

export default function Trail({ open, children } : {open: boolean, children: React.ReactNode}) {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 1 : 0,
      x: open ? 0 : 20,
      height: open ? 30 : 0,
      from: { opacity: 0, x: 20, height: 0 },
    })

    // const trail = useTrail(items.length, {
    //     from: { opacity: 0 },
    //     to: { opacity: 1 },
    // })
    return (
      <div className="flex flex-col gap-4">
        {trail.map(({ ...style }, index) => (
          <a.div key={index} style={style}>
            <a.div>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    )
  }