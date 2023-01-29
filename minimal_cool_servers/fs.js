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
    let codelines = JSON.parse(decodeURIComponent(req.url.split('?')[1]));
    let output = temp = '';
    codelines.forEach(line => {
        temp = vm.runInContext(line, context);
        Array.isArray(temp) && (temp = temp.join(' '));
        output += temp ? temp + '<br>' : '';
        return output;
    });
    res.send(output);
});

// start server
app.listen(port);

console.log('server start at localhost:' + port);