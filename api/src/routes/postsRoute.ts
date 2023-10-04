import { Request, Response, Router } from 'express'
import { getPosts } from '../service/postsService'

const router = Router()

router.get('/posts', async (request: Request, response: Response) => {
  const posts = await getPosts()

  return response.status(200).json(posts)
})

export { router }
