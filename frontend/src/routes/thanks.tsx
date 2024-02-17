import type { FC } from 'react'
import { Link } from 'react-router-dom'
import TitleLogo from '../components/title-logo'
import { GROOM, BRIDE, LINE_FLOWER_IMAGE, ALREADY_SUBMITTED_PARAM, NO_AD_PARAM } from '../config'

const Thanks: FC = () => (
  <div className='h-screen px-5 py-7'>
    <div className='rounded bg-white px-4 py-7 text-center text-zinc-600 shadow-2xl'>
      <div className='relative mx-auto mt-8 mb-6 h-40 w-40'>
        <TitleLogo />
      </div>
      <div className='mb-6 text-lg tracking-wide'>
        <h1>{`${GROOM} & ${BRIDE}`}</h1>
      </div>
      <img className='mx-auto mb-12 w-24' src={LINE_FLOWER_IMAGE} alt='line-flower' />
      <p className='mb-12 font-sans'>ご回答ありがとうございました</p>
      <div className='mx-auto mt-10 w-4/5 max-w-xs rounded-full border border-white bg-gradient-to-br from-neutral-400 to-stone-300 py-3.5 font-sans text-white shadow-md'>
        <Link to={`/?${ALREADY_SUBMITTED_PARAM}=1&${NO_AD_PARAM}=1`}>TOPページに戻る</Link>
      </div>
    </div>
  </div>
)

export default Thanks
