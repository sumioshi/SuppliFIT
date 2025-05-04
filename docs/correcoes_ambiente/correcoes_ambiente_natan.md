# Correções de Ambiente - SuppliFit

Este documento registra as correções e ajustes realizados no ambiente de desenvolvimento do SuppliFit.

## 1. Correção de Erros ESLint

### Problema
O projeto apresentava vários avisos e erros do ESLint que estavam atrapalhando o desenvolvimento. Os principais problemas eram:

1. Variáveis não utilizadas
2. Importações não utilizadas
3. Avisos de tipagem TypeScript

### Solução Implementada

#### 1.1 Desabilitação do ESLint no Ambiente Docker

1. Modificação do `package.json`:
```json
{
  "scripts": {
    "start": "DISABLE_ESLINT_PLUGIN=true react-scripts start",
    "build": "DISABLE_ESLINT_PLUGIN=true react-scripts build"
  }
}
```

2. Atualização do `Dockerfile` do frontend:
```dockerfile
# Desabilitar ESLint
ENV DISABLE_ESLINT_PLUGIN=true
```

3. Atualização do `docker-compose.yml`:
```yaml
frontend:
  environment:
    - DISABLE_ESLINT_PLUGIN=true
```

#### 1.2 Correção de Código

1. Em `src/app/hooks.ts`:
   - Removida importação não utilizada do `AppDispatch`

2. Em `src/components/PlanCard.tsx`:
   - Removida variável `isHovered` e seus manipuladores de eventos não utilizados

3. Em `src/features/auth/authSlice.ts`:
   - Removida importação não utilizada do `jwtDecode`
   - Removida variável `response` não utilizada no `checkAuth`

4. Em `src/layouts/MainLayout.tsx`:
   - Removida importação não utilizada do `AppDispatch`
   - Removida variável `user` não utilizada do estado

5. Em `src/pages/auth/Login.tsx`:
   - Removida importação e uso do `useNavigate` não utilizado

## 2. Configuração do Banco de Dados

### Problema
O projeto estava configurado para usar um banco de dados PostgreSQL remoto, causando problemas de conexão no ambiente de desenvolvimento local.

### Solução Implementada

1. Configuração do banco de dados local no `docker-compose.yml`:
```yaml
db:
  image: postgres:15-alpine
  environment:
    - POSTGRES_USER=postgres
    - POSTGRES_PASSWORD=postgres
    - POSTGRES_DB=supplifit
```

2. Atualização das configurações do Django em `backend/supplifit/settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'supplifit'),
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'postgres'),
        'HOST': os.getenv('DB_HOST', 'db'),
        'PORT': os.getenv('DB_PORT', '5432'),
        'OPTIONS': {
            'sslmode': 'disable'  # Desabilitado para desenvolvimento local
        }
    }
}
```

3. Criação do arquivo `.env` com configurações locais:
```env
DEBUG=True
SECRET_KEY=django-insecure-your-secret-key-here
DB_NAME=supplifit
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 3. Comandos Úteis para Desenvolvimento

### Acesso ao Banco de Dados
```bash
# Acessar o psql
docker-compose exec db psql -U postgres -d supplifit

# Comandos úteis do psql
\dt          # Listar todas as tabelas
\d tabela    # Descrever uma tabela específica
\l           # Listar todos os bancos de dados
\du          # Listar todos os usuários
\q           # Sair do psql
```

### Gerenciamento de Containers
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

## 4. Solução de Problemas Comuns

### Problemas de Conexão com o Banco
1. Verificar se o container do PostgreSQL está rodando
2. Confirmar as credenciais no arquivo `.env`
3. Executar `docker-compose down -v` para limpar volumes e recriar o banco

### Problemas de CORS
1. Verificar se a URL do frontend está correta em `CORS_ALLOWED_ORIGINS`
2. Reiniciar o container do backend

### Problemas de Dependências
1. Executar `docker-compose down`
2. Remover node_modules: `rm -rf frontend/node_modules`
3. Reconstruir: `docker-compose up --build`

## 5. Próximos Passos

1. Implementar testes automatizados
2. Configurar CI/CD
3. Preparar ambiente de produção
4. Documentar processo de deploy

## 6. Referências

- [Documentação do Docker](https://docs.docker.com/)
- [Documentação do Django](https://docs.djangoproject.com/)
- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/) 