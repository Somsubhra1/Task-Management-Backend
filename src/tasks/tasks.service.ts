import { Task } from './tasks.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }
}
