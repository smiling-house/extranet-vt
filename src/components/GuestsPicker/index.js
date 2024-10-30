import React, {useEffect, useState} from "react";
import guests from '../../assets/icons/guests.png';
import './GuestsPicker.scss';
import PickerField from "./PickerField";

const GuestsPicker = props => {
	const [showFloater, setShowFloater] = useState(false);
	const [adults, setAdults] = useState(localStorage.getItem("adults"));
	const [children, setChildren] = useState(localStorage.getItem("children"));
	const [bedrooms, setBedrooms] = useState(localStorage.getItem("bedrooms"));
	const [bathrooms, setBathrooms] = useState(localStorage.getItem("bathrooms"));

	useEffect(() => {
		const load = async () => {

		};
		load();
	}, []);

	let text = 'Any Guests, Any Bedrooms';

	if(adults > 0 || children > 0 || bedrooms > 0 || bathrooms > 0) {
		const elements = [];
		if(adults > 0) {
			elements.push(`${adults} Guests`);
			////console.log("adults:",adults);
			localStorage.setItem("adults",adults);
		}
		if(children > 0) {
			elements.push(`${children} Children`);
			localStorage.setItem("children",children);
		}
		if(bedrooms > 0) {
			elements.push(`${bedrooms} Bedrooms`);
			////console.log("bedrooms:",bedrooms);
			localStorage.setItem("bedrooms",bedrooms);
		}
		if(bathrooms > 0) {
			elements.push(`${bathrooms} baths`);
			////console.log("Bathrooms:",bathrooms);
			localStorage.setItem("bathrooms",bathrooms);
		}

		text = elements.join(", ");
	}

	const borderRadius = showFloater ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : {};

	return (
		<>
			{ showFloater && <div className="page-transparent-blocker" onClick={() => setShowFloater(false)} /> }
			<div className="guests-picker-wrapper">
				<div style={borderRadius} className="guests-picker-container" onClick={() => setShowFloater(!showFloater)}>
					<img src={guests} style={{padding: '0 10px'}} />
					<div className="guests-picker-text" title={text}>{text}</div>
				</div>
				{
					showFloater &&
					<div className="guests-picker-floater">
						<PickerField title="Adults" value={adults} max={20} subTitle="Ages 13 and Above" onAdd={() => setAdults(adults+1)} onReduce={() => setAdults(adults - 1)} />
						<PickerField title="Children" value={children} max={20} subTitle="Ages 12 and Below" onAdd={() => setChildren(children+1)} onReduce={() => setChildren(children - 1)} />
						<PickerField title="Bedrooms" value={bedrooms} max={20} onAdd={() => setBedrooms(bedrooms+1)} onReduce={() => setBedrooms(bedrooms - 1)} />
						<PickerField title="Bathrooms" value={bathrooms} max={20} onAdd={() => setBathrooms(bathrooms+1)} onReduce={() => setBathrooms(bathrooms - 1)} />
					</div>
				}
			</div>
		</>
	)
};

export default GuestsPicker;