import { Result, ok } from 'neverthrow'
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
  const sampleEmail = validateSampleEmail(model.sampleEmail)

  const values = Result.combineWithAllErrors([sampleEmail])

  return values
    .map(([validatedEmail]) => ({ ...model, sampleEmail: validatedEmail }))
    .mapErr(
      ([sampleEmailErr]) =>
        new ValidationError([{ name: 'sampleEmail', reason: sampleEmailErr.message }]),
    )
}

type Workflow = (
  model: CreateSampleInput,
) => Result<Sample, ValidationError<CreateSampleValidationError>>

export const createSampleWorkflow = (): Workflow => (model) => ok(model).andThen(validateSample)
