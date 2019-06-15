"use strict";

const http = require('http');
const fs = require('fs');
const storage = require('./storage.js');

const port = process.env.PORT || 3000;

const STATUS_OK = JSON.stringify({"status": "OK"});
const STATUS_BAD_REQUEST = JSON.stringify({"status": "Bad Request."});

console.log("Listening...");

var body = '';

function processRequest(request, response) {
    if (request.method === 'POST') {
        if (request.url === '/suscribe') {
            response.write(STATUS_OK);
        } else {
            response.statusCode = 404;
            response.write(STATUS_OK);
        }
    }

    if (request.method === 'GET') {
        if (request.url === '/') {
            response.write(fs.readFileSync('index.html').toString());
        } else {
            if (fs.existsSync('.' + request.url) && 
                request.url.toString().substring(request.url.length-3,request.url.length) === 'svg') {
                response.setHeader('Content-Type', 'image/svg+xml');
                const content = fs.readFileSync('.' + request.url).toString();
                response.setHeader('Content-Length', content.length);
                response.write(content);
                response.statusCode = 200;
            } else {
                response.statusCode = 405;
            }
            response.write(STATUS_OK);
        }
    }
    return response;
}

http.createServer( (request, response) => {
    request.on('data', (data) => {
        body += data;
    });

    request.on('end', () => {
        response.setHeader('Content-Type', 'text/html');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'POST');
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        response = processRequest(request, response);

        if (body.length > 1e6) {
            request.connection.destroy();
        }
        if (body) {
            try {
                const post = JSON.parse(body);
                const email_regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (post !== undefined && post.email !== undefined && email_regex.test(post.email)) {
                    storage.storeLead(post.email);
                    response.statusCode = 200;
                } else {
                    response.statusCode = 400;
                }
                body = '';
            } catch (err) {
                response.write(STATUS_BAD_REQUEST);
                console.log(' Bad Request: ' + err.message);
                response.statusCode = 400;
            }
        } else {
            response.statusCode = 400;
        }
        response.end();
    });
}).listen(port);
