import type { Result } from 'neverthrow'
import { ok, err } from 'neverthrow'

const validateEmail =
  <T extends string>() =>
  (str: string): Result<T, Error> => {
    const expression =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    return expression.test(str)
      ? ok(str as T)
      : err(new Error('メールアドレスの形式が正しくありません。'))
  }

export default validateEmail
