import type { Result } from 'neverthrow'
import { ok, err } from 'neverthrow'
import type { components } from '../../generated/schema'

export type SampleEmail = string & { readonly brand: unique symbol }
type ValidateSampleEmail = (str: string) => Result<SampleEmail, Error>
export const validateSampleEmail: ValidateSampleEmail = (str: string) => {
  const expression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
  return expression.test(str)
    ? ok(str as SampleEmail)
    : err(new Error('メールアドレスの形式が正しくありません。'))
}

export type Sample = Omit<components['schemas']['Sample'], 'sampleEmail'> & {
  sampleEmail: SampleEmail
}
