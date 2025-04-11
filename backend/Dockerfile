FROM python:3.12-slim

# Definir variáveis de ambiente
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV POETRY_VERSION=1.7.1
ENV POETRY_HOME=/opt/poetry
ENV POETRY_VENV=/opt/poetry-venv
ENV POETRY_CACHE_DIR=/opt/.cache

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  libpq-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Instalar Poetry
RUN python3 -m venv $POETRY_VENV \
  && $POETRY_VENV/bin/pip install -U pip setuptools \
  && $POETRY_VENV/bin/pip install poetry==${POETRY_VERSION}

# Adicionar Poetry ao PATH
ENV PATH="${POETRY_VENV}/bin:${PATH}"

# Configurar diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração do Poetry
COPY pyproject.toml poetry.lock* ./

# Configurar Poetry para não criar ambiente virtual
RUN poetry config virtualenvs.create false

# Instalar dependências
RUN poetry install --no-interaction --no-ansi --no-root

# Copiar o código do projeto
COPY . .

# Expor a porta
EXPOSE 8000

# Comando para iniciar o servidor
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "supplifit.wsgi:application"] 