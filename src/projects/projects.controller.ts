import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from "./dtos/CreateProject.dto";
import {Request} from 'express'
import { ProjectsService } from './projects.service';

@Controller("projects")
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.getAll();
  }

  @Get('/:projectId')
  getProjectById(@Param("projectId") projectId: string) {
    return this.projectsService.getOneById(projectId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProject(@Body() createProjectDto: CreateProjectDto, @Req() request: Request) {
    return this.projectsService.create(createProjectDto, request.tenant);
  }

  @Delete("/:projectId") 
  deleteProjectById(@Param("projectId") projectId: string) {
    return this.projectsService.remove(projectId);
  }

}
