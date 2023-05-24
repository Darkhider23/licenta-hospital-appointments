const crypto = require('crypto');
const fs = require('fs');
const sequelize = require('../database/db');
const Key = require('../Models/Key');
const path = require('path');

function getPrivateKey() {
  const privateKeyPath = path.join(__dirname, 'keys', 'privateKey.pem');
    let data = fs.readFileSync(privateKeyPath, 'utf8');
  return data;
}

async function getPublicKey() {
  await sequelize.sync(); 
  const data = await Key.findOne();
  return data.publicKey;
}


async function encrypt(data) {
  const publicKey = await getPublicKey();
  // console.log(publicKey);
  const buffer = Buffer.from(data, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  // console.log(encrypted.toString('base64'));
  return encrypted.toString('base64');
}


function decrypt(encryptedData) {
  const privateKey = getPrivateKey();
  const buffer = Buffer.from(encryptedData, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
}


// (async () => {
//   // const data = 'Hello, RSA!'; 
//   const data = 'BVevMHkXpY9tD8bNjM7bixvSNKrfrJs2RRM9uCgSynfwN92FmTDz/biPJOd9iB1mUlccWShJIy1g3o65WDvuGA==';
//   // const encryptedData = await encrypt(data);
//   // const decryptedData = decrypt(encryptedData);
//   const decryptedData = decrypt(data);

//   console.log('Original Data:', data);
//   // console.log('Encrypted Data:', encryptedData);
//   console.log('Decrypted Data:', decryptedData);
// })();
module.exports = {
  encrypt,
  decrypt
}