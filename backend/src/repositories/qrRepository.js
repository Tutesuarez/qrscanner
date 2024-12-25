import QRCode from '../models/QRCode.js';

const add = async (code) => {
  const newCode = new QRCode({ code });
  return newCode.save();
};

const findByCode = async (code) => {
  return QRCode.findOne({ code });
};

const findAll = async () => {
  return QRCode.find();
};

const del = async (id) => {
  return QRCode.findByIdAndDelete(id);
};

const clear = async () => {
  return QRCode.deleteMany({});
};

export default { add, findByCode, findAll, del, clear };
