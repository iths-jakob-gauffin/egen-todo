import React, { useState, useEffect } from 'react';

import './Main.scss';
import Todo from './Todo.jsx';
import EditTodo from './EditTodo.jsx';

import { connect } from 'react-redux';
import { saveText } from './../actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Fade from 'react-reveal/Fade';

const Main = props => {
	const [ temp, setTemp ] = useState(true);

	// console.log('MAIN OUTPUT ÄR: props', props);
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
				<div>
					<Fade top opposite when={temp}>
						<EditTodo
							key={'edit'}
							id={'edit'}
							updateRedux={updateRedux}
							dataOfTodoToBeEdited={props.editTodo}
						/>
					</Fade>
				</div>
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
