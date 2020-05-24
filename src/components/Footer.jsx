import React, { useState } from 'react';
import './Footer.scss';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// Components
import TodoThumb from './TodoThumb';

const Footer = props => {
	const [ showThumbMenu, setShowThumbMenu ] = useState(false);

	console.log('FOOTEROUTPUT ÄR: props', props);

	let content = null;
	let contentToTodoThumb = null;
	if (props.firestoreStuff) {
		let { text, title } = props.firestoreStuff[4];
		console.log('OUTPUT ÄR: toThumb', text);

		// contentToTodoThumb = { text, title };
		contentToTodoThumb = <TodoThumb text={text} title={title} />;
		// content = props.firestoreStuff.map(todo => {
		// 	return <li>{todo.authorFirstName}</li>;
		// });
		console.log(
			'OUTPUT ÄR: contentToTodoThumb',
			contentToTodoThumb.title
		);
	}
	return (
		<div className="cut">
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
				{contentToTodoThumb}
				{/* <TodoThumb
				text={contentToTodoThumb}
				title={contentToTodoThumb}
			/> */}
				{/* <TodoThumb /> */}
				<div
					className={
						showThumbMenu ? (
							'footer-todo'
						) : (
							'footer-todo overflow-hidden'
						)
					}
				/>
				<ul className="ul-saved-todos">{content}</ul>
			</footer>
		</div>
	);
};

console.log(firestoreConnect);

const mapStateToProps = state => {
	// console.log('FOOTERN OUTPUT ÄR: state', state.firestore.ordered);
	return {
		firestoreStuff: state.firestore.ordered.todotexter
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([ { collection: 'todotexter' } ])
)(Footer);
