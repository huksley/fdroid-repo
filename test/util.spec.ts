import { urlToBucketName, urlToKeyName } from '../src/util'
import * as assert from 'assert'

describe('util.ts', () => {
  it('can parse s3Url', () => {
    assert.deepEqual(urlToBucketName('s3://bucket/key'), 'bucket')
    assert.deepEqual(urlToKeyName('s3://bucket/key'), 'key')
    assert.deepEqual(
      urlToBucketName('https://s3-eu-west-1.amazonaws.com/rrtest3/path/rgai201804091131121.jpeg'),
      'rrtest3',
    )
    assert.deepEqual(
      urlToKeyName('https://s3-eu-west-1.amazonaws.com/rrtest3/path/rgai201804091131121.jpeg'),
      'path/rgai201804091131121.jpeg',
    )
  })
})
