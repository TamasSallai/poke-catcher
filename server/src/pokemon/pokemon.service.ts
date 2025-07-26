import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private prismaService: PrismaService) {}

  async findAllCaught(userId: string) {
    const pokemons = await this.prismaService.pokemon.findMany({
      where: { ownerId: userId },
    });

    return pokemons;
  }

  async catch(userId: string, pokeId: number, name: string) {
    const pokemonExists = await this.prismaService.pokemon.findFirst({
      where: {
        pokeId,
        ownerId: userId,
      },
    });

    if (pokemonExists) {
      throw new ConflictException('You already have this pokemon');
    }

    return this.prismaService.pokemon.create({
      data: {
        ownerId: userId,
        pokeId,
        name,
      },
    });
  }

  async release(userId: string, pokeId: number) {
    const pokemon = await this.prismaService.pokemon.findFirst({
      where: {
        ownerId: userId,
        pokeId,
      },
    });

    if (!pokemon) {
      throw new NotFoundException('You do not have this pokemon');
    }

    await this.prismaService.pokemon.delete({
      where: {
        id: pokemon.id,
        ownerId: userId,
      },
    });

    return {
      success: true,
      message: 'Pokemon released',
    };
  }
}
