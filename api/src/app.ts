import express, { json } from 'express'
import { router } from './routes/postsRoute'

const app = express()

app.use(json())
app.use('/api', router)

export { app }
