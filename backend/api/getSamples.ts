import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'

export const handler: APIGatewayProxyHandlerV2 = async (
  event,
  context,
  // eslint-disable-next-line @typescript-eslint/require-await
) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`)
  console.log(`Context: ${JSON.stringify(context, null, 2)}`)
  // throw new Error('Some exception');
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
    }),
  }
}
