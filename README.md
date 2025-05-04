# SuppliFit - Um Gympass dos Suplementos

SuppliFit é uma plataforma que conecta consumidores a lojas de suplementos através de um modelo de assinatura, permitindo que os usuários retirem suplementos em lojas parceiras com base em seu plano.

## Tecnologias Utilizadas

### Backend

- Python 3.12
- Django 5.1.7
- Django REST Framework 3.15.2
- PostgreSQL 15
- Poetry para gerenciamento de dependências
- JWT para autenticação

### Frontend

- React 18
- Redux Toolkit
- React Router
- Bootstrap 5
- Axios
- TypeScript
- Styled Components
- Framer Motion

### DevOps

- Docker & Docker Compose
- Configuração para futura migração para Azure

## Estrutura do Projeto

O projeto segue uma arquitetura baseada em Domain-Driven Design (DDD):

```
supplifit/
├── backend/                # API Django/DRF
│   ├── supplifit/          # Configuração principal do Django
│   ├── users/              # Gerenciamento de usuários
│   ├── subscription_plans/ # Planos de assinatura
│   ├── supplements/        # Catálogo de suplementos
│   ├── orders/             # Gerenciamento de pedidos/retiradas
│   ├── partner_stores/     # Gerenciamento de lojas parceiras
├── frontend/               # Aplicação React
│   ├── public/
│   └── src/
│       ├── components/     # Componentes reutilizáveis
│       ├── features/       # Funcionalidades (Redux Toolkit)
│       ├── layouts/        # Layouts da aplicação
│       ├── pages/          # Páginas da aplicação
│       └── services/       # Serviços e API
└── docker-compose.yml      # Configuração Docker
```

## Configuração de Desenvolvimento

### Pré-requisitos

- Docker e Docker Compose
- Git
- Node.js 20+ (para desenvolvimento local do frontend)
- Python 3.12+ (para desenvolvimento local do backend)

### Passos para Execução

1. Clone o repositório:

```bash
git clone https://github.com/sumioshi/supplifit.git
cd supplifit
```

2. Configure as variáveis de ambiente do backend:

```bash
cp backend/.env.example backend/.env

# Edite o arquivo .env com as seguintes configurações:
DEBUG=True
SECRET_KEY=sua-chave-secreta-aqui
DB_NAME=supplifit
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

3. Inicie os containers:

```bash
# Construir e iniciar os containers
docker-compose up --build

# Para rodar em background
docker-compose up -d
```

4. Execute as migrações do banco de dados:

```bash
docker-compose exec backend python manage.py migrate
```

5. Crie um superusuário:

```bash
docker-compose exec backend python manage.py createsuperuser
```

6. Acesse a aplicação:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/v1/
   - Admin Django: http://localhost:8000/admin/

### Acessando o Banco de Dados

Para acessar o PostgreSQL via terminal:

```bash
# Acessar o psql
docker-compose exec db psql -U postgres -d supplifit

# Comandos úteis do psql:
\dt          # Listar todas as tabelas
\d tabela    # Descrever uma tabela específica
\l           # Listar todos os bancos de dados
\du          # Listar todos os usuários
\q           # Sair do psql
```

### Comandos Docker Úteis

```bash
# Parar todos os containers
docker-compose down

# Ver logs dos containers
docker-compose logs -f

# Reconstruir containers após alterações
docker-compose up --build

# Acessar o shell do container backend
docker-compose exec backend sh

# Acessar o shell do container frontend
docker-compose exec frontend sh
```

## Desenvolvimento

### Backend

O backend segue uma estrutura modular baseada em DDD:

- Cada app contém sua própria estrutura de models, serializers, viewsets, services, etc.
- A lógica de negócio é encapsulada em serviços (services/)
- Os testes são organizados por tipo (serializers, viewsets, etc.)

Para criar um novo app:

```bash
docker-compose exec backend python manage.py startapp nome_do_app
```

### Frontend

O frontend utiliza React com Redux Toolkit:

- Organizado por features (auth, subscription, etc.)
- Utiliza React Router para navegação
- Axios para comunicação com a API
- Bootstrap e Styled Components para estilização
- TypeScript para tipagem estática

### Estrutura de Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação:

1. Login: POST /api/token/
2. Refresh Token: POST /api/token/refresh/
3. Verificação: POST /api/token/verify/

### Rotas da API

- `/api/v1/users/` - Gerenciamento de usuários
- `/api/v1/supplements/` - Catálogo de suplementos
- `/api/v1/subscription-plans/` - Planos de assinatura
- `/api/v1/orders/` - Pedidos e retiradas
- `/api/v1/partner-stores/` - Lojas parceiras

## Contribuição

1. Crie uma branch a partir de `develop`:

```bash
git checkout -b feature/nome-da-feature develop
```

2. Faça suas alterações seguindo os padrões do projeto

3. Envie um Pull Request para a branch `develop`

## Solução de Problemas

### Problemas Comuns

1. Erro de conexão com o banco de dados:
   - Verifique se o container do PostgreSQL está rodando
   - Confirme as credenciais no arquivo .env
   - Execute `docker-compose down -v` para limpar volumes e recriar o banco

2. Erro de CORS:
   - Verifique se a URL do frontend está correta em CORS_ALLOWED_ORIGINS
   - Reinicie o container do backend

3. Erro de dependências:
   - Execute `docker-compose down`
   - Remova node_modules: `rm -rf frontend/node_modules`
   - Reconstrua: `docker-compose up --build`

## Licença

Este projeto é proprietário e confidencial. Todos os direitos reservados.
