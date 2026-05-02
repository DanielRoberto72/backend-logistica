<h1 align="center">Backend — Sistema de Logística</h1>

<p align="center">
  REST API em <strong>NestJS</strong> + <strong>Prisma</strong> + <strong>MySQL</strong> para gestão de logística,
  com autenticação JWT, MFA e arquitetura modular por domínio.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-9-E0234E?style=flat-square&logo=nestjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-4-2D3748?style=flat-square&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white"/>
</p>

---

## Visão geral

API REST que expõe os recursos de um sistema de logística (usuários, níveis de acesso, MFA e módulos de domínio). Construída com foco em separação de responsabilidades, validação de entrada e autenticação stateless.

## Stack

- **Framework**: NestJS 9 (Node.js + TypeScript)
- **ORM**: Prisma 4
- **Banco**: MySQL
- **Auth**: JWT + Passport + bcrypt + MFA por código temporário
- **Validação**: `class-validator` / `class-transformer`
- **Container**: Dockerfile pronto para build

## Estrutura

```
code/
├── prisma/                  # schema.prisma + migrations
└── src/
    ├── database/            # acesso a dados (PrismaService)
    ├── helpers/             # utilitários transversais
    ├── infraestructure/     # camadas de infra (auth, mailer, etc.)
    └── modules/             # módulos de domínio (users, nivel, mfa, ...)
```

## Como rodar

```bash
# 1. Instalar dependências
cd code && npm install

# 2. Configurar .env (DATABASE_URL, JWT_SECRET, etc.)
cp .env.example .env

# 3. Rodar migrações
npx prisma migrate dev

# 4. Modo dev
npm run start:dev
```

API sobe em `http://localhost:3000`.

### Docker

```bash
docker build -t backend-logistica .
docker run -p 3000:3000 --env-file .env backend-logistica
```

## Status

Projeto formativo (2023). Mantido público como referência de stack NestJS/Prisma com autenticação completa.
