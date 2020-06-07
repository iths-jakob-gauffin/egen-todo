import React, { useState, useEffect } from 'react';

//Styles
import { css } from '@emotion/core';
import { colors } from './../../styles/emotion/colors';
import { animated } from 'react-spring';

// Components
import MaterialIcons from './../Icons/MaterialIcons';

//Redux
import { connect } from 'react-redux';
import { somethingAsync } from './../../actions/somethingAsync';
import { newTodoAC } from './../../actions';

const TodoV2 = ({
	style,
	todoId,
	todoText,
	todoTitle,
	updateRedux,
	somethingAsync,
	// newTodo,

	numberOfTodos,
	setNumberOfTodos,
	newTodoAC
	// objToRedux,
	// setObjToRedux
}) => {
	console.log('OUTPUT ÄR: TODOID', todoId);
	const [ objToRedux, setObjToRedux ] = useState({
		title: todoTitle,
		text: todoText,
		todoId: todoId
	});
	console.log('OUTPUT ÄR: numberOfTodos', numberOfTodos);
	useEffect(
		() => {
			updateRedux(objToRedux);
		},
		[ objToRedux ]
	);

	//Skicka todotext till redux

	// const newTodo = e => {
	// 	setNumberOfTodos([ ...numberOfTodos, numberOfTodos.length + 1 ]);
	// 	updateRedux(todoText);
	// };

	const createNewTodo = () => {
		setNumberOfTodos([ ...numberOfTodos, numberOfTodos.length + 1 ]);

		// updateRedux(todoText);

		//Skicka med hur många todos som har gjorts hittills till actioncreatorn. number of todos är en array lik: [1,2,3,4 ] osv, ett index för varje todo

		newTodoAC(numberOfTodos.length + 1);
	};

	const saveTodoInRedux = () => {
		// updateRedux(todoText);
	};

	const saveTodoInReduxAndFirebase = () => {
		// let textInTodo = document.querySelector(`#textruta-${id}`).value;
		// updateRedux(todoText);
		// Save stuff to firebase
		// somethingAsync(todoText);
	};

	return (
		<animated.article
			articleId={todoId}
			style={style}
			css={css`
				width: 450px;
				height: 450px;
				background-color: ${colors.$blue3};
				display: flex;
				flex-direction: column;
				-webkit-box-shadow: 10px 10px 24px -7px rgba(0, 0, 0, 0.24);
				-moz-box-shadow: 10px 10px 24px -7px rgba(0, 0, 0, 0.24);
				box-shadow: 10px 10px 24px -7px rgba(0, 0, 0, 0.24);
				margin: 1rem;
			`}>
			<header
				css={css`
					position: relative;
					width: 100%;
					height: 20%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: ${colors.$blue2};
					padding: 1rem 1.5rem;
				`}>
				<input
					type="text"
					name=""
					// id="rubrik"
					css={css`
						width: 90%;
						background: none;
						border: none;
						color: white;
						font-size: 2rem;
					`}
					todoId={todoId}
					value={todoTitle}
					placeholder="Rubrik"
					onChange={e =>
						setObjToRedux({
							...objToRedux,
							['title']: e.target.value
						})}
				/>
				<div
					className="spin-absolute"
					css={css`
						position: relative;
						width: 10%;
						height: 100%;
						display: flex;
						justify-content: flex-end;
						align-items: center;
					`}>
					<MaterialIcons spin={true}>settings</MaterialIcons>
				</div>
			</header>
			<main
				css={css`
					width: 100%;
					height: 60%;
					background-color: ${colors.$blue1};
					padding: 1rem 1.5rem;
				`}>
				<textarea
					css={css`
						background: none;
						border: none;
						width: 100%;
					`}
					name=""
					// id={`textruta-${id}`}
					// todoId={todoText.todoId}
					todoId={todoId}
					cols="30"
					rows="10"
					placeholder="Skriv här"
					onChange={e =>
						setObjToRedux({
							...objToRedux,
							['text']: e.target.value
						})}
					value={todoText}
				/>
			</main>
			<footer
				css={css`
					width: 100%;
					display: flex;
					background-color: ${colors.$blue3};
					padding: 1.5rem 1.5rem;
				`}>
				<div
					className="icon-container"
					css={css`
						width: 23%;
						display: flex;
						justify-content: space-between;
					`}>
					<MaterialIcons callback={saveTodoInReduxAndFirebase}>
						save
					</MaterialIcons>
					<MaterialIcons callback={createNewTodo}>
						add_circle_outline
					</MaterialIcons>
				</div>
			</footer>
		</animated.article>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		somethingAsync: something => dispatch(somethingAsync(something))
	};
};

export default connect(null, { mapDispatchToProps, newTodoAC })(TodoV2);
