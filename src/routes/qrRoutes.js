// routes/qrRoutes.js
import express from 'express';
import {addCode, checkCode, getAllCodes, clearDatabase, deleteCode} from '../controllers/qrController.js';

const router = express.Router();

// Modificar todas las rutas para poner directo todas las funciones 

router.post('/add-code', addCode);
router.post('/check-code', checkCode);
router.get('/get-codes', getAllCodes);
router.delete('/:id', deleteCode);
router.delete('/', clearDatabase);

export default router;