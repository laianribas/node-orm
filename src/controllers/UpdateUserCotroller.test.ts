import createConnection from '../database'
import { getConnection } from 'typeorm'
import { Request } from 'express'
import { makeMockResponse } from '../../utils/mocks/mokeResponse'
import { UpdateUserController } from './UpdateUserCotroller'
import { FakeData } from '../../utils/fakeData/FakeData'

describe('UpdateUserController', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE FROM users')
    await connection.close()
  })

  const fakeData = new FakeData();
  const updateUserController = new UpdateUserController();
  const response = makeMockResponse()

  it('Deve retornar status 204 quando atualizar um usuário', async () => {
    const mockUser = await fakeData.createUser()
    const request = {
      body: {
        id: mockUser.id,
        name: 'Outro Nome',
        email: 'test@test.com'
      }
    } as Request

    await updateUserController.handle(request, response)

    expect(response.state.status).toBe(204)
  })

  it('Deve retornar status 400 quando não houver id', async () => {
    const request = {
      body: {
        id: '',
        name: 'Outro Nome',
        email: 'test@test.com'
      }
    } as Request

    await updateUserController.handle(request, response)

    expect(response.state.status).toBe(400)
  })

  it('Deve retornar status 400 quando não houver name', async () => {
    const mockUser = await fakeData.createUser()
    const request = {
      body: {
        id: mockUser.id,
        name: '',
        email: 'test@test.com'
      }
    } as Request

    await updateUserController.handle(request, response)
    expect(response.state.status).toBe(400)
  })
})