import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { ApiError } from './CustomError';

@Catch(ApiError)
export class ErrorMiddleware implements ExceptionFilter {
  catch(error: ApiError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (error instanceof HttpException) {
      response.status(error.getStatus()).json(error.getResponse());
    } else {
      response.status(500).json({
        message: 'Server error',
      });
    }
  }
}
