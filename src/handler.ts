import { apiResponse, findPayload } from './util'
import { Context as LambdaContext, APIGatewayEvent, Callback as LambdaCallback } from 'aws-lambda'
import { logger } from './logger'

/** Invoked on API Gateway event */
export const getHandler = (
  event: APIGatewayEvent,
  context: LambdaContext,
  callback: LambdaCallback,
) => {
  const payload = findPayload(event)
  try {
    const httpEvent = payload as AWSLambda.APIGatewayEvent
    logger.info(`Got event: ${httpEvent}`)
    apiResponse(event, context, callback).success({})
  } catch (err) {
    logger.warn('Failed to process event', err)
    apiResponse(event, context, callback).failure('Failed to process event: ' + err.message)
  }
}
