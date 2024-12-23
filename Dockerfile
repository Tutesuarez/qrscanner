# Usamos la imagen oficial de Node.js
FROM node:16

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de configuración y dependencias
COPY package*.json ./

# Instalamos las dependencias del backend
RUN npm install

# Copiamos el resto de los archivos del backend
COPY . .

# Exponemos el puerto 5000
EXPOSE 5000

# Comando para iniciar el servidor de Express
CMD ["npm", "start"]
