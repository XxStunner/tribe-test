import React, { useState } from 'react';
import './Login.css';

export default function Login({ loginCb }) {
	const [userName, setUserName] = useState("");

	const logInHandler = (e) => {
		e.preventDefault();
        console.log("log in");
        loginCb(userName);
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