import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import cookie from './config/cookie';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [cookie], isGlobal: true }),
    AuthModule,
    UsersModule,
    PokemonModule,
  ],
})
export class AppModule {}
