import { Test, TestingModule } from '@nestjs/testing';
import { TeamProjectsController } from './team-projects.controller';
import { TeamProjectsService } from './team-projects.service';

describe('TeamProjectsController', () => {
  let controller: TeamProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamProjectsController],
      providers: [TeamProjectsService],
    }).compile();

    controller = module.get<TeamProjectsController>(TeamProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
