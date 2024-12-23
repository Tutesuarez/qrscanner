import mongoose from 'mongoose';
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

// Resolver la ruta actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar archivo .env desde la ruta correcta
dotenv.config()
// dotenv.config({ path: path.join(__dirname, '../.env') });

// Conexión a MongoDB
const connectToDatabase = async () => {

    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb')
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar con MongoDB:', err));

};

// Iniciar conexión
connectToDatabase();

// Exportar la instancia de Mongoose por si se necesita en otros módulos
export default mongoose;
