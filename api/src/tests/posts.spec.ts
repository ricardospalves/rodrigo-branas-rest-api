import test from 'node:test'
import assert from 'node:assert'
import { randomBytes } from 'node:crypto'
import axios from 'axios'
import { deletePost, savePost, getPost } from '../service/postsService'
import { PostEntity } from '../entities/Post'

const generate = () => {
  return randomBytes(20).toString('hex')
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
})

test('API Test Suite', async (testContext) => {
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

  await testContext.test('should save a post', async () => {
    const data: Omit<PostEntity, 'id' | 'createdAt'> = {
      content: generate(),
      title: generate(),
    }
    const response = await api.post('/posts', data)
    const post = response.data

    assert.strictEqual(post.title, data.title)
    assert.strictEqual(post.content, data.content)

    await deletePost(post.id)
  })

  await testContext.test('should update a post', async () => {
    const post = await savePost({
      content: generate(),
      title: generate(),
    })

    post.title = generate()
    post.content = generate()

    await api.put(`/posts/${post.id}`, post)

    const updatedPost = await getPost(post.id)

    assert.strictEqual(updatedPost?.title, post.title)
    assert.strictEqual(updatedPost?.content, post.content)

    await deletePost(post.id)
  })
})
