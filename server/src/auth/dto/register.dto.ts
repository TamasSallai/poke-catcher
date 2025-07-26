import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
