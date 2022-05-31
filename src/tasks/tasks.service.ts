import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/Project/project.entity';
import { Task } from '../entities/Task/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/CreateTask.dto';
import { UpdateTaskDto } from './dtos/UpdateTask.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getProjectById(projectId: string) {
    try {
      const project = await this.projectRepository.findOneBy({ id: projectId });

      if (!project) {
        throw new Error(`Project with id: '${projectId}' not found`);
      }

      return project;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllForProjectId(projectId: string) {
    try {
      const project = await this.getProjectById(projectId);

      return this.taskRepository.find({ where: { project } });
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createTaskDto: CreateTaskDto, projectId: string) {
    try {
      const project = await this.getProjectById(projectId);

      return this.taskRepository.save({ ...createTaskDto, project });
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOneById(taskId: string, projectId: string) {
    try {
      const project = await this.getProjectById(projectId);

      const task = await this.taskRepository.findOneBy({
        id: taskId,
        project: project,
      });

      if (!task) {
        throw new HttpException(
          `Task with id: '${taskId}' for project with id: '${projectId}' not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return task;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(taskId: string, projectId: string) {
    try {
      const project = await this.getProjectById(projectId);

      const taskDeletionObject = await this.taskRepository.delete({
        id: taskId,
        project,
      });

      if (!taskDeletionObject.affected) {
        throw new HttpException(
          `Task with id: '${taskId}' for project with id: '${projectId}' not found`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return {
          statusCode: '200',
          message: `Task with id: '${taskId}' for project with id: '${projectId}' successfully deleted`,
        };
      }
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOneById(
    taskId: string,
    projectId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    try {
      const project = await this.getProjectById(projectId);

      const taskUpdateObject = await this.taskRepository.update(
        { id: taskId, project },
        updateTaskDto,
      );

      if (!taskUpdateObject.affected) {
        throw new HttpException(
          `Task with id: '${taskId}' for project with id: '${projectId}' not found`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return {
          statusCode: '200',
          message: `Task with id: '${taskId}' for project with id: '${projectId}' successfully updated`,
        };
      }
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
