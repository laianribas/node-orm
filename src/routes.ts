import { Router, Request, Response } from 'express'

import { CreateUserController } from './controllers/CreateUserController';
import { DeleteUserController } from './controllers/DeleteUserController';
import { GetAllUserController } from './controllers/GetAllUserController';
import { UpdateUserController } from './controllers/UpdateUserCotroller';

const router = Router();
const createUserController = new CreateUserController()
const getAllUserController = new GetAllUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

router.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Bem-vindo a API' })
})

router.post('/users', createUserController.handle)
router.get('/users', getAllUserController.handle)
router.patch('/user', updateUserController.handle)
router.delete('/user/:id', deleteUserController.handle)

export { router }