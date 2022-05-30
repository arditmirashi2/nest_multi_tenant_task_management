import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from 'src/projects/services/projects/projects.service';

@Controller('projects')
export class ProjectsController {


    constructor(private projectsService: ProjectsService) {

    }

    @Get()
    getProjects() {
        return this.projectsService.getProjects();
    }

    @Get("/:id") 
    getProjectById() {
        return this.projectsService.getProjects();
    }
}
