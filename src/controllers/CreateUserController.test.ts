import { getConnection } from 'typeorm';
import { Request } from 'express';
import { makeMockRequest } from '../../utils/mocks/mockRequest';
import createConnection from '../database'
import { makeMockResponse } from '../../utils/mocks/mokeResponse';
import { CreateUserController } from './CreateUserController';


describe('CreateUserController', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE FROM users')
    await connection.close();
  })

  const createUserController = new CreateUserController();

  const response = makeMockResponse()
  it('Deve retornar status 201 quando o usuário for criado', async () => {
    const request = {
      body: {
        name: 'Algum usuário',
        email: 'AlgumEmail@email.com'
      }
    } as Request;

    await createUserController.handle(request, response)
    expect(response.state.status).toBe(201)
  })

  it('Deve retornar status 400 quando o nome não for informado', async () => {
    const request = {
      body: {
        name: '',
        email: 'AlgumEmail@email.com'
      }
    } as Request;

    await createUserController.handle(request, response)
    expect(response.state.status).toBe(400)
  })

  it('Deve retornar status 201 quando o email não for informado', async () => {
    const request = {
      body: {
        name: 'Algum usuário',
        email: ''
      }
    } as Request;

    await createUserController.handle(request, response)
    expect(response.state.status).toBe(201)
  })
})