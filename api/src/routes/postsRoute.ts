import { Request, Response, Router } from 'express'
import {
  deletePost,
  getPosts,
  savePost,
  updatePost,
} from '../service/postsService'
import { PostEntity } from '../entities/Post'

const router = Router()

router.get('/posts', async (request: Request, response: Response) => {
  const posts = await getPosts()

  return response.status(200).json(posts)
})

router.post('/posts', async (request: Request, response: Response) => {
  const { content, title } = request.body as Omit<
    PostEntity,
    'id' | 'createdAt'
  >

  const posts = await savePost({ content, title })

  return response.status(201).json(posts)
})

router.put('/posts/:id', async (request: Request, response: Response) => {
  const { id } = request.params
  const { content, title } = request.body as Omit<
    PostEntity,
    'id' | 'createdAt'
  >

  await updatePost(id, { content, title })

  return response.status(204).end()
})

router.delete('/posts/:id', async (request: Request, response: Response) => {
  const { id } = request.params

  await deletePost(id)

  return response.status(204).end()
})

export { router }
