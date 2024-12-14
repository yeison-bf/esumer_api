import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from 'src/entities/group/group';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]), // Asegúrate de que el nombre coincide
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
