import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Task } from '../Task/task.entity';
import { Tenant } from '../Tenant/tenant.entity';

@Entity('projects')
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  description: string;

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];

  @ApiProperty()
  @ManyToOne(() => Tenant, tenant => tenant.projects)
  tenant: Tenant;
}
