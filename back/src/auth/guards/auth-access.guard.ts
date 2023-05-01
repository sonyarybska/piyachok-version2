import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthHelper } from '../../helpers/auth.helper';
import { ApiError } from '../../errors/CustomError';

@Injectable()
export class AuthAccessGuard implements CanActivate {
  constructor(private authHelper: AuthHelper) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<any>();
    if (!request.headers.authorization) {
      throw new ApiError('Token is missing', 401);
    }
    const accessToken = request.headers.authorization.split(' ')[1];

    if (!accessToken) {
      throw new ApiError('Token is missing', 401);
    }

    const isValid = this.authHelper.verifyToken(accessToken);

    if (isValid) {
      return true;
    }

    throw new ApiError('Invalid token', 401);
  }
}
