# 🛠️ Workshop Tracker

Sistema fullstack para rastreamento de participação em workshops trimestrais da FAST Soluções, desenvolvido como desafio técnico para a vaga de Estágio em Desenvolvimento FullStack.

---

## 📋 Sobre o Projeto

A aplicação permite gerenciar e visualizar workshops e a participação dos colaboradores, oferecendo uma interface web intuitiva e uma API REST completa.

### Funcionalidades

- Listagem, criação, edição e remoção de
    - **colaboradores** e 
    - **workshops**
- Visualização dos colaboradores presentes em cada workshop
- Visualização dos workshops que cada colaborador participou
- **Dashboard** com gráficos de participação (barras e pizza)
- Documentação interativa da API via **Swagger**
- Dados iniciais pré-carregados via **Seed**

---

## 🧱 Tecnologias

### Backend
| Tecnologia | Versão |
|---|---|
| .NET (C#) | 8.0 |
| ASP.NET Core Minimal API | 8.0 |
| Entity Framework Core | 8.0 |
| Pomelo.EntityFrameworkCore.MySql | 8.0 |
| Swashbuckle (Swagger) | 8.0 |
| DotNetEnv | 3.1.1 |

### Frontend
| Tecnologia | Versão |
|---|---|
| Angular | 21.2 |
| Bootstrap | 5.3 |
| Chart.js + ng2-charts | 4.5 / 10.0 |
| TypeScript | 5.9 |

### Infraestrutura
| Tecnologia | Versão |
|---|---|
| MySQL | 8.0 |
| Docker + Docker Compose | Mais atual |
| Nginx | (produção do frontend) |

---

## 📁 Estrutura do Projeto

```
.
├── docker-compose.yml
├── .env                        # Variáveis de ambiente (não versionado)
├── .env.example                # Exemplo de variáveis de ambiente
│
├── back/
│   ├── Dockerfile
│   └── src/WorkshopTracker.API/
│       ├── Domain/Entities/        # Entidades de domínio
│       ├── Application/
│       │   ├── DTOs/               # Objetos de transferência de dados
│       │   ├── Interfaces/         # Contratos de repositórios e serviços
│       │   └── Services/           # Lógica de negócio
│       ├── Infraestructure/
│       │   ├── Data/               # DbContext e SeedData
│       │   └── Repositories/       # Implementações dos repositórios
│       ├── Endpoints/              # Mapeamento dos endpoints Minimal API
│       ├── Migrations/             # Migrações do banco de dados
│       └── Program.cs
│
└── front/
    ├── Dockerfile
    ├── nginx.conf
    └── src/app/
        ├── core/services/          # Serviços HTTP Angular
        ├── models/                 # Interfaces/modelos TypeScript
        └── pages/
            ├── colaboradores/      # Telas de colaboradores
            ├── workshops/          # Telas de workshops
            └── dashboard/          # Dashboard com gráficos
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados

### 1. Clone o repositório

```bash
git clone git@github.com:Thayroni-Lima/WorkshopsTracker.git
cd workshop-tracker
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus valores:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=workshop_tracker
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

### 3. Suba os containers

```bash
docker-compose up --build
```

Aguarde todos os serviços iniciarem. O backend aguarda o MySQL estar saudável antes de subir.

### 4. Acesse a aplicação

| Serviço | URL |
|---|---|
| Frontend (Angular) | http://localhost:4200 |
| Backend (API REST) | http://localhost:5064 |
| Swagger (Documentação) | http://localhost:5064/swagger |

---

## 🔧 Rodando Localmente (sem Docker)

### Backend

```bash
cd back/src/WorkshopTracker.API

# Certifique-se de ter um .env com as variáveis de banco configuradas
cp ../../.env.example .env

# Restaura dependências
dotnet restore

# Aplica as migrações
dotnet ef database update

# Inicia a API
dotnet run
```

### Frontend

```bash
cd front

# Instala as dependências
npm install

# Inicia o servidor de desenvolvimento
npm start
```

O frontend estará disponível em `http://localhost:4200`.

> **Atenção:** certifique-se de que a URL da API está correta em `src/environments/environment.ts`.

---

## 📡 Endpoints da API

A documentação completa e interativa está disponível em `/swagger` quando a API estiver rodando.

### Colaboradores — `/api/colaboradores`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/colaboradores` | Lista todos os colaboradores |
| GET | `/api/colaboradores/{id}` | Busca um colaborador por ID |
| POST | `/api/colaboradores` | Cria um novo colaborador |
| PUT | `/api/colaboradores/{id}` | Atualiza um colaborador |
| DELETE | `/api/colaboradores/{id}` | Remove um colaborador |
| GET | `/api/colaboradores/{id}/workshops` | Lista os workshops de um colaborador |

### Workshops — `/api/workshops`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/workshops` | Lista todos os workshops |
| GET | `/api/workshops/{id}` | Busca um workshop por ID |
| POST | `/api/workshops` | Cria um novo workshop |
| PUT | `/api/workshops/{id}` | Atualiza um workshop |
| DELETE | `/api/workshops/{id}` | Remove um workshop |
| GET | `/api/workshops/{id}/colaboradores` | Lista os colaboradores de um workshop |
| POST | `/api/workshops/{workshopId}/colaboradores/{colaboradorId}` | Associa um colaborador a um workshop |
| DELETE | `/api/workshops/{workshopId}/colaboradores/{colaboradorId}` | Remove a associação de um colaborador |

---

## 🗄️ Banco de Dados

O projeto utiliza **MySQL 8.0** com **Entity Framework Core** (Code First). As migrações são aplicadas automaticamente ao iniciar a aplicação.

Um **Seed** popula automaticamente o banco com dados iniciais de colaboradores e workshops para facilitar a visualização.

**Tabelas existentes:**

- `Colaborador` — Id, Nome
- `Workshop` — Id, Nome, DataRealizacao, Descricao
- `WorkshopColaborador` — Tabela de junção (relação N:N)

---

## 🖥️ Telas do Frontend

- **Dashboard** — Visão geral com gráfico de barras (workshops por colaborador) e gráfico de pizza (colaboradores por workshop)
- **Colaboradores** — Listagem, cadastro, edição e remoção de colaboradores; visualização dos workshops de cada colaborador
- **Workshops** — Listagem, cadastro, edição e remoção de workshops; visualização dos colaboradores presentes

---

## ✅ Checklist de Requisitos

### Backend
- [x] CRUD completo de `/api/colaboradores`
- [x] CRUD completo de `/api/workshops`
- [x] Persistência com banco de dados relacional (MySQL)
- [x] Documentação com Swagger
- [ ] Autenticação e autorização *(bônus não implementado)*

### Frontend
- [x] Tela de listagem de colaboradores
- [x] Tela de listagem de workshops
- [x] Detalhes do workshop com lista de colaboradores presentes
- [x] Integração com o backend
- [x] Gráfico de barras (workshops por colaborador)
- [x] Gráfico de pizza (colaboradores por workshop)

---

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica.