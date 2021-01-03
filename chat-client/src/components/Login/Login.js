import React, { useState } from 'react';
import './Login.css';

export default function Login({ loginCb }) {
	const [userName, setUserName] = useState("");

	const handleSuccessOnGetCurrentPosition = (position) => {
		loginCb({
			userName: userName,
			location: {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}
		})
	}

	const handleErrorOnGetCurrentPosition = () => {
		alert('Your position in needed in order to use the chat, refresh the page and try again');
	}

	const logInHandler = (e) => {
		e.preventDefault();
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(handleSuccessOnGetCurrentPosition, handleErrorOnGetCurrentPosition)
		} else {
			alert('You need to use a browser with geolocation support, try chrome, opera or firefox');
		}
	}

	return (
		<div className="chat-login">
			<form onSubmit={logInHandler}>
				<div className="chat-login-h">
					<img src="./images/tribe.jpg" alt="Tribe"></img>
					<h2>Type your name to enter the chat:</h2>
				</div>
				<div className="chat-login-f">
					<input value={userName} type="text" onChange={e => setUserName(e.target.value)}></input>
					<button type="submit">Enter</button>
				</div>
			</form>
		</div>
	)
}