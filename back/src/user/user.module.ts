import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UserHelper } from '../helpers/user.helper';
import { UserMiddleware } from './user.middleware';
import { Token } from '../models/token.model';
import { AuthHelper } from '../helpers/auth.helper';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { FileUploadHelper } from '../helpers/file-upload.helper';
import { Establishment } from '../models/establishment.model';
import { Review } from '../models/review.model';
import { Favorite } from '../models/favorite.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SequelizeModule.forFeature([Token]),
    SequelizeModule.forFeature([Establishment]),
    SequelizeModule.forFeature([Review]),
    SequelizeModule.forFeature([Favorite]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthHelper,
    JwtService,
    UserHelper,
    FileUploadHelper,
  ],
  exports: [UserModule],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
