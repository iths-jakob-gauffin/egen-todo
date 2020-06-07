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

	setNumberOfTodos,
	numberOfTodos,
	stateTodos
}) => {
	console.log('OUTPUT ÄR: stateTodos', stateTodos);
	// useEffect(
	// 	() => {
	// 		stateTodos.length > 0
	// 			? console.log('jepp')
	// 			: console.log('ingenting');
	// 	},
	// 	[ stateTodos ]
	// );

	const [ showEdit, setShowEdit ] = useState(false);
	const [ showTodo, setShowTodo ] = useState(false);

	// const [ objToRedux, setObjToRedux ] = useState({
	// 	title: stateTodos.title,
	// 	text: stateTodos.text,
	// 	todoId: numberOfTodos[0]
	// });
	// console.log('OUTPUT ÄR: numberOfTodos', numberOfTodos);
	// useEffect(
	// 	() => {
	// 		updateRedux(objToRedux);
	// 	},
	// 	[ objToRedux ]
	// );

	// const [ todoText, setTodoText ] = useState({
	// 	title: '',
	// 	text: '',
	// 	todoId: 1
	// });

	// console.log('OUTPUT ÄR: stateTodos', stateTodos);
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

	const updateRedux = todoObj => {
		// console.log('OUTPUT ÄR: todoObj', todoObj);

		saveText(todoObj);
	};

	// let arrayOfTodos =
	// 	stateTodos.length > 0
	// 		? stateTodos
	// 		: [ { title: '', text: '', todoId: 1 } ];

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
	// console.log('HÄÄÄÄÄÄR', stateTodos.todoId);
	// stateTodos.map(todo => {
	// 	console.log('NUUUUU', todo.todoId);
	// });

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
			{/* // All state ligger i stateTodos, som kommer ifrån redux, här sparas allt som skrivs i todosen. Det är en controlled state som uppdaterar todosvärdena.  */}
			{stateTodos.map((stateTodo, idx) => {
				return transitions.map(
					({ item, key, props }) =>
						item && (
							<TodoV2
								key={key}
								style={props}
								todoId={stateTodo.todoId}
								updateRedux={updateRedux}
								setNumberOfTodos={setNumberOfTodos}
								numberOfTodos={numberOfTodos}
								todoText={stateTodo.text}
								todoTitle={stateTodo.title}
								// objToRedux={objToRedux}
								// setObjToRedux={setObjToRedux}
								// setTodoText={setTodoText}
							/>
						)
				);
			})}
			{transitionsEditTodo.map(
				({ item, key, props }) =>
					item && <EditTodoV2 key={key} style={props} />
			)}
		</main>
	);
};

const mapStateToProps = state => {
	if (state.todos.length === 0) {
		// state.todos = [...state.todos, title];
		state.todos = [
			{ ...state.todos, title: '', text: '', todoId: 1 }
		];
		// ];
		return {
			stateTodos: state.todos
		};
	}

	return {
		stateTodos: state.todos
		// firestoreInMain: state.firestore.ordered.todotexter
	};
};

export default compose(
	firestoreConnect([ { collection: 'todotexter' } ]),
	connect(mapStateToProps, { saveText })
)(Main);
