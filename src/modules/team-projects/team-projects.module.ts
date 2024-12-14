import { Module } from '@nestjs/common';
import { TeamProjectsService } from './team-projects.service';
import { TeamProjectsController } from './team-projects.controller';

@Module({
  controllers: [TeamProjectsController],
  providers: [TeamProjectsService],
})
export class TeamProjectsModule {}
