import { createTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: String): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    // createTask(@Body() body) {
    //     // @Body() decorator is used to get the values from the request body and store in body variable
    //     console.log(body);
    // }
    createTask(
        // @Body('title') title: String,
        // @Body('description') description: String,
        @Body() createTaskDto: createTaskDto,
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: String): void {
        this.tasksService.deleteTask(id);
    }
}
