import splashVideo from '../assets/private/splash.mp4'
import squareImage1 from '../assets/private/square-image-1.jpeg'
import squareImage2 from '../assets/private/square-image-2.jpeg'
import squareImage3 from '../assets/private/square-image-3.jpeg'
import horizontalImage1 from '../assets/private/horizontal-image-1.jpeg'
import horizontalImage2 from '../assets/private/horizontal-image-2.jpeg'
import horizontalImage3 from '../assets/private/horizontal-image-3.jpeg'
import leftLeaves from '../assets/left-leaves.png'
import rightLeaves from '../assets/right-leaves.png'
import lineFlower from '../assets/line-flower.png'

export const SPLASH_VIDEO = splashVideo
export const SQUARE_IMAGES = [squareImage1, squareImage2, squareImage3]
export const HORIZONTAL_IMAGES = [horizontalImage1, horizontalImage2, horizontalImage3]

export const LEFT_LEAVES_IMAGE = leftLeaves
export const RIGHT_LEAVES_IMAGE = rightLeaves
export const LINE_FLOWER_IMAGE = lineFlower

export const API_URL = process.env.REACT_APP_API_URL as string
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string

export const GROOM = process.env.REACT_APP_GROOM as string
export const BRIDE = process.env.REACT_APP_BRIDE as string

export const YEAR = process.env.REACT_APP_YEAR as string
export const MONTH = process.env.REACT_APP_MONTH as string
export const DAY = process.env.REACT_APP_DAY as string

export const RECEPTION_HOUR = process.env.REACT_APP_RECEPTION_HOUR as string
export const RECEPTION_MINUTE = process.env.REACT_APP_RECEPTION_MINUTE as string
export const WEDDING_CEREMONY_HOUR = process.env.REACT_APP_WEDDING_CEREMONY_HOUR as string
export const WEDDING_CEREMONY_MINUTE = process.env.REACT_APP_WEDDING_CEREMONY_MINUTE as string
export const WEDDING_RECEPTION_HOUR = process.env.REACT_APP_WEDDING_RECEPTION_HOUR as string
export const WEDDING_RECEPTION_MINUTE = process.env.REACT_APP_WEDDING_RECEPTION_MINUTE as string

export const SENT_DATE_MONTH = process.env.REACT_APP_SENT_DATE_MONTH as string
export const DUE_DATE_MONTH = process.env.REACT_APP_DUE_DATE_MONTH as string
export const DUE_DATE_DAY = process.env.REACT_APP_DUE_DATE_DAY as string

export const WEDDING_HALL_NAME = process.env.REACT_APP_WEDDING_HALL_NAME as string
export const WEDDING_HALL_URL = process.env.REACT_APP_WEDDING_HALL_URL as string
export const WEDDING_HALL_ADDRESS = process.env.REACT_APP_WEDDING_HALL_ADDRESS as string
export const WEDDING_HALL_TEL = process.env.REACT_APP_WEDDING_HALL_TEL as string
export const WEDDING_HALL_LAT = Number(process.env.REACT_APP_WEDDING_HALL_LAT)
export const WEDDING_HALL_LNG = Number(process.env.REACT_APP_WEDDING_HALL_LNG)
