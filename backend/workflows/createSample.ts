import type { Err } from 'neverthrow'
import { Result, ok, err } from 'neverthrow'
import type { components } from '../../generated/schema'
import ValidationError from '../errors/ValidationError'
import type { Sample } from '../objects/sample'
import { validateSampleEmail } from '../objects/sample'

type CreateSampleInput = components['schemas']['CreateSampleInput']
type CreateSampleValidationError = components['schemas']['CreateSampleValidationError']

type ValidateSample = (
  model: CreateSampleInput,
) => Result<Sample, ValidationError<CreateSampleValidationError>>

const validateSample: ValidateSample = (model) => {
  const sampleEmailResult = validateSampleEmail(model.sampleEmail).orElse<
    Err<never, CreateSampleValidationError[number]>
  >((e) => err({ name: 'sampleEmail', reason: e.message }))

  const values = Result.combineWithAllErrors([sampleEmailResult])

  return values
    .map(([sampleEmail]) => ({ ...model, sampleEmail }))
    .mapErr((errArray) => new ValidationError(errArray))
}

type Workflow = (
  model: CreateSampleInput,
) => Result<Sample, ValidationError<CreateSampleValidationError>>

export const createSampleWorkflow = (): Workflow => (model) => ok(model).andThen(validateSample)
