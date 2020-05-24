import React, { useState } from 'react';

import './TodoThumb.scss';

import { connect } from 'react-redux';

// import { saveText } from '../actions';

// import { db } from '../config/firebase';

import { somethingAsync } from '../actions/somethingAsync';

import Icon from './Icon';

const TodoThumb = props => {
	console.log('OUTPUT ÄR: TodoThumb -> props', props);
	const [ thumbMenuToggle, setThumbMenuToggle ] = useState(false);

	let elsestuff = 'HEJE';
	const toggleThumbMenu = (() => {
		let thumbMenuDOM = document.querySelector('.thumb-menu');
		if (thumbMenuToggle) {
			thumbMenuDOM.classList.add('hide-thumb-menu');
		} else {
			// thumbMenuDOM.classList.add('hide-thumb-menu');
			// document
			// 	.querySelector('.thumb-menu')
			// 	.classList.add('hide-thumb-menu');
		}
	})();

	const truncate = text => {
		console.log('OUTPUT ÄR: text', text);

		// let breadText = props.title ? props.title : elsestuff;
		let truncatedText = text.split('').splice(0, 60).join('');
		console.log('OUTPUT ÄR: truncatedText', truncatedText);
		return truncatedText + '...';
	};

	return (
		<article
			className="card-todo-thumb"
			id={props.id}
			onMouseLeave={e => setThumbMenuToggle(false)}>
			{/* <div className="todo-container"> */}
			<header
				onMouseEnter={e =>
					!thumbMenuToggle ? setThumbMenuToggle(true) : null}>
				<h3>{props.title ? props.title : elsestuff}</h3>
			</header>
			<aside
				className={
					thumbMenuToggle ? (
						'thumb-menu'
					) : (
						'thumb-menu hide-thumb-menu'
					)
				}>
				<nav className="icons">
					<Icon icon={'delete_forever'} iconText={'DELETE'} />
					<Icon
						icon={'photo_size_select_small'}
						iconText={'ENLARGE'}
					/>
					{/* <span class="material-icons">delete_forever</span> */}
				</nav>
				{/* <button onClick={e => saveTodo(e)}>SAVE TODO</button> */}
				{/* <h4>Jakob</h4> */}
			</aside>
			<main
				onMouseEnter={e =>
					!thumbMenuToggle ? setThumbMenuToggle(true) : null}>
				<article>
					<p>{truncate(props.text ? props.text : elsestuff)}</p>
				</article>
			</main>
			{/* </div> */}
		</article>
	);
};

// const mapStateToProps = state => {

// 	return {
// 		fettState: state
// 	};
// };

// export default connect(mapStateToProps, { saveText })(Todo);

const mapDispatchToProps = dispatch => {
	return {
		somethingAsync: something => dispatch(somethingAsync(something))
	};
};

export default connect(null, mapDispatchToProps)(TodoThumb);
