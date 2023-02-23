import type { FC } from 'react'
import { Autoplay, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'

type Props = {
  imageArray: string[]
}

const FadeImageSlider: FC<Props> = ({ imageArray }) => (
  <Swiper
    modules={[Autoplay, EffectFade]}
    loop
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    effect='fade'
    speed={1000}
    allowTouchMove={false}
  >
    {imageArray.map((image, index) => (
      <SwiperSlide key={image}>
        {({ isActive, isPrev }) => (
          <img
            className={`${isActive || isPrev ? 'animate-zoomUp' : ''} w-full`}
            src={image}
            alt={`fade-img-${index}`}
          />
        )}
      </SwiperSlide>
    ))}
  </Swiper>
)

export default FadeImageSlider
