import { createTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTaskWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
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

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: String,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
