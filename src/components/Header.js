import React, { useState } from 'react';

import './Header.scss';

import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';

class Header extends React.Component {
	state = { test: true };
	render() {
		// console.log('OUTPUT ÄR: Header -> test', this.state.test);
		return (
			<header className="header-todo">
				<button onClick={this.props.newTodo}>Ny todo</button>
				<button
					onClick={() =>
						this.setState({ test: !this.state.test })}>
					Fade
				</button>
				<Fade top opposite when={this.state.test}>
					<h1>Egen todo</h1>
				</Fade>
			</header>
		);
	}
}
// const Header = () => {
// 	const [ val, setVal ] = useState(false);

// 	return (
// 		<header className="header-todo">
// 			{/* <button onClick={this.props.newTodo}>Ny todo</button> */}
// 			<button onClick={() => setVal(!val)}>FADEA DÅ!</button>
// 			<Flip top opposite when={val}>
// 				<h1>Egen todo</h1>
// 			</Flip>
// 		</header>
// 	);
// };

export default Header;
