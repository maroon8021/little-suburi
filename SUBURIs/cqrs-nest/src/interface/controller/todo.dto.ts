import { ApiProperty } from '@nestjs/swagger';

export class TodoResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  isCompleted!: boolean;

  @ApiProperty()
  createdAt!: Date;
}
