import socketIoClient from 'socket.io-client';

export default {
    userName: '',
    userLocation: {
        lat: 0,
        lng: 0
    },
    socket: null,
    connectUser: function(userName, userLocation) {
        this.userName = userName;
        this.userLocation = userLocation;

        this.socket = socketIoClient('http://localhost:5000');

        this.socket.on('connect', () => {
            console.log("user connected to chat");
        });

        this.socket.emit('addUserToChat', userName);
    },
    subscribeToChatMessages: function(subscribeCb) {
        this.socket.on('newChatMessage', subscribeCb);
    },
    sendMessage: function(messageBody) {
        this.socket.emit('sendMessage', {
            userName: this.userName,
            messageBody: messageBody,
            location: this.userLocation
        })
    },
};