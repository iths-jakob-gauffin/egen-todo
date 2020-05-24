import React, { useState } from 'react';

import './Todo.scss';

import { connect } from 'react-redux';

// import { saveText } from '../actions';

// import { db } from '../config/firebase';

import { somethingAsync } from './../actions/somethingAsync';

const Todo = props => {
	const [ menuToggle, setMenuToggle ] = useState(false);

	const [ hoverTodo, setHoverTodo ] = useState(false);

	const [ enlargeTodo, setEnlargeTodo ] = useState(false);

	const saveTodo = () => {
		let textInTodo = document.querySelector(`#textruta-${props.id}`)
			.value;

		const todoObj = {
			textValue: textInTodo,
			todoId: props.id
		};
		props.updateRedux(todoObj);
	};

	const getStuffToFirebase = async e => {
		props.somethingAsync({
			textValue: 'blablabla',
			title: 'some rubrik'
		});

		// console.log('ska spara');
		// await db.collection('test').doc().set({
		// 	name: 'testnamn'
		// });
		// console.log('har sparat');
		// let stuff = await db.collection('test').get();
		// stuff.forEach(el => console.log(el.data()));
		return;
	};

	const resizeTodo = () => {
		// Enlarge todo scale 1.05  on hover if enlargeTodo is false
		if (!hoverTodo) {
			setHoverTodo(true);
		} else if (hoverTodo && enlargeTodo) {
			setHoverTodo(true);
		} else if (!hoverTodo && !enlargeTodo) {
			setHoverTodo(false);
		} else if (hoverTodo && !enlargeTodo) {
			setHoverTodo(false);
		}
		// if (!enlargeTodo) {
		// 	setEnlargeTodo(true);
		// } else if (hoverTodo) {
		// 	setEnlargeTodo(true);
		// } else {
		// 	setEnlargeTodo(false);
		// }
	};
	// const enlarge = () => {
	// 	if(!enlargeTodo){

	// 	}
	// 	return;
	// };

	const toggleMenu = e => {
		let id = e.target.closest('.card-todo').id;
		console.log('OUTPUT ÄR: el', id);

		let todo = document.getElementById(`${id}`);
		let menu = todo.querySelector('.inner');
		let black = todo.querySelector('.slide-container');

		if (!menuToggle) {
			menu.style.right = 0;
			black.classList.toggle('display-none');
			setMenuToggle(true);
			// menu.classList.toggle('show');
		} else {
			menu.style.right = '-12rem';
			black.classList.toggle('display-none');
			setMenuToggle(false);
			// }
			// menu.classList.toggle('show');
		}
	};

	return (
		<article
			className={hoverTodo ? 'card-todo hover-scale' : 'card-todo'}
			id={props.id}
			onMouseEnter={resizeTodo}
			onMouseLeave={resizeTodo}>
			<div
				className={
					enlargeTodo ? (
						'todo-container enlarge'
					) : (
						'todo-container'
					)
				}>
				<header>
					<input
						type="text"
						placeholder="Rubrik"
						onFocus={() => setEnlargeTodo(true)}
						// onBlur={resizeTodo}
						onBlur={() => {
							setEnlargeTodo(false);
							setHoverTodo(false);
						}}
					/>
					<nav>
						<span
							className="material-icons spin"
							onClick={e => toggleMenu(e)}>
							settings
						</span>
					</nav>
				</header>
				<div className="slide-container display-none">
					<nav className="slide-nav">
						<div className="inner">
							<div className="close-container">
								<span
									onClick={e => toggleMenu(e)}
									className="material-icons">
									highlight_off
								</span>
							</div>
							<ul>
								<li>
									<a href="#">Länk</a>
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
						// onBlur={resizeTodo}
						onBlur={() => {
							setEnlargeTodo(false);
							setHoverTodo(false);
						}}
						// onBlur={e => saveTodo(e)}
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
						{/* <span class="material-icons">
							enhanced_encryption
						</span> */}
						<span class="material-icons">delete_forever</span>
						<span className="material-icons">lock</span>
					</nav>
					{/* <button onClick={e => saveTodo(e)}>SAVE TODO</button> */}
					<h4>Jakob</h4>
				</footer>
			</div>
		</article>
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

export default connect(null, mapDispatchToProps)(Todo);
