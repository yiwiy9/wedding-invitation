import type { components } from '../../generated/schema'
import validateEmail from './valueObjects/email'

export type SampleEmail = string & { readonly brand: unique symbol }
export const validateSampleEmail = validateEmail<SampleEmail>()

export type Sample = Omit<components['schemas']['Sample'], 'sampleEmail'> & {
  sampleEmail: SampleEmail
}
