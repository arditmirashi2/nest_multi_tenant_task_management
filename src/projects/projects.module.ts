import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/Project/project.entity';
import { Tenant } from 'src/entities/Tenant/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Tenant])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
