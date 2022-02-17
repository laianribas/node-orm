import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
const crypto = require('crypto')
class CreateUserController {
  async handle(request: Request, response: Response) {
    const createUserService = new CreateUserService();
    const name = request.body.name
    const email = request.body.email
    const id = crypto.randomUUID()
    if (name.length === 0) {
      return response.status(400).json({ message: 'Nome Obrigatório' })
    }
    const user = await createUserService.execute({ id, name, email })
    return response.status(201).json(user)
  }
}

export { CreateUserController }