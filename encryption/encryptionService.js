const crypto = require("crypto");
const fs = require('fs');

const publicKeyString = fs.readFileSync('rsa-public-key');
const privatekeyString = fs.readFileSync('rsa-private-key');

const publicKey = crypto.createPublicKey(publicKeyString);
const privateKey = crypto.createPrivateKey(privatekeyString);

exports.encrypt = function (data){
    let encryptedData =  crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(data)
    )
    return encryptedData;
}

exports.decrypt = function (encryptedData){
    return crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        encryptedData
    )
}

// var encryptedData = encrypt("Hello World");
// console.log(encryptedData.toString("base64"));
// console.log(decrypt(encryptedData).toString());




