import { IsString, IsOptional, IsNotEmpty, IsMongoId, MaxLength } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  url?: string; // URL opcional para el documento

  @IsString()
  @MaxLength(2000)
  tipo?: string; // URL opcional para el documento
 
  @IsMongoId()
  @IsNotEmpty()
  project: string; // ID del proyecto asociado
}
