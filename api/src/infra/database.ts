import pgPromise from 'pg-promise'

export const database = pgPromise()({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'blog',
})
