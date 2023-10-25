/* eslint-disable prettier/prettier */
import {
  Get,
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/gerenciamento-logistico')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('dashboard')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async getDashboard(): Promise<any> {
    return this.dashboardService.getDashboard();
  }

  @Get('dashboard/grafico')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async getGrafico(): Promise<any> {
    return this.dashboardService.getGrafico();
  }
  
}
