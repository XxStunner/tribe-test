import React, { useState } from 'react';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';

export default function App() {
	const [userName, setUserName] = useState("");
	const [userLocation, setUserLocation] = useState({
		lat: 0,
		lng: 0
	});

	const updateUserInfo = (user) => {
		setUserName(user.name);
		setUserLocation(user.location);
	}

	return (
		<>
			{userName 
				? <Chat userName={userName} userLocation={userLocation} />
				: <Login loginCb={updateUserInfo} />}
		</>
	);
}