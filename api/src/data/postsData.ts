import { database } from '../infra/database'

export const getPosts = () => {
  return database.query('select * from blog.post')
}
