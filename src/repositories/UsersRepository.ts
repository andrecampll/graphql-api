import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from './IUsersRepository';

@EntityRepository(User)
class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail( email: string ):Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    })

    return user;
  }
}

export default UserRepository;
