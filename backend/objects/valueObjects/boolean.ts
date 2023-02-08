import type { Result } from 'neverthrow'
import { ok, err } from 'neverthrow'

const TRUE = 'true'
const FALSE = 'false'

const validateBoolean =
  <T extends boolean>() =>
  (str: string): Result<T, Error> =>
    str === TRUE || str === FALSE
      ? ok((str === TRUE) as T)
      : err(new Error(`${TRUE}もしくは${FALSE}を入力してください。`))

export default validateBoolean
