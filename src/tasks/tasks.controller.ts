import { Task } from './tasks.model';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    // createTask(@Body() body) {
    //     // @Body() decorator is used to get the values from the request body and store in body variable
    //     console.log(body);
    // }
    createTask(
        @Body('title') title: String,
        @Body('description') description: String,
    ): Task {
        return this.tasksService.createTask(title, description);
    }
}
