import React, { useState, useEffect } from 'react';

import './Main.scss';
import Todo from './Todo.jsx';
import EditTodo from './EditTodo.jsx';

import { connect } from 'react-redux';
import { saveText } from './../actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Main = props => {
	console.log('MAIN OUTPUT ÄR: props', props);
	const updateRedux = text => {
		props.saveText(text);
	};
	// useEffect(() => {

	// }, []);

	return (
		<main className="main-todo">
			{props.numberOfTodos.map((todo, idx) => (
				<Todo
					key={idx}
					id={idx}
					updateRedux={updateRedux}
					newTodo={props.newTodo}
				/>
			))}
			{props.editTodo ? (
				<EditTodo
					key={'edit'}
					id={999}
					updateRedux={updateRedux}
					dataOfTodoToBeEdited={props.editTodo}
				/>
			) : null}
		</main>
	);
};

const mapStateToProps = state => {
	// console.log('OUTPUT ÄR: state', state);
	return {
		stateMain: state
		// firestoreInMain: state.firestore.ordered.todotexter
	};
};

export default compose(
	firestoreConnect([ { collection: 'todotexter' } ]),
	connect(mapStateToProps, { saveText })
)(Main);
