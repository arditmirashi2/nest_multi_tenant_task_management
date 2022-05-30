import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects/projects.controller';
import { ProjectsService } from './services/projects/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/Project/project.entity';
import { Tenant } from 'src/entities/Tenant/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Tenant])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
