import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiError } from '../errors/CustomError';
import { Establishment } from '../models/establishment.model';
import { Favorite } from '../models/favorite.model';

@Injectable()
export class FavoriteQueryParamService {
  constructor(
    @InjectModel(Favorite)
    private favoriteRepository: typeof Favorite,
  ) {}

  async findByUserId(user_id, query) {
    try {
      const { limit = 12, page = 1 } = query;

      const favorites = await this.favoriteRepository.findAll({
        where: { user_id: +user_id },
        limit,
        offset: (+page - 1) * +limit,
        include: { model: Establishment, as: 'establishment' },
      });

      const count = await Favorite.count({ where: { user_id: +user_id } });

      return { favorites, count };
    } catch (e) {
      throw new ApiError(e.message, 400);
    }
  }
}
