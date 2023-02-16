import type { FC } from 'react'
import getWeddingDayOfWeek from '../utils/getWeddingDayOfWeek'
import {
  YEAR,
  MONTH,
  DAY,
  RECEPTION_HOUR,
  RECEPTION_MINUTE,
  WEDDING_CEREMONY_HOUR,
  WEDDING_CEREMONY_MINUTE,
  WEDDING_RECEPTION_HOUR,
  WEDDING_RECEPTION_MINUTE,
} from '../config'

type CellProps = {
  label: string
  time: string
}

const ScheduleCell: FC<CellProps> = ({ label, time }) => (
  <>
    <span className='justify-self-end'>{label}</span>
    <span className='col-span-2'>{time}</span>
  </>
)

const EventDetail: FC = () => (
  <div className='px-5'>
    <div className='relative z-10 mx-auto w-11/12 bg-white bg-texture px-5 pt-12 pb-16 text-center tracking-wide text-neutral-500 shadow-xl before:absolute before:left-5 before:top-5 before:h-2/5 before:w-2/5 before:border-t before:border-l before:border-neutral-500 after:absolute after:right-5 after:bottom-5 after:h-2/5 after:w-2/5 after:border-b after:border-r after:border-neutral-500'>
      <div className='mb-10 font-italicSerif text-4xl'>Event</div>
      <div className='text-lg'>{`${YEAR}年${MONTH}月${DAY}日(${getWeddingDayOfWeek()})`}</div>
      <div className='mx-auto mt-8 grid grid-cols-3 gap-y-3 text-xl'>
        <ScheduleCell label='受付' time={`${RECEPTION_HOUR}時${RECEPTION_MINUTE}分`} />
        <ScheduleCell
          label='挙式'
          time={`${WEDDING_CEREMONY_HOUR}時${WEDDING_CEREMONY_MINUTE}分`}
        />
        <ScheduleCell
          label='披露宴'
          time={`${WEDDING_RECEPTION_HOUR}時${WEDDING_RECEPTION_MINUTE}分`}
        />
      </div>
    </div>
  </div>
)

export default EventDetail
