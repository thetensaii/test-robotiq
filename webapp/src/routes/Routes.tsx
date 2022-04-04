import React from 'react';
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import { PATHS } from './constants';

export const Routes: React.FC = () => {
	return (
		<Router>
			<Switch>
				<Route path={PATHS.ROOT} element={<Home />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Switch>
		</Router>
	);
};
