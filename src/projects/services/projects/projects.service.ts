import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
      ) {}

    getProjects() {
        return this.projectRepository.find();
    }
}
