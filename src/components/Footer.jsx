import React, { useState, useEffect } from 'react';
import './Footer.scss';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// Components
import TodoThumb from './TodoThumb';

const Footer = props => {
	const [ showThumbMenu, setShowThumbMenu ] = useState(false);
	const [ content, setContent ] = useState(null);
	// let containerForTodoThumb = useRef(null);
	let todoList = null;
	let contentToTodoThumb = null;

	// console.log('OUTPUT ÄR: props', props);

	// // useEffect(() => {
	// const doCoolStuff = () => {
	// 	if (props.firestoreStuff) {
	// 		// setContent(contentToTodoThumb);
	// 		contentToTodoThumb = props.firestoreStuff.map(todo => {
	// 			return (
	// 				<TodoThumb
	// 					key={todo.id}
	// 					text={todo.text}
	// 					title={todo.title}
	// 				/>
	// 			);
	// 		});
	// 		return contentToTodoThumb;
	// 	}
	// };

	useEffect(
		() => {
			if (props.firestoreStuff) {
				let writeCopy = [ ...props.firestoreStuff ];
				let sortedTodoThumbLIst = writeCopy.sort(
					(a, b) => b.createdAt - a.createdAt
				);
				// console.log('OUTPUT ÄR: sorted', sortedTodoThumbLIst);
				contentToTodoThumb = sortedTodoThumbLIst.map(todo => {
					return (
						<TodoThumb
							key={todo.id}
							id={todo.id}
							text={todo.text}
							title={todo.title}
							createdAt={todo.createdAt}
							setDoEditTodoId={props.setDoEditTodoId}
						/>
					);
				});
				setContent(contentToTodoThumb);
			}
			// let grej = doCoolStuff();
			// console.log('OUTPUT ÄR: grej', grej);
			// setContent(grej);
		},
		[ props.firestoreStuff ]
	);

	// setContent();
	// });

	// async () => {
	// 	contentToTodoThumb = props.firestoreStuff.map(todo => {
	// 		return (
	// 			<TodoThumb
	// 				key={todo.id}
	// 				text={todo.text}
	// 				title={todo.title}
	// 			/>
	// 		);
	// 	});
	// 	console.log('OUTPUT ÄR: contentToTodoThumb', contentToTodoThumb);
	// 	setContent(contentToTodoThumb);
	// };

	// useEffect(
	// 	() => {
	// 		async function doStuff() {
	// 			await props.firestoreStuff.map(todo => {
	// 				console.log(todo);
	// 				contentToTodoThumb = (
	// 					<TodoThumb
	// 						key={todo.id}
	// 						text={todo.text}
	// 						title={todo.title}
	// 					/>
	// 				);
	// 				setContent({ ...content, contentToTodoThumb });
	// 				// return (

	// 				// );
	// 			});
	// 		}

	// 		// getContent();
	// 		// async () => {
	// 		// 	contentToTodoThumb = props.firestoreStuff.map(todo => {
	// 		// return (
	// 		// 	<TodoThumb
	// 		// 		key={todo.id}
	// 		// 		text={todo.text}
	// 		// 		title={todo.title}
	// 		// 	/>
	// 		// );
	// 		// 	});
	// 		// 	console.log(
	// 		// 		'OUTPUT ÄR: contentToTodoThumb',
	// 		// 		contentToTodoThumb
	// 		// 	);
	// 		// 	setContent(contentToTodoThumb);
	// 	}
	// 	// [ props.firestoreStuff ]
	// );
	return (
		<div className="cut">
			{/* {console.log('renderar')} */}
			<footer
				onMouseEnter={e => setShowThumbMenu(true)}
				onMouseLeave={e => setShowThumbMenu(false)}
				className={
					showThumbMenu ? (
						'footer-todo'
					) : (
						'footer-todo overflow-hidden'
					)
				}>
				{/* {contentToTodoThumb} */}
				{content}
				<div
					className={
						showThumbMenu ? (
							'footer-todo'
						) : (
							'footer-todo overflow-hidden'
						)
					}
				/>
				<ul className="ul-saved-todos">{todoList}</ul>
			</footer>
		</div>
	);
};

const mapStateToProps = state => {
	// console.log('OUTPUT ÄR: state', state);

	return {
		firestoreStuff: state.firestore.ordered.todotexter
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([ { collection: 'todotexter' } ])
)(Footer);
