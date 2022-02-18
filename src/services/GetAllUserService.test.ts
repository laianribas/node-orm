import createConnection from "../database"
import { getConnection } from "typeorm"
import { GetAllUserService } from './GetAllUserService'
import { FakeData } from "../../utils/fakeData/FakeData"


describe('GetAllUserService', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = await getConnection()
    await connection.query('DELETE FROM users')
    await connection.close()
  })

  const fakeData = new FakeData()

  it('Deve retornar todos usuários cadastrados', async () => {
    await fakeData.execute()
    const expectedResponse = [
      {
        name: 'Some Name',
        email: 'some@example.com'
      },
      {
        name: 'Some Name2',
        email: ''
      }
    ]

    const getAllUserService = new GetAllUserService

    const result = await getAllUserService.execute();

    expect(result).toMatchObject(expectedResponse)
  })
})