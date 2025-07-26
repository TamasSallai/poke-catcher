import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AccessTokenPayload, RefreshTokenPayload } from './types';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private cookieConfig: any;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {
    this.cookieConfig = this.configService.get('COOKIE_CONFIG');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Check cookie for tokens
    const { id: accessToken, rid: refreshToken } = request.cookies;

    if (!accessToken) {
      throw new UnauthorizedException('Access token missing');
    }

    try {
      const { user } = this.jwtService.verify<AccessTokenPayload>(accessToken, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });

      request.user = user;

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log('Access token expired, attempting to use refresh token');
      }
    }

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    try {
      const { id } = this.jwtService.verify<RefreshTokenPayload>(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });

      const user = await this.usersService.findOneById(id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await this.authService.createAuthToken(user);

      request.user = user;
      response
        .cookie('id', newAccessToken, this.cookieConfig)
        .cookie('rid', newRefreshToken, this.cookieConfig);

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token expired');
      }
      throw new UnauthorizedException(error.message);
    }
  }
}
