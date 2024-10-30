import React, { useEffect, useState } from "react";
import Button from "../../../components/Buttons/Button/Button";
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";

import './EditDetails.scss';

const EditPropDetails = ({ pict,formData, handleInputField, onClose }) => {

	const agent = JSON.parse(localStorage.getItem("agent"));
	const agency = JSON.parse(localStorage.getItem("travelAgency"));
	// console.log("Agent profile>>>", agent);
	console.log("form data property profile>>>", formData);




	useEffect((e) => {
		const load = async (e) => {

		};
		load(e);
	}, []);

	return (
		<div className="edit-details-container">
			<div className="model-body p-3">
				<div className="edit-details-header text-center mt-5 mb-5" style={{ fontSize: '40px' }}>{formData?.listing?.title}</div>

				<div className="row">
					<div className="col-6 mb-3">
						<label for="status">Status</label>
						<input className="form-control" onChange={handleInputField} value={formData?.listing?.xdata?.status} name="holderAdress" placeholder={"Enter address"} />
					</div>

					<div className="col-6 mb-3">
						<label for="city">City</label>
						<input className="form-control" onChange={handleInputField} value={formData?.listing?.address?.city} name="holderCity" placeholder={"Enter city"} />

					</div>

					<div className="col-6 mb-3">

						<label for="country">Country</label>
						<input className="form-control" onChange={handleInputField} value={formData?.listing?.address?.country} name="holderCountry" placeholder={"Enter country"} />
					</div>

					<div className="col-6 mb-3">
						<label for="Region">Region</label>
						<input className="form-control" onChange={handleInputField} value={formData?.listing?.address?.state} name="Region" placeholder={"Region"} />
					</div>

					<div className="col-6 mb-3">
						<label for="agentName">Agent name</label>
						<input className="form-control" onChange={handleInputField} value={formData?.listing?.xdata?.agent||agent?.firstName+' '+agent?.lastName} name="agentName" placeholder={"Agent name"} />
					</div>

					<div className="col-6 mb-3">
						<label for="declineReason">Decline reason</label>
						<input className="form-control" onChange={handleInputField} value={formData?.swiftNumber} name="declineReason" placeholder={"Enter Decline reason"} />
					</div>
					<div className="col-6 mb-3">
						<label for="GuestyTags">Guesty-Tags </label>
						<input className="form-control" name="extraDetails" onChange={handleInputField} value={formData?.listing?.tags} />
					</div>
					<div className="col-6 mb-3">
						<label for="x-Tags">Tags </label>
						<textarea className="form-control" name="extraDetails" onChange={handleInputField} value={formData?.listing?.xdata?.xtags?formData?.listing?.xdata?.xtags:""} rows={2}></textarea>
					</div>

				</div>
				<img            
				className="property-main-picture text-center"
	               src={ formData?.listing?.picture?.thumbnail }
            />
				<div className="row mb-5 mt-5">
					<div className="text-center">
						<Button style={{ fontSize: '25px', marginRight: '30px' }} variant="link" text="Cancel" onClick={onClose} />
						<Button style={{ fontSize: '25px' }} text="Save" onClick={onClose} />
					</div>

				</div>
			</div>


		</div>
	)
};

export default EditPropDetails;