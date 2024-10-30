import React, { useEffect } from "react";
import editIcon from '../../assets/icons/editIcon.png';

import './TextAreaField.scss';

const TextAreaField = props => {
	const { placeholder, value, onChange, label, style, children, readOnly=false } = props;

	useEffect(() => {
		const load = async () => {

		};
		load();
	}, []);

	return (
		<div className="text-area-field-container" style={style}>
			<div className="text-area-field-label mb-2">{label} <img src={editIcon} className="img-fluid" alt="editIcon" /></div>
			{readOnly?(
				<textarea value={value} className="text-area-field-input" readonly placeholder={placeholder}>
	{children}
	</textarea>):(
				<textarea value={value} className="text-area-field-input" onChange={(e) => onChange(e.target.value)} placeholder={placeholder}>
				{children}
				</textarea>)}
		</div>
	)
};

export default TextAreaField;