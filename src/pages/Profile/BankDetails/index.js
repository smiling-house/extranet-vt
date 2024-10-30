import React, { useEffect, useState } from "react";
import Button from "../../../components/Buttons/Button/Button";
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";

import './BankDetails.scss';

const BankDetails = ({ formData, handleInputField, onClose }) => {

	const agent = JSON.parse(localStorage.getItem("agent"));
	const agency = JSON.parse(localStorage.getItem("travelAgency"));
	// console.log("Agent profile>>>", agent);
	// console.log("Agency profile>>>", agency);




	useEffect((e) => {
		const load = async (e) => {

		};
		load(e);
	}, []);

	return (
		<div className="container">


			<div className="model-body p-3">
				<div className="text-center mt-5 mb-5">My Bank Details</div>
				<div className="row">
					<div className="col-6 mb-3">
						<label for="holderFirstName">Holder First Name*</label>
						<input className="form-control" onChange={handleInputField} value={formData?.holderFirstName} name="holderFirstName" placeholder={"Enter holders name"}   />
					</div>
					<div className="col-6 mb-3">
						<label for="holderAdress">Holder address*</label>
						<input className="form-control" onChange={handleInputField} value={formData?.holderAdress} name="holderAdress" placeholder={"Enter address"} />
					</div>

					<div className="col-6 mb-3">
						<label for="holderCity">Holder City</label>
						<input className="form-control" onChange={handleInputField} value={formData?.holderCity} name="holderCity" placeholder={"Enter city"} />

					</div>

					<div className="col-6 mb-3">

						<label for="holderCountry">Holder Country*</label>
						<input className="form-control" onChange={handleInputField} value={formData?.holderCountry} name="holderCountry" placeholder={"Enter country"} />
					</div>

					<div className="col-6 mb-3">
						<label for="IBAN">IBAN/Account number*</label>
						<input className="form-control" onChange={handleInputField} value={formData?.IBAN} name="IBAN" placeholder={"Enter IBAN / Account Number"} />
					</div>

					<div className="col-6 mb-3">
						<label for="bankName">Bank Name*</label>
						<input className="form-control" onChange={handleInputField} value={formData?.bankName} name="bankName" placeholder={"Enter bank name"} />
					</div>

					<div className="col-6 mb-3">
						<label for="swift">SWIFT/BIC Code*</label>
						<input className="form-control" onChange={handleInputField} value={formData?.swiftNumber} name="swiftNumber" placeholder={"Enter SWIFT / BIC"} />
					</div>

					<div className="col-6 mb-3">
						<label for="swift">Extra Details*</label>
						<textarea className="form-control" name="extraDetails" onChange={handleInputField} value={formData?.extraDetails} rows={5}></textarea>
					</div>

				</div>
				<div className="row mb-5 mt-5">
					<div className="text-center">
						<Button style={{ fontSize: '18px', marginRight: '30px' }} variant="link" text="Cancel" onClick={onClose} />
						<Button style={{ fontSize: '18px' }} text="Save" onClick={onClose} />
					</div>

				</div>
			</div>


		</div>
	)
};

export default BankDetails;