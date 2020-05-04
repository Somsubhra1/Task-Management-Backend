import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

// @Injectable()
// export class TasksService {
//     private tasks: Task[] = [];

//     getAllTasks(): Task[] {
//         return this.tasks;
//     }

//     getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
//         const { status, search } = filterDto;
//         let tasks = this.getAllTasks();
//         if (status) {
//             tasks = tasks.filter(task => task.status === status);
//         }
//         if (search) {
//             tasks = tasks.filter(
//                 task =>
//                     task.title.includes(String(search)) ||
//                     task.description.includes(String(search)),
//             );
//         }

//         return tasks;
//     }

//     getTaskById(id: String): Task {
//         const found = this.tasks.find(task => task.id === id);
//         if (!found) {
//             throw new NotFoundException(`Task with id ${id} not found!`);
//         }
//         return found;
//     }

//     createTask(createTaskDto: CreateTaskDto): Task {
//         const { title, description } = createTaskDto;
//         const task: Task = {
//             id: uuidv1(),
//             title,
//             description,
//             status: TaskStatus.OPEN,
//         };
//         this.tasks.push(task);
//         return task;
//     }

//     deleteTask(id: String): void {
//         const found = this.getTaskById(id);
//         this.tasks = this.tasks.filter(task => task.id !== found.id);
//     }

//     updateTaskStatus(id: String, status: TaskStatus): Task {
//         const task = this.getTaskById(id);
//         task.status = status;
//         return task;
//     }
// }

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found!`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }
}
