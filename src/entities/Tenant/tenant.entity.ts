import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Project } from '../Project/project.entity';
import { Task } from '../Task/task.entity';

@Entity('tenants')
export class Tenant {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @OneToMany(() => Project, project => project.tenant)
  projects: Project[];

  @OneToMany(() => Task, task => task.tenant)
  tasks: Task[];
}
