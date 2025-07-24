import React, {useEffect, useState} from "react";
import notesIcon from '../../../assets/icons/notes.svg';
import specialEvents from '../../../assets/special-collection/events.svg';
import specialFamilies from '../../../assets/special-collection/families.svg';
import greenIcon from '../../../assets/special-collection/icons/green.svg';
import dogsIcon from '../../../assets/special-collection/icons/dogs.svg';
import shareSelection from '../../../assets/icons/share-selection.png';
import shareSelectionOn from '../../../assets/icons/share-selection-on.svg';
import link from '../../../assets/icons/link.png';
import linkOn from '../../../assets/icons/link-on.svg';
import Datatable from "../../../components/Datatable";
import Button from "../../../components/Buttons/Button/Button";

import './ClientSavedSearch.scss';
import BlueWhiteButton from "../../../components/Buttons/BlueWhiteButton";
import axios from "axios";
import {baseURL} from "../../../core/index.js";
import Paging from "../../../components/Paging";
import constants from "../../../Util/constants";

const ClientSavedSearch = props => {
	const { client, onClose,token } = props;
	const [clientLogs, setClientLogs] = useState([]);
	const [isRefresh, setIsRefresh] = useState(false);
	// console.log("clientLogs >>>>", clientLogs);
	const [filterClientLogs, setFilterClientLogs] = useState();
	// console.log("filterClientLogs >>>>", filterClientLogs);
	const [searchClientLogs, setSearchClientLogs] = useState("");
	const [pageNumber, setPageNumber] = useState(0);
	console.log("client for logs:",client)
	const doSearch = pageNumber => {
		console.log("skipping : ", pageNumber * constants.PAGING_CLIENT_SIZE);
		getAllClientLogs();
	};

	let clientPagingFrom = 1 + pageNumber * constants.PAGING_CLIENT_SIZE;
	let clientPagingTo = (pageNumber + 1) * constants.PAGING_CLIENT_SIZE;

	const onChangePage = pageNumber => {
		console.log("page=",pageNumber);
		setPageNumber(pageNumber);
		 clientPagingFrom = 1 + pageNumber * constants.PAGING_CLIENT_SIZE;
		 clientPagingTo = (pageNumber + 1) * constants.PAGING_CLIENT_SIZE;
		doSearch(pageNumber);
	};


  const userRequest = axios.create({
    baseURL: baseURL,
    headers: {
      token: `Bearer ${token}`,
    },
  });
  
	const getAllClientLogs = async () => {
		const clientLogsResponse = await userRequest.get(`/client-log/getAllLogs`, {
		  params: { client_id:client.client_id, limit: constants.PAGING_CLIENT_SIZE, skip: clientPagingFrom-1 },
		}
		);
		console.log("fetched clientsLogs >>>>", clientLogsResponse.data.totalLogs, clientLogsResponse.data.clientsLogs);
		clientLogs.totalLogs=clientLogsResponse.data.totalLogs;
		setClientLogs(clientLogsResponse.data.clientsLogs);
		setFilterClientLogs(clientLogsResponse.data.clientsLogs);
	  };
	
	  useEffect(() => {
		getAllClientLogs();
	  }, [isRefresh]);

	const handleSearchClientLogs = async (clientLogs) => {
    // console.log("client: ", client);
    setSearchClientLogs(clientLogs);

    let matches = [];

    if (clientLogs.length > 0) {
      matches = await clientLogs.filter((filt) => {
        const regex = new RegExp(`${clientLogs}`, "gi");
        return filt.email.match(regex) || filt.name.match(regex);
      });
    }
    console.log("matches >>>", matches);
    if (clientLogs.length > 0) {
      setFilterClientLogs(matches);
    } else {
      setFilterClientLogs(clientLogs);
    }
  	};

	const renderSpecialCollections = row => {
		return (
			<div>
				<img src={specialEvents} style={{marginRight: '5px', width: '25px'}} />
				<img src={specialFamilies} style={{marginRight: '5px', width: '25px'}} />
				<img src={dogsIcon} style={{marginRight: '5px', width: '45px'}} />
				<img src={greenIcon} style={{marginRight: '5px', width: '20px'}} />
			</div>
		)
	};

	const renderCheckRow = row => {
		return (
			<div className="saved-search-datagrid-property">
				<input type="checkbox" style={{marginRight: '15px', width: '20px'}}  />
				<div className="link18">{row.property_id}</div>
			</div>
		)
	};

	const columns = [
		{
			id: 'propertyId',
			name: 'Property Id',
			//selector: row => row.propertyId,
			cell: row => renderCheckRow(row),
			width: '250px'
		},{
			id: 'specialCollection',
			name: 'Special Collection',
			//selector: row => row.lastName,
			cell: row => renderSpecialCollections(row),
			width: '220px'
		}, {
			id: 'booked',
			name: 'Booked',
			sortable: true,
			//selector: row => row.booked,
			cell: row => <div>{row.booked?"Y":"-"}</div>,
			width: '130px'
		}, {
			id: 'propertyName',
			name: 'Property Name',
			sortable: true,
			//selector: row => row.propertyName,
			cell: row => <div className="link18" style={{textOverflow: 'ellipsis', width: '530px', overflow: 'hidden'}}>{row.propertyName}</div>,
			width: '560px'
		},  {
			id: 'whereTo',
			name: 'Where To',
			sortable: true,
			//selector: row => row.whereTo,
			cell: row => <div>{row.whereTo}</div>,
			width: '200px'
		}
	];

	let data = [{
		propertyId: 1235043639,
		booked: '5.1.2023',
		propertyName: 'Amazing Villa with infinity views & sunsets',
		whereTo: 'London, uk',
		links: 'Y',
		offerDate: '10.1.2023'
	},{
		propertyId: 1235043639,
		booked: '5.1.2023',
		propertyName: 'Amazing Villa with infinity views & sunsets',
		whereTo: 'London, uk',
		links: 'Y',
		offerDate: '10.1.2023'
	},{
		propertyId: 1235043639,
		booked: '5.1.2023',
		propertyName: 'Amazing Villa with infinity views & sunsets',
		whereTo: 'London, uk',
		links: 'Y',
		offerDate: '10.1.2023'
	},{
		propertyId: 1235043639,
		booked: '5.1.2023',
		propertyName: 'Amazing Villa with infinity views & sunsets',
		whereTo: 'London, uk',
		links: 'Y',
		offerDate: '10.1.2023'
	}];

	data = [...data, ...data, ...data];

	return (
		<div className="saved-search-container">
			<div className="saved-search-title">Saved Search Multiple <span style={{color: '#165093'}}>{client.firstName + ' ' + client.lastName}</span></div>
			<div className="saved-search-header">
				<div>
					<div className="saved-search-header-title">Nick Name</div>
					<div className="saved-search-header-value">Nick Name</div>
				</div>

				<div>
					<div className="saved-search-header-title">Email Address</div>
					<div className="saved-search-header-value">Email Address</div>
				</div>

				<div>
					<div className="saved-search-header-title">Phone Number</div>
					<div className="saved-search-header-value">Phone Number</div>
				</div>
			</div>

			<div className="saved-search-travel-details">
				<div style={{marginRight: '20x'}}><b>Travel Details</b></div>
				<div style={{marginRight: '20x'}}><b>Date:</b> 31.1.2023</div>
				<div><b>Number of guests:</b> 25</div>
				<div><b>Budget:</b> $50,000</div>
				<div><b>Destination:</b> London, UK</div>
				<div style={{color: '#036AE1', fontWeight: 'bold'}}>Note&nbsp;&nbsp;<img src={notesIcon} /></div>
			</div>

			<div style={{display: 'flex', margin: '20px 0 0 20px'}}>
			<div style={{margin: '0 0 0 20px'}}>
				<Datatable 
				//bodyHeight="calc(100vh - 160px)" 
				data={ filterClientLogs || clientLogs} 
				columns={columns} 
				patchBgColor="#FDFDFD" 
				headerBgColor="#FDFDFD" 
				rowsBgColor="#FDFDFD" />
			</div>
				<div style={{padding: '100px 0 0 30px'}}>
					<div style={{fontSize: '22px', fontWeight: 500, paddingBottom: '10px'}}>Action Needed:</div>
					<BlueWhiteButton icon={shareSelectionOn} iconOn={shareSelection} label="Share selection as PDFs for the client" />
					<div style={{height: '10px'}} />
					<BlueWhiteButton icon={linkOn} iconOn={link} label="Share selection as link for the client" />
				</div>
			</div>

			<div className="saved-search-footer">
				<Button
					style={{fontSize: '25px', marginRight: '30px'}}
					variant="link"
					text="Close"
					onClick={onClose}
				/>
				<Button
					style={{fontSize: '25px'}}
					text="Resend offer now"
					onClick={onClose}
				/>
			</div>
		</div>
	)
};

export default ClientSavedSearch;