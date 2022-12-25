import { Fetcher } from 'openapi-typescript-fetch'
// eslint-disable-next-line import/no-relative-packages
import { paths } from '../../../generated/schema'
import { API_URL } from '../config'

// declare fetcher for paths
const fetcher = Fetcher.for<paths>()

// global configuration
fetcher.configure({
  baseUrl: API_URL,
})

// create fetch operations
export const findTests = fetcher.path('/tests').method('get').create()
export const createTest = fetcher.path('/tests').method('post').create()
export const createUser = fetcher.path('/users').method('post').create()
export const findUserByEmail = fetcher.path('/users/{userEmail}').method('get').create()