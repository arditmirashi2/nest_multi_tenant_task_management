import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Project } from '../Project/project.entity';
import { BaseEntity } from '../../base/base.entity';
import { Tenant } from '../Tenant/tenant.entity';

export enum TASK_STATUS {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity('tasks')
export class Task extends BaseEntity {
  constructor(o: Object) {
    super();
    Object.assign(this, o);
  }
  @ApiProperty({
    enum: [TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE],
  })
  @Column({ enum: TASK_STATUS })
  status: TASK_STATUS;

  @ApiProperty()
  @ManyToOne(() => Project, project => project.tasks)
  project: Project;

  @ManyToOne(() => Tenant, tenant => tenant.tasks)
  tenant: Tenant;
}
