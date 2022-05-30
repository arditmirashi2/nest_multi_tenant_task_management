import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Task } from '../Task/task.entity';
import { Tenant } from '../Tenant/tenant.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false
  })
  name: string;

  @Column({
    nullable: false,
  })
  description: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @ManyToOne(() => Tenant, (tenant) => tenant.projects)
  tenant: Tenant;
}
