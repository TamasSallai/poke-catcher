import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, JwtModule, PrismaModule],
  controllers: [PokemonController],
  providers: [PokemonService, AuthService, AuthGuard],
})
export class PokemonModule {}
