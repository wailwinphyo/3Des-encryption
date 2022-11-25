var crypto = require('crypto');
var fs = require('fs');


const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	modulusLength: 2048,
})

let publicKeyData = publicKey.export({
    type: "pkcs1",
    format: "pem",
});

let privateKeyData = privateKey.export({
    type: "pkcs1",
    format: "pem",
});

//let key = crypto.randomBytes(64).toString('hex');

//let encryptedData = crypto.AES.encrypt(privateKeyData, key, {mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7});

let result = {
    "PrivateKey": {
        //"data": encryptedData,
        //"securityKey": key,
        "original": privateKeyData
    },
    "PublicKey": {
        "original": publicKeyData
    }
}

fs.rename(`rsa-key.json`, `rsa-backup/rsa-key-${(new Date()).getTime()}`, function (err) {
    if (err) throw err
    console.log('Successfully renamed - AKA moved!')
    fs.writeFile(`rsa-key.json`, JSON.stringify(result, null, 4), err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
    });
});

fs.writeFile('rsa-public-key', publicKeyData, err => {
    if(err){
        console.error(err)
    }
})