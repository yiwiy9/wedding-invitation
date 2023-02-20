import type { FC, ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
  children: ReactNode
  baseClass?: string
  beforeClass?: string
  afterClass?: string
  rootMargin?: string
  triggerOnce?: boolean
}

const ScrollAnimation: FC<Props> = ({
  children,
  baseClass = '',
  beforeClass = '',
  afterClass = '',
  rootMargin = '0px',
  triggerOnce = false,
}) => {
  const { ref, inView } = useInView({
    rootMargin,
    triggerOnce,
  })
  return (
    <div ref={ref} className={`${inView ? afterClass : beforeClass} ${baseClass}`}>
      {children}
    </div>
  )
}

export default ScrollAnimation
