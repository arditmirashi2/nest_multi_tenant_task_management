import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { TASK_STATUS } from '../../entities/Task/task.entity';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(20)
  description: string;

  @ApiProperty({
    enum: [TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE],
  })
  @IsEnum(TASK_STATUS)
  status: TASK_STATUS;
}
