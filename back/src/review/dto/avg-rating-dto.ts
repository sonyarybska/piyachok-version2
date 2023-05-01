import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AvgRatingDto {
  @ApiProperty({ required: true, example: 4.4 })
  @IsNumber()
  @IsNotEmpty()
  avgRating: number;
}
