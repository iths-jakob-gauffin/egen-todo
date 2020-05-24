import React, { useState } from 'react';

import './Icon.scss';

const Icon = ({ icon, iconText }) => {
	const [ hover, setHover ] = useState(false);

	return (
		<div
			onMouseEnter={e => setHover(true)}
			className="same-hover"
			onMouseLeave={e => setHover(false)}>
			<span
				className={
					hover ? 'material-icons hover' : 'material-icons'
				}>
				{icon}
				<a href="" className={hover ? 'hover' : null}>
					{iconText}
				</a>
			</span>
		</div>
	);
};

export default Icon;
