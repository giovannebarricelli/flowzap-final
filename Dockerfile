# Usa uma imagem oficial que já vem com o Chrome e Node instalados
FROM ghcr.io/puppeteer/puppeteer:latest

USER root

# Garante que as permissões estejam certas para o disparador
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Porta padrão do Render
EXPOSE 10000

# Comando para ligar o motor
CMD ["node", "index.js"]
