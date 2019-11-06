import { apiResponse, findPayload } from './util'
import { Context as LambdaContext, APIGatewayEvent, Callback as LambdaCallback } from 'aws-lambda'
import { logger } from './logger'
import { config } from './config'

import fetch from 'node-fetch'

export type ReleaseAsset = {
  url: string
  id: number
  name: string
  content_type: string
  size: number
}

export type Release = {
  url: string
  id: number
  tag_name: string
  name: string
  body: string
  assets: ReleaseAsset[]
}

export const readReleases = () => {
  return fetch(
    `https://api.github.com/repos/${config.REPO_OWNER}/${config.REPO_PROJECT}/releases`,
    {
      method: 'get',
      headers: {
        userAgent: 'huksley',
      },
    },
  )
    .then(response => response.json())
    .then(releases => {
      logger.info('Releases: ', releases)
      return releases as Release[]
    })
}

/** Invoked on API Gateway event */
export const httpHandler = (
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
