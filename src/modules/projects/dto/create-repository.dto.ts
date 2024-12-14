import { IsString, IsOptional, IsNotEmpty, IsMongoId, MaxLength } from 'class-validator';

export class CreateRepositoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(450)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4500)
  url: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000) // Puedes ajustar el límite según sea necesario
  description?: string;

  @IsMongoId()
  @IsNotEmpty()
  project: string; // ID del proyecto al que pertenece el repositorio
}