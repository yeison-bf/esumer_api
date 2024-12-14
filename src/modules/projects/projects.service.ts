import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'src/entities/Repositories/repository';
import { Project } from 'src/entities/Projects/Project';
import { Group } from 'src/entities/group/group';
import { CreateGroupDto } from '../group/dto/create-group.dto';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
    @InjectModel('Project') private readonly groupModel: Model<Group>,
    @InjectModel('Repository') private readonly repositoryModel: Model<Repository>,
  ) {}


 // Crear un proyecto con repositorios
 async create(createProjectDto: CreateProjectDto) {
  const { repositories, ...projectData } = createProjectDto;

  // Crear el proyecto
  const project = new this.projectModel(projectData);
  await project.save();

  return project.populate('repositories');
}

async findAll() {
  try {
    const projects = await this.projectModel
      .find()
      .populate({
        path: 'repositories', // Relación con el modelo Repository
        select: 'name url description', // Selección de campos opcional
        model: 'Repository', // Especificar el modelo explícitamente
      });

    console.log(projects);  // Verifica los proyectos cargados con los repositorios
    return projects;
  } catch (error) {
    console.error('Error al obtener los proyectos:', error.message);
    throw new Error('No se pudieron obtener los proyectos.');
  }
}


// Obtener un proyecto por ID con sus repositorios
async findOne(id: string) {
  const project = await this.projectModel.findById(id).populate('repositories');
  if (!project) {
    throw new NotFoundException(`Project with ID ${id} not found`);
  }
  return project;
}


// Obtener un proyecto por ID con sus repositorios
async findOneByTeams(id: string) {
  const project = await this.groupModel.findById({});
  if (!project) {
    throw new NotFoundException(`Project with ID ${id} not found`);
  }
  return project;
}




// Actualizar un proyecto y sus repositorios
async update(id: string, updateProjectDto: UpdateProjectDto) {
  const { repositories, ...projectData } = updateProjectDto;

  // Actualizar proyecto
  const project = await this.projectModel.findByIdAndUpdate(id, projectData, {
    new: true,
  });

  if (!project) {
    throw new NotFoundException(`Project with ID ${id} not found`);
  }

  return project.populate('repositories');
}



// Eliminar un proyecto y sus repositorios
async remove(id: string) {
  const project = await this.projectModel.findByIdAndDelete(id);

  if (!project) {
    throw new NotFoundException(`Project with ID ${id} not found`);
  }

  // Eliminar repositorios asociados
  await this.repositoryModel.deleteMany({ project: id });

  return { message: `Proyeecto eliminado exitosamente` };
}





// CRUD para repositorios (opcional si deseas operarlos independientemente)
async getRepositories(projectId, repositoryData) {
  const repository = await this.repositoryModel.find({project:projectId});
  return repository;
}


// CRUD para repositorios (opcional si deseas operarlos independientemente)
async createRepository(projectId, repositoryData) {
  const repository = new this.repositoryModel(repositoryData);
  return repository.save();
}

async findAllRepositories() {
  return this.repositoryModel.find();
}

async findOneRepository(id: string) {
  const repository = await this.repositoryModel.findById(id);
  if (!repository) {
    throw new NotFoundException(`Repository with ID ${id} not found`);
  }
  return repository;
}

async updateRepository(projectId, id: string, repositoryData) {
  const repository = await this.repositoryModel.findByIdAndUpdate(id, repositoryData, {
    new: true,
  });
  if (!repository) {
    throw new NotFoundException(`Repository with ID ${id} not found`);
  }
  return repository;
}

async removeRepository(id: string) {
  const repository = await this.repositoryModel.findByIdAndDelete(id);
  if (!repository) {
    throw new NotFoundException(`Repository with ID ${id} not found`);
  }
  return { message: `Repository with ID ${id} has been deleted` };
}



// Agregar grupos a un proyecto existente
async addGroupToProject(projectId: string, groupData: any): Promise<Project> {
  // Buscar el proyecto por su ID
  const project = await this.projectModel.findById(projectId);
  
  if (!project) {
    throw new NotFoundException(`Proyecto con ID ${projectId} no encontrado.`);
  }

  // Agregar el nuevo grupo al campo 'groups'
  project.groups.push(groupData);

  // Guardar los cambios en la base de datos
  await project.save();
  
  return project;
}


// Método para eliminar un integrante del grupo en el proyecto
async removeGroupFromProject(projectId: string, groupId: string): Promise<any> {
  const project = await this.projectModel.findById(projectId);
  
  if (!project) {
    throw new NotFoundException(`Proyecto con ID ${projectId} no encontrado.`);
  }
console.log(groupId)
  // Filtramos los integrantes del grupo, eliminando el que tenga el _id igual al groupId
  project.groups = project.groups.filter(group => group.email.toString() !== groupId);

  // Guardamos los cambios en la base de datos
  await project.save();

  return {ok:"Integrante eliminado exitosamente", project};
}


// Método para buscar un proyecto por groupId
async findProjectByGroupId(groupId: string): Promise<Project[]> {
  // Buscamos proyectos donde el groupId esté dentro del campo `groups`
  const projects = await this.projectModel.find({userRegister:groupId});

  // Si no se encuentran proyectos, lanzamos una excepción
  if (!projects) {
    throw new NotFoundException(`No se encontró ningún proyecto con el groupId ${groupId}.`);
  }

  return projects;
}

}
