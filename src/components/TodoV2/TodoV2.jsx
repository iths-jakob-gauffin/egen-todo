import React, { useState } from 'react';

//Styles
import { css } from '@emotion/core';
import { colors } from './../../styles/emotion/colors';
import { animated } from 'react-spring';

// Components
import MaterialIcons from './../Icons/MaterialIcons';

//Redux
import { connect } from 'react-redux';
import { somethingAsync } from './../../actions/somethingAsync';

const TodoV2 = ({ style, id, updateRedux, somethingAsync, newTodo }) => {
	const [ todoText, setTodoText ] = useState({
		title: 'No title',
		text: 'No text',
		todoId: 'x'
	});

	const saveTodo = () => {
		let textInTodo = document.querySelector(`#textruta-${id}`).value;
		const todoObj = {
			textValue: textInTodo,
			todoId: id
		};
		updateRedux(todoObj);
	};
	const getStuffToFirebase = e => {
		somethingAsync(todoText);
		return;
	};

	return (
		<animated.article
			id={id}
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
					id="rubrik"
					css={css`
						width: 90%;
						background: none;
						border: none;
						color: white;
						font-size: 2rem;
					`}
					placeholder="Rubrik"
					onChange={e =>
						setTodoText({
							...todoText,
							title: e.target.value
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
					/* display: flex; */
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
					id={`textruta-${id}`}
					cols="30"
					rows="10"
					placeholder="Skriv här"
					onChange={e =>
						setTodoText({
							...todoText,
							text: e.target.value,
							todoId: id
						})}
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
					<MaterialIcons callback={getStuffToFirebase}>
						save
					</MaterialIcons>
					<MaterialIcons callback={newTodo}>
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

export default connect(null, mapDispatchToProps)(TodoV2);
