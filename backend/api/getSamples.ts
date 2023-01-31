import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { responseGenerator } from '../utils/openapi'
import { initSpreadsheetDoc } from '../utils/spreadsheet'
import { findAllSamples } from '../repos/sampleRepository'

const responseFn = responseGenerator<'getSamples'>()

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`)
  console.log(`Context: ${JSON.stringify(context, null, 2)}`)

  const docResult = await initSpreadsheetDoc()
  if (docResult.isErr()) {
    return responseFn(docResult.error.statusCode, docResult.error.body)
  }

  const result = findAllSamples(docResult.value)()

  return result.match(
    (sample) => responseFn(200, sample),
    (error) => responseFn(error.statusCode, error.body),
  )
}
