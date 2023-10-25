/* eslint-disable prettier/prettier */
import { Response } from 'express';
import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception.message)

    switch (exception.constructor) {
      case BadRequestException:
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 'error',
          error: 1,
          message: exception.message ?? 'Bad Request',
          timestamp: new Date().toISOString(),
        });
      case UnauthorizedException:
        return response.status(HttpStatus.UNAUTHORIZED).json({
          status: 'error',
          error: 2,
          message: exception.message ?? 'Unauthorized',
          timestamp: new Date().toISOString(),
        });
      case ForbiddenException:
        return response.status(HttpStatus.FORBIDDEN).json({
          status: 'error',
          error: 3,
          message: exception.message ?? 'Access Denied',
          timestamp: new Date().toISOString(),
        });
      case NotFoundException:
        return response.status(HttpStatus.NOT_FOUND).json({
          status: 'error',
          error: 4,
          message: exception.message ?? 'Route not found',
          timestamp: new Date().toISOString(),
        });
      case InternalServerErrorException:
        return response.status(HttpStatus.NOT_FOUND).json({
          status: 'error',
          error: 5,
          message:
            exception.message ?? 'Internal Server Error, please try again',
          timestamp: new Date().toISOString(),
        });
      default:
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: 99,
          message: 'Unhandled Error',
          timestamp: new Date().toISOString(),
        });
    }
  }
}
