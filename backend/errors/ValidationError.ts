import type { FilteredOPs } from '../utils/openapi'
import CustomError from './customError'

type ErrorCode = 422
type AllowedOP = keyof FilteredOPs<ErrorCode>
type ErrorBody = FilteredOPs<ErrorCode>[AllowedOP] extends {
  responses: {
    422: {
      content: {
        'application/json': infer R
      }
    }
  }
}
  ? R
  : never

export default class ValidationError<Body extends ErrorBody> extends CustomError<
  ErrorCode,
  AllowedOP
> {
  constructor(readonly body: Body) {
    super(422, body)
  }
}
