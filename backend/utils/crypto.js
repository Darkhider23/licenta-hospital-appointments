const crypto = require('crypto');
const pkcs7 = require('pkcs7');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.KEY, 'hex');
const iv = Buffer.from(process.env.IV, 'hex');

function encrypt(text) {
  const paddedData = pkcs7.pad(Buffer.from(text));
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(paddedData, null, 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return pkcs7.unpad(Buffer.from(decrypted)).toString();
}

module.exports = {
  encrypt,
  decrypt,
};
