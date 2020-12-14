import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import User from '../models/User';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

@InputType()
class RegisterRequest {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class Response {
  @Field(() => String, { nullable: true })
  token?: string

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export class UserResolver {

  @Mutation(() => Response)
  async register(
    @Arg('options') options: RegisterRequest,
  ): Promise<Response> {
    const { name, email, password } = options;

    const userRepository = new UsersRepository();

    const createUser = new CreateUserService(userRepository);

    const { user, errors } = await createUser.execute({
      name,
      email,
      password,
    });

    return {
      user,
      errors,
    };
  }
}
