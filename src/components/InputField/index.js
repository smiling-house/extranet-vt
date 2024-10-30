import React, {useEffect} from "react";

import './InputField.scss';

const InputField = props => {
	const {value, readOnly,labelOnly, placeholder, onChange, label, labelStyle, style} = props;

	useEffect(() => {
		const load = async () => {

		};
		load();
	}, []);

	return (
		<div className="input-field-container" style={style || {}}>
			<div className="input-field-label" style={labelStyle || {}}>{label}</div>
			{!labelOnly && !readOnly && (
				<input type="text"
				className="input-field-input form-control"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				readOnly={readOnly}
		 />
			) }
			{!labelOnly && readOnly && (
				<input type="text"
				className="input-field-input form-control"
				value={value}
				placeholder={placeholder}
				readOnly={true}
		 />
			) }
			
		</div>
	)
};

export default InputField;