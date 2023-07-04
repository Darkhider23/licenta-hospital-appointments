const crypto = require('crypto');
const fs = require('fs');
const sequelize = require('../database/db');
const Key = require('../Models/Key');
const path = require('path');

function generateRSAKeyPair(){
  const {publicKey,privateKey} = crypto.generateKeyPairSync('rsa',{
    modulusLength:512,
    publicKeyEncoding:{
      type:'spki',
      format:'pem',
    },
    privateKeyEncoding:{
      type:'pkcs8',
      format:'pem',
    },
  });
  return{
    publicKey:publicKey,
    privateKey:privateKey
  };
}

async function storeKeys(keyword){
  const {publicKey,privateKey} = generateRSAKeyPair();
  await Key.create({
    keyword:keyword,
    publicKey:publicKey,
    privateKey:privateKey,
  });
}


async function getPrivateKey(keyword) {
  await sequelize.sync(); 
  const data = await Key.findOne({
    where: {
      keyword: keyword
    }
  });
  if (data) {
    return data.privateKey;
  }
  return null; // If no matching record found
}
async function getPublicKey(keyword) {
  await sequelize.sync(); 
  const data = await Key.findOne({
    where: {
      keyword: keyword
    }
  });
  if (data) {
    return data.publicKey;
  }
  return null; // If no matching record found
}


async function encrypt(data,email) {
  const publicKey = await getPublicKey(email);
  // console.log(email);
  const buffer = Buffer.from(data, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  // console.log(encrypted.toString('base64'));
  return encrypted.toString('base64');
}


async function decrypt(encryptedData,email) {
  const privateKey = await getPrivateKey(email);
  console.log(email);
  const buffer = Buffer.from(encryptedData, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
}


// (async () => {
//   // const data = 'Hello, RSA!'; 
//   const data = 'e2tcF3MRoqbsO4476wPW56kkodxhyNy+TPHXun4XZrHzlUVoPMbTrEKI8lYxCn5vMpgn7Mhe4cxrDq2SM2/D+g==';
//   // const encryptedData = await encrypt(data);
//   // const decryptedData = decrypt(encryptedData);
//   const decryptedData = await decrypt(data,'test@gmail.com');
//   console.log(decryptedData);
//   // console.log('Original Data:', data);
//   // // console.log('Encrypted Data:', encryptedData);
//   // console.log('Decrypted Data:', decryptedData);
// })();
module.exports = {
  encrypt,
  decrypt,
  storeKeys
}