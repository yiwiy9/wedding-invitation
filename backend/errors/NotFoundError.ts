import type { components } from '../../generated/schema'
import type { FilteredOPs } from '../utils/openapi'
import CustomError from './customError'

type DefaultErrorBody = components['schemas']['NotFound']

type ErrorCode = 404
type AllowedOP = keyof FilteredOPs<ErrorCode>
type ErrorBody = FilteredOPs<ErrorCode>[AllowedOP] extends {
  responses: {
    404: {
      content: {
        'application/json': infer R
      }
    }
  }
}
  ? R
  : never

export default class NotFoundError<Body extends ErrorBody = DefaultErrorBody> extends CustomError<
  ErrorCode,
  AllowedOP
> {
  constructor(readonly body: Body) {
    super(404, body)
  }
}
