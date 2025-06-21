# MiApp Segura - Pipeline DevSecOps

## Descripción

Aplicación web simple de notas personales con integración de un pipeline DevSecOps que automatiza controles de seguridad, análisis de vulnerabilidades y despliegue en contenedores.

## Características

- Login básico (frontend con almacenamiento en localStorage)
- Gestión de notas: crear, ver y guardar
- Containerización con Docker y Docker Compose
- Pipeline CI/CD con herramientas de seguridad:
  - CodeQL (análisis estático)
  - Trivy (escaneo de vulnerabilidades)
  - Docker Build

## Estructura del proyecto

MI-APP-SEGURA/
├── .github/
│   └── workflows/
│       └── pipeline.yml             
│
├── backend/
│   ├── Dockerfile                   
│   ├── notes.json                   
│   ├── users.json                   
│   ├── server.js                    
│   ├── package.json                 
│
├── frontend/
│   ├── Dockerfile                   
│   ├── public/
│   ├── src/
│   │   ├── App.js                   
│   │   ├── Login.js                 
│   │   ├── Register.js              
│   │   ├── Notes.js                 
│   │   ├── RutaPrivada.js           
│   ├── package.json                 
│
├── docker-compose.yml              
├── README.md                       

## 🖥 Instalación Local

### 1. Clonar el repositorio

```bash
git https://github.com/Renatantonia/mi-app-segura
cd mi-app-segura
```

### 2. Instalar Docker (si no lo tienes)

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### 3. Ejecutar la aplicación con Docker Compose

```bash
docker-compose up --build
```

- El frontend se ejecutará en `http://localhost:3000`
- El backend en `http://localhost:3001`

## 🔄 Alternativa: Ejecutar sin Docker

### Backend (Node.js)

```bash
cd backend
npm install
node server.js
```

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

## 🔐 Pipeline DevSecOps

El pipeline CI/CD se ejecuta automáticamente al hacer push a la rama `main`.

### Herramientas utilizadas:

- **CodeQL**: analiza el código JavaScript en busca de vulnerabilidades
- **Trivy**: escanea las imágenes Docker en busca de CVEs
- **Docker Build**: construye imágenes para frontend y backend

## 📄 Licencia

MIT License. Puedes usar, modificar y distribuir libremente.

---

> Proyecto desarrollado para el curso universitario de la UCN DevSecOps CiberSeguridad III
