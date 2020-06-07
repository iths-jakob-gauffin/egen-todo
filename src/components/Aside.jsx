import React, { useState, useEffect } from 'react';
import './Aside.scss';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// Components
import TodoThumb from './TodoThumb';
// import moduleName from './Aside.jsx'

import { useTrail, animated } from 'react-spring';

const Aside = props => {
	const [ showThumbMenu, setShowThumbMenu ] = useState(false);
	const [ content, setContent ] = useState(null);

	const [ toggle, setToggle ] = useState(true);
	const [ tempAnimation, setTempAnimation ] = useState([]);
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

	const trail = useTrail(tempAnimation.length, {
		opacity: toggle ? 1 : 0,
		from: {
			opacity: 0
		}
	});
	//////////////////////////////////////////////
	useEffect(
		() => {
			if (props.firestoreStuff) {
				let writeCopy = [ ...props.firestoreStuff ];
				let sortedTodoThumbLIst = writeCopy.sort(
					(a, b) => b.createdAt - a.createdAt
				);
				setTempAnimation(sortedTodoThumbLIst);
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
		},
		[ props.firestoreStuff ]
	);

	/////////////////////////////////////////
	useEffect(
		() => {
			if (props.firestoreStuff) {
				let writeCopy = [ ...props.firestoreStuff ];
				let sortedTodoThumbLIst = writeCopy.sort(
					(a, b) => b.createdAt - a.createdAt
				);
				setTempAnimation(sortedTodoThumbLIst);
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
		},
		[ props.firestoreStuff ]
	);
	////////////////////////////////////////////////
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
			<aside
				onMouseEnter={e => setShowThumbMenu(true)}
				onMouseLeave={e => setShowThumbMenu(false)}
				className={
					showThumbMenu ? (
						'aside-todo'
					) : (
						'aside-todo overflow-hidden'
					)
				}>
				{/* {contentToTodoThumb} */}
				{content}
				<div
					className={
						showThumbMenu ? (
							'aside-todo'
						) : (
							'aside-todo overflow-hidden'
						)
					}
				/>
				<ul className="ul-saved-todos">{todoList}</ul>
			</aside>
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
)(Aside);
