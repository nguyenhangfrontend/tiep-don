// Needed for redux-saga es6 generator support
import '@babel/polyfill'

import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { Provider } from 'react-redux'
import history from 'utils/history'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import configureStore from 'configureStore'
import HookWrap from './HookWrap';
import theme from 'vars/theme';
import IndexedDB from 'utils/IndexedDB';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

const Kernel = () => {
	const [initSuccess, setInitSuccess] = useState(false);

	useEffect(() => {
		IndexedDB.open(setInitSuccess);
	}, []);

	if (!initSuccess) {
		return null;
	}

	return (
		<div>
			<ToastContainer autoClose={3000} />
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<HookWrap />
				</ThemeProvider>
			</Provider>
		</div>
	);
};

export default Kernel
