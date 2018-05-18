// URL https://www.w3schools.com/nodejs/nodejs_http.asp [20180518]

var http = require('http');

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(req.url);
    res.end();
}).listen(8080);
