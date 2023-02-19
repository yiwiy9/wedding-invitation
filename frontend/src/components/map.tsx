import type { FC } from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, WEDDING_HALL_LAT, WEDDING_HALL_LNG } from '../config'

const position = {
  lat: WEDDING_HALL_LAT,
  lng: WEDDING_HALL_LNG,
}

const Map: FC = () => (
  <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
    <GoogleMap
      mapContainerClassName='w-full before:block before:pt-[100%]'
      center={position}
      zoom={15}
    >
      <MarkerF position={position} />
    </GoogleMap>
  </LoadScript>
)

export default Map
