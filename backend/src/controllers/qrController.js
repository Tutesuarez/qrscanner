// // controllers/qrController.js
// import { addQRCode, checkQRCode } from '../services/qrService.js';

// export const createQRCode = async (req, res) => {
//     try {
//         const { code } = req.body;
//         if (!code) {
//             return res.status(400).json({ message: 'El código QR es requerido' });
//         }
//         const newQRCode = await addQRCode(code);
//         res.status(201).json({ message: 'Código QR agregado correctamente', data: newQRCode });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// export const verifyQRCode = async (req, res) => {
//     try {
//         const { code } = req.body;
//         if (!code) {
//             return res.status(400).json({ message: 'El código QR es requerido' });
//         }
//         const exists = await checkQRCode(code);
//         if (exists) {
//             res.json({ match: true, message: '¡El código QR está registrado!' });
//         } else {
//             res.json({ match: false, message: 'El código QR no está registrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al verificar el código QR' });
//     }
// };
import qrService from '../services/Qrservices.js';

const addCode = async (req, res) => {
  try {
    const { code } = req.body;
    const newCode = await qrService.addCode(code);
    res.status(201).json({ success: true, data: newCode });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al agregar el código' });
  }
};

const checkCode = async (req, res) => {
  try {
    const { code } = req.body;
    const match = await qrService.checkCode(code);
    res.json({ success: true, match });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al verificar el código' });
  }
};

const getAllCodes = async (req, res) => {
  try {
    const codes = await qrService.getAllCodes();
    res.json({ success: true, data: codes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los códigos' });
  }
};

const deleteCode = async (req, res) => {
  try {
    const { id } = req.params;
    await qrService.deleteCode(id);
    res.json({ success: true, message: 'Código eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar el código' });
  }
};

const clearDatabase = async (req, res) => {
  try {
    await qrService.clearDatabase();
    res.json({ success: true, message: 'Base de datos limpiada' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al limpiar la base de datos' });
  }
};

export {addCode, checkCode, getAllCodes, deleteCode, clearDatabase};
