import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ required: false, example: 32 })
  user_id: number;

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

  @ApiProperty({ required: true, example: '2023-01-29T10:50:52.948Z' })
  updatedAt: '2023-01-29T10:50:52.948Z';

  @ApiProperty({ required: true, example: '2023-02-26T16:36:59.784Z' })
  createdAt: string;
}
