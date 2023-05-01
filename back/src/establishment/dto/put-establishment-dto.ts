import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PutEstablishmentDto {
  @ApiProperty({ required: true, example: 'Prime' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, example: 'Bar' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ required: true, example: ['Prime', 'cool'] })
  @IsArray()
  @IsNotEmpty()
  tags: string[];

  @ApiProperty({ required: true, example: '10:15' })
  @IsNotEmpty()
  @IsString()
  start_work: string;

  @ApiProperty({ required: true, example: '20:00' })
  @IsNotEmpty()
  @IsString()
  end_work: string;

  @ApiProperty({
    required: false,
    example: 'Lychakivska Street, 23, Lviv, Lviv Oblast, Ukraine',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ required: true, example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  average_check: number;

  @ApiProperty({ required: true, example: '+380962947120' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UA')
  phone: string;
}
