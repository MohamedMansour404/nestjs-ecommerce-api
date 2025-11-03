import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/hash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async getAll(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const maxLimit = 1000;
    const sortField = query.sortField || 'name';
    const sortOrder = query.sortOrder === 'desc' ? 'DESC' : 'ASC';

    const filters: any = {};
    if (query.name) filters.name = Like(`%${query.name}%`);
    if (query.email) filters.email = Like(`%${query.email}%`);
    if (query.role) filters.role = query.role;

    let users: User[] = [];
    let total = 0;
    let totalPages = 1;

    if (!limit || limit > maxLimit) {
      users = await this.userRepository.find({
        where: filters,
        order: { [sortField]: sortOrder },
      });
      total = users.length;
    } else {
      const skip = (page - 1) * limit;
      [users, total] = await this.userRepository.findAndCount({
        where: filters,
        order: { [sortField]: sortOrder },
        skip,
        take: limit,
      });
      totalPages = Math.ceil(total / limit);
    }
    return {
      data: users,
      total,
      page,
      limit: !limit || limit > maxLimit ? total : limit,
      totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found!`);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(id: number, updateUserDto: Partial<CreateUserDto>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found!`);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (emailExists) {
        throw new ConflictException(
          'Another user with this email already exists',
        );
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found!`);

    await this.userRepository.remove(user);
    return { message: `User with ID ${id} deleted successfully` };
  }
}
