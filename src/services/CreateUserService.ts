import { hash } from 'bcryptjs';
import User from '../models/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { classToClass } from 'class-transformer';

interface FieldError {
  field: string;
  message: string;
}

interface Request {
  name: string;
  email: string;
  password: string;
}

interface IResponse {
  user?: User;
  errors?: FieldError[];
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: Request): Promise<IResponse> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      return {
        errors: [{ field: 'email', message: 'Email já utilizado.' }],
      }
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      user: classToClass(user),
    };
  }
}

export default CreateUserService;
