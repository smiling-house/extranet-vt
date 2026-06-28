import React, { useEffect, useState } from "react";
import Button from "../../../components/Buttons/Button/Button";
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";

import './ApproveAgent.scss';
import swal from "sweetalert";
import AuthService from "../../../services/auth.service";

const ApproveAgent = (agency, props) => {
	const { onClose } = props;
	const [holdersName, setHoldersName] = useState(agency?.agency?.email);
	const [address, setAddress] = useState('admin@villatracker.com');
	const [city, setCity] = useState('');
	const [country, setCoutnry] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [iban, setIban] = useState('');
	const [bankName, setBankName] = useState('');
	const [swift, setSwift] = useState('');
	const [details, setDetails] = useState('');

	useEffect(() => {
		const load = async () => {

		};
		load();
		console.log("AGENCY", holdersName);

	}, []);

	const onclickSubmit = () => {
		const agent = JSON.parse(localStorage.getItem("agent"));
		var submitPayload = {
			approvedAgent: holdersName,
			cc: address
		}
		AuthService.approveAgent(submitPayload, agent?.agent_id).then((response) => {
			swal({
				icon: "success",
				show: true,
				title: 'Success',
				text: response?.message
			})
			setTimeout(() => {
				if (response?.message == "Allready new travel partner approved"){
					window.location.reload();
				}
			}, 3000);
		}).catch((e) => {
			console.log(e)
		})
	}
	return (
		<div className="approve-agent-container">
			<div className="approve-agent-header">
				<div className="approve-agent-title">Approving by Admin:</div>
				<div className="approve-agent-sub-header">
					<div>Main Agent : <b>{agency?.agency?.firstName + ' ' + agency?.agency?.lastName}</b></div>
					<div className="approve-agent-sub-header-separator" />
					<div>Agency: <b>{agency?.agency?.agencyName}</b></div>
				</div>
			</div>

			<div className="approve-agent-main">

				<InputField label="Emails will be sent to agent at :" labelStyle={{ fontWeight: 500, fontSize: '20px', color: '#707070' }} value={agency?.agency?.email} onChange={setHoldersName} placeholder={"Enter email address"} />
				<InputField label="Internal CC to:" labelStyle={{ fontWeight: 500, fontSize: '20px', color: '#707070' }} value={address} onChange={setAddress} placeholder={"Enter email address"} style={{ marginTop: '20px' }} />
			</div>

			<div className="approve-agent-footer">
				<Button
					style={{ fontSize: '18px', marginRight: '30px' }}
					variant="link"
					text="Cancel"
					onClick={onClose}
				/>
				<Button
					style={{ fontSize: '18px' }}
					text="Confirm"
					onClick={onclickSubmit}
				/>
			</div>
		</div>
	)
};

export default ApproveAgent;