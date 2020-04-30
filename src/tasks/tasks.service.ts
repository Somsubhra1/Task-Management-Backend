import { createTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { Injectable } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: String): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: createTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: String): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
