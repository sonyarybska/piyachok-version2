import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateEstablishmentDto {
  @ApiProperty({
    type: Array,
    format: 'binary',
    description: 'Image file to upload',
  })
  files: [];
  @ApiProperty({
    type: 'string',
    description: 'Set `JSON stringify` format',
    example: `{"title":"efewfe","type":"Bar","tags":["wefef"],"start_work":"01:29","end_work":"03:33","average_check":"1500","location":"Lychakivska Street, 23, Lviv, Lviv Oblast, Ukraine","phone":"+380986649500"}`,
  })
  data: string;

  @ApiProperty({
    type: 'number',
    description: 'user_id',
    example: '32',
  })
  user_id: number;
}

export class DataEstablishmentDto {
  @ApiProperty({ required: false, example: 'BarBear' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: false, example: 'Bar' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ required: false, example: ['bar', 'cool'] })
  @IsNotEmpty()
  @IsArray()
  tags: string[];

  @ApiProperty({ required: false, example: '10:15' })
  @IsNotEmpty()
  @IsMilitaryTime()
  start_work: string;

  @ApiProperty({ required: false, example: '20:00' })
  @IsNotEmpty()
  @IsMilitaryTime()
  end_work: string;

  @ApiProperty({
    required: false,
    example: 'Lychakivska Street, 23, Lviv, Lviv Oblast, Ukraine',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ required: false, example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(50)
  average_check: number;

  @ApiProperty({ required: false, example: '+380973568129' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UA')
  phone: string;

  @ApiProperty({ required: true, example: 32 })
  @IsNumber()
  @IsNotEmpty()
  user_id: string;
}
