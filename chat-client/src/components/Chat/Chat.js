import React, { useState } from 'react';
import './Chat.css';

export default function Chat({ userName }) {
    const [userMessage, setUserMessage] = useState("");
    
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
            <div className="chat-messages"></div>
            <form onSubmit={sendMessage} className="chat-input-w">
                <input value={userMessage} type="text" onChange={e => setUserMessage(e.target.value)}></input>
                <button type="submit">Send</button>	
            </form>
        </div>
    );
}