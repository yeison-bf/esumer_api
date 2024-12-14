import { Injectable } from '@nestjs/common';
import { CreateTeamProjectDto } from './dto/create-team-project.dto';
import { UpdateTeamProjectDto } from './dto/update-team-project.dto';

@Injectable()
export class TeamProjectsService {
  create(createTeamProjectDto: CreateTeamProjectDto) {
    return 'This action adds a new teamProject';
  }

  findAll() {
    return `This action returns all teamProjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamProject`;
  }

  update(id: number, updateTeamProjectDto: UpdateTeamProjectDto) {
    return `This action updates a #${id} teamProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamProject`;
  }
}
