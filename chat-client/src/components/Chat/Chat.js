import React, { useState } from 'react';
import Message from '../Message/Message';
import './Chat.css';

export default function Chat({ userName }) {
    const [userMessage, setUserMessage] = useState("");
    const messageRanges = [
        [
            {
                id: 4,
                userName: 'Victor',
                body: 'Testing1',
                opacity: 1
            },
            {
                id: 5,
                userName: 'Victor',
                body: 'Testing2',
                opacity: 1
            },
        ],
        [
            {
                id: 6,
                userName: 'Tomás',
                body: 'Testing1',
                opacity: .75
            },
            {
                id: 7,
                userName: 'Tomás',
                body: 'Testing2',
                opacity: .75
            },
        ],
        [
            {
                id: 8,
                userName: 'Zé Johnson',
                body: 'Testing1',
                opacity: .5
            },
            {
                id: 9,
                userName: 'Zé Johnson',
                body: 'Testing2',
                opacity: .5
            }
        ],
        [
            {
                id: 10,
                userName: 'Charlie Johnson',
                body: 'Testing1',
                opacity: .25
            },
            {
                id: 11,
                userName: 'Charlie Johnson',
                body: 'Testing2',
                opacity: .25
            }
        ]
    ];
    
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("sending message");
    }

	return (
        <div className="chat-w">
            <div className="chat-header">
                <div className="chat-header-logo">
                    <img src="./images/tribe.jpg" alt="Tribe"></img>
                </div>
                <div className="chat-header-username">Welcome, {userName}</div>
            </div>
            <div className="chat-messages">
                {messageRanges.map((messages, rangeIndex) => (
                    <div key={rangeIndex} className="chat-messages-col">
                        {messages.map(message => <Message key={message.id} userName={message.userName} messageBody={message.body} />)}
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