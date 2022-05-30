import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Project } from '../Project/project.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @OneToMany(() => Project, project => project.tenant)
  projects: Project[];
}