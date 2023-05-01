import { HttpException } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(message, status) {
    super(message, status);

    Error.captureStackTrace(this, this.constructor);
  }
}
