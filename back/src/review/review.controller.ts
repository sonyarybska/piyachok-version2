import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review-dto';
import { UpdateReviewDto } from './dto/update-review-dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseReviewDto } from './dto/response-review-dto';
import { Response } from 'express';
import { MassageEnum } from '../errors/message-enum';
import { StatusEnum } from '../errors/status-enum';
import { AvgRatingDto } from './dto/avg-rating-dto';
import { AuthAccessGuard } from '../auth/guards/auth-access.guard';
import { ReviewQueryDtoByEstId } from './dto/review-query-dto-by-estId';
import { ReviewQueryDtoByUserId } from './dto/review-query-dto-by-userId';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiResponse({
    status: StatusEnum.OK,
    description: 'All reviews',
    type: [ResponseReviewDto],
  })
  @Get(':id')
  async getReviewsByEstablishmentId(
    @Param('id') id: number,
    @Query() query: ReviewQueryDtoByEstId,
    @Res() res: Response,
  ) {
    const review = await this.reviewService.getAllByEstablishmentId(query, id);
    res.status(StatusEnum.OK).json(review);
  }

  @ApiResponse({
    status: StatusEnum.OK,
    description: 'Average reviews by user id',
    type: [ResponseReviewDto],
  })
  @UseGuards(AuthAccessGuard)
  @Get('users/:id')
  async getReviewsByUserId(
    @Param('id') id: number,
    @Query() query: ReviewQueryDtoByUserId,
    @Res() res: Response,
  ) {
    const reviews = await this.reviewService.getAllByUserId(query, id);
    res.status(StatusEnum.OK).json(reviews);
  }

  @ApiResponse({
    status: StatusEnum.OK,
    description: 'Average rating by establishment id',
    type: AvgRatingDto,
  })
  @Get('/:id/rating')
  async getAvgRatingByEstablishmentId(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const rating = await this.reviewService.getAvgRating(id);
    res.status(StatusEnum.OK).json(rating);
  }

  @ApiResponse({
    status: StatusEnum.CREATED,
    description: MassageEnum.ADD_ITEM,
  })
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  async postReview(
    @Body() createReviewDto: CreateReviewDto,
    @Res() res: Response,
  ) {
    try {
      await this.reviewService.addReview(createReviewDto);
      res.status(StatusEnum.CREATED).json(MassageEnum.ADD_ITEM);
    } catch (e) {
      res.status(StatusEnum.BAD_REQUEST).json({ message: e.message });
    }
  }

  @ApiResponse({
    status: StatusEnum.OK,
    description: 'One review',
    type: ResponseReviewDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  @Get(':id')
  async GetOneReview(@Param('id') id: number, @Res() res: Response) {
    const review = await this.reviewService.getOne(id);
    res.status(StatusEnum.OK).json(review);
  }

  @ApiResponse({
    status: StatusEnum.NO_CONTENT,
    description: MassageEnum.UPDATE_ITEM,
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  @Put(':id')
  async updateOneReview(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Res() res: Response,
  ) {
    await this.reviewService.updateOne(id, updateReviewDto);
    res.status(StatusEnum.NO_CONTENT).json(MassageEnum.UPDATE_ITEM);
  }

  @ApiResponse({
    status: StatusEnum.NO_CONTENT,
    description: MassageEnum.DELETE_ITEM,
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  @Delete(':id')
  async deleteOneReview(@Param('id') id: number, @Res() res: Response) {
    await this.reviewService.deleteOne(id);
    res.status(StatusEnum.NO_CONTENT).json(MassageEnum.DELETE_ITEM);
  }
}
