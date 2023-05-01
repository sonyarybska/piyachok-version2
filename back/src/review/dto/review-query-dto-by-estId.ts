import { ApiProperty } from '@nestjs/swagger';

export class ReviewQueryDtoByEstId {
  @ApiProperty({ required: false, example: 8 })
  limit: string;

  @ApiProperty({ required: false, example: 1 })
  page: string;

  @ApiProperty({ required: false, enum: ['created_at-DESC', 'created_at-ASC'] })
  sort: string;
}
