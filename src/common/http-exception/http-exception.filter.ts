import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface RequestResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BadRequestException) {
      const responseBody = exception.getResponse() as RequestResponse;
      return response.status(exception.getStatus()).json({
        resCode: responseBody.statusCode,
        resDesc: responseBody.error?.toUpperCase().replace(' ', '_'),
        payload: {
          message: responseBody.message,
        },
      });
    }

    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse() as RequestResponse;
      return response.status(exception.getStatus()).json({
        ...responseBody,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      resCode: HttpStatus.INTERNAL_SERVER_ERROR,
      resDesc: 'INTERNAL_SERVER_ERROR',
    });
  }
}
