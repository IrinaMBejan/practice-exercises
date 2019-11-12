//1.
var http = require('http');
var fs = require('fs');
//2.
//3.

var server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        if (request.url === '/index.html') {
            fs.readFile('index.html', function (err, data) {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            });
        }
        else if (request.url === '/style.css') {
            fs.readFile('style.css', function (err, data) {
                response.writeHead(200, { "Content-Type": "text/css" });
                response.write(data);
                response.end();
            });
        }
    }



});
//5.
server.listen(5050);

console.log('Server Started listening on 5050');