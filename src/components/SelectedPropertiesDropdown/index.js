import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import arrowDownIcon from '../../assets/icons/arrow-down-green.png';
import selectedPropertiesIcon from '../../assets/icons/selected-properties-dropdown.png';
import Button from "../Buttons/Button/Button";
import CheckboxCircle from "../CheckboxCircle";
import {useSelector} from "react-redux/es/index";
import * as propertyActions from "../../store/redux/Property/actions";

import './SelectedPropertiesDropdown.scss';

const SelectedPropertiesDropdown = props => {
	const { onShowSelection, width } = props;
	const [isOpen, setIsOpen] = useState(false);
	const selectedProperties = useSelector(state => state.property.selectedProperties);
	const dispatch = useDispatch();
	//console.log(selectedProperties);
	//console.log("selected",selectedProperties.length);

	const toggleSelectedProperty = property => {
		dispatch(propertyActions.toggleProperty(property));
	};

	useEffect(() => {
		const load = async () => {

		};
		load();
	}, []);

	const DropdownRow = ({property, onClick}) => {
		return (
			<div className="selected-properties-dropdown-body-row" onClick={onClick}>
				<CheckboxCircle selected={selectedProperties.indexOf(property) > -1} />
				<div className="selected-properties-dropdown-body-row-title">{property?.title}</div>
			</div>
		)
	};

	return (
		<div className="selected-properties-dropdown-container" >
			<div className="selected-properties-dropdown-header" onClick={() => setIsOpen(!isOpen)}>
				<div style={{display: 'flex'}}>
					<img src={selectedPropertiesIcon} alt="" />
					<div>&nbsp;Your Selected Properties</div>
				</div>
				<img src={arrowDownIcon} alt="" style={{transform: `rotateX(${isOpen ? '180deg' : '0deg'})`}} />
			</div>

			{
				isOpen &&
				<div className="selected-properties-dropdown-body">
					<div className="selected-properties-dropdown-body-rows">
						{
							selectedProperties.map((p, i) => <DropdownRow key={i} property={p} onClick={() => toggleSelectedProperty(p)} /> )
						}
					</div>

					<div className="selected-properties-dropdown-footer">
						<Button
							style={{fontSize: '18px', marginRight: '30px'}}
							variant="link"
							text="Cancel"
							onClick={() => setIsOpen(false)}
						/>
						<Button
							style={{fontSize: '18px'}}
							text="Generate Brochure "
							onClick={onShowSelection}
						/>
					</div>
				</div>
			}
		</div>
	)
};

export default SelectedPropertiesDropdown;