import React from 'react'
import { useSpring, animated } from 'react-spring'
import weddingImage from './wedding_image.webp'

function Practice() {
  const styles = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  })
  return (
    <div>
      <img src={weddingImage} alt='wedding' className='w-full' />
      <animated.div style={styles} className='absolute top-1/2 left-1/2 -translate-x-1/2 transform'>
        <h1 className='animate-pulse font-serif text-6xl text-white'>Welcome to our wedding</h1>
      </animated.div>
    </div>
  )
}

export default Practice
