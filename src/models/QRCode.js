// models/QRCode.js
import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const QRCode = mongoose.model('QRCode', qrCodeSchema);

export default QRCode;
