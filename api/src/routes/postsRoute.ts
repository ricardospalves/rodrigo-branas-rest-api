import { NextFunction, Request, Response, Router } from 'express'
import {
  deletePost,
  getPosts,
  savePost,
  updatePost,
} from '../service/postsService'
import { PostEntity } from '../entities/Post'

const router = Router()

router.get(
  '/posts',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const posts = await getPosts()

      return response.status(200).json(posts)
    } catch (exception) {
      next(exception)
    }
  },
)

router.post(
  '/posts',
  async (request: Request, response: Response, next: NextFunction) => {
    const { content, title } = request.body as Omit<
      PostEntity,
      'id' | 'createdAt'
    >

    try {
      const posts = await savePost({ content, title })

      return response.status(201).json(posts)
    } catch (exception) {
      return next(exception)
    }
  },
)

router.put(
  '/posts/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params
    const { content, title } = request.body as Omit<
      PostEntity,
      'id' | 'createdAt'
    >

    try {
      await updatePost(id, { content, title })

      return response.status(204).end()
    } catch (exception) {
      return next(exception)
    }
  },
)

router.delete(
  '/posts/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params

      await deletePost(id)

      return response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  },
)

export { router }
