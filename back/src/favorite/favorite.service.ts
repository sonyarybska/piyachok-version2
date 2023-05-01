import { Injectable } from '@nestjs/common';
import { Favorite } from '../models/favorite.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFavoriteDto } from './dto/create-favorite-dto';
import { FavoriteQueryParamService } from '../repository/favorite-query-params.service';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite) private favoriteRepository: typeof Favorite,
    private readonly favoriteParamService: FavoriteQueryParamService,
  ) {}

  async getAll() {
    return await this.favoriteRepository.findAll();
  }

  async addFavorite(createFavoriteDto: CreateFavoriteDto) {
    return await this.favoriteRepository.create(createFavoriteDto);
  }

  async getByUserId(id: number, query) {
    return await this.favoriteParamService.findByUserId(id, query);
  }

  async deleteOne(id: number, est_id: number) {
    return await this.favoriteRepository.destroy({
      where: { user_id: id, establishment_id: est_id },
    });
  }
}
