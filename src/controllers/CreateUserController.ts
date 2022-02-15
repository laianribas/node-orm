import { Request, Response } from 'express';

class CreateUserController {
  handle(request: Request, response: Response) {
    const name = request.body.name
    return response.json({ message: `Create user ${name}` })
  }
}

export { CreateUserController }