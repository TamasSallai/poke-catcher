import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, JwtModule],
  exports: [AuthGuard],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
