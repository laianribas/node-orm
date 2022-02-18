import { CreateUserService } from '../../src/services/CreateUserService'
import crypto from 'crypto'
class FakeData {
  createUserService = new CreateUserService()
  async execute() {
    await this.createUserService.execute({
      id: crypto.randomUUID(),
      name: 'Some Name',
      email: 'some@example.com'
    })
    await this.createUserService.execute({
      id: crypto.randomUUID(),
      name: 'Some Name2',
      email: ''
    })
  }

  async createUser() {
    const user = await this.createUserService.execute({
      id: crypto.randomUUID(),
      name: 'Some Name',
      email: 'some@example.com'
    })
    return user
  }
}

export { FakeData }