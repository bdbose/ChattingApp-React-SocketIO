/** @format */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('name') ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export const CheckRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				!localStorage.getItem('name') ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/chat',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};
