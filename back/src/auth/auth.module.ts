import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { RefreshTokenMiddleware } from './middlewares/refreshToken.middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../models/token.model';
import { AuthHelper } from 'src/helpers/auth.helper';
import { User } from 'src/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Token]),
    SequelizeModule.forFeature([User]),
  ],
  providers: [AuthService, AuthHelper, JwtService],
  controllers: [AuthController],
  exports: [AuthHelper, JwtService, AuthModule],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RefreshTokenMiddleware)
      .forRoutes({ path: 'auth/refresh', method: RequestMethod.GET });
  }
}
