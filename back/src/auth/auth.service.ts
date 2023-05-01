import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthHelper } from '../helpers/auth.helper';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { ApiError } from '../errors/CustomError';
import { StatusEnum } from '../errors/status-enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authHelper: AuthHelper,
    @InjectModel(Token) private tokenRepository: typeof Token,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async login(res, req): Promise<any> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: req.query.email },
      });

      const { user_id, email } = findUser.dataValues;

      const tokens = await this.authHelper.generateTokens({
        user_id,
        email,
      });

      await this.authHelper.saveTokens(user_id, tokens.refresh_token);

      res.cookie('refreshToken', tokens.refresh_token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      const user = findUser.dataValues;
      return { user, tokens };
    } catch (e) {
      console.log(e.message);
    }
  }

  async refresh(res, req): Promise<any> {
    try {
      const user = req.user;

      const tokens = await this.authHelper.generateTokens(user);

      await this.authHelper.saveTokens(user.user_id, tokens.refresh_token);

      res.cookie('refreshToken', tokens.refresh_token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return { user, tokens };
    } catch (e) {
      console.log(e.message);
    }
  }

  async logout(res, req) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        throw new ApiError('Token is missing', StatusEnum.BAD_REQUEST);
      }

      await this.tokenRepository.destroy({
        where: { refresh_token: refreshToken },
      });

      res.clearCookie('refreshToken');
    } catch (e) {
      console.log(e.message);
    }
  }
}
