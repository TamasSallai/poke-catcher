import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create({ email, displayName, password }: CreateUserDto) {
    const userExists = await this.findOneByEmail(email);

    if (userExists) {
      throw new ConflictException('User with email already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.prismaService.user.create({
      data: {
        email,
        displayName,
        password: passwordHash,
      },
    });

    return user;
  }

  async findOneById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user;
  }
}
