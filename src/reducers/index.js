import { combineReducers } from 'redux';

import toFirebaseReducer from './toFirebaseReducer';

import updateTodoReducer from './updateTodoReducer';

import authReducer from './authReducer';

//firestoreReducer är redan kopplad till dbn eftersom vi gett den firebaseConfigen i index.js. Så den håller koll på vad som finns i fb typ
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
	auth: authReducer,
	todos: updateTodoReducer,
	fb: toFirebaseReducer,
	firestore: firestoreReducer
});
