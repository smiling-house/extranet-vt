import React, {useEffect, useState} from "react";
import Button from "../../Buttons/Button/Button";
import InputField from "../../InputField/index";
import TextAreaField from "../../TextAreaField/index";
import SaveSearchBig from "../../../assets/special-collection/icons/save-search-big.svg";

import './SaveSearchPopup.scss';
import Popup from "../../../components/Popup";

const SaveSearchPopup = props => {
	const { onClose } = props;
	const [fullName, setFullName] = useState('Moriya Rockmanrty recommended for y');
	const [priceRange, setPriceRance] = useState('$30,000');
	const [propertyType, setPropertyType] = useState('Beach House');
	const [mustHave, setMustHave] = useState('Pool');
	const [amenities, setAmenities] = useState('Sauna');
	const [phone, setPhone] = useState('');
	const [notes, setNotes] = useState('notes');
	const [destination, setDestination] = useState('London, UK');
	const [arrive, setArrive] = useState('16.1.2023');
	const [depart, setDepart] = useState('6.2.2023');
	const [guests, setGuests] = useState('2 Guests , 2 Children , 1 Bedrooms');

	useEffect(() => {
		const load = async () => {

		};
		load();
	}, []);

	return (
		<Popup onClose={onClose} width={950}>
			<div className="save-search-container">

				<div className="save-search-header">
					<div className="save-search-title"><img style={{width: '36px'}} src={SaveSearchBig} alt="" />&nbsp;Save search for the client</div>
				</div>

				<div style={{width: '100%', padding: '0 50px'}}>
					<InputField label="Client Full Name*" value={fullName} onChange={setFullName} placeholder={"Enter client name"} style={{marginTop: '20px'}} />

					<div className="save-search-main">
						<div>
							<div style={{marginTop: '10px', color: '#284866', fontSize: '22px', fontWeight: 500}}>
								<div>Search Description:</div>
								<InputField label="Destination" value={destination} onChange={setDestination} placeholder={"Enter destination"} style={{width: '400px', marginTop: '10px'}} />
							</div>

							<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '50px'}}>
								<InputField label="Arrive" value={arrive} onChange={setArrive} placeholder={"arrive date"} style={{width: '175px', marginTop: '20px'}} />
								<InputField label="Depart" value={depart} onChange={setDepart} placeholder={"depart date"} style={{width: '175px', marginTop: '20px'}} />
							</div>

							<div style={{marginTop: '10px', color: '#284866', fontSize: '22px', fontWeight: 500}}>
								<InputField label="Guests" value={guests} onChange={setGuests} placeholder={""} style={{width: '400px', marginTop: '10px'}} />
							</div>

						</div>

						<div>
							<div style={{marginTop: '10px', color: '#284866', fontSize: '22px', fontWeight: 500}}>
								<div>Advanced Search:</div>
								<InputField label="Price Range" value={priceRange} onChange={setPriceRance} placeholder={""} style={{width: '400px', marginTop: '10px'}} />
							</div>
							<InputField label="Property Type" value={propertyType} onChange={setPropertyType} placeholder={""} style={{width: '400px', marginTop: '20px'}} />
							<InputField label="Must Have" value={mustHave} onChange={setMustHave} placeholder={""} style={{width: '400px', marginTop: '20px'}} />
							<InputField label="Amenities" value={amenities} onChange={setAmenities} placeholder={""} style={{width: '400px', marginTop: '20px'}} />
						</div>
					</div>

					<InputField label="Note" value={notes} onChange={setNotes} placeholder={"Free text"} style={{marginTop: '20px'}} />
				</div>

				<div className="save-search-footer">
					<Button
						style={{fontSize: '18px', marginRight: '30px'}}
						variant="link"
						text="Cancel"
						onClick={onClose}
					/>
					<Button
						style={{fontSize: '18px', marginRight: '30px'}}
						text="Save"
						onClick={onClose}
					/>
				</div>
			</div>
		</Popup>
	)
};

export default SaveSearchPopup;