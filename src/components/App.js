import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import Spring1 from './Spring1';

// CSS
import './App.scss';

const App = () => {
	const [ numberOfTodos, setNumberOfTodos ] = useState([ 1 ]);

	const newTodo = () => {
		let newTodo = { stuff: 'text o sånt' };
		setNumberOfTodos([ ...numberOfTodos, newTodo ]);
	};

	return (
		// <Spring1 />
		<div className="container-app">
			<Header
				setNumberOfTodos={setNumberOfTodos}
				numberOfTodos={numberOfTodos}
				newTodo={newTodo}
			/>
			<Main
				numberOfTodos={numberOfTodos}
				setNumberOfTodos={setNumberOfTodos}
				newTodo={newTodo}
			/>
			<Footer />
		</div>
	);
};

export default App;
