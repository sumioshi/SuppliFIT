FROM node:20-alpine

# Configurar diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json package-lock.json* ./

# Remover node_modules se existir
RUN rm -rf node_modules

# Limpar cache do npm
RUN npm cache clean --force

# Instalar dependências
RUN npm install --legacy-peer-deps

# Instalar ajv manualmente
RUN npm install ajv@6.12.6 ajv-keywords@3.5.2

# Instalar styled-components e framer-motion
RUN npm install --save styled-components framer-motion @types/styled-components

# Copiar o código do projeto
COPY . .

# Expor a porta
EXPOSE 3000

# Desabilitar ESLint
ENV DISABLE_ESLINT_PLUGIN=true

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "start"] 