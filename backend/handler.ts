import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda'

export const hello = async (
  event: APIGatewayEvent,
  context: Context,
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<APIGatewayProxyResult> => {
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
