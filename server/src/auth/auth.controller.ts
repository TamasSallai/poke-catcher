import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private cookieConfig: any;
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    this.cookieConfig = this.configService.get('COOKIE_CONFIG');
  }

  @Post('/login')
  async login(@Body() LoginDto: LoginDto, @Res() res: Response) {
    const { user, accessToken, refreshToken } =
      await this.authService.login(LoginDto);

    return res
      .status(200)
      .cookie('id', accessToken, this.cookieConfig)
      .cookie('rid', refreshToken, this.cookieConfig)
      .json({ user });
  }

  @Post('/register')
  async register(@Body() RegisterDto: RegisterDto, @Res() res: Response) {
    const { user, accessToken, refreshToken } =
      await this.authService.register(RegisterDto);

    return res
      .status(200)
      .cookie('id', accessToken, this.cookieConfig)
      .cookie('rid', refreshToken, this.cookieConfig)
      .json({ user });
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  profile(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Not Authenticated');
    }

    return res.status(200).json({ user });
  }

  @Get('/logout')
  @UseGuards(AuthGuard)
  logout(@Res() res: Response) {
    return res
      .status(200)
      .clearCookie('id')
      .clearCookie('rid')
      .send('Logged out succesfully');
  }
}
