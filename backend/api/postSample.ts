import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import type { Result } from 'neverthrow'
import { ok, err } from 'neverthrow'
import { responseGenerator } from '../utils/openapi'
import { initSpreadsheetDoc } from '../utils/spreadsheet'
import type { PostSampleInput } from '../../generated/input'
import { isPostSampleInput } from '../../generated/input.guard'
import BadRequestError from '../errors/BadRequestError'
import { createSampleWorkflow } from '../workflows/createSample'
import { saveSample } from '../repos/sampleRepository'

const responseFn = responseGenerator<'postSample'>()
const workflow = createSampleWorkflow()

type ValidateInput = (input: unknown) => Result<PostSampleInput, BadRequestError>
const validateInput: ValidateInput = (input) =>
  isPostSampleInput(input) ? ok(input) : err(new BadRequestError({ message: '不正な入力です。' }))

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`)
  console.log(`Context: ${JSON.stringify(context, null, 2)}`)

  const docResult = await initSpreadsheetDoc()
  if (docResult.isErr()) {
    return responseFn(docResult.error.statusCode, docResult.error.body)
  }

  const requestBody = event?.body ? (JSON.parse(event?.body) as unknown) : {}

  const result = ok(requestBody)
    .andThen(validateInput)
    .andThen(workflow)
    .asyncAndThen(saveSample(docResult.value))

  return result.match(
    (sample) => responseFn(201, sample),
    (error) => responseFn(error.statusCode, error.body),
  )
}
