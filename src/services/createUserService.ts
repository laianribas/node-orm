interface IUser {
  name: String,
  email: String
}

class CreateUserService {
  execute({ name, email }: IUser) {
    const data = [];

    data.push({ name, email });

    return data;
  }
}

export { CreateUserService }
