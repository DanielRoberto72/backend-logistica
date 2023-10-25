import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmailService {
  async sendMFA(mfa: string, para: string): Promise<any> {
    const conteudo =
      '<!DOCTYPE html>\n<html lang="pt-br">\n<head>\n    <meta charset="UTF-8">\n    <title>Código de validação</title>\n\n  <style>\n    * {\n      padding: 0;\n      box-sizing: border-box;\n      margin: 0;\n      font-family: "Bree Serif", sans-serif;\n    }\n\n    .header {\n      width: 56vw;\n      height: 15vh;\n      background-color: #0000f9;\n      color: #FFF;\n      display: flex;\n      flex-direction: row;\n      justify-content: center;\n      align-items: center;\n    }\n\n    .footer {\n      width: 58vw;\n      height: 15vh;\n      background-color: #0000f9;\n      color: #FFF;\n      display: flex;\n      flex-direction: row;\n      justify-content: center;\n      align-items: center;\n    }\n\n    button {\n      width: 20vw;\n      height: 5vh;\n      color: #FFF;\n      background-color: #0000f9;\n      border-radius: 5px;\n      border: none;\n      cursor: pointer;\n    }\n\n    .body {\n      display: flex;\n      align-items: center;\n      flex-direction: column;\n      justify-content: center;\n      width: 58vw;\n      height: 50vh;\n    }\n\n  </style>\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap" rel="stylesheet">\n</head>\n<body>\n  <div class="header">\n      <h1>Código de Validação</h1>\n  </div>\n\n  <div class="body">\n    <p>O seu código de validação é: <br>  <span style="color: #0000f9; font-size: x-large; font-weight: bold;">' +
      mfa +
      '</span></p>\n    \n  </div>\n\n  <div class="footer">\n</div>\n</body>\n</html>';
    return axios
      .post('http://localhost:3002/api/v1/email/sendSimpleEmail', {
        titulo: 'Código de Validação - Gerenciamento Logistico',
        de: 'devops@surf.com.br',
        para,
        conteudo,
      })
      .then((response) => {
        return response.data;
      });
  }
}
