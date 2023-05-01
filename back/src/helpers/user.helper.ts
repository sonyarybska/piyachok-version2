import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ApiError } from '../errors/CustomError';
import { StatusEnum } from '../errors/status-enum';

@Injectable()
export class UserHelper {
  private readonly CLIENT_ID: string;
  private readonly client: OAuth2Client;

  constructor() {
    this.CLIENT_ID =
      '940956205344-jq5i1r0avmeajjv9enjo46luepi52o1t.apps.googleusercontent.com';
    this.client = new OAuth2Client(this.CLIENT_ID);
  }

  checkGoogleId(id: string) {
    return this.client
      .verifyIdToken({
        idToken: id,
        audience: this.CLIENT_ID,
      })
      .catch((e) => {
        throw new ApiError(e.message, StatusEnum.BAD_REQUEST);
      });
  }
}
