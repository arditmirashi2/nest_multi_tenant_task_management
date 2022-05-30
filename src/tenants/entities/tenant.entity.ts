import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;
}