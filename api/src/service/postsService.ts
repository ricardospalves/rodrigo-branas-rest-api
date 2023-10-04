import * as postsData from '../data/postsData'
import { PostEntity } from '../entities/Post'

export const getPosts = (): Promise<PostEntity[]> => {
  return postsData.getPosts()
}

export const getPost = (id: string) => {
  return postsData.getPost(id)
}

export const savePost = ({
  content,
  title,
}: Omit<PostEntity, 'id' | 'createdAt'>) => {
  const post = new PostEntity({
    content,
    title,
  })

  return postsData.savePost(post)
}

export const updatePost = (
  id: string,
  { content, title }: Omit<PostEntity, 'id' | 'createdAt'>,
) => {
  return postsData.updatePost(id, {
    content,
    title,
  })
}

export const deletePost = (id: string) => {
  return postsData.deletePost(id)
}
