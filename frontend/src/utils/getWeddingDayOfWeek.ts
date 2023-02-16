import getCeremonyDate from './getCeremonyDate'

const dayOfWeekArray = ['日', '月', '火', '水', '木', '金', '土'] as const

const getWeddingDayOfWeek = () => dayOfWeekArray[getCeremonyDate().getDay()]

export default getWeddingDayOfWeek
