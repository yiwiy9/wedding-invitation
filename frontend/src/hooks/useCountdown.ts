import { useEffect, useState, useMemo } from 'react'

const getReturnValues = (unixTime: number) => {
  const days = Math.floor(unixTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor((unixTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((unixTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((unixTime % (1000 * 60)) / 1000)

  return [days, hours, minutes, seconds] as const
}

const useCountdown = (targetDate: Date) => {
  const targetTime = useMemo(() => targetDate.getTime(), [targetDate])

  const [leftTime, setLeftTime] = useState(targetTime - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftTime(targetTime - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [targetTime])

  return getReturnValues(leftTime)
}

export default useCountdown
