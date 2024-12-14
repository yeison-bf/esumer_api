import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from 'src/entities/group/group';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel('Group') private readonly groupModel: Model<Group>,
  ) {}

  // Crear un nuevo grupo
  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = new this.groupModel(createGroupDto);
    return await newGroup.save();
  }

  // Obtener todos los grupos
  async findAll(): Promise<Group[]> {
    return await this.groupModel.find().exec();
  }

  // Obtener un grupo por ID
  async findOne(id: string): Promise<Group> {
    const group = await this.groupModel.findById(id).exec();
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  // Obtener un grupo por ID
  async findOneProject(id: string): Promise<any> {
    const group = await this.groupModel.find({project:id});
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }



  // Actualizar un grupo por ID
  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const updatedGroup = await this.groupModel.findByIdAndUpdate(id, updateGroupDto, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Ejecuta las validaciones del esquema
    }).exec();

    if (!updatedGroup) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return updatedGroup;
  }

  // Eliminar un grupo por ID
  async remove(id: string): Promise<Group> {
    const deletedGroup = await this.groupModel.findByIdAndDelete(id).exec();
    if (!deletedGroup) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return deletedGroup;
  }




  
}