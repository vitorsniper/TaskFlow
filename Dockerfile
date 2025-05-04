# syntax=docker/dockerfile:1
# Usar a versão mais recente do Ruby
ARG RUBY_VERSION=3.3.8
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# Aqui fica aplicação do rails
WORKDIR /rails

# Instalar pacotes básicos para desenvolvimento
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libvips postgresql-client nodejs npm && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Configuração do ambiente de desenvolvimento
ENV RAILS_ENV="development" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="production test"

# Etapa de build: Instalar pacotes necessários para compilar gems
FROM base AS build

# Instalar pacotes para compilar gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev libyaml-dev pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Instalar dependências do aplicativo (gems)
COPY Gemfile Gemfile.lock ./
RUN gem install rails
RUN bundle install

# Instalar pacotes do frontend
COPY frontend/package.json frontend/package-lock.json /frontend/
RUN cd /frontend && npm install

# Copiar o código do aplicativo para o contêiner
COPY . /rails

# Ajustar permissões para os arquivos executáveis
RUN chmod +x bin/* && \
    chmod +x bin/docker-entrypoint && \
    sed -i "s/\r$//g" bin/* && \
    sed -i 's/ruby\.exe$/ruby/' bin/*

# Etapa final: configuração de execução do aplicativo
FROM base

# Copiar artefatos construídos do estágio anterior (gems, código do app)
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Adicionar usuário não-root para execução do Rails com segurança
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER 1000:1000

# Entrada do contêiner: preparar banco de dados
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Expor a porta 3000 para acesso externo
EXPOSE 3000

# Comando para iniciar o servidor Rails
CMD ["rails", "server", "-b", "0.0.0.0"]
