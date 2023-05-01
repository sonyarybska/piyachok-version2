import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseReviewDto {
  @ApiProperty({ required: true, example: 13 })
  @IsNumber()
  @IsNotEmpty()
  review_id: number;

  @ApiProperty({ required: true, example: 'Cool' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: true, example: 1000 })
  @IsNumber()
  @IsNotEmpty()
  check: number;

  @ApiProperty({ required: true, example: 12 })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ required: true, example: 39 })
  @IsNumber()
  @IsNotEmpty()
  establishment_id: number;

  @ApiProperty({ required: true, example: 5 })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ required: true, example: '2023-01-29 13:52:00' })
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ required: true, example: '2023-01-29 13:52:00' })
  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}
