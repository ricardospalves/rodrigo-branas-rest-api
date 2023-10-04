import { randomUUID } from 'node:crypto'

type PostArguments = {
  title: string
  content: string
}

export class PostEntity {
  title: string
  content: string

  constructor({ title, content }: PostArguments) {
    this.title = title
    this.content = content
  }

  get id() {
    return randomUUID()
  }

  get createdAt() {
    const date = new Date()

    return date.toISOString()
  }
}
