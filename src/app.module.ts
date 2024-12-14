import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { RolesModule } from './modules/roles/roles.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TeamProjectsModule } from './modules/team-projects/team-projects.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', 'config', 'env', `${process.env.NODE_ENV || 'dev'}.env`),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'), // URI completa de MongoDB
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    UserModule,
    RolesModule,
    ProjectsModule,
    TeamProjectsModule,
    TeachersModule,
    GalleryModule,
    DocumentsModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
