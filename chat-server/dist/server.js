"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var application_json_1 = __importDefault(require("./config/application.json"));
var config = application_json_1.default;
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: config.corsOrigin,
    }
});
var users = [];
var messages = [];
io.on('connection', function (socket) {
    var userId = 0;
    var userIndex = 0;
    socket.on('addUserToChat', function (user) {
        console.log(user.name + " connected to the chat");
        userId = users.length + 1;
        user.id = userId;
        userIndex = userId - 1;
        users[userIndex] = user;
        io.emit('updateUsersList', users);
    });
    socket.on('sendMessage', function (message) {
        var messageResponse = __assign(__assign({}, message), { id: messages.length + 1, userId: userId });
        console.log("Registered a message", messageResponse);
        users[userIndex].message = messageResponse;
        io.emit('newChatMessage', messageResponse);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
        users = users.filter(function (user) { return user.id !== userId; });
        io.emit('updateUsersList', users);
    });
});
server.listen(config.port, function () {
    console.log("Listening on port: " + config.port);
});
