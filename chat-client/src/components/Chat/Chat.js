import React, { useCallback, useEffect, useState } from 'react';
import User from '../User/User';
import chatService from '../../services/ChatService';
import './Chat.css';

export default function Chat({ userName, userLocation }) {
    const [userMessage, setUserMessage] = useState("");
    const [messageRanges, setMessageRanges] = useState([
        {
            maximumDistance: 250,
            opacity: 1,
            users: []
        },
        {
            maximumDistance: 500,
            opacity: .5,
            users: []
        },
        {
            maximumDistance: 1000,
            opacity: .25,
            users: []
        },
        {
            maximumDistance: 2000,
            opacity: 0,
            users: []
        },
    ]);
    
    const sendMessage = (e) => {
        e.preventDefault();
        chatService.sendMessage(userMessage);
        setUserMessage('');
    }

    const handleMessageCb = useCallback((message) => {
        setMessageRanges(messageRanges => {
            const messageRangesCopy = [...messageRanges];
            let messageRangeIndex = messageRangesCopy.findIndex(messageRange => messageRange.maximumDistance > message.distance);

            if(messageRangeIndex === -1) {
                messageRangeIndex = messageRanges.length - 1;
            }

            const userIndex = messageRangesCopy[messageRangeIndex].users.findIndex(u => u.id === message.userId);
            const users = [...messageRangesCopy[messageRangeIndex].users];
            
            users[userIndex].message = message;

            messageRangesCopy[messageRangeIndex] = {
                ...messageRangesCopy[messageRangeIndex],
                users: users
            };

            return messageRangesCopy;
        });
    }, []);

    const handleUsersChange = useCallback((users) => {
        setMessageRanges(messageRanges => {
            const messageRangesCopy = [...messageRanges];

            messageRangesCopy.forEach(messageRange => {
                messageRange.users = [];
            });

            users.forEach(user => {
                let messageRangeIndex = messageRangesCopy.findIndex(messageRange => messageRange.maximumDistance > user.distance);

                if(messageRangeIndex === -1) {
                    messageRangeIndex = messageRanges.length - 1;
                }
                
                messageRangesCopy[messageRangeIndex] = {
                    ...messageRangesCopy[messageRangeIndex],
                    users: [{
                        ...user,
                        opacity: messageRangesCopy[messageRangeIndex].opacity,
                    }, ...messageRangesCopy[messageRangeIndex].users].slice(0, 5)
                };
            });

            return messageRangesCopy;
        });
    }, []);

    useEffect(() => {
        if(userName && userLocation.lat !== 0 && userLocation.lng !== 0) {
            chatService.connectUser(userName, userLocation);
        }
    }, [userName, userLocation]);

    useEffect(() => {
        chatService.subscribeToChatMessages(handleMessageCb);
    }, [handleMessageCb]);

    useEffect(() => {
        chatService.subscribeToChatUsersChange(handleUsersChange);
    }, [handleUsersChange]);

	return (
        <div className="chat-w">
            <div className="chat-header">
                <div className="chat-header-logo">
                    <img src="./images/tribe.jpg" alt="Tribe"></img>
                </div>
                <div className="chat-header-username">Welcome, {userName}</div>
            </div>
            <div className="chat-messages">
                {messageRanges.map((messageRange, rangeIndex) => (
                    <div key={rangeIndex} className="chat-messages-col">
                        {messageRange.users.map(user => <User key={user.id} user={user} />)}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="chat-input-w">
                <input value={userMessage} type="text" onChange={e => setUserMessage(e.target.value)} minLength="3"></input>
                <button type="submit">Send</button>	
            </form>
        </div>
    );
}