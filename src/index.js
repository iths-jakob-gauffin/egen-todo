import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './components/App.jsx';

import {
	reduxFirestore,
	getFirestore,
	createFirestoreInstance
} from 'redux-firestore';
import {
	// reactReduxFirebase,
	getFirebase,
	ReactReduxFirebaseProvider
} from 'react-redux-firebase';

import firebaseConfig from './config/firebase';

const rrfConfig = { userProfile: 'users' };

const initialState = {};

const store = createStore(
	reducers,
	initialState,
	compose(
		//Den här applymiddlewarebiten är en sk store enhancer
		applyMiddleware(
			thunk.withExtraArgument({ getFirebase, getFirestore })
		),
		reduxFirestore(firebaseConfig)
	)
);

const rrfProps = {
	firebase: firebaseConfig,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance
};

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<App />
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.querySelector('#root')
);
