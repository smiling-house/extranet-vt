import React, {useState} from "react";

import './BlueWhiteButton.scss';

const BlueWhiteButton = props => {
	const [isHovering, setIsHovering] = useState(false);
	const {icon, iconOn, label, style, onClick} = props;

	// <div className="saved-search-white-button"><img src={link} />&nbsp;&nbsp;Share selection as link for the client</div>
	return (
		<div className={isHovering ? 'blue-white-button-on' : 'blue-white-button'}
		     style={style}
		     onClick={onClick}
		     onMouseOver={() => setIsHovering(true)}
		     onMouseOut={() => setIsHovering(false)}>
			<img src={isHovering ? iconOn : icon} />&nbsp;&nbsp;{label}
		</div>
	)
};

export default BlueWhiteButton;