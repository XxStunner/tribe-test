import React, { useCallback, useEffect, useState } from 'react';
import Message from '../Message/Message';
import chatService from '../../services/ChatService';
import './Chat.css';

export default function Chat({ userName, userLocation }) {
    const [userMessage, setUserMessage] = useState("");
    const [messageRanges, setMessageRanges] = useState([
        {
            maximumDistance: 250,
            opacity: 1,
            messages: []
        },
        {
            maximumDistance: 500,
            opacity: .5,
            messages: []
        },
        {
            maximumDistance: 1000,
            opacity: .25,
            messages: []
        },
        {
            maximumDistance: 2000,
            opacity: 0,
            messages: []
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
            const messageRangeIndex = messageRangesCopy.findIndex(messageRange => messageRange.maximumDistance > message.distance);

            messageRangesCopy[messageRangeIndex] = {
                ...messageRangesCopy[messageRangeIndex],
                messages: [{
                    ...message,
                    opacity: messageRangesCopy[messageRangeIndex].opacity
                }, ...messageRangesCopy[messageRangeIndex].messages].slice(0, 5)
            };

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
                        {messageRange.messages.map(message => <Message key={message.id} message={message} />)}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="chat-input-w">
                <input value={userMessage} type="text" onChange={e => setUserMessage(e.target.value)}></input>
                <button type="submit">Send</button>	
            </form>
        </div>
    );
}