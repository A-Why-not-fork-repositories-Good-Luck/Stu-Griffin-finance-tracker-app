import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import React, { ReactElement } from 'react';
import Navigation from './src/view/Navigation';

export default function App(): ReactElement {
	return (
		<Provider store={store}>
			<Navigation/>
		</Provider>
	);
}