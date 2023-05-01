import { ApiProperty } from '@nestjs/swagger';

export class FavoriteQueryDto {
  @ApiProperty({ required: false, example: 8 })
  limit: string;

  @ApiProperty({ required: false, example: 1 })
  page: string;
}
