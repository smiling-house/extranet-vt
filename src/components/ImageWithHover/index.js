import React, {useState} from 'react';

const ImageWithHover = props => {
	const {path, pathOver, className, style, onClick, tooltip} = props;
	const [isHovering, setIsHovering] = useState(false);

	return (
		<img
			onClick={onClick}
			className={className}
			src={isHovering ? pathOver : path}
			onMouseOver={() => setIsHovering(true)}
			onMouseOut={() => setIsHovering(false)}
			title={tooltip}
			style={{...style, ...{cursor: 'pointer'}}}
			alt="" />
	)
};


export default ImageWithHover;