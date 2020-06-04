import React, { useState, useEffect } from 'react';

// import './Main.scss';
import { css } from '@emotion/core';

import Todo from './Todo.jsx';
import EditTodo from './EditTodo.jsx';

//Ny med TodoV2
import TodoV2 from './TodoV2/TodoV2';
import EditTodoV2 from './EditTodoV2/EditTodoV2';

import { connect } from 'react-redux';
import { saveText } from './../actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// Animationer
import Fade from 'react-reveal/Fade';
import { useTransition, animated, config } from 'react-spring';

const Main = ({ saveText, editTodo, newT, newTodo, numberOfTodos }) => {
	const [ temp, setTemp ] = useState(true);

	const [ showEdit, setShowEdit ] = useState(false);
	const [ showTodo, setShowTodo ] = useState(false);

	useEffect(
		() => {
			if (newT) {
				setShowEdit(false);
				setTimeout(() => {
					setShowTodo(!showTodo);
				}, 700);
			} else {
				setShowTodo(!showTodo);
				setTimeout(() => {
					setShowEdit(!showEdit);
				}, 700);
			}
		},
		[ newT ]
	);

	const updateRedux = text => {
		saveText(text);
	};
	const transitions = useTransition(showTodo, null, {
		config: config.gentle,
		from: {
			opacity: 0,
			height: '1px',
			width: '10px',
			transform: 'translate3d(-500px ,0px,0)'
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
			transform: 'translate3d(-500px,500px,0)'
		}
	});
	const transitionsEditTodo = useTransition(showEdit, null, {
		config: config.gentle,
		from: {
			opacity: 0,
			height: '1px',
			width: '10px',
			transform: 'translate3d(500px,0px,0)'
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
			transform: 'translate3d(500px,400px,0)',
			delay: 3000
		}
	});

	return (
		<main
			className="main-todo"
			css={css`
				margin: 2rem;
				width: 100%;
				height: 100%;
				grid-area: 2 / 1 / 3 / 2;
				display: flex;
				justify-content: center;
				/* align-items: center; */
				/* grid-template-columns: repeat(2, 1fr);
				display: grid;
				grid-template-rows: repeat(3, 1fr);
				grid-column-gap: 0px;
				grid-row-gap: 0px; */
				overflow-x: hidden;
				padding-bottom: 2rem;
				padding-right: 2rem;
				margin-left: 2rem;
			`}>
			{numberOfTodos.map((todo, idx) => {
				return transitions.map(
					({ item, key, props }) =>
						item && (
							<TodoV2
								key={key}
								style={props}
								id={idx}
								updateRedux={updateRedux}
								newTodo={newTodo}
							/>
						)
				);
			})}
			{/* ); */}
			{/* {numberOfTodos.map((todo, idx) => {
				transitions.map(
					({ item, key, props }) =>
						item && (
							<TodoV2
								key={key}
								style={props}
								id={idx}
								updateRedux={updateRedux}
								newTodo={props.newTodo}
							/>
						)
				);
			})} */}
			{/* // <Todo
				// 	key={idx}
				// 	id={idx}
				// 	updateRedux={updateRedux}
				// 	newTodo={props.newTodo}
				// />
			)} */}
			{transitionsEditTodo.map(
				({ item, key, props }) =>
					item && <EditTodoV2 key={key} style={props} />
			)}
			{/* {editTodo ? (
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
			) : null} */}
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
