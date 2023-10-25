import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { GetConta } from './models/getConta.model';

@Injectable()
export class BssService {
  // REQUISIÇÃO NA API DE CONTA PARA BUSCAR INOFRMAÇÕES DO CLIENTE
  async getInfoBss(parameter: string): Promise<GetConta> {
    const token = await this.authBss();

    const config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `${process.env.URL_BASE_SPEC}/conta/${parameter}`,
      headers: {
        token: token,
      },
    };

    return axios
      .request(config)
      .then((response) => {
        return response.data.resultado;
      })
      .catch((error) => {
        console.log(error);
        throw new InternalServerErrorException();
      });
  }

  // REQUISIÇÃO PARA REALIZAR AUTENTICAÇÃO NO BSS
  private async authBss(): Promise<string> {
    const data = `email=${process.env.USER_API_BSS}&senha=${process.env.PASS_USER_API_BSS}`;

    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${process.env.URL_BASE_SPEC}/auth`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    return axios
      .request(config)
      .then((response) => {
        return response.data.token;
      })
      .catch((error) => {
        console.log(error);
        throw new InternalServerErrorException();
      });
  }
}
