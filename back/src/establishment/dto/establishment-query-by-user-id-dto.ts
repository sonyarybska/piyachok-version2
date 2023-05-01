import { ApiProperty } from '@nestjs/swagger';

export class EstablishmentQueryByUserIdDto {
  @ApiProperty({ required: false, example: 8 })
  limit: string;

  @ApiProperty({ required: false, example: 1 })
  page: string;

  @ApiProperty({
    required: false,
    description: 'Use only `when other query params not used`',
  })
  approved: boolean;

  @ApiProperty({
    required: false,
    description: 'Use only `when other query params not used`',
  })
  pending: boolean;

  @ApiProperty({
    required: false,
    description: 'Use only `when other query params not used`',
  })
  rejected: boolean;
}
