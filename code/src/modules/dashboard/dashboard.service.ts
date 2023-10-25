/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}
  async getDashboard(): Promise<any> {
    // PEDIDOS FISICOS
    const totalPedidosFisicos = await this.prisma
      .$queryRaw`SELECT sum(enviosFisicos.quantidade) as qtd_pedidos FROM enviosFisicos`;
    const dataPedidosFisicos = await this.prisma
      .$queryRaw`SELECT mvno.noMvno as name, sum(enviosFisicos.quantidade) as value FROM enviosFisicos
    inner join mvno on (mvno.idMvno = enviosFisicos.idMvno)
    group by enviosFisicos.idMvno
    order by sum(enviosFisicos.quantidade) desc;`;

    const totalEnviosFisicos = await this.prisma
      .$queryRaw`SELECT sum(enviosFisicos.quantidade) as qtd_envios from enviosFisicos where dtEnvio is not null;`;
    const dataEnviosFisicos = await this.prisma
      .$queryRaw`SELECT mvno.noMvno as name, sum(enviosFisicos.quantidade) as value FROM enviosFisicos
    inner join mvno on (mvno.idMvno = enviosFisicos.idMvno)
    where dtEnvio is not null
    group by enviosFisicos.idMvno
    order by sum(enviosFisicos.quantidade) desc;`;

    // PEDIDOS VIRTUAIS
    const totalPedidosVirtuais = await this.prisma
      .$queryRaw`SELECT sum(enviosVirtuais.quantidade) as qtd_pedidos FROM enviosVirtuais`;
    const dataPedidosVirtuais = await this.prisma
      .$queryRaw`SELECT mvno.noMvno as name, sum(enviosVirtuais.quantidade) as value FROM enviosVirtuais
    inner join mvno on (mvno.idMvno = enviosVirtuais.idMvno)
    group by enviosVirtuais.idMvno
    order by sum(enviosVirtuais.quantidade) desc;`;

    const totalEnviosVirtuais = await this.prisma
      .$queryRaw`SELECT sum(enviosVirtuais.quantidade) as qtd_envios from enviosVirtuais where dtEnvio is not null;`;
    const dataEnviosVirtuais = await this.prisma
      .$queryRaw`SELECT mvno.noMvno as name, sum(enviosVirtuais.quantidade) as value FROM enviosVirtuais
    inner join mvno on (mvno.idMvno = enviosVirtuais.idMvno)
    where dtEnvio is not null
    group by enviosVirtuais.idMvno
    order by sum(enviosVirtuais.quantidade) desc;`;

    return [
      {
        category: 'Compras de Chips Fisicos',
        stat: totalPedidosFisicos[0]['qtd_pedidos'],
        data: dataPedidosFisicos,
      },
      {
        category: 'Compras de Chips virtuais',
        stat: totalPedidosVirtuais[0]['qtd_pedidos'],
        data: dataPedidosVirtuais,
      },
      {
        category: 'Envios de Chips Fisicos',
        stat: totalEnviosFisicos[0]['qtd_envios'],
        data: dataEnviosFisicos,
      },

      {
        category: 'Envios de Chips virtuais',
        stat: totalEnviosVirtuais[0]['qtd_envios'],
        data: dataEnviosVirtuais,
      },
    ];
  }

  async getGrafico(): Promise<any> {
    return [
      {
        Month: 'Jan 21',
        Sales: 2890,
        Profit: 2400,
        Profit2: 2400,
      },
      {
        Month: 'Feb 21',
        Sales: 1898,
        Profit: 1398,
        Profit2: 2400,
      },
      {
        Month: 'Feb 21',
        Sales: 1890,
        Profit: 1398,
        Profit2: 2400,
      },
      {
        Month: 'Jan 22',
        Sales: 3890,
        Profit: 2980,
        Profit2: 2400,
      },
    ];
  }
}
