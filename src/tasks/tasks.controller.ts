import { Controller, Get, Param } from '@nestjs/common';

@Controller("projects/:projectId/tasks")
export class TasksController {

    @Get()
    getAll(@Param("projectId") projectId: string)  {
        console.log("Project Id", projectId)
    }
}
