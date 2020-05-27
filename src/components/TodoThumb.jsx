import React, { useState, useEffect } from 'react';

import './TodoThumb.scss';

import { connect } from 'react-redux';

import { somethingAsync } from '../actions/somethingAsync';

import Icon from './Icon';

const TodoThumb = props => {
	// console.log('TUMMEN OUTPUT ÄR: props', props);
	const [ thumbMenuToggle, setThumbMenuToggle ] = useState(false);

	let elsestuff = 'HEJE';

	useEffect(
		() => {
			// console.log('propppppps', props);
			// let tid = new Date(
			// 	state.firestore.status.ordered.todotexter.createdAt
			// 		.seconds * 1000
			// ).toLocaleDateString('en-US');
			// console.log('OUTPUT ÄR: tid', tid);
		},
		[ props.thumbState ]
	);

	const truncate = text => {
		let truncatedText = text.split('').splice(0, 60).join('');
		return truncatedText + '...';
	};

	return (
		<article
			className="card-todo-thumb"
			id={props.id}
			onMouseLeave={e => setThumbMenuToggle(false)}>
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
						actionFunction={props.setDoEditTodoId}
					/>
				</nav>
			</aside>
			<main
				onMouseEnter={e =>
					!thumbMenuToggle ? setThumbMenuToggle(true) : null}>
				<article>
					<p>{truncate(props.text ? props.text : elsestuff)}</p>
				</article>
			</main>
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

const mapStateToProps = state => {
	// console.log('SATTET', state);

	return {
		thumbState: state.firestore.status.ordered
		// tid: tid
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoThumb);
