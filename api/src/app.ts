import express, { NextFunction, Request, Response, json } from 'express'
import { router } from './routes/postsRoute'

const app = express()

app.use(json())
app.use('/api', router)
app.use(
  (
    exception: unknown,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    const error = exception as Error

    if (error?.message === 'Post already exists.') {
      return response.status(409).json({
        message: error?.message,
      })
    }

    if (error?.message === 'Post not found.') {
      return response.status(404).json({
        message: error?.message,
      })
    }

    return response.status(500).json({
      message: 'An unknown error occurred.',
    })
  },
)

export { app }
