import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../base/base.controller';
import { Task } from '../entities/Task/task.entity';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController extends BaseController<Task> {
  constructor(private taskService: TasksService) {
    super(taskService);
  }
}
