import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthHelper } from '../../helpers/auth.helper';
import { ApiError } from '../../errors/CustomError';

@Injectable()
export class AuthRefreshGuard implements CanActivate {
  constructor(private authHelper: AuthHelper) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<any>();

    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      throw new ApiError('Token is missing', 401);
    }
    const isValid = this.authHelper.verifyToken(refreshToken, 'REFRESH');

    if (isValid) {
      return true;
    }

    throw new ApiError('Invalid token', 401);
  }
}
