import type { APIGatewayProxyResultV2 } from 'aws-lambda'
import type { operations } from '../../generated/schema'

// https://github.com/type-challenges/type-challenges/issues/20129
type UnionToIntersection<U> = (U extends unknown ? (arg: U) => unknown : never) extends (
  arg: infer R,
) => unknown
  ? R
  : never

export type StatusCode = keyof UnionToIntersection<operations[keyof operations]['responses']>

export type FilteredOPs<Code extends StatusCode> = {
  [OP in keyof operations as operations[OP]['responses'] extends { [K in Code]: unknown }
    ? OP
    : never]: operations[OP]
}

export const responseGenerator =
  <OP extends keyof operations>() =>
  <Code extends keyof operations[OP]['responses']>(
    statusCode: Code & number,
    body: operations[OP]['responses'][Code] extends {
      content: {
        'application/json': infer R
      }
    }
      ? R
      : never,
  ): APIGatewayProxyResultV2 => ({
    statusCode,
    body: JSON.stringify(body),
  })
