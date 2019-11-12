//1.
var http = require('http');
var fs = require('fs');
//2.
//3.

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

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
    else {
       if (request.method === 'POST') {
            var cookies = parseCookies(request);
            if (request.url === '/clickme') {
                var number = cookies['click_number']
                if (number == undefined) {
                    number = 0;
                }

                response.writeHead(200, {
                    'Set-Cookie': 'click_number=' + number,
                    'Content-Type': 'text/plain'
                });

                new_html = "Worked!"
                response.write(new_html);
                response.end();
            } 
        }
    }



});
//5.
server.listen(5050);

console.log('Server Started listening on 5050');
