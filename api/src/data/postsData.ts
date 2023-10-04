import { PostEntity } from '../entities/Post'
import { database } from '../infra/database'

export const getPosts = (): Promise<PostEntity[]> => {
  return database.query('select * from blog.post')
}

export const savePost = ({
  content,
  createdAt,
  id,
  title,
}: PostEntity): Promise<PostEntity> => {
  return database.one(
    'insert into blog.post (id, title, content, createdAt) values ($1, $2, $3, $4) returning *',
    [id, title, content, createdAt],
  )
}

export const deletePost = (id: string): Promise<null> => {
  return database.none('delete from blog.post where id=$1', [id])
}
