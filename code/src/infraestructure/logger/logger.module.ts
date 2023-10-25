import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  providers: [LoggerService, PrismaService],
})
export class LoggerModule {}
