import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../models/user.model';
import { Tokens } from '../../interfaces';

export class ResponseRefreshDto {
  @ApiProperty({ required: true })
  @IsNumber()
  user: User;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  tokens: Tokens;
}
