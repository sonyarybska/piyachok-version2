import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from '../models/token.model';
import { Tokens } from '../interfaces';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Token)
    private tokenRepository: typeof Token,
  ) {}

  async generateTokens(user: any): Promise<Tokens> {
    try {
      const payload = { username: user.username };
      const access_token = this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: 'secret1',
      });
      const refresh_token = this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: 'secret2',
      });
      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      console.log(e.message);
    }
  }

  async saveTokens(userId, refreshToken) {
    try {
      const token = await this.tokenRepository.findOne({
        where: { user_id: userId },
      });

      if (token) {
        token.refresh_token = refreshToken;
        return token.save();
      } else {
        await Token.create({ user_id: userId, refresh_token: refreshToken });
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  verifyToken(token, type = 'ACCESS') {
    try {
      let secretWord = '';
      switch (type) {
        case 'ACCESS':
          secretWord = 'secret1';
          break;
        case 'REFRESH':
          secretWord = 'secret2';
      }
      this.jwtService.verify(token, { secret: secretWord });
      return true;
    } catch (e) {
      return false;
    }
  }
}
