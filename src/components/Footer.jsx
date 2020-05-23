import React from 'react';
import './Footer.scss';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const Footer = props => {
	console.log('OUTPUT ÄR: props', props);

	let content = null;
	if (props.firebaseStuff) {
		content = props.firebaseStuff.map(todo => {
			return <li>{todo.authorFirstName}</li>;
		});
	}

	return (
		<footer className="footer-todo">
			Footern
			<ul className="ul-saved-todos">{content}</ul>
		</footer>
	);
};

console.log(firestoreConnect);

const mapStateToProps = state => {
	// console.log('FOOTERN OUTPUT ÄR: state', state.firestore.ordered);
	return {
		firebaseStuff: state.firestore.ordered.todotexter
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([ { collection: 'todotexter' } ])
)(Footer);
