import { Request, Response, Router } from 'express'
import { getPosts, savePost } from '../service/postsService'
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

  return response.status(200).json(posts)
})

export { router }
