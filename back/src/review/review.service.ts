import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from '../models/review.model';
import { CreateReviewDto } from './dto/create-review-dto';
import { UpdateReviewDto } from './dto/update-review-dto';
import sequelize from 'sequelize';
import { ReviewQueryParamService } from '../repository/review-query-param.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review)
    private reviewRepository: typeof Review,
    private reviewQueryParamService: ReviewQueryParamService,
  ) {}

  async getAllByEstablishmentId(query, id: number) {
    return await this.reviewQueryParamService.findByEstablishmentId(query, id);
  }

  async getAllByUserId(query, user_id) {
    return await this.reviewQueryParamService.findByUserId(query, user_id);
  }

  async getAvgRating(id) {
    return await this.reviewRepository.findOne({
      where: { establishment_id: id },
      attributes: [
        [
          sequelize.fn(
            'coalesce',
            sequelize.fn('AVG', sequelize.col('rating')),
            1,
          ),
          'avgRating',
        ],
      ],
    });
  }

  async addReview(createReviewDto: CreateReviewDto) {
    return await this.reviewRepository.create(createReviewDto);
  }

  async getOne(id: number) {
    return await this.reviewRepository.findOne({
      where: { review_id: id },
    });
  }

  async updateOne(id: number, updateUserDto: UpdateReviewDto) {
    return await this.reviewRepository.update(
      { ...updateUserDto },
      { where: { review_id: id } },
    );
  }

  async deleteOne(id: number) {
    return await this.reviewRepository.destroy({ where: { review_id: id } });
  }
}
