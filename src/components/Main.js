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

const Main = ({
	saveText,
	editTodo,
	newT,
	// newTodo,
	setNumberOfTodos,
	numberOfTodos,
	stateTodos
}) => {
	console.log('OUTPUT ÄR: stateTodos', stateTodos);
	console.log('OUTPUT ÄR: numberOfTodos', numberOfTodos);

	useEffect(
		() => {
			stateTodos.length > 0
				? console.log('jepp')
				: console.log('ingenting');
		},
		[ stateTodos ]
	);
	// console.log('OUTPUT ÄR: Main -> numberOfTodos', numberOfTodos);
	// console.log('OUTPUT ÄR: Main -> newTodo', newTodo);
	const [ temp, setTemp ] = useState(true);

	const [ showEdit, setShowEdit ] = useState(false);
	const [ showTodo, setShowTodo ] = useState(false);

	const [ todoText, setTodoText ] = useState({
		title: '',
		text: '',
		todoId: ''
	});

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
		console.log('OUTPUT ÄR: text', text);
		saveText(text);
	};

	let arr =
		stateTodos.length > 0
			? stateTodos
			: [ { title: '', text: '', todoId: numberOfTodos.length } ];
	console.log('OUTPUT ÄR: arr', arr);

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
				flex-wrap: wrap;
				overflow-x: hidden;
				padding-bottom: 2rem;
				padding-right: 2rem;
				margin-left: 2rem;
			`}>
			{/* //////////////////////////////////// */}
			{numberOfTodos.map((todo, idx) => {
				console.log('OUTPUT ÄR: todo', todo);
				console.log('StateTodo körs');
				return transitions.map(
					({ item, key, props }) =>
						item && (
							<TodoV2
								text={todo.text}
								title={todo.title}
								todoId={todo.todoId}
								key={key}
								style={props}
								id={idx}
								updateRedux={updateRedux}
								setNumberOfTodos={setNumberOfTodos}
								numberOfTodos={numberOfTodos}
								todoText={todoText}
								setTodoText={setTodoText}
							/>
						)
				);
			})}
			{/* {stateTodos === [] ? (
				stateTodos.map((todo, idx) => {
					console.log('OUTPUT ÄR: todo', todo);
					console.log('StateTodo körs');
					return transitions.map(
						({ item, key, props }) =>
							item && (
								<TodoV2
									key={key}
									style={props}
									id={idx}
									updateRedux={updateRedux}
									setNumberOfTodos={setNumberOfTodos}
									numberOfTodos={numberOfTodos}

									// newTodo={newTodo}
								/>
							)
					);
				})
			) : (
				numberOfTodos.map((todo, idx) => {
					console.log('Number of todos körs');
					console.log('OUTPUT ÄR: todo', todo);
					return transitions.map(
						({ item, key, props }) =>
							item && (
								<TodoV2
									key={key}
									style={props}
									id={idx}
									updateRedux={updateRedux}
									setNumberOfTodos={setNumberOfTodos}
									numberOfTodos={numberOfTodos}

									// newTodo={newTodo}
								/>
							)
					);
				})
			)} */}
			{/* /////////////////////////////// */}
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
	console.log('OUTPUT ÄR: state', state);
	// console.log('OUTPUT ÄR: state', state);
	return {
		stateTodos: state.todos
		// firestoreInMain: state.firestore.ordered.todotexter
	};
};

export default compose(
	firestoreConnect([ { collection: 'todotexter' } ]),
	connect(mapStateToProps, { saveText })
)(Main);
