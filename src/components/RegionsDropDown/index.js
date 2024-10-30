import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import clearIcon from '../../assets/icons/closeIcon.png';
import arrowDown from '../../assets/icons/arrow-down.png';
import AuthService from "../../services/auth.service";
import './RegionsDropDown.scss';

const RegionsDropDown = props => {
	const {propertyId,property,selectedRegion,selectedSubRegion,xdata,setNewRegion,updateData}=props
	const [searchText, setSearchText] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [showOptions, setShowOptions] = useState(false);
	const [countriesMarker, setcountriesMarker] = useState(null)
	const [regions, setRegions] = useState(localStorage.getItem('regions')?JSON.parse(localStorage.getItem('regions')):[])
	const [destinations, setDestinations] = useState(localStorage.getItem('destinations')?JSON.parse(localStorage.getItem('destinations')):[])
	const [cities, setCities] = useState(localStorage.getItem('cities')?JSON.parse(localStorage.getItem('cities')):[])
	const [countries, setCountries] = useState(localStorage.getItem('countries')?JSON.parse(localStorage.getItem('countries')):[])
	const location = useLocation();

	useEffect(() => {
		//console.log(property.address.state)
		selectOption(property.address.state?property.address.state:'' );
	  }, []);
	  useEffect(() => {
		//console.log('loading destinations')
		if (! (regions && countries && cities && destinations )) {
					AuthService.DestinationsOptions().then((response) => {
							if (response) {
								console.log('succesfully read shub destinations!')
							}
						}).catch((e) => {
							console.log(e)
							console.log('cuold not read shub destinations!')
						})
					} 
	  }, []);


	const getComboIcon = () => {

		return <img src={arrowDown} x onClick={() => setShowOptions(!showOptions)} style={{width: '18px', transform: `rotateX(${showOptions ? '180deg' : '0deg'})`}} />;
	};

	const updateText = text => {
		setSearchText(text);
	};

	const selectOption = text => {
		setSelectedOption(text);
		setSearchText(text);
		setShowOptions(false);
		updateText(text);
		if (text==='Insert new region') {
			//get the new region from the destination and save the xdata
			console.log("is that the new region?:",searchText)
			text=searchText
			selectedRegion(searchText)
			xdata.region=searchText
		} else
		if (text==='Insert new subregion') {
			//get the new region from the destination and save the xdata
			console.log("is that the new subregion?:",searchText)
			text=searchText
			selectedSubRegion(text)
			xdata.subregion=searchText
		} 
		//localStorage.setItem("destination",text);
		//selectedRegion(propertyId,text,xdata);
	};

	function capitalizeFLetter(Word) {
		return (Word[0].toUpperCase() +
			Word.slice(1));
	}
	

	const getTitleOption = text => {
		return <div key={text} className="destinations-title-option">{text}</div>
	};

	const getLabelOption = (type, text) => {
		return <div key={`${type}-${text}`} className={(type==='new')?"destinations-insert-option":"destinations-label-option"} title={text} onClick={() => selectOption(capitalizeFLetter(text))}>{capitalizeFLetter(text)}</div>
	};

	const comboResults = () => {
		console.log('show regions on :',property.address.full)
	//const matchRegions = regions?regions.filter(region => region.toLowerCase().indexOf(searchText.toLowerCase()) > -1):[];
	const matchDestRegions = destinations&&property.address?.country?destinations[property.address?.country].regions:[];
	const matchArry = matchDestRegions? Object.keys(matchDestRegions).map(key => key).filter((x)=>x!=="unmapped") :[]
		console.log("matched in destination:",matchDestRegions,matchArry.length,matchArry)
		const results = [];
		results.push(getLabelOption(searchText, 'Insert new region'))
		results.push(getLabelOption(searchText, 'Insert new subregion'))
		if( matchArry.length < 1) {

			return ( {results}+
				<div className="destinations-no-results">No matches</div>
			)
		}
		else {
			if(matchArry.length > 0) {
				results.push(getTitleOption('Regions in '+property.address.country));
				matchArry.forEach(c => results.push(getLabelOption('region', c)));
			}
			return results;
		}
	};


	return (
		<>
			{ showOptions && <div className="page-transparent-blocker" onClick={() => setShowOptions(false)} /> }
			<div className="destinations-wrapper" >
				<div className="destinations-container">
					<input type="text" value={searchText} onClick={() => setShowOptions(true)} onChange={e => updateText(e.target.value)} placeholder="Destination" className="destinations-input form-cntrol" />
					{ getComboIcon() }
				</div>
				{
					showOptions &&
					<div className="destinations-floater" >
						{ comboResults() }
					</div>
				}
			</div>
		</>
	)
};

export default RegionsDropDown;