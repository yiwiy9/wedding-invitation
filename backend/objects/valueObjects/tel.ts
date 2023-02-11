import type { Result } from 'neverthrow'
import { ok, err } from 'neverthrow'

const validateTel =
  <T extends string>() =>
  (str: string): Result<T, Error> => {
    const expression = /^0\d{9,10}$/i
    return expression.test(str)
      ? ok(str as T)
      : err(new Error('電話番号の形式が正しくありません。'))
  }

export default validateTel
