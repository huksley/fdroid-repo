import { logger } from '../src/logger'
import { readReleases } from '../src/handler'

describe('handler.ts', () => {
  it('can read releases', async () => {
    logger.info('Works!', await readReleases())
  })
})
