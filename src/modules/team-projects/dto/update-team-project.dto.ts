import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamProjectDto } from './create-team-project.dto';

export class UpdateTeamProjectDto extends PartialType(CreateTeamProjectDto) {}
