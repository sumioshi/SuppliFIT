# Tarefas do Projeto SuppliFIT

Este documento lista as tarefas planejadas e seu status atual para o projeto SuppliFIT. O SuppliFIT é uma plataforma que conecta consumidores a lojas de suplementos através de um modelo de assinatura.

## Entrega 01 - Documento com Decisões de Projeto
**Status**: Em andamento
**Data**: [Definir data]

### Tarefas
- [x] Definir tecnologias a serem utilizadas
  - Backend: Python 3.12, Django 5.1.7, DRF 3.15.2, PostgreSQL
  - Frontend: React 18, Redux Toolkit, Bootstrap 5
  - DevOps: Docker & Docker Compose
- [ ] Documentar decisões arquiteturais
- [ ] Criar diagrama da arquitetura proposta
- [x] Definir estrutura de diretórios
- [ ] Inserir link do repositório Git
- [ ] Revisar documentação

## Entrega 02 - MVP com Arquitetura MVC
**Status**: Em andamento
**Data**: [Definir data]

### Tarefas
- [x] Configurar ambiente de desenvolvimento com Docker
- [x] Configurar projeto Django
- [x] Implementar modelos (Models) para suplementos
  - [x] Modelo de Suplemento
  - [x] Modelo de Categoria de Suplemento
- [x] Implementar visualizações (Views) com Django REST Framework
  - [x] Serializadores para Suplementos e Categorias
- [x] Implementar controladores (ViewSets/Controllers)
  - [x] ViewSets para Suplementos e Categorias
- [x] Configurar estrutura básica do frontend React
- [x] Integrar componentes MVC no backend
- [x] Implementar interfaces básicas no frontend
  - [x] Criar serviço de API para suplementos
  - [x] Implementar estado global com Redux
  - [x] Criar componentes de card de suplemento
  - [x] Criar componente de filtros de suplementos
  - [x] Criar página de listagem de suplementos
  - [x] Criar página de detalhes de suplemento
- [ ] Testar funcionalidades básicas
- [ ] Documentar implementação

## Entrega 03 - Arquitetura em Camadas + Envio de Email
**Status**: Pendente
**Data**: [Definir data]

### Tarefas
- [ ] Refatorar código para arquitetura em camadas seguindo DDD
- [ ] Implementar camada de apresentação (API endpoints)
- [ ] Implementar camada de serviços de aplicação
- [ ] Implementar camada de domínio (regras de negócio)
- [ ] Implementar camada de infraestrutura (persistência)
- [ ] Configurar serviço de email com Django
- [ ] Implementar funcionalidade de envio de email no cadastro de usuários
- [ ] Implementar notificações por email para confirmação de assinatura
- [ ] Testar integração entre camadas
- [ ] Documentar arquitetura em camadas

## Entrega 04 - LogManager (Singleton Pattern)
**Status**: Pendente
**Data**: [Definir data]

### Tarefas
- [ ] Implementar classe LogManager com padrão Singleton
- [ ] Configurar níveis de log (INFO, WARNING, ERROR, DEBUG)
- [ ] Implementar persistência de logs (arquivo e banco de dados)
- [ ] Implementar rotação de logs
- [ ] Implementar formatação personalizada de logs
- [ ] Adicionar funcionalidade de filtros de logs
- [ ] Integrar LogManager com o restante da aplicação
- [ ] Adicionar logs em operações críticas da plataforma
- [ ] Testar funcionamento do LogManager
- [ ] Documentar implementação do padrão Singleton

## Entrega 05 - Implementação do Factory Method
**Status**: Pendente
**Data**: [Definir data]

### Tarefas
- [ ] Identificar classes candidatas para Factory Method no contexto de suplementos
- [ ] Implementar interface/classe abstrata SupplementCreator
- [ ] Implementar interface/classe abstrata Supplement
- [ ] Implementar classes concretas de suplementos (Protein, PreWorkout, AminoAcid, etc.)
- [ ] Implementar classes concretas de fábricas de suplementos
- [ ] Implementar sistema de criação dinâmica baseada em tipos
- [ ] Refatorar código existente para utilizar o Factory Method
- [ ] Implementar testes unitários para o Factory Method
- [ ] Testar flexibilidade e extensibilidade do padrão
- [ ] Documentar implementação do Factory Method com diagrama UML

## Descobertas Durante o Trabalho
Esta seção será atualizada à medida que novas tarefas ou subtarefas forem identificadas durante o desenvolvimento.

- [x] Implementação do app Supplements para gerenciar o catálogo de suplementos
  - [x] Criação de models (Supplement, SupplementCategory)
  - [x] Criação de serializadores
  - [x] Criação de viewsets
  - [x] Integração com URLs da API
  - [x] Configuração do Admin Django
- [ ] Implementar endpoints para busca de suplementos por tipo, categoria e marca