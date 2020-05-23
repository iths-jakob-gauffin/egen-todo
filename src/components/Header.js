import React from 'react';

import './Header.scss';

// import { connect } from 'react-redux';
// import { updateNumbers } from './../actions';

class Header extends React.Component {
	// console.log(props);
	// updateNumbers();
	// newTodo = () => {
	// 	// this.props.updateNumbers();
	// 	let newTodo = { stuff: 'text o sånt' };
	// 	this.props.setNumberOfTodos([
	// 		...this.props.numberOfTodos,
	// 		newTodo
	// 	]);
	// };
	render() {
		// console.log(this.props);
		return (
			<header className="header-todo">
				<button onClick={this.props.newTodo}>Ny todo</button>
				<h1>Egen todo</h1>
			</header>
		);
	}
}
// const Header = ({ numberOfTodos, setNumberOfTodos }) => {
// 	// console.log(props);
// 	updateNumbers();
// 	const newTodo = () => {
// 		let newTodo = { stuff: 'text o sånt' };
// 		setNumberOfTodos([ ...numberOfTodos, newTodo ]);
// 	};

// 	return (
// 		<header className="header-todo">
// 			<button onClick={newTodo}>Ny todo</button>
// 			<h1>Egen todo</h1>
// 		</header>
// 	);
// };

// const mapStateToProps = state => {
// 	console.log('OUTPUT ÄR: state', state);
// 	return { state: state };
// };

export default Header;

// export default connect(mapStateToProps, { updateNumbers })(Header);
