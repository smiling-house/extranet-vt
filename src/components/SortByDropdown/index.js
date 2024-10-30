import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import arrowDownIcon from '../../assets/icons/arrow-down.png';

import './SortByDropdown.scss';

const SortByDropdown = props => {
	const [isOpen, setIsOpen] = useState(false);
	const [sortOrder, setSortOrder] = useState('');
	const {width} = props;
	const dispatch = useDispatch();

	useEffect(() => {
		const load = async () => {

		};
		load();
	}, []);

	const setSort=(Order)=>{
		console.log("Order by ",Order);
		setIsOpen(false);
		setSortOrder(Order);
	}

	const SortRow = ({title, order, onClick}) => {
		return (
			<div className="sort-by-body-row right" onClick={onClick}>
				<div style={{fontSize: '17px', fontWeight: 500, color: '#707070', alignContent: 'right'}}>{title}</div>
				<div style={{fontSize: '14px', color: '#AFAFAF'}}>{order}</div>
			</div>
		)
	};

	return (
		<div className="sort-by-container right">
			<div className="sort-by-header" onClick={() => setIsOpen(!isOpen)}>
				<div>Sort By</div>
				<img src={arrowDownIcon} style={{width: '18px', transform: `rotateX(${isOpen ? '180deg' : '0deg'})`}} />
			</div>

			{
				isOpen &&
				<div className="sort-by-body">
					<SortRow title="Total Nightly Rate" order="High to Low" onClick={() => {setSort("rateUp")}} />
					<SortRow title="Total Nightly Rate" order="Low to High" onClick={() => {setSort("rateDown")}} />
					<SortRow title="Total Commission" order="High to Low" onClick={() => {setSort("CommitionUp")}} />
					<SortRow title="Number of Bedrooms" order="High to Low" onClick={() => {setSort("BedroomsUp")}} />
					<SortRow title="Number of Bedrooms" order="Low to High" onClick={() => {setSort("BedroomsDown")}} />
					<SortRow title="Discounted Properties %" order="" onClick={() => {setSort("Discount")}} />
				</div>
			}
		</div>
	)
};

export default SortByDropdown;