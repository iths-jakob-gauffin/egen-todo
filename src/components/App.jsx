import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

// import Spring1 from './Spring1';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// SCSS
import './App.scss';

const App = props => {
	const [ numberOfTodos, setNumberOfTodos ] = useState([ 1 ]);

	const [ doEditTodoId, setDoEditTodoId ] = useState(false);
	// console.log('OUTPUT ÄR: props', props);
	// console.log('OUTPUT ÄR: doEditTodoId', doEditTodoId);
	let editTodo = null;
	if (doEditTodoId) {
		editTodo = props.firestoreInApp.filter(
			todo => todo.id === doEditTodoId
		);
		// console.log('OUTPUT ÄR: editTodo', editTodo);
	}
	const [ newT, setNewT ] = useState(false);

	const newTodo = () => {
		let newTodo = { stuff: 'text o sånt' };
		setNumberOfTodos([ ...numberOfTodos, newTodo ]);
	};

	return (
		// <Spring1 />
		<div className="container-app">
			<Header
				setNumberOfTodos={setNumberOfTodos}
				numberOfTodos={numberOfTodos}
				newTodo={newTodo}
			/>
			<Main
				newT={newT}
				numberOfTodos={numberOfTodos}
				setNumberOfTodos={setNumberOfTodos}
				newTodo={newTodo}
				editTodo={editTodo ? editTodo[0] : null}
			/>
			<Footer
				setDoEditTodoId={setDoEditTodoId}
				setNewT={setNewT}
				newT={newT}
			/>
		</div>
	);
};

const mapStateToProps = state => {
	// console.log('OUTPUT ÄR: state', state);
	return {
		stateInApp: state,
		firestoreInApp: state.firestore.ordered.todotexter
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([ { collection: 'todotexter' } ])
)(App);
