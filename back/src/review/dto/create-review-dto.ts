import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ required: true, example: 'Cool' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: true, example: 1000 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  check: number;

  @ApiProperty({ required: true, example: 12 })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ required: true, example: 39 })
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  establishment_id: number;

  @ApiProperty({ required: true, example: 5.9 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.5)
  rating: number;
}
