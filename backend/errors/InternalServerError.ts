import type { components } from '../../generated/schema'
import type { FilteredOPs } from '../utils/openapi'
import CustomError from './customError'

type DefaultErrorBody = components['schemas']['InternalServerError']

type ErrorCode = 500
type AllowedOP = keyof FilteredOPs<ErrorCode>
type ErrorBody = FilteredOPs<ErrorCode>[AllowedOP] extends {
  responses: {
    500: {
      content: {
        'application/json': infer R
      }
    }
  }
}
  ? R
  : never

export default class InternalServerError<
  Body extends ErrorBody = DefaultErrorBody,
> extends CustomError<ErrorCode, AllowedOP> {
  constructor(readonly body: Body) {
    super(500, body)
  }
}
