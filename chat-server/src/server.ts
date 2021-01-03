import express from 'express';
import http from 'http';
import configJson from './config/application.json';
import ApplicationConfig from './interfaces/ApplicationConfig';

const config:ApplicationConfig = configJson;
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: config.corsOrigin,
    }
});

io.on('connection', (socket:any) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');

    });
});

server.listen(config.port, () => {
    console.log(`Listening on port: ${config.port}`);
});