import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from 'src/projects/dtos/CreateProject.dto';
import { ProjectsService } from 'src/projects/services/projects/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.getProjects();
  }

  @Get('/:id')
  getProjectById(@Param("id") id: string) {
    return this.projectsService.getProjectById(id);
  }

  @Post("/:tenantId/create")
  @UsePipes(ValidationPipe)
  createProject(@Param("tenantId") tenantId: string, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto, tenantId);
  }

  @Delete("/:id") 
  deleteProjectById(@Param("id") id: string) {
    return this.projectsService.deleteProjectById(id);
  }

}
