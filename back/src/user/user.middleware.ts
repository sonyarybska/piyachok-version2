import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserHelper } from '../helpers/user.helper';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userHelper: UserHelper) {}

  async use(req: any, res: any, next: any) {
    try {
      const { clientId } = req.body;

      req.user = await this.userHelper.checkGoogleId(clientId);
      next();
    } catch (e) {
      next(e);
    }
  }
}
