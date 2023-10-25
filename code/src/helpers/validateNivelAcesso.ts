/* eslint-disable prettier/prettier */

import { PrismaService } from 'src/database/PrismaService';

export default class ValidateNivelAcesso {
  constructor(private prisma = new PrismaService()) {}
  public async validateNivelAcesso(
    email: string,
    idNivel: string,
  ): Promise<boolean> {
    const nivel = await this.prisma.user.findFirst({
      where: {
        email: email,
        idNivel: idNivel,
      },
    });

    if (nivel) {
      return true;
    }

    return false;
  }
}
