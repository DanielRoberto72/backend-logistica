import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class LoggerService {
  constructor(private prisma: PrismaService) {}

  async save(modulo: string, statusCode: number, log: string): Promise<void> {
    const data = {
      statusCode,
      modulo,
      log,
    };

    console.log(data)
  }
}
