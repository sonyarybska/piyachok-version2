import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiProperty({ required: true, example: 'Cool' })
  @IsString()
  text: string;

  @ApiProperty({ required: true, example: 1000 })
  @IsNumber()
  check: number;

  @ApiProperty({ required: true, example: 5.9 })
  @IsNumber()
  rating: number;
}
