import React, { useState, useEffect, useMemo } from "react";
import Button from "../../../components/Buttons/Button/Button";

import './EditClient.scss';
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";
import axios from "axios";
import { baseURL } from "../../../core/index.js";
import editIcon from '../../../assets/icons/editIcon.png';
import swal from "sweetalert";
import AuthService from "../../../services/auth.service";
const agency = JSON.parse(localStorage.getItem("agent"));


const EditClient = props => {
	const { client, token, onClose, singleClientData } = props;
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [nickName, setNickName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [notes, setNotes] = useState("");

	useMemo(() => {
		setFirstName(singleClientData?.firstName);
		setLastName(singleClientData?.lastName)
		setNickName(singleClientData?.nickName);
		setEmail(singleClientData?.email);
		setPhone(singleClientData?.phone);
		setNotes(singleClientData?.notes);
	}, [singleClientData]);

	const userRequest = axios.create({
		baseURL: baseURL,
		headers: {
			token: `Bearer ${token}`,
		},
	});


	const onSave = () => {
		// client.firstName = firstName;
		// client.lastName = lastName;
		// client.email = email;
		// client.nickName = nickName;
		// client.phone = phone;
		// client.notes = notes;
		console.log("save client :", firstName, "Client:", client);

		if (client.id !== undefined) {
			var addclientPayload = {
				"agency_id": agency?.agency_id,
				"agencyName": agency?.agencyName,
				"firstName": firstName,
				"lastName": lastName,
				// "gender": "string",
				"nickName": nickName,
				"agent_id": agency?.agent_id,
				"country": agency?.country,
				"email": email,
				"phone": phone
			}
			console.log(addclientPayload, "addclientPayload")
			AuthService.AddNewClientApi(addclientPayload).then((response) => {
				console.log(response.message, "-")
				if (response) {
					swal({
						show: true,
						icon: 'success',
						title: 'Success',
						text: 'Successfully Form Submitted'
					})
					onClose();
					window.location.reload()
				}
			}).catch((e) => {
				console.log(e)
			})
		} else {
			var UpdateClientPayload = {
				"id":singleClientData?._id,
				//"client_id": singleClientData?.client_id,
				"agencyName": agency?.agencyName,
				"name": firstName,
 				"nickName": nickName,
				//"agent_id": agency?.agent_id,
				"country": agency?.country,
				"email": email,
				"phone": phone,

			}
			
			AuthService.UpdateClientApi(UpdateClientPayload).then((response) => {
				if (response) {
					swal({
						show: true,
						icon: 'success',
						title: 'Success',
						text: 'Successfully Form Submitted'
					})
					onClose();
					// window.location.reload()
				}
			}).catch((e) => {
				console.log(e)
			})
			onClose();
		}

	};

	return (
		<>
			<div className="container edit-client-container p-4">
				<div className="edit-client-header">
					<div className="edit-client-title">{client.id === "-1" ? 'Add New Client' : 'Edit Client Profile'}</div>
				</div>

				<div className="row">
					<div className="col-sm-6">
						<InputField label="First Name*" value={firstName} onChange={setFirstName} placeholder={"Enter first name"} style={{ marginTop: '20px' }} />
					</div>
					<div className="col-sm-6">
						<InputField label="Last Name*" value={lastName} onChange={setLastName} placeholder={"Enter last name"} style={{ marginTop: '20px' }} />
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<InputField label="Nick Name*" value={nickName} onChange={setNickName} placeholder={"Enter last name"} style={{ marginTop: '20px' }} />
					</div>
					<div className="col-sm-6">
						<TextAreaField label="Notes" onChange={setNotes} placeholder={"Enter notes"} style={{ height: '250px', marginTop: '20px' }}>
							{notes}
						</TextAreaField>

					</div>
				</div>
				<div className="row mt-4">
					<div className="col-sm-6">
						<InputField label="Email Address*" value={email} onChange={setEmail} placeholder={"Enter email address"} style={{ marginTop: '20px' }} />
					</div>
					<div className="col-sm-6">
						<InputField label="Phone No*" value={phone} onChange={setPhone} placeholder={"Enter phone number"} style={{ marginTop: '20px' }} />
					</div>
				</div>
			</div>
			<hr></hr>
			<div className="row mb-3">
				<div className="col-8"></div>
				<div className="col-4 col-md-4">
					<Button style={{ fontSize: '18px', marginRight: '30px' }} variant="link" text="Cancel" onClick={onClose} />
					<Button style={{ fontSize: '18px' }} text="Save" onClick={onSave} />
				</div>
				<div>
				</div>
			</div>

		</>
	)
};

export default EditClient;