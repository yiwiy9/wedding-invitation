import type { FC } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'

type Props = {
  imageArray: string[]
}

const ImageSlider: FC<Props> = ({ imageArray }) => (
  <Swiper
    modules={[Autoplay]}
    loop
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    speed={1000}
    allowTouchMove={false}
  >
    {imageArray.map((image, index) => (
      <SwiperSlide key={image}>
        <img src={image} alt={`img-${index}`} />
      </SwiperSlide>
    ))}
  </Swiper>
)

export default ImageSlider
