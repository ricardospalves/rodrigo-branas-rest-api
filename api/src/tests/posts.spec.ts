import test from 'node:test'
import assert from 'node:assert'
import axios from 'axios'

test('API Test Suit', async (testContext) => {
  await testContext.test('should get posts', async () => {
    const { data } = await axios({
      url: 'http://localhost:8080/api/posts',
      method: 'get',
    })
    const posts = data

    assert.strictEqual(posts.length, 2)
  })
})
