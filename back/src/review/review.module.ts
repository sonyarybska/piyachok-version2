import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from '../models/review.model';
import { ReviewQueryParamService } from '../repository/review-query-param.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Review]), AuthModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewQueryParamService],
})
export class ReviewModule {}
