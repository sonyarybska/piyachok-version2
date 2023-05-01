import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthHelper } from '../../helpers/auth.helper';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from '../../models/token.model';
import { User } from '../../models/user.model';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly authHelper: AuthHelper,
    @InjectModel(Token) private tokenRepository: typeof Token,
  ) {}

  async use(req: any, res: any, next: any) {
    try {
      const { refreshToken } = req.cookies;

      const tokenResponse = await this.tokenRepository.findOne({
        where: { refresh_token: refreshToken },
        include: User,
      });

      if (!tokenResponse?.dataValues || !tokenResponse?.dataValues.user) {
        throw new UnauthorizedException('Un');
      }

      await this.tokenRepository.destroy({
        where: { refresh_token: refreshToken },
      });

      req.user = tokenResponse.user.dataValues;

      next();
    } catch (e) {
      next(e);
    }
  }
}
