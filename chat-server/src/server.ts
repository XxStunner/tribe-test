import express from 'express';
import http from 'http';
import configJson from './config/application.json';
import ApplicationConfig from './interfaces/ApplicationConfig';

const config:ApplicationConfig = configJson;
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket:any) => {
    console.log(socket);

    socket.on('disconnect', () => {
        console.log("user disconnected");

    });
});

server.listen(config.port, () => {
    console.log(`Listening on port: ${config.port}`);
});