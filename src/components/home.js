/** @format */

import React, { useContext, useState } from 'react';
import { Context } from './store';

const Home = (props) => {
	const { name } = useContext(Context);
	const [text, setText] = useState('');
	return (
		<div className='home'>
			<div className='title'>BOSE CHAT</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					name[1](text);
					setText('');
					localStorage.setItem('name', text);
					props.history.push('/chat');
				}}>
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder='Enter Name'
					required
				/>
				<button>Login</button>
			</form>
		</div>
	);
};

export default Home;
