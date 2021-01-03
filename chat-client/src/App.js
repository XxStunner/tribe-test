import React, { useState } from 'react';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';

export default function App() {
	const [userName, setUserName] = useState("");

	return (
		<>
			{userName 
				? <Chat userName={userName} />
				: <Login loginCb={user => setUserName(user)} />}
		</>
	);
}