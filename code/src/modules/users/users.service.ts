/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { EmailService } from 'src/infraestructure/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  // REALIZA A CRIAÇÃO DO USUARIO, USO INTERNO
  async create(email: string, senha: string, idNivel: string) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existUser) {
      throw new BadRequestException(`Usuário ${email} já existe`);
    }

    const data = await this.hash(email, senha, idNivel);

    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  // REALIZA A AUTORIZAÇÃO DO USUARIO
  public async login(data: UserDto): Promise<{
    email: string;
    nivel: string;
    message: string;
    enviroment: string;
  }> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.checkPassword(data.senha, user);


    await this.changeToLogged(user.id);
    try {
      const mfa = await this.mfa(user.id);
      this.emailService.sendMFA(mfa, user.email)
    } catch (error) {
      console.log(error);
    }

    return {
      email: user.email,
      nivel: user.idNivel,
      message: 'Usuário autenticado',
      enviroment: 'PRD',
    };
  }

  public async logout(data: any): Promise<{
    email: string;
    message: string;
  }> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    await this.changeToUnlogged(user.id);

    return {
      email: user.email,
      message: 'Usuário deslogado',
    };
  }

  public async validateMfa(data: any): Promise<{
    user: string,
    mfa: boolean,
    token: string
  }>{

    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    })

    if(!user){
      throw new NotFoundException({message: "erro ao identificar usuário"})
    }
    moment.locale('pt-br')
    const atual = moment().format('YYYY-MM-DD H:mm:ss');
    const dataExpiracao = moment(atual).toDate();
    const mfa = await this.prisma.mFA.findFirst({
      where:{
        idUser: user.id,
        isValid: 1,
        dtExpiracao: {
          gt: dataExpiracao
        }
      }
    })

    if(mfa.coMfa != data.mfa){
      throw new UnauthorizedException({message: 'Erro ao autenticar usuário'})
    }

    const jwtToken = await this.authService.createAccessToken(
      user.id,
      user.email,
      user.idNivel,
    );

    return({
      user: user.email,
      mfa: true,
      token: jwtToken
    })

  }

  public async validateLogin(data: any): Promise<{email: string, nivel: string}>{
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
        isLogged: 1,
        isMfa: 1
      },
    })

    if(!user){
      throw new UnauthorizedException({message: 'usuário não autorizado'})
    }

    return({
      email: data.email,
      nivel: user.idNivel
    })
  }

  // REALIZA A VALIDAÇÃO DA SENHA JÁ SALVA NO BANCO
  private async checkPassword(senha: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(senha, user.senha);

    if (!match) {
      throw new UnauthorizedException('Usuário não autorizado');
    }

    return match;
  }

  // REALIZA A CRIPTOGRAFIA DA SENHA E RETORNA UM USERDTO
  private async hash(
    email: string,
    senha: string,
    idNivel: string,
  ): Promise<UserDto> {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    const user = {
      email: email,
      senha: passwordHash,
      idNivel: idNivel,
    };

    return user;
  }

  private async changeToLogged(userId: number): Promise<boolean> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          isLogged: 1,
        },
      });

      return true;
    } catch {
      throw new InternalServerErrorException({
        message: 'erro interno do servidor changeToLogged',
      });
    }
  }

  private async changeToUnlogged(userId: number): Promise<boolean> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          isLogged: 0,
          isMfa: 0
        },
      });

      return true;
    } catch {
      throw new InternalServerErrorException({
        message: 'erro interno do servidor changeToUnlogged',
      });
    }
  }

  private async mfa(userId: number): Promise<any> {
    try {
      const generated = await this.prisma.mFA.findMany({
        where: {
          idUser: userId,
          isValid: 1
        },
      });

      if (!generated) {
        const mfa = await this.generateMfa(userId);

        return mfa;
      } else {
        generated.forEach(async (element) => {
          await this.prisma.mFA.update({
            where: {
              id: element.id,
            },
            data: {
              isValid: 0,
            },
          });
        });

        const mfa = await this.generateMfa(userId);
        return mfa;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        message: 'erro interno do servidor mfa',
      });
    }
  }

  private async generateMfa(userId: number): Promise<{
    coMfa: string;
  }> {
    const mfa = uuidv4();
    moment.locale('pt-br')
    const atual = moment().add(5, 'minutes').format('YYYY-MM-DD H:mm:ss');
    const dataExpiracao = moment(atual).toDate();
    const data = {
      coMfa: mfa,
      dtExpiracao: dataExpiracao,
      isValid: 1,
      idUser: userId,
    };

    await this.prisma.mFA.create({
      data,
    });

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isMfa: 1,
      },
    });

    return mfa;
  }
}
