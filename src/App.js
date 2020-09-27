/** @format */

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';
import Chat from './components/Chat';
import Home from './components/home';
import { Store } from './components/store';
import { CheckRoute, PrivateRoute } from './routes';

function App() {
	return (
		<div className='App'>
			<Store>
				<Router>
					<Switch>
						<CheckRoute path='/' exact component={Home} />
						<PrivateRoute path='/chat' component={Chat} />
					</Switch>
				</Router>
			</Store>
		</div>
	);
}

export default App;
