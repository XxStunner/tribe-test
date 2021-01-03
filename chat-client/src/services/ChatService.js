import socketIoClient from 'socket.io-client';

const calculateEuclideanDT = (from, to) => {
    const lngDiff = (from.lng - to.lng);
    const latDiff = (from.lat - to.lat);

    return Math.sqrt(
        lngDiff * lngDiff + latDiff + latDiff  
    ) * 111.12;
}

const chatService = {
    userName: '',
    userLocation: {
        lat: 0,
        lng: 0
    },
    socket: null,
    messagesCb: null,
    usersCb: null,
    connectUser: function(userName, userLocation) {
        this.userName = userName;
        this.userLocation = userLocation;

        this.socket = socketIoClient('http://104.236.22.221:5000');

        this.socket.on('connect', () => {
            console.log("user connected to server");
        });

        this.socket.emit('addUserToChat', {
            name: this.userName,
            location: this.userLocation
        });

        this.socket.on('newChatMessage', (message) => {
            if(this.messagesCb) {
                message.distance = calculateEuclideanDT(this.userLocation, message.location);
                this.messagesCb(message);
            }
        });

        this.socket.on('updateUsersList', (users) => {
            if(this.usersCb) {
                this.usersCb(users.map(user => {
                    user.distance = calculateEuclideanDT(this.userLocation, user.location);
                    return user;
                }));
            }
        });
    },
    subscribeToChatMessages: function(subscribeCb) {
        if(!this.messagesCb) {
            this.messagesCb = subscribeCb;
        }
    },
    subscribeToChatUsersChange: function(subscribeCb) {
        if(!this.usersCb) {
            this.usersCb = subscribeCb;            
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