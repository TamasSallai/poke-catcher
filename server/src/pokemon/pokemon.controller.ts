import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { CatchDto } from './dto/catch.dto';

@UseGuards(AuthGuard)
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('caught')
  findAllCaught(@Req() req: Request) {
    const user = req.user!;

    return this.pokemonService.findAllCaught(user.id);
  }

  @Post('catch')
  catch(@Body() dto: CatchDto, @Req() req: Request) {
    const user = req.user!;

    return this.pokemonService.catch(user.id, dto.pokeId, dto.name);
  }

  @Delete('release/:pokeId')
  release(@Param('pokeId') pokeId: string, @Req() req: Request) {
    const user = req.user!;

    return this.pokemonService.release(user.id, Number(pokeId));
  }
}
