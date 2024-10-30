import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import clearIcon from '../../assets/icons/closeIcon.png';
import arrowDown from '../../assets/icons/arrow-down.png';
import AuthService from "../../services/auth.service";
import './DestinationsDropDown.scss';

const DestinationsDropDown = props => {
	const {selectDestination,formerDestination}=props
	const [searchText, setSearchText] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [showOptions, setShowOptions] = useState(false);
	const [countriesMarker, setcountriesMarker] = useState(null)
	const [regions, setRegions] = useState(localStorage.getItem('regions')?JSON.parse(localStorage.getItem('regions')):null)
	const [destinations, setDestinations] = useState(localStorage.getItem('destinations')?JSON.parse(localStorage.getItem('destinations')):null)
	const [cities, setCities] = useState(localStorage.getItem('cities')?JSON.parse(localStorage.getItem('cities')):null)
	const [countries, setCountries] = useState(localStorage.getItem('countries')?JSON.parse(localStorage.getItem('countries')):null)
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const villa = queryParams.get('villa');
	


	useEffect(() => {
		console.log('loading destinations')
					AuthService.DestinationsOptions().then((response) => {
							if (response) {
								console.log('succesfully read shub destinations!')
							}
						}).catch((e) => {
							console.log(e)
							console.log('cuold not read shub destinations!')
						})
					}
	  , []);


	const getComboIcon = () => {
		if(selectedOption !== '') {
			return <img src={clearIcon} alt="" style={{cursor: 'pointer', width: '18px'}} onClick={() => selectOption('')} />
		}

		return <img src={arrowDown} onClick={() => setShowOptions(!showOptions)} style={{width: '18px', transform: `rotateX(${showOptions ? '180deg' : '0deg'})`}} />;
	};

	const updateText = text => {
		setSearchText(text);
	};

	const selectOption = text => {
		setSelectedOption(text);
		setSearchText(text);
		setShowOptions(false);
		updateText(text);
		console.log("destination:",text)
		localStorage.setItem("destination",text);
		selectDestination(text);
		handleSearchListings("q",destination)
	};

	function capitalizeFLetter(Word) {
		return (Word[0].toUpperCase() +
			Word.slice(1));
	}
	

	const getTitleOption = text => {
		return <div key={text} className="destinations-title-option">{text}</div>
	};

	const getLabelOption = (type, text) => {
		return <div key={`${type}-${text}`} className="destinations-label-option" title={text} onClick={() => selectOption(capitalizeFLetter(text))}>{capitalizeFLetter(text)}</div>
	};

	const comboResults = () => {


		const matchCountries = countries?countries.filter(country => country?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1):[];
		const matchCities = cities?cities.filter(city => city?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1):[];
		const matchRegions = regions?regions.filter(region => region?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1):[];


		if(matchCountries.length < 1 && matchCities.length < 1 && matchRegions.length < 1) {
			return (
				<div className="destinations-no-results">No matches</div>
			)
		}
		else {
			const results = [];

			if(matchCountries.length > 0) {
				results.push(getTitleOption('Country'));
				matchCountries.forEach(c => results.push(getLabelOption('country', c)));
			}

			if(matchCities.length > 0) {
				results.push(getTitleOption('City'));
				matchCities.forEach(c => results.push(getLabelOption('city', c)));
			}
			if(matchRegions.length > 0) {
				results.push(getTitleOption('Region'));
				matchRegions.forEach(c => results.push(getLabelOption('region', c)));
			}


/* 			  if(countriesMarker){
				results.push(getTitleOption('villas'));
				countriesMarker.forEach(c => results.push(getLabelOption('villas', c)));			  }
			
 */

			return results;
		}
	};


	return (
		<>
			{ showOptions && <div className="page-transparent-blocker" onClick={() => setShowOptions(false)} /> }
			<div className="destinations-wrapper" >
				<div className="destinations-container">
					<input type="text" value={villa ? villa : searchText} onClick={() => setShowOptions(true)} onChange={e => updateText(e.target.value)} placeholder="Destination" className="destinations-input form-cntrol" />
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