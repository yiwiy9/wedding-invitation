import type { FC } from 'react'
import Schedule from './schedule'
import Map from './map'
import {
  WEDDING_HALL_NAME,
  WEDDING_HALL_URL,
  WEDDING_HALL_ADDRESS,
  WEDDING_HALL_TEL,
} from '../config'

const EventDetail: FC = () => (
  <div className='px-5'>
    <Schedule />
    <div className='mx-auto -mt-16 rounded bg-white px-3.5 pt-32 pb-16 text-center text-zinc-600 shadow-xl '>
      <div className='text-xl font-semibold'>{WEDDING_HALL_NAME}</div>
      <div className='mt-2.5 text-xs'>
        <a className='underline' href={WEDDING_HALL_URL} target='_blank' rel='noopener noreferrer'>
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
    </div>
  </div>
)

export default EventDetail
