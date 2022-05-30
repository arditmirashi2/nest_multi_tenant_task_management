import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/entities/Project/project.entity';
import { CreateProjectDto } from 'src/projects/dtos/CreateProject.dto';
import { Tenant } from 'src/entities/Tenant/tenant.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  getAll() {
    return this.projectRepository.find();
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

  async getOneById(id: string) {
    try {
      const project = await this.projectRepository.findOneBy({ id });

      if (!project) {
        throw new HttpException(
          `Project with id: '${id}' not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return project;
    } catch (error: any) {
      throw new HttpException(
        `Project with id: '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    try {
      const projectDeletionObject = await this.projectRepository.delete({ id });

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
}
