import React from 'react';

import './Main.scss';
import Todo from './Todo.jsx';

import { connect } from 'react-redux';
import { saveText } from './../actions';

const Main = props => {
	const updateRedux = text => {
		props.saveText(text);
	};

	return (
		<main className="main-todo">
			{props.numberOfTodos.map((todo, idx) => (
				<Todo
					key={idx}
					id={idx}
					updateRedux={updateRedux}
					newTodo={props.newTodo}
				/>
			))}
		</main>
	);
};

const mapStateToProps = state => {
	console.log('OUTPUT ÄR: state', state);
	return {
		stateMain: state
	};
};

export default connect(mapStateToProps, { saveText })(Main);
