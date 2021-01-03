import socketIoClient from 'socket.io-client';

const chatService = {
    userName: '',
    userLocation: {
        lat: 0,
        lng: 0
    },
    socket: null,
    messagesCb: null, 
    connectUser: function(userName, userLocation) {
        this.userName = userName;
        this.userLocation = userLocation;

        this.socket = socketIoClient('http://localhost:5000');

        this.socket.on('connect', () => {
            console.log("user connected to server");
        });

        this.socket.emit('addUserToChat', {
            name: this.userName,
            location: this.userLocation
        });

        this.socket.on('newChatMessage', (message) => {
            if(this.messagesCb) {
                const lngDiff = (this.userLocation.lng - message.location.lng);
                const latDiff = (this.userLocation.lat - message.location.lat);
            
                message.distance = Math.sqrt(
                    lngDiff * lngDiff + latDiff + latDiff  
                ) * 111.12;
                
                this.messagesCb(message);
            }
        });
    },
    subscribeToChatMessages: function(subscribeCb) {
        if(!this.messagesCb) {
            this.messagesCb = subscribeCb;
        }
    },
    sendMessage: function(messageBody) {
        this.socket.emit('sendMessage', {
            userName: this.userName,
            body: messageBody,
            location: this.userLocation
        })
    },
};

export default chatService;