import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Types } from 'mongoose';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupService.create(createGroupDto);
  }

  @Get()
  async findAll() {
    return await this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }

    const group = await this.groupService.findOne(id);
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }


  @Get('project/:id')
  async findOneProject(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }

    const group = await this.groupService.findOneProject(id);
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }

    const updatedGroup = await this.groupService.update(id, updateGroupDto);
    if (!updatedGroup) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return updatedGroup;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }

    const deletedGroup = await this.groupService.remove(id);
    if (!deletedGroup) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return deletedGroup;
  }
}
