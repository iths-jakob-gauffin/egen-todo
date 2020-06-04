import React, { useState, useEffect } from 'react';

import './Main.scss';
import Todo from './Todo.jsx';
import EditTodo from './EditTodo.jsx';

//Ny med TodoV2
import TodoV2 from './TodoV2/TodoV2';

import { connect } from 'react-redux';
import { saveText } from './../actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// Animationer
import Fade from 'react-reveal/Fade';
import { useTransition, animated, config } from 'react-spring';

const Main = ({ saveText, editTodo, newT }) => {
	const [ temp, setTemp ] = useState(true);

	const updateRedux = text => {
		saveText(text);
	};
	const transitions = useTransition(newT, null, {
		config: config.gentle,
		from: {
			opacity: 0,
			height: '1px',
			width: '10px',
			transform: 'translate3d(0,-200px,0)'
		},
		enter: {
			opacity: 1,
			height: '450px',
			width: '450px',
			transform: 'translate3d(0,0,0)'
		},
		leave: {
			opacity: 0,
			height: '1px',
			width: '10px',
			transform: 'translate3d(0,500px,0)'
		}
	});

	return (
		<main className="main-todo">
			{/* {props.numberOfTodos.map(
				(todo, idx) => */}
			{transitions.map(
				({ item, key, props }) =>
					item && <TodoV2 key={key} style={props} />
			)}
			{/* // <Todo
				// 	key={idx}
				// 	id={idx}
				// 	updateRedux={updateRedux}
				// 	newTodo={props.newTodo}
				// />
			)} */}
			{editTodo ? (
				<div>
					<Fade top opposite when={temp}>
						<EditTodo
							key={'edit'}
							id={'edit'}
							updateRedux={updateRedux}
							dataOfTodoToBeEdited={editTodo}
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
