import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(20)
  description: string;
}
