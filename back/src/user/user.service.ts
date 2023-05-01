import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { AuthHelper } from '../helpers/auth.helper';
import { Token } from '../models/token.model';
import { FileUploadHelper } from '../helpers/file-upload.helper';
import { Establishment } from '../models/establishment.model';
import { Review } from '../models/review.model';
import { Favorite } from '../models/favorite.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private readonly authHelper: AuthHelper,
    private readonly fileUploadService: FileUploadHelper,
    @InjectModel(Token) private tokenRepository: typeof Token,
    @InjectModel(Establishment)
    private establishmentRepository: typeof Establishment,
    @InjectModel(Review) private reviewRepository: typeof Review,
    @InjectModel(Favorite) private favoriteRepository: typeof Favorite,
  ) {}
  async getAll() {
    return await this.userRepository.findAll();
  }

  async getOne(id: number) {
    return await this.userRepository.findOne({ where: { user_id: id } });
  }

  async putUser(id: number, data) {
    return await this.userRepository.update(
      { ...data },
      { where: { user_id: id } },
    );
  }

  async addUser(user: any, res: any): Promise<any> {
    try {
      const existUser = await this.userRepository.findOne({
        where: { email: user.email },
      });

      const { email, name, picture } = user;

      if (existUser) {
        res.redirect(`/auth/login?email=${existUser.dataValues.email}`);
      } else {
        const createdUser = await this.userRepository.create(
          { name, email, picture },
          { returning: true },
        );

        const user_id = createdUser.user_id;

        const tokens = await this.authHelper.generateTokens({
          user_id,
          email,
        });

        await this.authHelper.saveTokens(user_id, tokens.refresh_token);

        return { tokens, createdUser };
      }
    } catch (e) {
      res.json(e.message);
    }
  }

  async deleteUser(id: number) {
    try {
      await this.establishmentRepository.destroy({ where: { user_id: +id } });
      await this.fileUploadService.deletePhotoByUserId(id);
      await this.favoriteRepository.destroy({ where: { user_id: +id } });
      await this.tokenRepository.destroy({ where: { user_id: +id } });
      await this.reviewRepository.destroy({ where: { user_id: +id } });
      await this.userRepository.destroy({ where: { user_id: +id } });
      return true;
    } catch (e) {
      console.log(e.message);
    }
  }
}
