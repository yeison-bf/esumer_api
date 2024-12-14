import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  descriptionShort: string;

  @IsString()
  @IsOptional()
  banner: string;

  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsNotEmpty()
  program: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  repositories?: string[]; // IDs de los repositorios asociados al proyecto (opcional)

  @IsString()
  @IsOptional()
  urlHosting?: string; // URL de hosting opcional

  
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  company_name: string;


    
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  userRegister: string;


}
