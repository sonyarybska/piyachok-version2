import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, example: false })
  admin: boolean;

  @ApiProperty({ required: true, example: 'sofaribska@gmail.com' })
  email: string;

  @ApiProperty({ required: true, example: 'Соня Рибська' })
  name: string;

  @ApiProperty({
    required: true,
    example:
      'https://lh3.googleusercontent.com/a/AEdFTp6_rN4O1Ov60r9HOguESrCn8OMHvDsHhN3wpnPYxg=s96-c',
  })
  picture: string;
}
