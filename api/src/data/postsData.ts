import { PostEntity } from '../entities/Post'
import { database } from '../infra/database'

export const getPosts = (): Promise<PostEntity[]> => {
  return database.query('select * from blog.post')
}

export const getPost = (id: string): Promise<PostEntity | null> => {
  return database.oneOrNone('select * from blog.post where id = $1', [id])
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

export const updatePost = (
  id: string,
  { content, title }: Omit<PostEntity, 'id' | 'createdAt'>,
) => {
  return database.none(
    'update blog.post set title = $1, content = $2 where id = $3',
    [title, content, id],
  )
}

export const deletePost = (id: string): Promise<null> => {
  return database.none('delete from blog.post where id=$1', [id])
}
