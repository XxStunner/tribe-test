import socketIoClient from 'socket.io-client';

const chatService = {
    userName: '',
    socket: null,
    messagesCb: null,
    usersCb: null,
    updateUserPositionCb: null,
    connectUser: function(userName) {
        this.userName = userName;
        
        if(!this.socket) {
            this.socket = socketIoClient('https://floating-headland-00562.herokuapp.com');
    
            this.socket.on('connect', () => {
                console.log("user connected to server");
            });
    
            this.socket.emit('addUserToChat', {
                name: this.userName,
                position: {
                    left: 0,
                    top: 0
                }
            });
    
            this.socket.on('newChatMessage', (message) => {
                if(this.messagesCb) {
                    this.messagesCb(message);
                }
            });
    
            this.socket.on('updateUsersList', (users) => {
                if(this.usersCb) {
                    this.usersCb(users);
                }
            });

            this.socket.on('syncUserPosition', (user) => {
                if(this.updateUserPositionCb) {
                    this.updateUserPositionCb(user);
                }
            });
        }
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
    subscribeToUserPositionChange: function(updateUserPositionCb) {
        if(!this.updateUserPositionCb) {
            this.updateUserPositionCb = updateUserPositionCb;
        }
    },
    sendMessage: function(messageBody) {
        this.socket.emit('sendMessage', {
            userName: this.userName,
            body: messageBody,
        })
    },
    updateCurentPosition: function(currentPosition) {
        this.socket.emit('updateCurrentPosition', currentPosition);
    }
};

export default chatService;