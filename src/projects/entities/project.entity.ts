import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Task} from "../../tasks/entities/task.entity";

@Entity()
export class Project {
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

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];
}