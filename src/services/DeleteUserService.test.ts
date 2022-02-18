import createConnection from '../database'
import { getConnection } from 'typeorm'
import { FakeData } from '../../utils/fakeData/FakeData'
import { DeleteUserService } from './DeleteUserService'

describe('DeleteUser', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.close()
  })

  const fakeData = new FakeData()
  it('Deve retornar um array vazop ao deletar usuário', async () => {
    const mockUser = await fakeData.createUser();
    const deleteUserService = new DeleteUserService();

    const result = await deleteUserService.execute({ id: mockUser.id })
    expect(result).toHaveLength(0)
  })
})
