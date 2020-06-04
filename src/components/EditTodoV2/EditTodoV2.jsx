import React, { useState } from 'react';

import { css } from '@emotion/core';
import { colors } from '../../styles/emotion/colors';
import { animated } from 'react-spring';

// Components
import MaterialIcons from '../Icons/MaterialIcons';

const EditTodoV2 = ({ style }) => {
	const [ hoverSettings, setHoverSettings ] = useState(false);
	console.log('OUTPUT ÄR: hoverSettings', hoverSettings);

	return (
		<animated.article
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
				/* padding: 1rem 1.5rem; */
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
				<h1>Editmode</h1>
				<textarea
					css={css`
						background: none;
						border: none;
						width: 100%;
					`}
					name=""
					id=""
					cols="30"
					rows="10"
					placeholder="Skriv här"
				/>
			</main>
			<footer
				css={css`
					width: 100%;
					/* height: 20%; */
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
					<MaterialIcons>save</MaterialIcons>
					<MaterialIcons>add_circle_outline</MaterialIcons>
				</div>
			</footer>
		</animated.article>
	);
};

export default EditTodoV2;
