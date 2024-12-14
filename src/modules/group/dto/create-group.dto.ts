import { IsString, IsNotEmpty, IsOptional, IsMongoId, MaxLength } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  profession?: string;

  @IsString()
  @IsNotEmpty()
  program: string; // ID del proyecto asociado
}
