import React, { useState, useEffect } from 'react';

import './Todo.scss';

import { connect } from 'react-redux';

import { somethingAsync } from '../actions/somethingAsync';

import { useSpring, animated, config, useTransition } from 'react-spring';

const EditStuff = props => {
	// console.log('EDITTODO OUTPUT ÄR: props', props.dataOfTodoToBeEdited);

	const [ menuToggle, setMenuToggle ] = useState(false);

	const [ hoverTodo, setHoverTodo ] = useState(false);

	const [ enlargeTodo, setEnlargeTodo ] = useState(false);

	const [ todoText, setTodoText ] = useState({
		title: 'No title',
		text: 'No text',
		todoId: 'No todoId'
	});
	// console.log('OUTPUT ÄR: todoText', todoText);

	useEffect(
		() => {
			return setTodoText({
				text: props.dataOfTodoToBeEdited.text,
				title: props.dataOfTodoToBeEdited.title,
				id: props.dataOfTodoToBeEdited.id,
				todoId: props.id
			});
		},
		[ props.dataOfTodoToBeEdited ]
	);

	const saveTodo = () => {
		let textInTodo = document.querySelector(`#textruta-${props.id}`)
			.value;

		const todoObj = {
			textValue: textInTodo,
			todoId: props.id
		};
		props.updateRedux(todoObj);
	};

	const getStuffToFirebase = e => {
		// console.log('OUTPUT ÄR: todoText', todoText);

		// if (!todoText.title) {
		// 	todoText.title = 'No title';
		// }
		// if (!todoText.text){
		// 	todoText.text = "No text"
		// }

		props.somethingAsync(todoText);

		// props.somethingAsync({
		// 	textValue: 'blablabla',
		// 	title: 'some rubrik'
		// });
		return;
	};

	const resizeTodo = () => {
		// USE TO BE Enlarge todo scale 1.05  on hover if enlargeTodo is false
		if (!hoverTodo) {
			setHoverTodo(true);
		} else if (hoverTodo && enlargeTodo) {
			setHoverTodo(true);
		} else if (!hoverTodo && !enlargeTodo) {
			setHoverTodo(false);
		} else if (hoverTodo && !enlargeTodo) {
			setHoverTodo(false);
		}
	};

	const toggleMenu = e => {
		// let id = e.target.closest('.card-todo').id;

		// let todo = document.getElementById(`${id}`);
		// let menu = todo.querySelector('.inner');
		// let black = todo.querySelector('.slide-container');

		if (!menuToggle) {
			setMenuToggle(true);
		} else {
			setMenuToggle(false);
		}
	};

	//animations
	const fade = useSpring({
		from: {
			opacity: 0,
			// scale: '10%',
			// width: '0rem',
			height: '0rem',
			scale: hoverTodo ? '100%' : '100%',
			// transform: 'translate3d(0, -100%, 0), scale(0.5, 0.5)'
			transform: 'scale(0.1, 0.1) translate3d(-100%, 0%, 0)'
			// boxShadow: hoverTodo
			// 	? '10px 10px 24px -7px rgba(0, 0, 0, 0.44)'
			// 	: '10px 10px 24px -7px rgba(0, 0, 0, 0.24)'
		},
		to: {
			opacity: 1,
			width: '40rem',
			height: '40rem',
			// scale: '100%',
			scale: hoverTodo ? '110%' : '100%',
			// transform: 'translate3d(0, 0, 0), scale(0.5, 0.5)'
			transform: 'scale(1, 1) translate3d(0, 0, 0)'
			// boxShadow: hoverTodo
			// 	? '10px 10px 24px -7px rgba(0, 0, 0, 0.44)'
			// 	: '10px 10px 24px -7px rgba(0, 0, 0, 0.24)'
		},
		config: config.wobble,
		delay: 100
	});
	// FUNKADE
	// const fade = useSpring({
	// 	from: {
	// 		opacity: 0,
	// 		// scale: '10%',
	// 		// width: '0rem',
	// 		height: '0rem',
	// 		scale: hoverTodo ? '100%' : '100%',
	// 		// transform: 'translate3d(0, -100%, 0), scale(0.5, 0.5)'
	// 		transform: 'scale(0.1, 0.1) translate3d(-100%, 0%, 0)'
	// 		// boxShadow: '10px 10px 24px -7px rgba(0, 0, 0, 0.24)'
	// 	},
	// 	to: {
	// 		opacity: 1,
	// 		width: '25rem',
	// 		height: '25rem',
	// 		// scale: '100%',
	// 		scale: hoverTodo ? '110%' : '100%',
	// 		// transform: 'translate3d(0, 0, 0), scale(0.5, 0.5)'
	// 		transform: 'scale(1, 1) translate3d(0, 0, 0)'
	// 		// boxShadow: '10px 10px 24px -7px rgba(0, 0, 0, 0.44)'
	// 	},
	// 	config: config.wobble,
	// 	delay: 100
	// });

	// const hover = useSpring({
	// 	scale: hoverTodo ? '110%' : '100%',
	// 	config: config.gentle
	// });

	const enlargeAnimation = useSpring({
		width: enlargeTodo ? '50rem' : '40rem',
		height: enlargeTodo ? '40rem' : '15rem',
		position: enlargeTodo ? 'absolute' : 'relative',
		config: config.wobble,
		boxShadow: hoverTodo
			? '10px 10px 24px -7px rgba(0, 0, 0, 0.44)'
			: '10px 10px 24px -7px rgba(0, 0, 0, 0.24)'
	});

	return (
		<animated.article
			style={fade}
			className={hoverTodo ? 'card-todo' : 'card-todo'}
			id={props.id}
			onMouseEnter={resizeTodo}
			onMouseLeave={resizeTodo}>
			<animated.div
				style={enlargeAnimation}
				className={
					enlargeTodo ? (
						'todo-container hover-scale'
					) : (
						'todo-container'
					)
				}>
				<header>
					<input
						type="text"
						placeholder="Rubrik"
						onFocus={() => setEnlargeTodo(true)}
						onBlur={() => {
							setEnlargeTodo(false);
							setHoverTodo(false);
						}}
						onChange={e =>
							setTodoText({
								...todoText,
								title: e.target.value
							})}
						value={todoText.title}
					/>
					<nav>
						<span
							className="material-icons spin"
							onClick={e => toggleMenu(e)}>
							settings
						</span>
					</nav>
				</header>
				<div
					className={
						menuToggle ? (
							'slide-container dark-background'
						) : (
							'slide-container hide'
						)
					}>
					<nav className="slide-nav">
						<div
							className={
								menuToggle ? 'inner open' : 'inner'
							}>
							<div className="close-container">
								<span
									onClick={e => toggleMenu(e)}
									className="material-icons">
									highlight_off
								</span>
							</div>
							<ul>
								<li>
									<button>Länk</button>
								</li>
							</ul>
						</div>
					</nav>
				</div>
				<main>
					<textarea
						name=""
						id={`textruta-${props.id}`}
						placeholder=" Write something"
						onFocus={() => setEnlargeTodo(true)}
						onBlur={() => {
							setEnlargeTodo(false);
							setHoverTodo(false);
						}}
						onChange={e =>
							setTodoText({
								...todoText,
								text: e.target.value,
								todoId: props.id
							})}
						value={todoText.text}
					/>
				</main>
				<footer className="footer-todo">
					<nav className="icons">
						<span
							onClick={e => saveTodo(e)}
							className="material-icons">
							save
						</span>
						<span
							onClick={props.newTodo}
							className="material-icons">
							add_circle_outline
						</span>
						<span
							onClick={e => getStuffToFirebase(e)}
							className="material-icons">
							backup
						</span>
						<span className="material-icons">
							delete_forever
						</span>
						<span className="material-icons">lock</span>
					</nav>
					<h4>Jakob</h4>
				</footer>
			</animated.div>
		</animated.article>
	);
};

// const mapStateToProps = state => {
// 	console.log('OUTPUT ÄR: state', state);

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

export default connect(null, mapDispatchToProps)(EditStuff);
