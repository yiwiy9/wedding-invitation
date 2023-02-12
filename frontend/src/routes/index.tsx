import type { FC } from 'react'
import ImageSlider from '../components/image-slider'
import { SLIDE_IMAGES } from '../config'

const Index: FC = () => (
  <div className='pt-16'>
    <div className='bg-white py-12 px-5 shadow'>
      <ImageSlider imageArray={SLIDE_IMAGES} />
    </div>
  </div>
)

export default Index
