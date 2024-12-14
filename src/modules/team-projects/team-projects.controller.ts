import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamProjectsService } from './team-projects.service';
import { CreateTeamProjectDto } from './dto/create-team-project.dto';
import { UpdateTeamProjectDto } from './dto/update-team-project.dto';

@Controller('team-projects')
export class TeamProjectsController {
  constructor(private readonly teamProjectsService: TeamProjectsService) {}

  @Post()
  create(@Body() createTeamProjectDto: CreateTeamProjectDto) {
    return this.teamProjectsService.create(createTeamProjectDto);
  }

  @Get()
  findAll() {
    return this.teamProjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamProjectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamProjectDto: UpdateTeamProjectDto) {
    return this.teamProjectsService.update(+id, updateTeamProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamProjectsService.remove(+id);
  }
}
