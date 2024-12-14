import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from 'src/entities/Projects/Project';
import { RepositorySchema } from 'src/entities/Repositories/repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Repository', schema: RepositorySchema }]), // Asegúrate de que el nombre coincide
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]), // Asegúrate de que el nombre coincide
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
