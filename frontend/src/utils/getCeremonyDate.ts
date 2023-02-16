import { YEAR, MONTH, DAY, WEDDING_CEREMONY_HOUR, WEDDING_CEREMONY_MINUTE } from '../config'

const getCeremonyDate = () =>
  new Date(
    Number(YEAR),
    Number(MONTH) - 1,
    Number(DAY),
    Number(WEDDING_CEREMONY_HOUR),
    Number(WEDDING_CEREMONY_MINUTE),
  )

export default getCeremonyDate
