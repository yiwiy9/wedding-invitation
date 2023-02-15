import type { FC } from 'react'
import useCountdown from '../hooks/useCountdown'
import { YEAR, MONTH, DAY, WEDDING_CEREMONY_HOUR, WEDDING_CEREMONY_MINUTE } from '../config'

type CellProps = {
  num: number
  label: string
}

const CountdownCell: FC<CellProps> = ({ num, label }) => (
  <div className='flex flex-col items-center justify-center gap-2'>
    <span className='font-serif text-5xl'>{num}</span>
    <span className='text-xl'>{label}</span>
  </div>
)

const Countdown: FC = () => {
  const [days, hours, minutes, seconds] = useCountdown(
    new Date(
      Number(YEAR),
      Number(MONTH) - 1,
      Number(DAY),
      Number(WEDDING_CEREMONY_HOUR),
      Number(WEDDING_CEREMONY_MINUTE),
    ),
  )

  return (
    <div className='flex w-full bg-countdown bg-contain p-10 before:block before:pt-[100%]'>
      <div className='flex w-full bg-white p-2 opacity-90 before:block before:pt-[100%]'>
        <div className='relative grid w-full grid-cols-2 gap-3 border-2 border-amber-700 px-6 pb-2 pt-12 font-italicSerif text-neutral-500'>
          <div className='absolute top-2 left-1/2 -translate-x-1/2 text-3xl'>Countdown</div>
          <CountdownCell num={days} label='Days' />
          <CountdownCell num={hours} label='Hours' />
          <CountdownCell num={minutes} label='Minutes' />
          <CountdownCell num={seconds} label='Seconds' />
        </div>
      </div>
    </div>
  )
}

export default Countdown
