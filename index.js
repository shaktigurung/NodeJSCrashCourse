// const Person = require('./person');

// const person1 = new Person('John Doe', 30);

// person1.greeting();

//Logger in index
// const Logger = require('./logger');

// const logger = new Logger();

// logger.on('message', (data) => console.log("Called Listener", data));

// logger.log('Hello World')


// Web server
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res)=> {
    //console.log(req.url);
    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), 
    //     (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, {'Content-type': 'text/html'});
    //         res.end(content);
    //     })
    // }
    // if(req.url === '/about') {
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), 
    //     (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, {'Content-type': 'text/html'});
    //         res.end(content);
    //     })
    // }
    // if(req.url === '/api') {
    //     const users = [
    //         {name: 'Bob smith', age: 35},
    //         {name: 'John Doe', age: 45}
    //     ];
    //     res.writeHead(200, {'Content-type': 'application/json'});
    //     res.end(JSON.stringify(users));
    // }

    //Build File path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    // console.log(filePath);
    // res.end();

    // Extension of file
    let extname = path.extname(filePath);

    //Initial content type
    let contentType = 'text/html';

    //Check ext and set content type
    switch(extname) {
        case '.js':
            contentType = "text/javascript";
            break;
        case '.css':
            contentType = "text/css";
            break;
        case '.json':
            contentType = "application/json";
            break;
        case '.png':
            contentType = "image/png";
            break;
        case '.jpg':
            contentType = "image/jpg";
            break;
    }

    //Read File
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT'){
                //Page not Found
                fs.readFile(path.join(__dirname, 'public', '404.html'), 
                (err, content) => {
                    res.writeHead(200, {'Content-type': 'text/html'});
                    res.end(content, 'utf8');
                })
            } else {
                // Some server erro
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            //Success
            res.writeHead(200, {'Content-type': contentType });
            res.end(content, 'utf8')
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
