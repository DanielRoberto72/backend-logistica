/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { PrismaService } from 'src/database/PrismaService';
import { Request } from 'express';
import { JwtPayload } from './models/jwt-payload.model';
import { User } from '@prisma/client';
import { LoggerService } from 'src/infraestructure/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private logger: LoggerService) {}

  public async createAccessToken(id: number, email: string, nivel: string): Promise<string> {
    this.logger.save(
      'AuthService.createAccessToken',
      200,
      `Token gerado para o usuário: ${email}`,
    );
    return sign(
      { id, nivel, enviroment: 'PRD' },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    );
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: jwtPayload.email,
      },
    });

    if (!user) {
      this.logger.save(
        'AuthService.validateUser',
        401,
        `Usuário Não autorizado : ${jwtPayload.email}`,
      );
      throw new UnauthorizedException('User unauthorized');
    }

    return user;
  }

  private static jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Token invalido');
    }

    const [, token] = authHeader.split(' ');

    return token;
  }

  public returnjwtExtractor(): (request: Request) => string {
    return AuthService.jwtExtractor;
  }
}
