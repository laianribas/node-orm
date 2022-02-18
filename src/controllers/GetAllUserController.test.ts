import createConnection from '../database'
import { getConnection } from 'typeorm';
import { GetAllUserController } from "./GetAllUserController";
import { FakeData } from '../../utils/fakeData/FakeData'
import { makeMockRequest } from '../../utils/mocks/mockRequest'
import { makeMockResponse } from '../../utils/mocks/mokeResponse'

describe('GetAllUserController', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE FROM users')
    await connection.close()
  })

  const fakeData = new FakeData();

  it('Deve retornar status 200 quando pegar todos usuários', async () => {
    await fakeData.execute()

    const getAllUserController = new GetAllUserController();

    const request = makeMockRequest({})
    const response = makeMockResponse()

    await getAllUserController.handle(request, response)

    expect(response.state.status).toBe(200)
  })
})