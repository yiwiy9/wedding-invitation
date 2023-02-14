import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Splash from '../components/splash'

const Root: FC = () => (
  <main className='font-serif'>
    {/* <Splash /> */}
    <div className='bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-300'>
      <div className='my-0 mx-auto max-w-xl'>
        <Outlet />
      </div>
    </div>
  </main>
)

export default Root
