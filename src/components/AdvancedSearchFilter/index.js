 


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import plusOnIcon from '../../assets/icons/plus-on.svg';
import arrowDownIcon from '../../assets/icons/arrow-down.png';
import './AdvancedSearchFilter.scss';

const AdvancedSearchFilter = (props) => {
	const [showFloater, setShowFloater] = useState(false);
	const { title, items, selectedItems, onChange } = props;

	useEffect(() => {
		const load = async () => {
			// Any initialization or data loading logic can be placed here
		};
		load();
	}, []);

	const renderItem = (item, index) => {
		const selected = selectedItems.findIndex((i) => i.value === item.value) > -1;
		const className = selected
			? "advanced-search-filter-floater-item-selected"
			: "advanced-search-filter-floater-item";

		const handleClick = () => {
			setShowFloater(false); // Close the dropdown after selecting an option
			onChange(item);
		};

		return (
			<div key={index} className={className} onClick={handleClick}>
				{item.label}
			</div>
		);
	};

	return (
		<>
			{showFloater && (
				<div
					className="page-transparent-blocker"
					onClick={() => setShowFloater(false)}
				/>
			)}

			<div className="advanced-search-filter-wrapper">
				<div
					className="advanced-search-filter-container"
					onClick={() => setShowFloater(!showFloater)} // Toggle the dropdown visibility
				>
					<img src={plusOnIcon} />
					<div className="advanced-search-filter-title">{title}</div>
					<img src={arrowDownIcon} />
				</div>
				{showFloater && (
					<div className="advanced-search-filter-floater">
						{(items || []).map((item, i) => renderItem(item, i))}
					</div>
				)}
			</div>
		</>
	);
};

export default AdvancedSearchFilter;
