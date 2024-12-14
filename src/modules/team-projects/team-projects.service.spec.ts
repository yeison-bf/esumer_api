import { Test, TestingModule } from '@nestjs/testing';
import { TeamProjectsService } from './team-projects.service';

describe('TeamProjectsService', () => {
  let service: TeamProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamProjectsService],
    }).compile();

    service = module.get<TeamProjectsService>(TeamProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
