import express from 'express';
import http from 'http';
import configJson from './config/application.json';
import IApplicationConfig from './interfaces/IApplicationConfig';
import IMessageEntry from './interfaces/IMessageEntry';
import IMessage from './interfaces/IMessage';
import IUser from './interfaces/IUser';
import IPosition from './interfaces/IPosition';

const config:IApplicationConfig = configJson;
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: config.corsOrigin,
    }
});

let users:IUser[] = [];
const messages:IMessage[] = [];

io.on('connection', (socket:any) => {
    let userId = 0;
    let userIndex = 0;

    socket.on('addUserToChat', (user:IUser) => {
        console.log(`${user.name} connected to the chat`);

        userId = users.length + 1;
        user.id = userId;
        userIndex = userId - 1;
        users[userIndex] = user;

        io.emit('updateUsersList', users);
    });

    socket.on('updateCurrentPosition', (position:IPosition) => {
        users[userIndex].position = position;
        io.emit('syncUserPosition', {
            id: userId,
            position: position
        });
    });

    socket.on('sendMessage', (message:IMessageEntry) => {
        const messageResponse:IMessage = { ...message, id: messages.length + 1, userId: userId};
        
        console.log(`Registered a message`, messageResponse);

        users[userIndex].message = messageResponse.body;

        io.emit('newChatMessage', messageResponse)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

        users = users.filter(user => user.id !== userId);

        io.emit('removeUserFromList', userId);
    });
});

server.listen(process.env.PORT || config.port, () => {
    console.log(`Listening on port: ${process.env.PORT || config.port}`);
});