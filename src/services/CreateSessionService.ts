import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { classToClass } from 'class-transformer';
import authConfig from '../config/authConfig';

import User from '../models/User';
import IUserRepository from '../repositories/IUsersRepository';

interface FieldError {
  field: string;
  message: string;
}

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user?: User;
  token?: string;
  errors?: FieldError[];
}

class CreateSessionService {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return {
        errors: [{
          field: 'email/password',
          message: 'Email ou senha inválidos.'
        }]
      }
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      return {
        errors: [{
          field: 'email/password',
          message: 'Email ou senha inválidos.'
        }]
      }
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: classToClass(user),
      token,
    };
  }
}

export default CreateSessionService;
