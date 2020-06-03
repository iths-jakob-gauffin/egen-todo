//CSS
import './TodoWindow.scss';

import React, { useState, useEffect } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// REDUX
import { saveText } from './../actions';

// import Fade from 'react-reveal/Fade';

import Todo from './Todo';
// import EditTodo from './EditTodo';
import EditStuff from './EditStuff';

const TodoWindow = ({ props }) => {
	console.log('FÖNSTER OUTPUT ÄR: props', props);
	// const [ temp, setTemp ] = useState(true);
	const [ doNewEdit, setDoNewEdit ] = useState([]);

	useEffect(
		() => {
			if (props.editTodo) {
				console.log('OUTPUT ÄR: props.editTodo', props.editTodo);
				setDoNewEdit([ ...doNewEdit, props.editTodo ]);
			}
		},
		[ props.editTodo ]
	);

	const updateRedux = text => {
		props.saveText(text);
	};

	return (
		<main className="main-todo">
			{doNewEdit.length > 0 ? (
				<EditStuff
					key={'edit'}
					id={'edit'}
					updateRedux={updateRedux}
					dataOfTodoToBeEdited={props.editTodo}
				/>
			) : (
				props.numberOfTodos.map((todo, idx) => (
					<Todo
						key={idx}
						id={idx}
						updateRedux={updateRedux}
						newTodo={props.newTodo}
					/>
				))
			)}
			{/* {props.numberOfTodos.map((todo, idx) => (
				<Todo
					key={idx}
					id={idx}
					updateRedux={updateRedux}
					newTodo={props.newTodo}
				/>
			))} */}
			{/* {props.editTodo ? (
				<div>
					<Fade top opposite when={temp}>
						<EditStuff
							key={'edit'}
							id={'edit'}
							updateRedux={updateRedux}
							dataOfTodoToBeEdited={props.editTodo}
						/>
					</Fade> */}
			{/* </div> */}
			{/* ) : null} */}
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
)(TodoWindow);
