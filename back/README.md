# WorkshopTracker API

API REST para rastreamento de participação em workshops, desenvolvida com ASP.NET Core Minimal API, EF Core e MySQL.

---

## Tecnologias

- .NET 8
- ASP.NET Core Minimal API
- Entity Framework Core 8
- MySQL 8
- Docker

---

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

| Ferramenta | Versão mínima | Download |
|---|---|---|
| .NET SDK | 8.0 | https://dotnet.microsoft.com/pt-br/download/dotnet/8.0 |
| Docker Desktop | qualquer | https://www.docker.com/products/docker-desktop |
| dotnet-ef (CLI) | 8.0 | via terminal (instrução abaixo) |

### Instalando o dotnet-ef

```bash
dotnet tool install --global dotnet-ef --version 8.0.0
```

---

## Configuração do ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/Thayroni-Lima/WorkshopsTracker.git
cd WorkshopTracker
```

### 2. Configure as variáveis de ambiente

Na raiz do back (raiz/back/), crie um arquivo `.env` baseado no `.env.example`:

```bash
# Linux / Mac
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Edite o `.env` com suas credenciais:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=workshoptracker
DB_USER=workshopuser
DB_PASSWORD=suasenha
```

---

## Subindo o projeto

### Opção A — Subindo por partes (recomendado para desenvolvimento)

#### 1. Suba o banco de dados

Na raiz do back:

```bash
docker compose up -d
```

Aguarde até o MySQL inicializar completamente. Verifique se está rodando:

```bash
docker compose ps
```

O status deve aparecer como `running` ou `Up`.


#### 2. Suba o backend

Ainda dentro de `src/WorkshopTracker.API`:

```bash
dotnet run

```

Migrations e seed rodam automaticamente.

A API estará disponível em:

```
http://localhost:5064
```

---

### Opção B — Subindo tudo via Docker (em breve)

> Docker completo (backend + frontend + banco) será configurado em uma próxima etapa do projeto.

---

## Documentação da API

Com o servidor rodando, acesse o Swagger em:

```
http://localhost:5064/swagger
```

---

## Endpoints disponíveis

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

## Exemplos de requisição

### Criar colaborador

```http
POST /api/colaboradores
Content-Type: application/json

{
  "nome": "João Silva"
}
```

### Criar workshop

```http
POST /api/workshops
Content-Type: application/json

{
  "nome": "Clean Architecture na prática",
  "descricao": "Workshop sobre organização de projetos .NET",
  "dataRealizacao": "2025-06-15"
}
```

### Associar colaborador a workshop

```http
POST /api/workshops/1/colaboradores/2
```

---

## Estrutura do projeto

```
WorkshopTracker/back
│
├── src/
│   └── WorkshopTracker.API/
│       ├── Domain/
│       │   └── Entities/          # Entidades do domínio
│       ├── Application/
│       │   ├── DTOs/              # Objetos de transferência de dados
│       │   ├── Interfaces/        # Contratos de Services e Repositories
│       │   └── Services/          # Regras de negócio
│       ├── Infrastructure/
│       │   ├── Data/              # DbContext e configuração do EF Core
│       │   └── Repositories/      # Acesso ao banco de dados
│       ├── Endpoints/             # Mapeamento dos endpoints Minimal API
│       └── Program.cs
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Comandos úteis

### Migrations

```bash
# Criar nova migration
dotnet ef migrations add NomeDaMigration

# Aplicar migrations pendentes
dotnet ef database update

# Reverter última migration
dotnet ef database update NomeDaMigrationAnterior
```

### Docker

```bash
# Subir containers em background
docker compose up -d

# Ver status dos containers
docker compose ps

# Ver logs do MySQL
docker compose logs mysql

# Derrubar containers e remover volumes
docker compose down -v
```

---

## Observações

- O arquivo `.env` contém credenciais sensíveis e **não deve ser versionado**. Ele está listado no `.gitignore`.
- Use o `.env.example` como referência para configurar seu ambiente local.
- O cascade delete está configurado: ao remover um workshop, todas as associações de colaboradores são removidas automaticamente.
