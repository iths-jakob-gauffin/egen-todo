import './Spring.scss';
import React, { useState } from 'react';

import { useSpring, animated } from 'react-spring';

const Spring1 = () => {
	const [ isToggled, setToggle ] = useState(false);

	const fade = useSpring({
		// opacity: !isToggled ? 1 : 0,
		// height: !isToggled ? '200px' : '100px',
		backgroundColor: !isToggled ? 'tomato' : 'green'
	});

	// const fade = useSpring({
	// 	from: {
	// 		opacity: 0
	// 	},
	// 	to: {
	// 		opacity: 1
	// 	}
	// });

	return (
		<div>
			<animated.div className="hej-style" style={fade}>
				<h1>Fadea mig</h1>
			</animated.div>
			<button onClick={() => setToggle(!isToggled)}>FADEA DÅ</button>
		</div>

		// </Spring>
		// <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
		// 	{props => (
		// 		<div style={props}>
		// 			<div className="spring-container">
		// 				<div className="comp" style={s1Style}>
		// 					<h1>component1</h1>
		// 					<p>
		// 						Lorem, ipsum dolor sit amet consectetur
		// 						adipisicing elit. Minus tempore voluptas
		// 						quod voluptatum corporis numquam porro amet
		// 						dolorem at. Vel ducimus ipsa animi, fugiat
		// 						eligendi quos nisi accusantium facilis
		// 						vitae dolorum non dolores aliquid inventore
		// 						beatae doloribus quidem tempore deserunt
		// 						eum dolore expedita cum totam perferendis!
		// 						Reprehenderit, quis aliquam. Explicabo!
		// 					</p>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	)}
		// </Spring>
	);
};

const s1Style = {
	background: 'steelblue',
	color: 'white',
	padding: '1.5rem'
};

export default Spring1;
