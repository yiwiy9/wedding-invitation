import type { FC } from 'react'
import FadeImageSlider from './fade-image-slider'
import TitleLogo from './title-logo'
import {
  GROOM,
  BRIDE,
  YEAR,
  MONTH,
  DAY,
  SQUARE_IMAGES,
  LEFT_LEAVES_IMAGE,
  RIGHT_LEAVES_IMAGE,
  LINE_FLOWER_IMAGE,
} from '../config'

const InvitationCard: FC = () => (
  <div className='relative pt-16'>
    <img
      className='pointer-events-none absolute top-0 left-0 z-10 h-48'
      src={LEFT_LEAVES_IMAGE}
      alt='left-leaves'
    />
    <img
      className='pointer-events-none absolute bottom-1/2 right-0 z-10 h-48'
      src={RIGHT_LEAVES_IMAGE}
      alt='right-leaves'
    />
    <div className='relative bg-white bg-texture py-12 px-5 text-zinc-600 shadow'>
      <FadeImageSlider imageArray={SQUARE_IMAGES} />
      <div className='relative mx-auto mt-10 mb-1 h-36 w-36 animate-appear opacity-0'>
        <TitleLogo />
      </div>
      <div className='pt-5 text-center'>
        <h1>{`${GROOM} & ${BRIDE}`}</h1>
        <p className='pt-2 font-italicSerif text-sm'>{`${YEAR}.${MONTH}.${DAY}`}</p>
      </div>
      <img className='mx-auto mt-3 w-20' src={LINE_FLOWER_IMAGE} alt='line-flower' />
      <p className='mt-10 text-center text-sm leading-6'>
        謹啓
        <br />
        <br />
        皆様におかれましては
        <br />
        ますますご清祥のこととお慶び申し上げます
        <br />
        <br />
        このたび 私たちは結婚をすることになりました
        <br />
        つきましては 日頃お世話になっております皆様に
        <br />
        感謝を込めて ささやかな小宴を催したく存じます
        <br />
        <br />
        ご多用中 誠に恐縮ではございますが
        <br />
        ぜひご出席をいただきたく ご案内申し上げます
        <br />
        <br />
        謹白
      </p>
    </div>
  </div>
)

export default InvitationCard
