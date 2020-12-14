import User from '../models/User';
import CreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string):Promise<User | undefined>;
}
