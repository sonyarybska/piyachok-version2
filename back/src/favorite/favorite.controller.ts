import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { FavoriteResponseDto } from './dto/favorite-response-dto';
import { CreateFavoriteDto } from './dto/create-favorite-dto';
import { FavoriteService } from './favorite.service';
import { StatusEnum } from '../errors/status-enum';
import { MassageEnum } from '../errors/message-enum';
import { AuthAccessGuard } from '../auth/guards/auth-access.guard';
import { FavoriteQueryDto } from './dto/favorite-query-dto';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
  @ApiResponse({
    status: StatusEnum.OK,
    description: 'All favorite establishment',
    type: [FavoriteResponseDto],
  })
  @Get()
  async getAllFavorites(@Res() res: Response) {
    const favorites = await this.favoriteService.getAll();
    res.status(StatusEnum.OK).json(favorites);
  }

  @ApiResponse({
    status: StatusEnum.CREATED,
    description: MassageEnum.ADD_ITEM,
  })
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  async postOneFavorites(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @Res() res: Response,
  ) {
    await this.favoriteService.addFavorite(createFavoriteDto);
    res.status(StatusEnum.CREATED).json(MassageEnum.ADD_ITEM);
  }

  @ApiResponse({
    status: StatusEnum.OK,
    description: 'Favorite by user id',
    type: [FavoriteResponseDto],
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  @Get(':id')
  async getByUserId(
    @Param('id') id: number,
    @Res() res: Response,
    @Query() query: FavoriteQueryDto,
  ) {
    const review = await this.favoriteService.getByUserId(id, query);
    res.status(StatusEnum.OK).json(review);
  }

  @ApiResponse({
    status: StatusEnum.NO_CONTENT,
    description: MassageEnum.DELETE_ITEM,
  })
  @ApiBearerAuth()
  @UseGuards(AuthAccessGuard)
  @Delete(':id/:est_id')
  async deleteOneFavorite(
    @Param('id') id: number,
    @Param('est_id') est_id: number,
    @Res() res: Response,
  ) {
    await this.favoriteService.deleteOne(id, est_id);
    res.status(StatusEnum.NO_CONTENT).json(MassageEnum.DELETE_ITEM);
  }
}
