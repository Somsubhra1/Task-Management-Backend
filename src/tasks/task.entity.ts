import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    title: String;

    @Column()
    description: String;

    @Column()
    status: TaskStatus;

    @ManyToOne(
        type => User,
        user => user.tasks,
        { eager: false },
    )
    user: User;
}
