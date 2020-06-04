import React from 'react';
import { css, keyframes } from '@emotion/core';

const spinAnimation = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

const MaterialIcons = ({
	children,
	size = '40px',
	callback = null,
	spin = false
}) => {
	if (spin) {
	}

	return (
		<span
			css={css`
				cursor: pointer;
				${spin ? `position: absolute;` : `position: relative`};
				font-size: ${size};
				z-index: 10;
				color: rgba(255, 255, 255, .6);
				transition: color .5s ease-out;
				&:hover {
					color: rgba(255, 255, 255, 1);
					${spin &&
						`animation: spinAnimation 2s linear infinite; position: absolute; z-index: 10;`};
				}
			`}
			onClick={callback}
			className="material-icons">
			{children}
		</span>
	);
};

export default MaterialIcons;
