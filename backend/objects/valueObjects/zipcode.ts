import type { Result } from 'neverthrow'
import { ok, err } from 'neverthrow'

const validateZipCode =
  <T extends string>() =>
  (str: string): Result<T, Error> => {
    const expression = /^\d{7}$/i
    return expression.test(str)
      ? ok(str as T)
      : err(new Error('郵便番号の形式が正しくありません。'))
  }

export default validateZipCode
