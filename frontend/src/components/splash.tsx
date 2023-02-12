import type { FC } from 'react'
import { useState } from 'react'
import { SPLASH_VIDEO } from '../config'

const Splash: FC = () => {
  const [isEnded, setIsEnded] = useState(false)
  return (
    <div
      className={`${
        isEnded ? 'opacity-0' : ''
      } pointer-events-none fixed top-0 left-0 z-20 h-screen w-full bg-white transition-opacity duration-1000 ease-in`}
    >
      <video className='mx-auto h-full' muted autoPlay onEnded={() => setIsEnded(true)}>
        <source src={SPLASH_VIDEO} type='video/mp4' />
      </video>
    </div>
  )
}
export default Splash
