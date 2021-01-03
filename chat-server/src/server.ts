import express from 'express';
import http from 'http';
import configJson from './config/application.json';
import IApplicationConfig from './interfaces/IApplicationConfig';
import IMessageEntry from './interfaces/IMessageEntry';
import IMessage from './interfaces/Imessage';
import IUser from './interfaces/IUser';

const config:IApplicationConfig = configJson;
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: config.corsOrigin,
    }
});

const messages:IMessage[] = [];

io.on('connection', (socket:any) => {
    socket.on('addUserToChat', (user:IUser) => {
        console.log(`${user.name} connected to the chat`);
    });

    socket.on('sendMessage', (message:IMessageEntry) => {
        const messageResponse:IMessage = { ...message, id: messages.length + 1};

        messages.push(messageResponse);

        io.emit('newChatMessage', messageResponse)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(config.port, () => {
    console.log(`Listening on port: ${config.port}`);
});