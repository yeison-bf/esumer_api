import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documents } from 'src/entities/Documents/Documents';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel('Documents') private readonly documentModel: Model<Documents>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<Documents> {
    const newDocument = new this.documentModel(createDocumentDto);
    return await newDocument.save();
  }

  async findAll(): Promise<Documents[]> {
    return await this.documentModel.find().populate('project').exec();
  }

  async findOne(id: string): Promise<Documents> {
    const document = await this.documentModel.findById(id).populate('project').exec();
    if (!document) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
    return document;
  }


  async findOneProject(id: string): Promise<any> {
    const document = await this.documentModel.find({project:id});
    if (!document) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
    return document;
  }


  async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Documents> {
    const updatedDocument = await this.documentModel
      .findByIdAndUpdate(id, updateDocumentDto, { new: true })
      .exec();
    if (!updatedDocument) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
    return updatedDocument;
  }

  async remove(id: string): Promise<void> {
    const result = await this.documentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
  }
}
