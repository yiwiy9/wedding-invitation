import type { FC } from 'react'
import TitleLogo from '../components/title-logo'
import { GROOM, BRIDE, LINE_FLOWER_IMAGE } from '../config'

const Thanks: FC = () => (
  <div className='h-screen bg-texture px-5 py-7'>
    <div className='rounded bg-white px-4 py-7 text-center font-serif text-zinc-600 shadow-2xl'>
      <div className='relative mx-auto mt-8 mb-6 h-40 w-40'>
        <TitleLogo />
      </div>
      <div className='mb-6 text-lg tracking-wide'>
        <h1>{`${GROOM} & ${BRIDE}`}</h1>
      </div>
      <img className='mx-auto mb-12 w-24' src={LINE_FLOWER_IMAGE} alt='line-flower' />
      <p className='mb-12 font-sans'>ご回答ありがとうございました</p>
    </div>
  </div>
)

export default Thanks
