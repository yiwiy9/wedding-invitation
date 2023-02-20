import type { FC } from 'react'
import { useJsApiLoader, GoogleMap, MarkerF } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, WEDDING_HALL_LAT, WEDDING_HALL_LNG } from '../config'

const position = {
  lat: WEDDING_HALL_LAT,
  lng: WEDDING_HALL_LNG,
}

const Map: FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName='w-full before:block before:pt-[100%]'
      center={position}
      zoom={15}
    >
      <MarkerF position={position} />
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  )
}

export default Map
