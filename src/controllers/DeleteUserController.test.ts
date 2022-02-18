import createConnection from '../database'
import { getConnection } from 'typeorm'
import { makeMockResponse } from '../../utils/mocks/mokeResponse'
import { makeMockRequest } from '../../utils/mocks/mockRequest'
import { FakeData } from '../../utils/fakeData/FakeData'
import { DeleteUserController } from './DeleteUserController'

describe('DeleteUserController', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    connection.close()
  })

  const fakeData = new FakeData();
  const deleteUserController = new DeleteUserController();
  const response = makeMockResponse()

  it('Deve retornar status 204 quando o usuário for deletado', async () => {
    const mockUser = await fakeData.createUser()
    const request = makeMockRequest({
      params: {
        id: mockUser.id
      }
    })
    await deleteUserController.handle(request, response)

    expect(response.state.status).toBe(204)
  })

  it('Deve retornar status 400 quando o ID não for passado', async () => {
    const request = makeMockRequest({
      params: {
        id: ''
      }
    })
    await deleteUserController.handle(request, response)
    expect(response.state.status).toBe(400)
  })
})