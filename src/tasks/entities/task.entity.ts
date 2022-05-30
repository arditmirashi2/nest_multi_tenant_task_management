import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {Project} from '../../projects/entities/project.entity';

enum TASK_STATUS {
    TODO="TODO",
    IN_PROGRESS="IN_PROGRESS",
    DONE="DONE"
};

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @Column({enum: TASK_STATUS, default: TASK_STATUS.TODO})
  status: TASK_STATUS;

  @ManyToOne(() => Project, project => project.tasks)
    project: Project;
}