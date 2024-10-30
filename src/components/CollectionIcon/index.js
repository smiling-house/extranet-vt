import React, { useState } from 'react';

const CollectionIcon = props => {
	const { readOnly, tooltip, label, path, selected2, selected, pathOver, pathOver2, className, style, onClick } = props;
	const [isHovering, setIsHovering] = useState(false);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '25px' }}>
			{readOnly && (
				<img
					className={className}
					src={isHovering && !readOnly || selected ? pathOver : selected2 ? pathOver2 : path}
					onMouseOver={() => setIsHovering(true)}
					onMouseOut={() => setIsHovering(false)}
					style={{ ...style, ...{ cursor: 'pointer' } }}
					alt=""
				/>
			)}
			{!readOnly && <img
				onClick={onClick}
				className={className}
				src={isHovering && !readOnly || selected ? pathOver : selected2 ? pathOver2 : path}
				onMouseOver={() => setIsHovering(true)}
				onMouseOut={() => setIsHovering(false)}
				style={{ ...style, ...{ cursor: 'pointer' } }}
				alt=""
			/>}
			{isHovering && <img src={label} alt="" style={{ marginTop: '-5px' }} title={tooltip} />}
		</div>
	)
};


export default CollectionIcon;