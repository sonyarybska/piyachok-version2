import { ApiProperty } from '@nestjs/swagger';

export class ReviewQueryDtoByUserId {
  @ApiProperty({ required: false, example: 8 })
  limit: string;

  @ApiProperty({ required: false, example: 1 })
  page: string;
}
