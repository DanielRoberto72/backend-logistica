import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/PrismaService';
import { AuthModule } from '../auth/auth.module';
import { EmailService } from 'src/infraestructure/email/email.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, EmailService],
})
export class UsersModule {}
