import React from 'react';
import './Footer.scss';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// Components
import TodoThumb from './TodoThumb';

const Footer = props => {
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
		<footer className="footer-todo">
			{contentToTodoThumb}
			{/* <TodoThumb
				text={contentToTodoThumb}
				title={contentToTodoThumb}
			/> */}
			{/* <TodoThumb /> */}
			<ul className="ul-saved-todos">{content}</ul>
		</footer>
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
