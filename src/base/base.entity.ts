import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @ApiPropertyOptional()
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
}
