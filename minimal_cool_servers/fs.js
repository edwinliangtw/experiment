// author: edwinliang 20230128

const express = require("express");
const vm = require("vm");
const fs = require("fs");
const app = express();
const port = 8888;

// you can add your module here
const context = {
    fs, // use filesystem module here
}

// create context you need 
vm.createContext(context);

// render fs.html
app.get('/', (req, res) => {
    res.send(fs.readFileSync('fs.html', { encoding: 'utf-8' }));
});

// api to run code in js vm
app.get('/js', (req, res) => {
    let code = decodeURIComponent(req.url.split('?')[1]);
    res.send(vm.runInContext(code, context));
});

// start server
app.listen(port);

console.log('server start at localhost:' + port);