import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid user or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid user or password');
    }

    const { accessToken, refreshToken } = await this.createAuthToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async register(data: RegisterDto) {
    // The user service responsible for checking conflicts and hashing the password
    const user = await this.usersService.create(data);

    const { accessToken, refreshToken } = await this.createAuthToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async createAuthToken(user: User) {
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        user,
      },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('ACCESS_TOKEN_TTL'),
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('REFRESH_TOKEN_TTL'),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
