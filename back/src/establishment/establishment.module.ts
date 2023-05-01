import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { MulterModule } from '@nestjs/platform-express';
import { Establishment } from '../models/establishment.model';
import { FileUploadHelper } from '../helpers/file-upload.helper';
import { EstablishmentQueryParamService } from '../repository/establishment-query-param.service';
import { Review } from '../models/review.model';
import { Types } from '../models/types.model';
import { EstablishmentMiddleware } from './establishment.middleware';
import { Favorite } from '../models/favorite.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Establishment]),
    SequelizeModule.forFeature([Review]),
    SequelizeModule.forFeature([Favorite]),
    SequelizeModule.forFeature([Types]),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
  ],
  providers: [
    EstablishmentService,
    FileUploadHelper,
    EstablishmentQueryParamService,
  ],
  controllers: [EstablishmentController],
  exports: [EstablishmentModule, SequelizeModule],
})
export class EstablishmentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EstablishmentMiddleware)
      .forRoutes({ path: 'establishments/:id', method: RequestMethod.PUT });
  }
}
