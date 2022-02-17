import { getConnection } from 'typeorm'
import createConnection from '../database'
import { CreateUserService } from './CreateUserService'
import crypto from 'crypto'

describe('CreateUserService', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE FROM users')
    await connection.close()
  })

  it('Deve retornar o ID do usuário criado', async () => {
    const createUserService = new CreateUserService()
    const id = crypto.randomUUID()
    const result = await createUserService.execute(
      {
        id: id,
        name: 'Algum nome',
        email: 'algum@gmail.com'
      }
    )

    expect(result).toHaveProperty('id')
    // console.log(result)
  })
})