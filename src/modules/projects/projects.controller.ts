import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { get } from 'mongoose';
import { CreateGroupDto } from '../group/dto/create-group.dto';
import { GroupService } from '../group/group.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,

  ) { }

  // Crear un proyecto junto con sus repositorios
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }


  // Endpoint para agregar un grupo al proyecto
  @Post(':id/groups')
  async addGroup(
    @Param('id') projectId: string, // ID del proyecto en la URL
    @Body() groupData: any, // Datos del grupo que se envían en el cuerpo de la solicitud
  ) {
    return this.projectsService.addGroupToProject(projectId, groupData);
  }



  // Obtener todos los proyectos junto con sus repositorios
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  // Obtener un proyecto por su ID, incluyendo repositorios
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.projectsService.findOne(id)
    const repositories = await this.projectsService.getRepositories(project, project.id)
    return { project, repositories };
  }

  // Endpoint para obtener proyectos por groupId
  @Get('by-group/:groupId')
  async findProjectByGroupId(@Param('groupId') groupId: string) {
    return this.projectsService.findProjectByGroupId(groupId);
  }




  // Actualizar un proyecto y sus repositorios
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  // Eliminar un proyecto y todos sus repositorios asociados
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }

  // CRUD para repositorios si se necesitan endpoints independientes

  // Crear un repositorio para un proyecto específico
  @Get(':projectId/repositories')
  getRepositories(
    @Param('projectId') projectId: string,
    @Body() createRepositoryDto: CreateRepositoryDto,
  ) {
    return this.projectsService.getRepositories(projectId, createRepositoryDto);
  }

  // Crear un repositorio para un proyecto específico
  @Post(':projectId/repositories')
  createRepository(
    @Param('projectId') projectId: string,
    @Body() createRepositoryDto: CreateRepositoryDto,
  ) {
    return this.projectsService.createRepository(projectId, createRepositoryDto);
  }

  // Actualizar un repositorio específico
  @Put(':projectId/repositories/:repositoryId')
  updateRepository(
    @Param('projectId') projectId: string,
    @Param('repositoryId') repositoryId: string,
    @Body() updateRepositoryDto: UpdateProjectDto,
  ) {
    return this.projectsService.updateRepository(
      projectId,
      repositoryId,
      updateRepositoryDto,
    );
  }

  // Eliminar un repositorio específico
  @Delete(':projectId/repositories/:repositoryId')
  removeRepository(
    @Param('projectId') projectId: string,
    @Param('repositoryId') repositoryId: string,
  ) {
    return this.projectsService.removeRepository(projectId);
  }


  // Endpoint para eliminar un integrante del proyecto
  @Delete(':id/groups/:groupId')
  async removeGroup(
    @Param('id') projectId: string,   // ID del proyecto en la URL
    @Param('groupId') groupId: string, // ID del integrante a eliminar en la URL
  ) {
    return this.projectsService.removeGroupFromProject(projectId, groupId);
  }
}
