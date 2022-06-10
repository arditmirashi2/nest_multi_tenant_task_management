import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/Task/task.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';

@Injectable()
export class TasksService extends BaseService<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }
}
