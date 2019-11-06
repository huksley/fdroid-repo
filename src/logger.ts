// tslint:disable:no-winston-import Specifically allow only here
import * as winston from 'winston'
import { config } from './config'

winston.configure({
  level: config.LOG_LEVEL,
  transports: [new winston.transports.Console({})],
})

export const logger = winston
