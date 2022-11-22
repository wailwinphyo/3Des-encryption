var CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Utf8.parse('023145543211234569662334');
const passphrase = CryptoJS.enc.Utf8.parse('22453260');
var dataInput = document.getElementById('input');
dataInput.addEventListener('input', function (event) {
  try {
    var data = event.target.value;
    result = decrypt(data);
  } catch {
    result = 'ERROR !';
  }

  document.getElementById('result').innerHTML = result;
});

var dataEncInput = document.getElementById('encInput');
dataEncInput.addEventListener('input', function (event) {
  let data = event.target.value;
  let result = encrypt(data);
  document.getElementById('encResult').innerHTML = result;
});

function decrypt(data) {
  const decrypted = CryptoJS.TripleDES.decrypt(data, key, {
    iv: passphrase,
    mode: CryptoJS.mode.CBC,
  });
  let result_str = decrypted.toString(CryptoJS.enc.Utf8);
  console.log(result_str);
  console.log(JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)));
  result = JSON.stringify(JSON.parse(result_str), null, 2);
  return result;
}

function encrypt(data) {
  try {
    const encrypted = CryptoJS.TripleDES.encrypt(data, key, {
      iv: passphrase,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    result = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  } catch {
    result = 'ERROR !';
  }
  return result;
}

document.getElementById('mock-url').addEventListener('input', function (event) {
  let data = event.target.value;

  let data_json = `{
    "status": 0,
    "msg": "success",
    "data": {
      "key": "ef37c9111210854f5986fc9ebb5548b2ae",
      "is_encode": 1,
      "video": "http://nmutr.datongfupin.com/",
      "image": "http://image.qyosgg.com/",
      "image_mj": "http://mjimgge.qyosgg.com/",
      "api": "${data}",
      "img_mj_link": "http://mjimgge.qyosgg.com",
      "img_mj_link_file": "/mj.php",
      "imglink": "http://162.209.180.194",
      "img_link_file": "/mdrj.php",
      "tran_domain": "http://vopjkhg.chinabonwe.com/",
      "new_mj_api": "http://api4000.65xyz.xyz/v1.0/",
      "up_top_api": "http://ndjfh.abdeym.com/",
      "up_top_status": 1,
      "open_api": "http://23.225.228.190/domain/get/5/3/1",
      "share_image_url": "uploadfiles/20210710/photo_2021-07-10_12-02-21.jpg",
      "mp3_domain": "http://mp.dongdongzaishang.com/"
    }
  }`;
  let result = encrypt(data_json);
  document.getElementById('mockresult').innerHTML = result;
  document.getElementById('mock-verification').innerHTML = decrypt(result);
});
