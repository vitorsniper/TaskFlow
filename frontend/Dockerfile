# Etapa de build com Node baseado em Debian
FROM node:20 AS builder

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (para cache eficiente)
COPY package*.json ./

# Remove o package-lock.json e node_modules se existirem (evita bugs com rollup nativo)
RUN rm -rf package-lock.json node_modules

# Reinstala todas as dependências corretamente
RUN npm install

# Copia o restante do projeto
COPY . .

# Roda o build
RUN npm run build

# Etapa final com Nginx para servir os arquivos estáticos
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
