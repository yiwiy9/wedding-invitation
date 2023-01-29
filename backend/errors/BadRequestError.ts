import type { components } from '../../generated/schema'
import type { FilteredOPs } from '../utils/openapi'
import CustomError from './customError'

type DefaultErrorBody = components['schemas']['BadRequest']

type ErrorCode = 400
type AllowedOP = keyof FilteredOPs<ErrorCode>
type ErrorBody = FilteredOPs<ErrorCode>[AllowedOP] extends {
  responses: {
    400: {
      content: {
        'application/json': infer R
      }
    }
  }
}
  ? R
  : never

export default class BadRequestError<Body extends ErrorBody = DefaultErrorBody> extends CustomError<
  ErrorCode,
  AllowedOP
> {
  constructor(readonly body: Body) {
    super(400, body)
  }
}
