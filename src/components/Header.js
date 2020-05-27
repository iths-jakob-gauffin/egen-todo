import React from 'react';

import './Header.scss';

class Header extends React.Component {
	render() {
		return (
			<header className="header-todo">
				<button onClick={this.props.newTodo}>Ny todo</button>
				<h1>Egen todo</h1>
			</header>
		);
	}
}

export default Header;
