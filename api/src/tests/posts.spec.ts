import test from 'node:test'
import assert from 'node:assert'
import { randomBytes } from 'node:crypto'
import axios from 'axios'
import { deletePost, savePost } from '../service/postsService'
import { PostEntity } from '../entities/Post'

const generate = () => {
  return randomBytes(20).toString('hex')
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
})

test('API Test Suit', async (testContext) => {
  await testContext.test('should get posts', async () => {
    const post1 = await savePost(
      new PostEntity({
        content: generate(),
        title: generate(),
      }),
    )
    const post2 = await savePost(
      new PostEntity({
        content: generate(),
        title: generate(),
      }),
    )
    const post3 = await savePost(
      new PostEntity({
        content: generate(),
        title: generate(),
      }),
    )

    const { data } = await api.get('/posts')
    const posts = data

    assert.strictEqual(posts.length, 3)

    await deletePost(post1.id)
    await deletePost(post2.id)
    await deletePost(post3.id)
  })
})
