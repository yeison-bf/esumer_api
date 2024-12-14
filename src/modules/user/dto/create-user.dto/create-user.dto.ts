import { IsString, IsEmail, IsOptional, IsInt, IsArray, Length, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  document: string; // Número de documento

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string; // Contraseña del usuario

  @IsString()
  @IsNotEmpty()
  role: string; // Relación con el rol del usuario


  @IsString()
  @IsNotEmpty()
  program: string; // Relación con el rol del usuario
}
