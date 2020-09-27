/** @format */

import React, { createContext, useState } from 'react';

export const Context = createContext();

export const Store = (props) => {
	const [name, setName] = useState(localStorage.getItem('name') || 'KOlkata');
	const [chat, setChat] = useState([]);
	return (
		<Context.Provider
			value={{ name: [name, setName], chatStore: [chat, setChat] }}>
			{props.children}
		</Context.Provider>
	);
};
