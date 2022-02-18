import { Request, Response } from "express";
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const deleteUserService = new DeleteUserService();
    if (id === undefined || id.length === 0) {
      return response.status(400).json({ message: "Informe o ID na rota" })
    }

    await deleteUserService.execute({ id })

    return response.status(204).json()
  }
}

export { DeleteUserController }