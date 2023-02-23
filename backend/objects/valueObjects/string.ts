import type { Result } from 'neverthrow'
import { ok, err } from 'neverthrow'

const MAX_LENGTH = 150

const validateString =
  <T extends string>(maxLength: number = MAX_LENGTH) =>
  (str: string): Result<T, Error> =>
    str.length <= maxLength
      ? ok(str as T)
      : err(new Error(`${maxLength}文字以内で入力してください。`))

export default validateString
