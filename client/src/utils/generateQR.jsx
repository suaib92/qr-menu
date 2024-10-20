// src/utils/generateQR.js
import QRCode from 'qrcode';

export const generateQRCode = async (url) => {
  try {
    const qrCodeData = await QRCode.toDataURL(url);
    return qrCodeData;
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};
