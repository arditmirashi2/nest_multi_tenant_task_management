import { Controller } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiTags } from '@nestjs/swagger';
import { Project } from '../entities/Project/project.entity';
import { BaseController } from '../base/base.controller';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController extends BaseController<Project> {
  constructor(private projectsService: ProjectsService) {
    super(projectsService);
  }
}
