import type { FC } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Splash from '../components/splash'

const Root: FC = () => (
  <main className='font-serif'>
    <Splash />
    <div className='bg-gradient-to-b from-zinc-200 via-zinc-100 to-zinc-400'>
      <div className='bg-texture'>
        <div className='my-0 mx-auto max-w-xl'>
          <Outlet />
        </div>
      </div>
    </div>
    <ScrollRestoration />
  </main>
)

export default Root
