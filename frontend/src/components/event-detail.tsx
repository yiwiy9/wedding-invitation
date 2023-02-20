import type { FC } from 'react'
import { Link } from 'react-router-dom'
import ScrollAnimation from './scroll-animation'
import Schedule from './schedule'
import Map from './map'
import {
  WEDDING_HALL_NAME,
  WEDDING_HALL_URL,
  WEDDING_HALL_ADDRESS,
  WEDDING_HALL_TEL,
  DUE_DATE_MONTH,
  DUE_DATE_DAY,
} from '../config'

const EventDetail: FC = () => (
  <div className='px-5'>
    <ScrollAnimation
      baseClass='transition ease-in-out duration-1000'
      beforeClass='opacity-0 translate-y-24'
      afterClass=''
      triggerOnce
    >
      <Schedule />
    </ScrollAnimation>
    <ScrollAnimation
      baseClass='transition ease-in-out duration-1000'
      beforeClass='opacity-0 translate-y-24'
      afterClass=''
      triggerOnce
    >
      <div className='mx-auto -mt-16 rounded bg-white px-3.5 pt-32 pb-16 text-center text-zinc-600 shadow-xl '>
        <div className='text-xl font-semibold'>{WEDDING_HALL_NAME}</div>
        <div className='mt-2.5 text-xs'>
          <a
            className='underline'
            href={WEDDING_HALL_URL}
            target='_blank'
            rel='noopener noreferrer'
          >
            {WEDDING_HALL_URL}
          </a>
        </div>
        <div className='mt-2.5 text-sm'>{WEDDING_HALL_ADDRESS}</div>
        <div className='mt-2.5 text-sm'>
          TEL：
          <a className='underline' href='tel:0120-12-0908'>
            {WEDDING_HALL_TEL}
          </a>
        </div>
        <div className='mt-8'>
          <Map />
        </div>
        <p className='mt-20 text-center text-sm leading-6'>
          お手数ではございますが
          <br />
          {DUE_DATE_MONTH}月{DUE_DATE_DAY}日 までにご返信くださいますよう
          <br />
          お願い申し上げます
        </p>
        <ScrollAnimation
          baseClass='transition ease-in-out duration-1000'
          beforeClass='opacity-0 scale-125'
          afterClass=''
        >
          <div className='mx-auto mt-10 w-4/5 max-w-xs rounded-full border border-white bg-gradient-to-br from-stone-400 to-stone-300 py-3.5 font-sans text-white shadow-md'>
            <Link to='/entry'>招待状に回答する</Link>
          </div>
        </ScrollAnimation>
      </div>
    </ScrollAnimation>
  </div>
)

export default EventDetail
