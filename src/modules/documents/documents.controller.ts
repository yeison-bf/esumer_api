import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return await this.documentsService.create(createDocumentDto);
  }

  @Get()
  async findAll() {
    return await this.documentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.documentsService.findOne(id);
  }
  

  
  @Get('project/:id')
  async findOneProject(@Param('id') id: string) {
    return await this.documentsService.findOneProject(id);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return await this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.documentsService.remove(id);
    return { message: `Document with ID "${id}" has been deleted successfully.` };
  }
}
