import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import type { Result } from 'neverthrow'
import { ok, err } from 'neverthrow'
import { responseGenerator } from '../utils/openapi'
import { initSpreadsheetDoc } from '../utils/spreadsheet'
import type { PostUserInput } from '../../generated/input'
import { isPostUserInput } from '../../generated/input.guard'
import BadRequestError from '../errors/BadRequestError'
import { createUserWorkflow } from '../workflows/createUser'
// import { saveUser } from '../repos/userRepository'

const responseFn = responseGenerator<'postUser'>()
const workflow = createUserWorkflow()

type ValidateInput = (input: unknown) => Result<PostUserInput, BadRequestError>
const validateInput: ValidateInput = (input) =>
  isPostUserInput(input) ? ok(input) : err(new BadRequestError({ message: '不正な入力です。' }))

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`)
  console.log(`Context: ${JSON.stringify(context, null, 2)}`)

  const docResult = await initSpreadsheetDoc()
  if (docResult.isErr()) {
    return responseFn(docResult.error.statusCode, docResult.error.body)
  }

  const requestBody = event?.body ? (JSON.parse(event?.body) as unknown) : {}

  const result = ok(requestBody).andThen(validateInput).andThen(workflow)
  // .asyncAndThen(saveUser(docResult.value))

  return result.match(
    (users) => responseFn(201, users),
    (error) => responseFn(error.statusCode, error.body),
  )
}
