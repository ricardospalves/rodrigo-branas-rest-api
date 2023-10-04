import * as postsData from '../data/postsData'
import { PostEntity } from '../entities/Post'

export const getPosts = (): Promise<PostEntity[]> => {
  return postsData.getPosts()
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

export const deletePost = (id: string) => {
  return postsData.deletePost(id)
}
