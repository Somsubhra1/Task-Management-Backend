import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from './tasks.model';

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
}
