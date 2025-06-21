# Imagen base oficial de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo los archivos de dependencias primero
COPY package*.json ./

# Instalar dependencias (esto se cachea mientras no cambie package.json)
RUN npm install

# Luego copiar el resto del código
COPY . .

# Exponer el puerto que usa el servidor
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["node", "server.js"]

