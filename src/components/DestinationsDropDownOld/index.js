import React, {useEffect, useState} from "react";
import clearIcon from '../../assets/icons/closeIcon.png';
import arrowDown from '../../assets/icons/arrow-down.png';
import data from './data.json';
import destinations from './destinations.json';


import './DestinationsDropDown.scss';

const DestinationsDropDown = (props) => {
	const {formerDestination, selectDestination}=props
	const [searchText, setSearchText] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [showOptions, setShowOptions] = useState(false);


	useEffect(() => {
		//console.log("former=",formerDestination.formerDestination);
		selectOption('');
	},[]);


	const getComboIcon = () => {
		if(selectedOption !== '') {
			return <img src={clearIcon} alt="" style={{cursor: 'pointer', width: '18px'}} onClick={() => selectOption('')} />
		}

		return <img src={arrowDown} onClick={() => setShowOptions(!showOptions)} style={{align:'right',width: '18px', transform: `rotateX(${showOptions ? '180deg' : '0deg'})`}} />;
	};

	const updateText = text => {
		setSearchText(text);
	};

	const selectOption = text => {
		setSelectedOption(text);
		setSearchText(text);
		setShowOptions(false);
		updateText(text);
		selectDestination(text);
		console.log("destination:",text)
		//localStorage.setItem("destination",text);
		//handleSearchListings("q",text)
	};

	const getTitleOption = text => {
		return <div key={text} className="destinations-title-option">{text}</div>
	};

	const getLabelOption = (type, text) => {
		return <div key={`${type}-${text}`} className="destinations-label-option" title={text} onClick={() => selectOption(text)}>{text}</div>
	};

	const comboResults = () => {
		const matchCountries = data.filter(d => d.type === 'country' && d.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
		const matchCities = data.filter(d => d.type === 'city' && d.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
		const matchRegions = data.filter(d => d.type === 'region' && d.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
		// //console.log("matchCountries: ", matchCountries.length);
		// //console.log("matchCities: ", matchCities.length);

		if(matchCountries.length < 1 && matchCities.length < 1 && matchRegions.length < 1) {
			return (
				<div className="destinations-no-results">No matches</div>
			)
		}
		else {
			const results = [];

			if(matchCountries.length > 0) {
				results.push(getTitleOption('Country'));
				matchCountries.forEach(c => results.push(getLabelOption('country', c.name)));
			}

			if(matchCities.length > 0) {
				results.push(getTitleOption('City'));
				matchCities.forEach(c => results.push(getLabelOption('city', c.name)));
			}
			if(matchRegions.length > 0) {
				results.push(getTitleOption('Region'));
				matchCities.forEach(c => results.push(getLabelOption('region', c.name)));
			}

			return results;
		}
	};

	//console.log("showOptions: ", showOptions);

	return (
		<>
			{ showOptions && <div className="page-transparent-blocker" onClick={() => setShowOptions(false)} /> }
			<div className="destinations-wrapper" >
				<div className="destinations-container">
					<input type="text" value={searchText} onClick={() => setShowOptions(true)} onChange={e => updateText(e.target.value)} placeholder="Destination" className="destinations-input" />
					{ getComboIcon() }
				</div>
				{
					showOptions &&
					<div className="destinations-floater">
						{ comboResults() }
					</div>
				}
			</div>
		</>
	)
};

export default DestinationsDropDown;