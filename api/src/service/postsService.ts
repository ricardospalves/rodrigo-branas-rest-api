import * as postsData from '../data/postsData'
import { PostEntity } from '../entities/Post'

export const getPosts = (): Promise<PostEntity[]> => {
  return postsData.getPosts()
}

export const savePost = (post: PostEntity) => {
  return postsData.savePost(post)
}

export const deletePost = (id: string) => {
  return postsData.deletePost(id)
}
