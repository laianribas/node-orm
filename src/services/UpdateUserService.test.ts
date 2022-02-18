import createConnection from '../database'
import { getConnection } from 'typeorm'
import { UpdateUserService } from './UpdateUserService'
import { FakeData } from '../../utils/fakeData/FakeData'

describe('UpdateUserService', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()

  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE FROM users')
    await connection.close()
  })

  const fakeData = new FakeData()

  it('Deve alterar um usuário', async () => {

    const mockUser = await fakeData.createUser()
    const updateUserService = new UpdateUserService()

    const result = await updateUserService.execute({
      id: mockUser.id,
      name: 'Outro nome',
      email: 'bau@bau.com'
    });
    expect(result).toHaveLength(0)
  })
})