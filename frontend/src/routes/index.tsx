import type { FC } from 'react'
import ScrollAnimation from '../components/scroll-animation'
import InvitationCard from '../components/invitation-card'
import Countdown from '../components/countdown'
import ImageSlider from '../components/image-slider'
import EventDetail from '../components/event-detail'

import { HORIZONTAL_IMAGES } from '../config'

const Index: FC = () => (
  <>
    <InvitationCard />
    <div className='pt-16'>
      <ScrollAnimation
        baseClass='transition ease-in-out duration-1000'
        beforeClass='opacity-0 translate-y-24'
        afterClass=''
        triggerOnce
      >
        <Countdown />
      </ScrollAnimation>
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
