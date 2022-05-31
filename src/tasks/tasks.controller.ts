import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Task } from '../entities/Task/task.entity';
import { CreateTaskDto } from './dtos/CreateTask.dto';
import { UpdateTaskDto } from './dtos/UpdateTask.dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @ApiHeader({
    name: 'tenantId',
    description: 'The id of the tenant that the resources belongs to',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description:
      'Returs all the tasks which belong to a project within a tenant',
    type: Task,
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
  getAllByProjectId(@Param('projectId') projectId: string) {
    return this.taskService.getAllForProjectId(projectId);
  }

  @ApiHeader({
    name: 'tenantId',
    description: 'The id of the tenant that the resource belongs to',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description:
      'Returns the task for the provided task id and project id within a tenant',
    type: Task,
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
  @Get('/:taskId')
  getOneByProjectIdAndTaskId(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.taskService.getOneById(taskId, projectId);
  }

  @ApiHeader({
    name: 'tenantId',
    description: 'The id of the tenant that the resource will belong to',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description:
      'Returns the newly created task for the provided project id within a tenant',
    type: Task,
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
  @UsePipes(ValidationPipe)
  @Post()
  createTaskForProject(
    @Param('projectId') projectId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(createTaskDto, projectId);
  }

  @ApiHeader({
    name: 'tenantId',
    description: 'The id of the tenant that the resource belongs to',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description:
      'Returns a success message for the deleted task for the provided task id for a project',
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
  @Delete('/:taskId')
  deleteOneByProjectIdAndTaskId(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.taskService.remove(taskId, projectId);
  }

  @ApiHeader({
    name: 'tenantId',
    description: 'The id of the tenant that the resource belongs to',
    allowEmptyValue: false,
    required: true,
  })
  @ApiOkResponse({
    description:
      'Returns the newly updated task for the provided project id within a tenant',
    type: Task,
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
  @UsePipes(ValidationPipe)
  @Put('/:taskId')
  updateOneByProjectIdAndTaskId(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateOneById(taskId, projectId, updateTaskDto);
  }
}
