import React, { useCallback, useEffect, useState } from 'react';
import User from '../User/User';
import chatService from '../../services/ChatService';
import './Chat.css';

export default function Chat({ userName }) {
    const [userMessage, setUserMessage] = useState("");
    const [usersMap, setUsers] = useState({});
    // eslint-disable-next-line
    const [currentPosition, setCurrentPosition] = useState({
        left: 0,
        top: 0
    });
    
    const sendMessage = (e) => {
        e.preventDefault();
        chatService.sendMessage(userMessage);
        setUserMessage('');
    }

    const getUserOpacity = (from, to) => {
        const leftDiff = from.left - to.left;
        const topDiff = from.top - to.top;
        const distance = Math.sqrt(leftDiff * leftDiff + topDiff * topDiff);

        let opacity = Math.floor(distance / 10);
        opacity = opacity < 0 ? 0 : (opacity < 80 ? opacity : 100);
        
        return Math.abs(1 - opacity / 100);
    }

    const handleUserPositionChange = useCallback((user) => {
        setCurrentPosition(currentPosition => {
            setUsers(users => {
                const _users = {...users};
    
                if(typeof _users[user.id] !== 'undefined') {
                    _users[user.id].position = user.position;
                }

                for(let userId in _users) {
                    _users[userId].opacity = getUserOpacity(currentPosition, _users[userId].position);
                }

                return _users;
            });

            return currentPosition;
        });
    }, []);

    const updateUsersList = useCallback((users) => {
        setCurrentPosition(currentPosition => {
            const usersObj = {};

            users.forEach(user => {
                user.opacity = getUserOpacity(currentPosition, user.position);
                usersObj[user.id] = user;
            });

            setUsers(usersObj);

            return currentPosition;
        });
    }, []);

    const handleNewMessage = useCallback((message) => {
        setUsers(users => {
            const _users = {...users};

            if(typeof _users[message.userId] !== 'undefined') {
                _users[message.userId].message = message.body;
            }

            return _users;
        });
    }, []);

    useEffect(() => {
        if(userName) {
            chatService.connectUser(userName);
        }
    }, [userName]);

    useEffect(() => {
        const keyCodesPositionsMap = {
            'arrowup': (currentPosition) => ({
                ...currentPosition,
                top: currentPosition.top - 10,
            }),
            'arrowdown': (currentPosition) => ({
                ...currentPosition,
                top: currentPosition.top + 10
            }),
            'arrowleft': (currentPosition) => ({
                ...currentPosition,
                left: currentPosition.left - 10
            }),
            'arrowright': (currentPosition) => ({
                ...currentPosition,
                left: currentPosition.left + 10
            })
        };

        window.addEventListener('keydown', (event) => {
            const eventCode = event.code.toLowerCase();
            if(typeof keyCodesPositionsMap[eventCode] !== 'undefined') {
                setCurrentPosition(currentPosition => {
                    const newPosition = keyCodesPositionsMap[eventCode](currentPosition);
                    chatService.updateCurentPosition(currentPosition);
                    return newPosition;
                });
            }
        });
    }, []);

    useEffect(() => {
        chatService.subscribeToUserPositionChange(handleUserPositionChange);
        chatService.subscribeToChatUsersChange(updateUsersList);
        chatService.subscribeToChatMessages(handleNewMessage);
    }, [handleUserPositionChange, updateUsersList, handleNewMessage]);

	return (
        <div className="chat-w">
            <div className="chat-header">
                <div className="chat-header-logo">
                    <img src="./images/tribe.jpg" alt="Tribe"></img>
                </div>
                <div className="chat-header-username">Welcome, {userName}</div>
            </div>
            <div className="chat-messages">
                {Object.keys(usersMap).map(userId => <User key={userId} user={usersMap[userId]} />)}
            </div>
            <form onSubmit={sendMessage} className="chat-input-w">
                <input value={userMessage} type="text" onChange={e => setUserMessage(e.target.value)} minLength="3"></input>
                <button type="submit">Send</button>	
            </form>
        </div>
    );
}