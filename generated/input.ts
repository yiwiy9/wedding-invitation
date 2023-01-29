/**
 * 手動作成
 * requestBodies, parametersなどのバリデーションに必要な型
 */

import type { components } from './schema'

export type PostUserInput = components['requestBodies']['PostUser']['content']['application/json']

export type PostSampleInput =
  components['requestBodies']['PostSample']['content']['application/json']
