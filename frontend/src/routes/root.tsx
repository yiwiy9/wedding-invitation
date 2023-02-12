import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Splash from '../components/splash'

const Root: FC = () => (
  <main className='font-serif'>
    <Splash />
    <div className='bg-gradient-to-b from-gray-50 via-red-100 to-red-300'>
      <div className='my-0 mx-auto max-w-xl'>
        <Outlet />
      </div>
    </div>
  </main>
)

export default Root
