# SuppliFit - Um Gympass dos Suplementos

SuppliFit é uma plataforma que conecta consumidores a lojas de suplementos através de um modelo de assinatura, permitindo que os usuários retirem suplementos em lojas parceiras com base em seu plano.

## Tecnologias Utilizadas

### Backend

- Python 3.12
- Django 5.1.7
- Django REST Framework 3.15.2
- PostgreSQL
- Poetry para gerenciamento de dependências
- JWT para autenticação

### Frontend

- React 18
- Redux Toolkit
- React Router
- Bootstrap 5
- Axios

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

### Passos para Execução

1. Clone o repositório:

```bash
git clone https://github.com/sumioshi/supplifit.git
cd supplifit
```

2. Configure as variáveis de ambiente:

```bash
cp backend/.env.example backend/.env
```

3. Inicie os containers:

```bash
docker-compose up -d
```

4. Crie um superusuário:

```bash
docker-compose exec backend python manage.py createsuperuser
```

5. Acesse a aplicação:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/v1/
   - Admin Django: http://localhost:8000/admin/

## Desenvolvimento

### Backend

O backend segue uma estrutura modular baseada em DDD, onde cada app Django representa um domínio específico do negócio:

- Cada app contém sua própria estrutura de models, serializers, viewsets, services, etc.
- A lógica de negócio é encapsulada em serviços (services/)
- Os testes são organizados por tipo (serializers, viewsets, etc.)

Para criar um novo app:

```bash
docker-compose exec backend python manage.py startapp nome_do_app
```

### Frontend

O frontend utiliza React com Redux Toolkit para gerenciamento de estado:

- Organizado por features (auth, subscription, etc.)
- Utiliza React Router para navegação
- Axios para comunicação com a API
- Bootstrap para estilização

## Contribuição

1. Crie uma branch a partir de `develop`:

```bash
git checkout -b feature/nome-da-feature develop
```

2. Faça suas alterações seguindo os padrões do projeto

3. Envie um Pull Request para a branch `develop`

## Licença

Este projeto é proprietário e confidencial. Todos os direitos reservados.
