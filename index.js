var CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Utf8.parse('023145543211234569662334');
const passphrase = CryptoJS.enc.Utf8.parse('22453260');
var dataInput = document.getElementById('input');
dataInput.addEventListener('input', function (event) {
  try {
    var data = event.target.value;
    const decrypted = CryptoJS.TripleDES.decrypt(data, key, {
      iv: passphrase,
      mode: CryptoJS.mode.CBC,
    });
    let result_str = decrypted.toString(CryptoJS.enc.Utf8);
    console.log(result_str);
    console.log(JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)));
    result = JSON.stringify(JSON.parse(result_str), null, 2);
  } catch {
    result = 'ERROR !';
  }

  document.getElementById('result').innerHTML = result;
});

var dataEncInput = document.getElementById('encInput');
dataEncInput.addEventListener('input', function (event) {
  try {
    var data = event.target.value;
    const encrypted = CryptoJS.TripleDES.encrypt(data, key, {
      iv: passphrase,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    result2 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  } catch {
    result2 = 'ERROR !';
  }
  document.getElementById('encResult').innerHTML = result2;
});
