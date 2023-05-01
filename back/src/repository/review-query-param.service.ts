import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from '../models/review.model';
import { ApiError } from '../errors/CustomError';
import { Establishment } from '../models/establishment.model';
import { User } from '../models/user.model';

@Injectable()
export class ReviewQueryParamService {
  constructor(
    @InjectModel(Review)
    private reviewRepository: typeof Review,
  ) {}

  async findByEstablishmentId(query, id) {
    try {
      const { limit = 12, page = 1, sort = null } = query;

      let reviews;
      if (sort) {
        reviews = await this.reviewRepository.findAll({
          where: { establishment_id: +id },
          limit,
          offset: (+page - 1) * +limit,
          include: { model: User },
          order: [sort.split('-')],
        });
      } else {
        reviews = await this.reviewRepository.findAll({
          where: { establishment_id: +id },
          limit,
          offset: (+page - 1) * +limit,
          include: { model: User },
        });
      }

      const count = await Review.count({ where: { establishment_id: +id } });

      return { reviews, count, limit };
    } catch (e) {
      throw new ApiError(e.message, 400);
    }
  }

  async findByUserId(query, user_id) {
    try {
      const { limit = 12, page = 1 } = query;

      const reviews = await this.reviewRepository.findAll({
        where: { user_id: +user_id },
        limit,
        offset: (+page - 1) * +limit,
        include: { model: Establishment, as: 'establishment' },
      });

      const count = await Review.count({ where: { user_id: +user_id } });

      return { reviews, count };
    } catch (e) {
      throw new ApiError(e.message, 400);
    }
  }
}
