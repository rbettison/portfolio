import * as React from 'react'

export default function Carousel({IMAGES} : {IMAGES: string[]}) {

  return (
    <>
    <div className='carousel rounded-box h-96 bg-accent'>
      {IMAGES.map((img, index) => {

          return (
              <div key={img} className="carousel-item">
                  <img src={img} className='bg-cover p-5'/>
              </div>
          )
      }
      )}
    </div>
</>
  )
}