import express from 'express';
import http from 'http';
import configJson from './config/application.json';
import ApplicationConfig from './interfaces/ApplicationConfig';

const config:ApplicationConfig = configJson;
const app = express();
const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`Listening on port: ${config.port}`);
});