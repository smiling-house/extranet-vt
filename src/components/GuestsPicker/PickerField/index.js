import React, {useEffect} from "react";
import minusOnIcon from '../../../assets/icons/minus-on.svg';
import minusOffIcon from '../../../assets/icons/minus-off.svg';
import plusOnIcon from '../../../assets/icons/plus-on.svg';
import plusOffIcon from '../../../assets/icons/plus-off.svg';

import './PickerField.scss';

const PickerField = props => {
	const {title, subTitle, onAdd, onReduce, value, max} = props;

	useEffect(() => {
		const load = async () => {

		};
		load();
	}, []);

	const doReduce = () => {
		if(value > 0) {
			onReduce();
		}
	};

	const doAdd = () => {
		if(value < max) {
			onAdd();
		}
	};

	return (
		<div className="guests-picker-field-container">
			<div>
				<div style={{fontSize: '15px'}}>{title}</div>
				{ subTitle && <div style={{fontSize: '12px', color: '#B4B4B4'}}>{subTitle}</div> }
			</div>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<img src={value < 1 ? minusOffIcon : minusOnIcon} style={{cursor: value < 1 ? 'default' : 'pointer'}} onClick={doReduce} />
				<span style={{fontSize: '15px', color: '#707070', cursor: 'default', width: '50px', textAlign: 'center'}}>{value}</span>
				<img src={value < max ? plusOnIcon : plusOffIcon} style={{cursor: value < max ? 'pointer' : 'default'}} onClick={doAdd} />
			</div>
		</div>
	)
};

export default PickerField;