# Planejamento do Projeto SuppliFIT

## Visão Geral
SuppliFIT é uma plataforma que conecta consumidores a lojas de suplementos através de um modelo de assinatura, permitindo que os usuários retirem suplementos em lojas parceiras com base em seu plano. O projeto também implementa diversos padrões de arquitetura e design patterns como parte do processo de aprendizagem.

## Arquitetura do Projeto

### Estrutura de Diretórios
O projeto segue uma arquitetura baseada em Domain-Driven Design (DDD):

```
supplifit/
├── backend/                # API Django/DRF
│   ├── supplifit/          # Configuração principal do Django
│   ├── users/              # Gerenciamento de usuários
│   ├── subscription_plans/ # Planos de assinatura
│   ├── supplements/        # Catálogo de suplementos
│   ├── orders/             # Gerenciamento de pedidos/retiradas
│   ├── utils/              # Utilitários
│   │   └── logger/         # Sistema de log (Singleton)
│   └── factories/          # Implementação do Factory Method
├── frontend/               # Aplicação React
│   ├── public/
│   └── src/
│       ├── components/     # Componentes reutilizáveis
│       ├── features/       # Funcionalidades (Redux Toolkit)
│       ├── layouts/        # Layouts da aplicação
│       ├── pages/          # Páginas da aplicação
│       └── services/       # Serviços e API
├── docs/                   # Documentação do projeto
└── docker-compose.yml      # Configuração Docker
```

### Padrões de Arquitetura e Design
1. **Arquitetura MVC (Model-View-Controller)**
   - Implementada na Entrega 02
   - No backend Django, isso corresponde a:
     - M (Model): Models que representam os dados (ex: Supplement, SupplementCategory)
     - V (View): Serializers que formatam os dados (ex: SupplementSerializer)
     - C (Controller): ViewSets que processam requisições (ex: SupplementViewSet)
   - No frontend React, aplicamos o padrão:
     - M (Model): Redux store e slices que gerenciam o estado (ex: supplementsSlice)
     - V (View): Componentes React que renderizam a interface (ex: SupplementCard)
     - C (Controller): Thunks e reducers que processam as ações (ex: fetchSupplements)
   - Separação clara entre dados, apresentação e lógica de negócio
   - Implementada usando Django REST Framework no backend e Redux no frontend

2. **Arquitetura em Camadas**
   - Será implementada na Entrega 03
   - Divisão em camadas de apresentação, negócio e persistência

3. **Design Pattern Singleton**
   - Será implementado na Entrega 04
   - Aplicado no sistema de LogManager

4. **Design Pattern Factory Method**
   - Será implementado na Entrega 05
   - Aplicado na criação de objetos de forma flexível

## Tecnologias

### Backend
- Linguagem: Python 3.12
- Framework: Django 5.1.7 com Django REST Framework 3.15.2
- Banco de Dados: PostgreSQL
- Gerenciamento de Dependências: Poetry
- Autenticação: JWT

### Frontend
- Linguagem: JavaScript
- Framework: React 18
- Gerenciamento de Estado: Redux Toolkit
- Roteamento: React Router
- UI Framework: Bootstrap 5
- Comunicação com API: Axios

### DevOps
- Containerização: Docker & Docker Compose
- Futuro Deployment: Azure

### Ferramentas de Desenvolvimento
- Controle de Versão: Git
- Documentação: Markdown
- Testes: [A definir]

## Convenções de Código

### Nomenclatura
- Classes: PascalCase
- Métodos e Funções: camelCase
- Variáveis: camelCase
- Constantes: SNAKE_CASE_MAIÚSCULO

### Estrutura de Arquivos
- Máximo de 500 linhas por arquivo
- Agrupamento por módulo e funcionalidade
- Nomes de arquivos descritivos

## Fluxo de Desenvolvimento
1. Criação/atualização de testes
2. Implementação do código
3. Revisão do código
4. Integração com o repositório central

## Entregáveis Principais
1. Documento de Decisões de Projeto (Entrega 01)
2. MVP com Arquitetura MVC (Entrega 02)
3. Sistema em Camadas com Envio de Email (Entrega 03)
4. LogManager com Singleton Pattern (Entrega 04)
5. Implementação do Factory Method (Entrega 05)