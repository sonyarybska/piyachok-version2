import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { EstablishmentModule } from '../establishment/establishment.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import * as cookieParser from 'cookie-parser';
import { ReviewModule } from '../review/review.module';
import { FavoriteModule } from '../favorite/favorite.module';

import { Establishment } from '../models/establishment.model';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { Review } from '../models/review.model';
import { Favorite } from '../models/favorite.model';
import { Types } from '../models/types.model';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    EstablishmentModule,
    UserModule,
    AuthModule,
    ReviewModule,
    FavoriteModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Establishment, User, Token, Review, Favorite, Types],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
