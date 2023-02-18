import type { FC } from 'react'
import { Link } from 'react-router-dom'
import TitleLogo from '../components/title-logo'
import { GROOM, BRIDE, LINE_FLOWER_IMAGE } from '../config'

const Thanks: FC = () => (
  <div className='bg-texture px-5 py-7'>
    <div className='mb-44 rounded bg-white px-4 py-7 text-center text-zinc-600 shadow-2xl'>
      <div className='relative mx-auto mt-12 mb-8 h-56 w-56'>
        <TitleLogo />
      </div>
      <div className='mb-8 text-2xl tracking-wide'>
        <h1>{`${GROOM} & ${BRIDE}`}</h1>
      </div>
      <img className='mx-auto mb-16 w-32' src={LINE_FLOWER_IMAGE} alt='line-flower' />
      <p className='text-lg'>ご回答ありがとうございました</p>
      <Link to='/' className='mt-12 mb-14 block text-lg'>
        招待状トップへ &gt;
      </Link>
    </div>
  </div>
)

export default Thanks
