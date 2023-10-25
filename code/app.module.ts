/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './src/modules/users/users.module';
import { PrismaService } from './src/database/PrismaService';
import { DashboardModule } from './src/modules/dashboard/dashboard.module';
import { EmailModule } from './src/infraestructure/email/email.module';

@Module({
  imports: [UsersModule, DashboardModule, EmailModule],
  providers: [PrismaService],
})
export class AppModule {}
