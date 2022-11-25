var crypto = require('crypto')
var fs = require('fs');
var encService = require('./encryptionService');

let privateKeyStr = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAms8YYJVkdX/tk6O9aJHZX0UZjB8O5k9Wg3EYGkF9JQb1jdUA
wFdwPbLi4xsvJDJdZzpLqv9HWEZn4aNxwqozUj6SqPnK/MDWjBT5XUtew9EKFDyf
1g0fmBmwjnbgTkq52b01kwuvdhfdRR8qFE66F/Gn8kWo/CeqxgB/QY4LhjW00sU0
wV3lsK3WzsZaxpF4tOokpkzH5dhevhSUrRCDcwd/slSiLFj+3lEt8obkuoRB4NbG
ciI2yzWaA/Dxfb+eo9VsULHKN8TQ5GTfdpom3lZbnqmWX61+GjKfnmCGVKga68gp
bUlfuPMHm2pRjqNTIU2gSvOUX62NMjVQnJrTfQIDAQABAoIBAQCRn/hNepqqkTGa
LXASOwigvu6eSeUJL16xfKRwpmQjfZ1l0xXG2TnDQFB/1GWPBjWo0kS10Td6yZgU
wFxWAycN2cC6ZWfWRUxNL7m3UhwN1clGahTtFSFAQgI8sYSlAVQ8h+kqrtZaH27N
A9jgi4Iw3ejfVTn2IRZa9cK/lvAuSUZ4iy6yBxeBaPIZv06fsQNaJfA07HLw0Pmc
SSKEZmW6T1mJwPDE3ni44cjX76S/VhNpuk3ck5hw83tyc/TRbCs8SWsep9gqrgCB
8k4igrUbC+e+fynFkFib1iAH7SUV+nwwkrUy90IXLCWxUt3WbmL/gon81vUw1RCa
HIwE0eB9AoGBAMsVv+dTMmzuicYB7z9wDcVGeg+WIBq8XMV369G2Gb/iFac2zp/r
Us2jk/k1n67b3TAUwHm/wBP2X3B0CH46o0pzS5I4xKX7ANJuPygKaeVpXTJNTJNX
piC/peqyXsu2f5+XbY0MInnaDFFIv08ZYYF07ssll6IyRTRY7+Ef/50PAoGBAMMl
OMwQu/+p/fKEVt/xtGj3pRaGg9r9BqtxyoD9tk/S2XAIgSCdMFegZCS5A61q1bdP
XNDLNaEJjJtTTuzvJoZXk/UgTmpiUgsYAG9E0aRCZTHcsaTHMuUg6ultKZoEBIDh
lzF3I0OkP+8rVCNFKmSMk4wLBAL82/O2fSqMg96zAoGAPv7DJVVoWePwdqxY81ul
2eDPshAGa2SsflCBpO6QtDXEM7dLhs2vRLyOBQq+OrZWuThmsB1rzoVo+2/yxn0X
89spwPS9AyOGEMBD9P6t9IynbRgPPdE9ZgEszU2BHD3C/tUxFUSDWTrrATfIqBee
aFLGU9uYWqavUtqXpkSPvL8CgYAUPGvjXWjhXjNjTq3jkyDuMaAA8foCX3KtnKMv
NSAOrwK1R2x8gVBeBdfcpwLmnMmEtMofLLNm+6KFCOKKV1JbZAGHzc3T4lY3qEmD
QFOtAOWVghk5yR5R/FPf2N4Tho8g/kO7cWtKvGGU351d+vImcx1pzEqiNK5qW2Yn
X2LdWQKBgHky3IN/hsA8sQbMPtLX02M5IoQx+6ckwYNQ88QZ2xCCyv+hbUjgLMth
Yb8BnCIo7iRdjV5t3p1R+Ig0GpLRiOSnrzKChHY/6ThBW2zvMGToUpE8Y6Txo+fd
hPk2Pl0W91bCBufej3ofA/63by3T5JhnIq3moyHCQnUPPWDoVQe+
-----END RSA PRIVATE KEY-----`;
//let privateKeyStr = fs.readFileSync('rsa-private-key');

const privateKey = crypto.createPrivateKey(privateKeyStr);

function decrypt(encryptedData){
    return crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        encryptedData
    )
}


let base64data = `CFqisn17tpe+zm9QJ8d8emcimdr/QOTX6J5vI5jaIqRYbFDCNFkX+5YdncVNKFc5qQpYtr56A2jpF9fzUT4YXB97oih1qOGmRkzEhI6xfjWLhMMRTu9NdpSPLO13b5DkZNE2a6BWqnJHhYw8av+TqBAg1cZ+j3e8vhrZogA057/BRZLKjXyS3UgFw15Y9u1JQnMKoJICG1s5jvDMDwD0IEe8yA6Ct972/6DP31zi8khVfO+h81AymPvfAJaKKtlNI8DQqIdg36SDiClmXLnQNhsa6jABmtOV1ztW5/NHJTl6QPFtDvCjXoRlLhIy/EKhIG5oR9NWv2VuYolyEM6oTw==`;
//let base64data = encService.encrypt("hello World").toString("base64");
let encrypted_data = Buffer.from(base64data, 'base64');
console.log(decrypt(encrypted_data).toString())