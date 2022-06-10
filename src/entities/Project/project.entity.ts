import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToMany, ManyToOne } from 'typeorm';
import { Task } from '../Task/task.entity';
import { Tenant } from '../Tenant/tenant.entity';
import { BaseEntity } from '../../base/base.entity';

@Entity('projects')
export class Project extends BaseEntity {
  constructor(o: Object) {
    super();
    Object.assign(this, o);
  }
  @OneToMany(() => Task, task => task.project)
  tasks: Task[];

  @ManyToOne(() => Tenant, tenant => tenant.projects)
  tenant: Tenant;
}
