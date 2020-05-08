import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
// import { v1 as uuidv1 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

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

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({
            where: { id, userId: user.id },
        });
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found!`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        // console.log(result);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found!`);
        }
    }
    // async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    //     const task = await this.getTaskById(id);
    //     task.status = status;
    //     await task.save();
    //     return task;
    // }
}
