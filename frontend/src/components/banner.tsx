import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BANNER_IMAGE, BANNER_URL, NO_AD_PARAM } from '../config'

const Banner: FC = () => {
  const [isDisplayed, setIsDisplayed] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDisplayed(true)
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()
  if (searchParams.has(NO_AD_PARAM)) return null

  return (
    <div
      className={`${
        isDisplayed ? '' : '-translate-y-24'
      } fixed top-0 left-1/2 z-20 w-full max-w-xl -translate-x-1/2 transition-transform duration-1000 ease-in-out`}
    >
      <div className='pointer-events-none absolute top-px left-px text-cyan-500'>
        <svg
          className='h-4 w-4'
          viewBox='0 0 24 24'
          width='24'
          height='24'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          fill='none'
          shapeRendering='geometricPrecision'
        >
          <path d='M18 6L6 18' />
          <path d='M6 6l12 12' />
        </svg>
      </div>
      <a
        href={BANNER_URL}
        target='_blank'
        rel='noopener noreferrer'
        onClick={() => {
          searchParams.append(NO_AD_PARAM, '1')
          setSearchParams(searchParams)
        }}
      >
        <img src={BANNER_IMAGE} alt='banner-img' />
      </a>
    </div>
  )
}

export default Banner
