const http = require('http');
const express = require('express');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();

let myStorage = [];

app.use(express.json());
app.use(express.static("express"));

app.use('/tools', function(req, res){
    res.sendFile(path.join(`${__dirname}/express/index.html`))
});

let randomguid = randomUUID();
console.log(randomguid);

app.use(`/my_paste_bin/${randomguid}`, function(req, res){
    res.send(myStorage);
});

app.use('/my_paste_bin', function(req, res){
    if(myStorage.length > 1000) myStorage.splice(-300);
    myStorage.unshift({'datetime': (new Date()).toISOString(), 'data': req.query});
    res.end();
});

const server = http.createServer(app);
server.listen(3000);

console.debug('Server listening on port 3000')