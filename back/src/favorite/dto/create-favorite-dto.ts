import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({ required: true, example: 12 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ required: true, example: 39 })
  @IsNotEmpty()
  @IsNumber()
  establishment_id: number;
}
