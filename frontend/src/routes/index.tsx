import type { FC } from 'react'
import InvitationCard from '../components/invitation-card'
import Countdown from '../components/countdown'
import ImageSlider from '../components/image-slider'
import EventDetail from '../components/event-detail'

import { HORIZONTAL_IMAGES } from '../config'

const Index: FC = () => (
  <>
    <InvitationCard />
    <div className='pt-16'>
      <Countdown />
    </div>
    <div className='pt-5'>
      <ImageSlider imageArray={HORIZONTAL_IMAGES} />
    </div>
    <div className='pt-16 pb-32'>
      <EventDetail />
    </div>
  </>
)

export default Index
