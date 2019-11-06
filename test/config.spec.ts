import { config } from '../src/config'
import * as assert from 'assert'
import { logger as log } from '../src/logger'

describe('config.ts', () => {
  it('sensible defaults', () => {
    assert.ok(config.AWS_REGION)
    log.info('config', config)
  })
})
