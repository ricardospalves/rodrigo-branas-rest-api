import * as postsData from '../data/postsData'
import { PostEntity } from '../entities/Post'

export const getPosts = (): Promise<PostEntity[]> => {
  return postsData.getPosts()
}

export const getPost = async (id: string) => {
  const post = await postsData.getPost(id)

  if (!post) {
    throw new Error('Post not found.')
  }

  return postsData.getPost(id)
}

export const savePost = async ({
  content,
  title,
}: Omit<PostEntity, 'id' | 'createdAt'>) => {
  const post = new PostEntity({
    content,
    title,
  })
  const existingPost = await postsData.getPostByTitle(post.title)

  if (existingPost) {
    throw new Error('Post already exists.')
  }

  return postsData.savePost(post)
}

export const updatePost = async (
  id: string,
  { content, title }: Omit<PostEntity, 'id' | 'createdAt'>,
) => {
  await getPost(id)

  return postsData.updatePost(id, {
    content,
    title,
  })
}

export const deletePost = (id: string) => {
  return postsData.deletePost(id)
}
