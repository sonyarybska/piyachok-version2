import {
  IsArray,
  IsBoolean,
  IsMilitaryTime,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseEstablishmentDto {
  @ApiProperty({ required: false, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  establishment_id: number;

  @ApiProperty({ required: false, example: 'BarBear' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false, example: 'Bar' })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({ required: false, example: ['bar', 'cool'] })
  @IsOptional()
  @IsArray()
  tags: string[];

  @ApiProperty({ required: false, example: '10:15' })
  @IsOptional()
  @IsMilitaryTime()
  start_work: string;

  @ApiProperty({ required: false, example: '20:00' })
  @IsOptional()
  @IsMilitaryTime()
  end_work: string;

  @ApiProperty({
    required: false,
    example: 'Lychakivska Street, 23, Lviv, Lviv Oblast, Ukraine',
  })
  @IsOptional()
  @IsString()
  location: string;

  @ApiProperty({ required: false, example: 1000 })
  @IsOptional()
  @IsNumber()
  average_check: number;

  @ApiProperty({ required: false, example: '+380973568129' })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UA')
  phone: string;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  @IsBoolean()
  approved: boolean;

  @ApiProperty({ required: false, example: false })
  @IsOptional()
  @IsBoolean()
  pending: boolean;

  @ApiProperty({ required: false, example: false })
  @IsOptional()
  @IsBoolean()
  rejected: boolean;

  @ApiProperty({
    required: true,
    example: [
      'users\\32\\609\\establishment_photos\\efb3f750-9f12-11ed-bf54-6b83c73b2d9a.jpg',
      'users\\32\\610\\establishment_photos\\efb3f750-9f12-11ed-bf54-6b83c73b2d9a.jpg',
    ],
  })
  @IsArray()
  photos: string[];

  @ApiProperty({
    required: true,
    example:
      'users\\32\\609\\establishment_photos\\efb3f750-9f12-11ed-bf54-6b83c73b2d9a.jpg',
  })
  @IsString()
  avatar: string;

  @ApiProperty({ required: true, example: '2023-01-28 13:52:00' })
  @IsString()
  created_at: string;

  @ApiProperty({ required: true, example: '2023-01-29 13:52:00' })
  @IsString()
  updated_at: string;
}
