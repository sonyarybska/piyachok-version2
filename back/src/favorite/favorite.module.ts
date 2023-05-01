import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite } from '../models/favorite.model';
import { FavoriteQueryParamService } from '../repository/favorite-query-params.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Favorite]), AuthModule],
  providers: [FavoriteService, FavoriteQueryParamService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
