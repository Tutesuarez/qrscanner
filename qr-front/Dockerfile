# Usamos la imagen oficial de Node.js
FROM node:16

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de configuración y dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos de la app
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Exponemos el puerto
EXPOSE 80

# Comando para iniciar la aplicación (usando el servidor de producción de Vite)
CMD ["npm", "run", "preview"]
