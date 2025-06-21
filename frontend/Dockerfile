# Imagen base oficial de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos del frontend al contenedor
COPY . .

# Instalar dependencias y construir la app
RUN npm install
RUN npm run build

# Instalar servidor estático para servir React
RUN npm install -g serve

# Exponer el puerto 3000 (por defecto en React)
EXPOSE 3000

# Comando para iniciar la app
CMD ["serve", "-s", "build"]
