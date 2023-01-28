// author: edwinliang 20230128

const express = require("express");
const { exec } = require('child_process');
const fs = require("fs");
const app = express();
const port = 8888;

// render cmd.html
app.get('/', (req, res) => {
    res.send(fs.readFileSync('cmd.html', { encoding: 'utf-8' }));
});

// api to run shell
app.get('/js', (req, res) => {
    let code = decodeURIComponent(req.url.split('?')[1]);

    try {
        exec(code, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error}`);
                return;
            }
            res.send(stdout);
        });
    } catch (e) {
        res.send('no such command');
    }

});

// start server
app.listen(port);

console.log('server start at localhost:' + port);