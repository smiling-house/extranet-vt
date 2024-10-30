import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader";
import pageBg from '../../assets/bk_pool.png';
import Button from "../../components/Buttons/Button/Button";
import Icon from 'react-web-vector-icons';
import DatePickerArrival from "../../components/Forms/Fields/DatePickerArrival/DatePickerArrival";
import DatePickerDeparture from "../../components/Forms/Fields/DatePickerDeparture/DatePickerDeparture";
import searchLogo from '../../assets/icons/search.png';
import React, { useEffect, useState } from "react";
import * as propertyActions from '../../store/redux/Property/actions';
import { useLocation } from "react-router-dom";
import PropertyBox from "../SearchProperty/PropertyBox";

const Reports = props => {
	const { prop } = props;
	const dispatch = useDispatch();
	const user = useSelector(state => state.user.user);

	useEffect(() => {
		const load = async () => { };
		load();
	}, []);

	const [pageNumber, setPageNumber] = useState(0);
	const location = useLocation();
	const isLoading = useSelector(state => state.property.isLoading);
	const favorites = useSelector(state => state.property.favorites);
	const selectedProperties = useSelector(state => state.property.selectedProperties);
	const myparam = location.state && location.state.params;

	useEffect(() => {
		const load = async () => {
			dispatch(propertyActions.loadFavorites(pageNumber));
		};
		load();
	}, [myparam]);

	const headerSearchRow = () => {
		return (
			<>
				<div className="mt-4 row mx-2">
					<div className="reservations-top-row2 col-sm-1 mb-2">
						<input
							type="text"
							className="reservations-search-input form-control "
							placeholder="Week"
						/>
					</div>
					<div className="reservations-top-row2-button col-sm-2 mb-2">
						<DatePickerDeparture />
					</div>
					<div className="reservations-top-row2-button col-sm-2 mb-2">
						<DatePickerArrival />
					</div>
					<div className="reservations-top-row2-button col-sm-1 mb-4">
						<Button
							style={{ height: '60px', fontSize: '20px' }}
							icon={<img src={searchLogo} style={{ width: '22px', marginRight: '5px' }} alt="" />}
							fullwidth={true}
							variant="green"
							text="Search"
						/>
					</div>
				</div>
			</>
		)
	};

	const onToggleProperty = property => {
		dispatch(propertyActions.toggleProperty(property));
	};

	return (
		<>
			<div className="clients-container" style={{ backgroundImage: `url(${pageBg})` }}>
				<div style={{ "background-color": "rgba(19, 59, 113, 0.8)" }} >
					<PageHeader searchOpen={null} topBgColor="#133B71"></PageHeader>
					{headerSearchRow()}
				</div>
			</div>
			<div className="p-4">
				<h1 className="mt-4 mb-4">Reservation Report</h1>
				<div className="table-responsive cst-table-reservation other-cst-bg">
					<table class="table text-center">
						<thead>
							<tr>
								<th scope="col" className="cst-for-gray p-4"><h3>By Period</h3></th>
								<th scope="col" className="p-4"><h3>New</h3></th>
								<th scope="col" className="p-4"><h3>Average Amt</h3></th>
								<th scope="col" className="p-4"><h3>Booking Revenue</h3></th>
								<th scope="col" className="p-4"><h3>Commission</h3></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row" className="cst-for-gray p-4">7 days</th>
								<td className="p-4">0</td>
								<td className="p-4">$0</td>
								<td className="p-4">$0</td>
								<td className="p-4">$0</td>
							</tr>
							<tr>
								<th scope="row" className="cst-for-gray p-4">30 days</th>
								<td className="p-4">0</td>
								<td className="p-4">$0</td>
								<td className="p-4">$0</td>
								<td className="p-4">$0</td>
							</tr>
							<tr>
								<th scope="row" className="cst-for-gray p-4">365 days</th>
								<td className="p-4">0</td>
								<td className="p-4">$0</td>
								<td className="p-4">$0</td>
								<td className="p-4">$0</td>
							</tr>
						</tbody>
					</table>
				</div>
				<h1 className="mt-4">Last 30-day Reservations</h1>
				<div className="mt-4 ">
					<div className="row">
						{favorites && favorites?.results?.map((property, i) => {
							const selected = selectedProperties.findIndex(p => p._id === property._id) > -1;
							return <>
								<PropertyBox
									key={i}
									favorites={true}
									property={property}
									selected={selected}
									onToggle={() => onToggleProperty(property)}
								/>
							</>
						})}
					</div>
				</div>
			</div>
		</>
	)
};

export default Reports;