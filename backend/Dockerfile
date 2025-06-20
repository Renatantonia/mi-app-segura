# Imagen base oficial de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del backend al contenedor
COPY . .

# Instalar las dependencias del backend
RUN npm install

# Exponer el puerto que usa tu servidor
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["node", "server.js"]
