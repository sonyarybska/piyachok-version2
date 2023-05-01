import {
  IsArray,
  IsBoolean,
  IsMilitaryTime,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchEstablishmentDto {
  @ApiProperty({ required: false, example: 'Prime' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false, example: 'HookahBar' })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({ required: false, example: ['cool'] })
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

  @ApiProperty({ required: false, example: '+380975106283' })
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
}
