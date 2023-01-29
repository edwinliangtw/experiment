// author: edwinliang 20230128

const express = require("express");
const fs = require("fs");
const app = express();
const port = 8888;

// override console.lof function
let output = [];
const log = console.log;
console.log = (...args) => { output.push([...args]); log(...args) }

// render fs.html
app.get('/', (req, res) => {
    res.send(fs.readFileSync('fs.html', { encoding: 'utf-8' }));
});

// api to run code in js vm
app.get('/js', (req, res) => {
    eval(JSON.parse(decodeURIComponent(req.url.split('?')[1])).join('\n'));
    res.send(JSON.stringify(output));
    output = [];
});

// start server
app.listen(port);

log('server start at localhost:' + port);