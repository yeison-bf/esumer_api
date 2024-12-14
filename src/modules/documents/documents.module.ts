import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsSchema } from 'src/entities/Documents/Documents';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Documents', schema: DocumentsSchema }]), // Asegúrate de que el nombre coincide
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
