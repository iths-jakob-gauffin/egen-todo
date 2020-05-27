import React, { useState } from 'react';

import './Icon.scss';

const Icon = ({ icon, iconText, actionFunction }) => {
	const [ hover, setHover ] = useState(false);

	const editTodo = e => {
		let targetId = e.target.closest('.card-todo-thumb').id;
		actionFunction(targetId);
	};

	return (
		<div
			onClick={e => editTodo(e)}
			onMouseEnter={e => setHover(true)}
			className="same-hover"
			onMouseLeave={e => setHover(false)}>
			<span
				className={
					hover ? 'material-icons hover' : 'material-icons'
				}>
				{icon}
				<button className={hover ? 'hover' : null}>
					{iconText}
				</button>
			</span>
		</div>
	);
};

export default Icon;
