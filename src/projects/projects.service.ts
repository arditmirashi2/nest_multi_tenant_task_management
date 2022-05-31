import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/Project/project.entity';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { Tenant } from '../entities/Tenant/tenant.entity';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  getAll(tenant: Tenant) {
    return this.projectRepository.find({ where: { tenant } });
  }

  async create(createProjectDto: CreateProjectDto, tenant: Tenant) {
    try {
      const newProject = this.projectRepository.save({
        ...createProjectDto,
        tenant,
      });

      return newProject;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOneById(id: string, tenant: Tenant) {
    try {
      const project = await this.projectRepository.findOneBy({ id, tenant });

      if (!project) {
        throw new HttpException(
          `Project with id: '${id}' not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return project;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string, tenant: Tenant) {
    try {
      const projectDeletionObject = await this.projectRepository.delete({
        id,
        tenant,
      });

      if (!projectDeletionObject.affected) {
        throw new HttpException(
          `Project with id: '${id}' not found`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return {
          statusCode: '200',
          message: `Project with id: '${id}' successfully deleted`,
        };
      }
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOneById(
    id: string,
    updateProjectDto: UpdateProjectDto,
    tenant: Tenant,
  ) {
    try {
      const projectUpdateObject = await this.projectRepository.update(
        { id, tenant },
        updateProjectDto,
      );

      if (!projectUpdateObject.affected) {
        throw new HttpException(
          `Project with id: '${id}' not found`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return {
          statusCode: '200',
          message: `Project with id: '${id}' successfully updated`,
        };
      }
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
