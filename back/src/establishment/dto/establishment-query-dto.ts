import { ApiProperty } from '@nestjs/swagger';

export class EstablishmentQueryDto {
  @ApiProperty({ required: false, example: 8 })
  limit: string;

  @ApiProperty({ required: false, example: 1 })
  page: string;

  @ApiProperty({
    required: false,
    example: true,
    description: 'Use only `when other query params not used`',
  })
  approved: boolean;

  @ApiProperty({
    required: false,
    description: 'Use only `when other query params not used',
  })
  pending: boolean;

  @ApiProperty({
    required: false,
    description: 'Use only `when other query params not used`',
  })
  rejected: boolean;

  @ApiProperty({ required: false, example: 'Prime' })
  title: string;

  @ApiProperty({
    required: false,
    enum: [
      'average_check-DESC',
      'average_check-ASC',
      'avgRating-DESC',
      'avgRating-ASC',
      'created_at-DESC',
      'created_at-ASC',
      'title-DESC',
      'title-ASC',
    ],
  })
  sort: string;

  @ApiProperty({
    required: false,
    enum: [
      'Hookah bar',
      'Restoraunt',
      'Cafe',
      'Bar',
      'Beer establishment',
      'Winery',
      'Club',
    ],
  })
  type: string;

  @ApiProperty({
    required: false,
    default: 'rating-0,5',
    description:
      'Set diapason between `,`, example: `rating-3,5` - that mean rating diapason is from `3` to `5`. Allowable diapason `from 0 to 5`',
  })
  filterByRating: string;

  @ApiProperty({
    required: false,
    default: 'averageCheck-500,1000',
    description:
      'Set diapason between `,`, example: `averageCheck-500,1000` - that mean rating diapason is from `500` to `1000`',
  })
  filterByCheck: string;
}
