import React, {useEffect, useState} from "react";

import './Checkbox.scss';

const Checkbox = props => {
	const {uid, label, onChange} = props;
	const [checked, setChecked] = useState(props.checked);

	useEffect(() => {
		const load = async () => {
			setChecked(props.checked);
		};
		load();
		
	}, [props.checked]);
	//console.log("CHECKED? "+label,checked)
	return (
		<div className="checkbox-container">
			<input id={uid} type="checkbox" style={{marginRight: '3px', width: '20px', height: '26px', color: 'black'}} checked={checked} onChange={() => onChange(!checked)} />
			<label htmlFor={uid}>{label}</label>
		</div>
	)
};

export default Checkbox;