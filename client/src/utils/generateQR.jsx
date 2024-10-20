// src/utils/generateQRCode.js
import QRCode from 'qrcode';

export const generateQRCode = async (url) => {
  try {
    return await QRCode.toDataURL(url);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};
