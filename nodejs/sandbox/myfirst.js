// URL https://www.w3schools.com/nodejs/nodejs_get_started.asp [20180518]

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello world!');
}).listen(8080);
