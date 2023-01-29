import type { StatusCode, FilteredOPs } from '../utils/openapi'

export default class CustomError<
  Code extends Exclude<StatusCode, 200 | 201>,
  OP extends keyof FilteredOPs<Code>,
> extends Error {
  constructor(
    readonly statusCode: Code,
    readonly body: FilteredOPs<Code>[OP] extends {
      responses: {
        [K in Code]: {
          content: {
            'application/json': infer R
          }
        }
      }
    }
      ? R
      : never,
  ) {
    super(JSON.stringify(body))
    this.name = this.constructor.name
    console.error(`${this.name}: ${JSON.stringify(body, null, 2)}`)
  }
}
