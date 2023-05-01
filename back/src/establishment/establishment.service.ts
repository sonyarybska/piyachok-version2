import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { PatchEstablishmentDto } from './dto/patch-establishment-dto';
import { PutEstablishmentDto } from './dto/put-establishment-dto';
import { Establishment } from '../models/establishment.model';
import { FileUploadHelper } from '../helpers/file-upload.helper';
import { EstablishmentQueryParamService } from '../repository/establishment-query-param.service';
import { Types } from '../models/types.model';
import { Favorite } from '../models/favorite.model';
import { Review } from '../models/review.model';
import { User } from '../models/user.model';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectModel(Establishment)
    private establishmentRepository: typeof Establishment,
    @InjectModel(Favorite)
    private favoriteRepository: typeof Favorite,
    @InjectModel(Review)
    private reviewRepository: typeof Review,
    @InjectModel(Types)
    private typesRepository: typeof Types,
    private establishmentQueryParamsService: EstablishmentQueryParamService,
    private readonly fileUploadService: FileUploadHelper,
  ) {}

  async getAll(
    query: any,
  ): Promise<{ establishments: any; maxCheck: unknown; count: number }> {
    return await this.establishmentQueryParamsService.find(query);
  }

  async getAllByUserId(
    query: any,
    id: number,
  ): Promise<{
    establishments: Establishment[];
    count: number;
  }> {
    return await this.establishmentQueryParamsService.findByUserId(query, id);
  }

  async getOne(id: number): Promise<Establishment> {
    return this.establishmentRepository.findOne({
      where: { establishment_id: id },
      include: User,
    });
  }

  async geEstablishmentTypes(): Promise<Types[]> {
    return this.typesRepository.findAll();
  }

  async addEstablishment(
    establishment,
    files: Array<Express.Multer.File>,
  ): Promise<any> {
    try {
      const created = await this.establishmentRepository
        .create(
          {
            ...establishment,
          },
          { returning: true },
        )
        .catch(() => null);

      await this.fileUploadService.postEstablishmentPhotos(created, files);

      return true;
    } catch (e) {
      console.log(e.message);
    }
  }

  async deleteEstablishment(id: number): Promise<void> {
    await this.fileUploadService.deletePhotoByEstId(id);
    await this.establishmentRepository.destroy({
      where: { establishment_id: id },
    });
    await this.favoriteRepository.destroy({
      where: { establishment_id: id },
    });

    await this.reviewRepository.destroy({
      where: { establishment_id: id },
    });
  }

  async putEstablishment(
    id: number,
    establishment: PutEstablishmentDto,
    files,
    user_id,
  ) {
    await this.establishmentRepository.update(
      { ...establishment },
      { where: { establishment_id: +id } },
    );
    await this.fileUploadService.updateEstablishmentPhotos(id, user_id, files);
  }

  async patchEstablishment(id: number, establishment: PatchEstablishmentDto) {
    return await this.establishmentRepository.update(
      { ...establishment },
      { where: { establishment_id: id }, returning: true },
    );
  }
}
