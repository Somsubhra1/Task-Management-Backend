import { CreateTaskDto } from './dto/create-task.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    Query,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';

// @Controller('tasks')
// export class TasksController {
//     constructor(private tasksService: TasksService) {}

//     @Get()
//     getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
//         if (Object.keys(filterDto).length) {
//             return this.tasksService.getTaskWithFilters(filterDto);
//         } else {
//             return this.tasksService.getAllTasks();
//         }
//     }

//     @Get('/:id')
//     getTaskById(@Param('id') id: String): Task {
//         return this.tasksService.getTaskById(id);
//     }

//     @Post()
//     // createTask(@Body() body) {
//     //     // @Body() decorator is used to get the values from the request body and store in body variable
//     //     console.log(body);
//     // }
//     @UsePipes(ValidationPipe) // can use @Body(ValidationPipe) also
//     createTask(
//         // @Body('title') title: String,
//         // @Body('description') description: String,
//         @Body() createTaskDto: CreateTaskDto,
//     ): Task {
//         return this.tasksService.createTask(createTaskDto);
//     }

//     @Delete('/:id')
//     deleteTask(@Param('id') id: String): void {
//         this.tasksService.deleteTask(id);
//     }

//     @Patch('/:id/status')
//     updateTaskStatus(
//         @Param('id') id: String,
//         @Body('status', TaskStatusValidationPipe) status: TaskStatus,
//     ): Task {
//         return this.tasksService.updateTaskStatus(id, status);
//     }
// }
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: User,
    ) {
        return this.tasksService.getTasks(filterDto, user);
    }
    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
