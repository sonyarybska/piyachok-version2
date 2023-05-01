import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteResponseDto {
  @ApiProperty({ required: true, example: 12 })
  @IsNumber()
  favorite_id: number;

  @ApiProperty({ required: true, example: 12 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ required: true, example: 39 })
  @IsNotEmpty()
  @IsNumber()
  establishment_id: number;

  @ApiProperty({ required: true, example: '2023-01-29 13:52:00' })
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ required: true, example: '2023-01-29 13:52:00' })
  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}
