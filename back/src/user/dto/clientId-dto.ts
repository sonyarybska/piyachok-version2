import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClientIdDto {
  @ApiProperty()
  @IsString()
  clientId: string;
}
