/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../models/jwt-payload.model';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
        jwtFromRequest: authService.returnjwtExtractor(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET
    
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<User>{

    const user = await this.authService.validateUser(jwtPayload)
    if (!user){
        throw new UnauthorizedException (`Access denied for user ${jwtPayload.email}`)
    }

    return user
    
  }
}
