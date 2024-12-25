import qrRepository from '../repositories/qrRepository.js';

const addCode = async (code) => {
  return qrRepository.add(code);
};

const checkCode = async (code) => {
  const found = await qrRepository.findByCode(code);
  return !!found; // Devuelve true si se encuentra, false si no
};

const getAllCodes = async () => {
  return qrRepository.findAll();
};

const deleteCode = async (id) => {
  return qrRepository.del(id);
};

const clearDatabase = async () => {
  return qrRepository.clear();
};

export default { addCode, checkCode, getAllCodes, deleteCode, clearDatabase };
