import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from 'src/entities/Roles/roles';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]), // Asegúrate de que el nombre coincide
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
