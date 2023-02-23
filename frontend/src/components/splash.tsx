import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { SPLASH_GIF } from '../config'

const Splash: FC = () => {
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEnded(true)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`${
        isEnded ? 'opacity-0' : ''
      } pointer-events-none fixed top-0 left-0 z-30 h-screen w-full bg-white transition-opacity duration-1000 ease-in`}
    >
      <img className='mx-auto h-full' src={SPLASH_GIF} alt='splash-gif' />
    </div>
  )
}

export default Splash
