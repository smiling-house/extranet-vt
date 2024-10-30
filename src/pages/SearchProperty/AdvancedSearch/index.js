import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import removeIcon from '../../../assets/icons/remove.png';
import './AdvancedSearch.scss';
import AdvancedSearchFilter from "../../../components/AdvancedSearchFilter";
import Button from "../../../components/Buttons/Button/Button";
import priceRange from "../../../Util/data/PriceRange.json";
import PCT from "../../../Util/data/PCT.json";
import MustHave from "../../../Util/data/MustHave.json";
import Amenities from "../../../Util/data/Amenities.json";
import Popup from "../../../components/Popup";
import closeIcon from '../../../assets/icons/closeIcon.png';

const AdvancedSearch = props => {
	const [selectedPrices, setSelectedPrices] = useState([]);
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [selectedMusthave, setSelectedMusthave] = useState([]);
	const [selectedAmenities, setSelectedAmenities] = useState([]);

	const priceItems = priceRange.map(p => ({ value: p.code, label: p.name }));
	const typeItems = PCT.map(p => ({ value: p.name, label: p.name })).sort((a, b) => a.label.localeCompare(b.label));
	const mustHaveItems = MustHave.map(p => ({ value: p.name, label: p.name })).sort((a, b) => a.label.localeCompare(b.label));
	const amenitiesItems = Amenities.map(p => ({ value: p.name, label: p.name }));

	const { onClose, onSearch } = props;
	console.log(selectedPrices);
	console.log(selectedTypes);
	console.log(selectedMusthave);
	console.log(selectedAmenities);
	const dispatch = useDispatch();

	useEffect(() => {
		const load = async () => {

		};
		load();
	}, []);
 
	const updatePrices = (item) => {
		const selectedIndex = selectedPrices.findIndex((i) => i.value === item.value);
		if (selectedIndex > -1) {
			return; // Item already selected, return without making any changes
		}

		setSelectedPrices([item]); // Only set the selected item, clearing any previous selections
	};

	const updateTypes = (item) => {
		const selectedIndex = selectedTypes.findIndex((i) => i.value === item.value);
		if (selectedIndex > -1) {
			return; // Item already selected, return without making any changes
		}

		setSelectedTypes([item]); // Only set the selected item, clearing any previous selections
	};

	const updateMusthave = item => {
		if (selectedMusthave.findIndex(i => i.value === item.value) > -1) {
			setSelectedMusthave(selectedMusthave.filter(f => f.value !== item.value));
		}
		else {
			setSelectedMusthave([...selectedMusthave, item]);
		}
	};

	const updateAmenities = item => {
		if (selectedAmenities.findIndex(i => i.value === item.value) > -1) {
			setSelectedAmenities(selectedAmenities.filter(f => f.value !== item.value));
		}
		else {
			setSelectedAmenities([...selectedAmenities, item]);
		}
	};

	const renderSelectedItem = (item, index, removeFunction) => {
		return (
			<div key={index} className="advanced-property-search-selected-item">
				<span style={{ marginRight: '10px' }}>{item.label}</span>
				<img src={removeIcon} style={{ cursor: 'pointer' }} onClick={removeFunction} />
			</div>
		)
	};

	return (
		<>
			<div className="popup-wrapper"  onClose={onClose} >
				<div className="popup-container" style={{"width":"1800px"}}>
					<img src={closeIcon} className="popup-close-icon" onClick={onClose} />

					{/* <Popup > */}
					<div className="modal advanced-property-search-container bd-example-modal-lg" >
						<div className="model-header container advanced-property-search-top" >
							<div className="advanced-property-search-title text-center">Advanced Search Options</div>
							<div className="advanced-property-search-subtitle text-center">Choose multiple if desired</div>
						</div>

						<div class="modal-content modal-content-cst" >
							<div class="modal-body ">
								<div className="row ">
									<div className="col-md-3 col-3">
										<AdvancedSearchFilter title="Price($)" items={priceItems} selectedItems={selectedPrices} onChange={updatePrices} />
										<div className="advanced-property-filter-selected-items">
											{selectedPrices.map((item, i) => renderSelectedItem(item, i, () => updatePrices(item)))}
										</div>
									</div>

									<div className="col-md-3 col-3">
										<AdvancedSearchFilter title="Type" items={typeItems} selectedItems={selectedTypes} onChange={updateTypes} />
										<div className="advanced-property-filter-selected-items">
											{selectedTypes.map((item, i) => renderSelectedItem(item, i, () => updateTypes(item)))}
										</div>
									</div>

									<div className="col-md-3 col-3">
										<AdvancedSearchFilter title="MustHaves" items={mustHaveItems} selectedItems={selectedMusthave} onChange={updateMusthave} />
										<div className="advanced-property-filter-selected-items">
											{selectedMusthave.map((item, i) => renderSelectedItem(item, i, () => updateMusthave(item)))}
										</div>
									</div>

									<div className="col-md-3 col-3">
										<AdvancedSearchFilter title="Amenities" items={amenitiesItems} selectedItems={selectedAmenities} onChange={updateAmenities} />
										<div className="advanced-property-filter-selected-items">
											{selectedAmenities.map((item, i) => renderSelectedItem(item, i, () => updateAmenities(item)))}
										</div>
									</div>
								</div>
							</div>
							<div className="model-fotter p-2 ">
								<hr></hr>
								<div className="float-end mb-4">
									<Button style={{ fontSize: '18px', marginRight: '30px' }} variant="link" text="Cancel" onClick={onClose} />
									<Button style={{ fontSize: '18px' }} text="Search" onClick={onSearch} />
								</div>
							</div>
						</div>


					</div>
					{/* </Popup> */}
				</div>

			</div>


		</>
	)
};

export default AdvancedSearch;