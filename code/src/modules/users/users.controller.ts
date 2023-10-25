/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/gerenciamento-logistico')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/user/create')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() userDto: UserDto): Promise<User> {
    const { email, senha, idNivel } = userDto;
    console.log(userDto);
    return this.usersService.create(email, senha, idNivel);
  }

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  public async auth(@Body() data: UserDto): Promise<{
    email: string;
  }> {
    return this.usersService.login(data);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async logout(@Body() data: any): Promise<{
    email: string;
  }> {
    return this.usersService.logout(data);
  }

  @Post('validateMfa')
  @HttpCode(HttpStatus.OK)
  public async validateMfa(@Body() data: any): Promise<{
    user: string;
    mfa: boolean;
  }> {
    return this.usersService.validateMfa(data);
  }

  @Post('validateLogin')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async validateLogin(@Body() data: any): Promise<{
    email: string;
  }> {
    return this.usersService.validateLogin(data);
  }
}
