import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { Request } from 'express';
import { ProjectsService } from './projects.service';
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from '../entities/Project/project.entity';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @ApiHeader({
    name: 'tenantId',
    description: 'The id of the tenant that the resources belongs to',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description: 'Returs all the projects which belong to a tenant',
    type: Project,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Tenant with the provided id is not found.',
  })
  @ApiForbiddenResponse({
    description: "'tenantId' is not provided as a header.",
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  getProjects(@Req() request: Request) {
    return this.projectsService.getAll(request.tenant);
  }

  @ApiHeader({
    name: 'tenantId',
    description: 'The id of the tenant that the resource belongs to',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description:
      'Returs the project object for the provided id. If the project is not found returns a Not Found message.',
    type: Project,
  })
  @ApiNotFoundResponse({
    description: 'Tenant with the provided id is not found.',
  })
  @ApiForbiddenResponse({
    description: "'tenantId' is not provided as a header.",
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('/:projectId')
  getProjectById(
    @Param('projectId') projectId: string,
    @Req() request: Request,
  ) {
    return this.projectsService.getOneById(projectId, request.tenant);
  }

  @ApiHeader({
    name: 'tenantId',
    description: 'The id of the tenant that the resource will belong to.',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description: 'Returns the newly created project.',
    type: Project,
  })
  @ApiNotFoundResponse({
    description: 'Tenant with the provided id is not found.',
  })
  @ApiForbiddenResponse({
    description: "'tenantId' is not provided as a header.",
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  @UsePipes(ValidationPipe)
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Req() request: Request,
  ) {
    return this.projectsService.create(createProjectDto, request.tenant);
  }

  @ApiHeader({
    name: 'tenantId',
    description: 'The id of the tenant that the resource belongs to.',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description: 'Returns a success message',
  })
  @ApiNotFoundResponse({
    description: 'Tenant with the provided id is not found.',
  })
  @ApiForbiddenResponse({
    description: "'tenantId' is not provided as a header.",
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete('/:projectId')
  deleteProjectById(
    @Param('projectId') projectId: string,
    @Req() request: Request,
  ) {
    return this.projectsService.remove(projectId, request.tenant);
  }

  @ApiHeader({
    name: 'tenantId',
    description: 'The id of the tenant that the resource belongs to.',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description: 'Returns a success message',
  })
  @ApiNotFoundResponse({
    description: 'Tenant with the provided id is not found.',
  })
  @ApiForbiddenResponse({
    description: "'tenantId' is not provided as a header.",
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Put('/:projectId')
  @UsePipes(ValidationPipe)
  updateProjectById(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() request: Request,
  ) {
    return this.projectsService.updateOneById(
      projectId,
      updateProjectDto,
      request.tenant,
    );
  }
}
