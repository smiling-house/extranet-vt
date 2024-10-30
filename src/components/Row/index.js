import React from "react";

const Row = props => {
	const {children, style} = props;

	const stl = {...style, ...{display: 'flex', alignItems: 'center'}};

	return (
		<div style={stl}>
			{children}
		</div>
	)
};

export default Row;