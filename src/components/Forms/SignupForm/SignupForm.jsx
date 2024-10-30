import React, {useState} from "react";
import EmailInput from "../Fields/EmailInput/EmailInput";
import PasswordInput from "../Fields/PasswordInput/PasswordInput";
import NameInput from "../Fields/NameInput/NameInput";
import DropdownInput from "../Fields/DropdownInput/DropdownInput";
import countryList from "../../../Util/data/countries.json";

import PhoneInput from "../Fields/PhoneInput/PhoneInput";

function SignupForm({
	                    onSubmit,
	                    onToggleSignup,
	                    error,
	                    agencyName, setAgencyName,
	                    firstName, setFirstName,
	                    lastName, setLastName,
	                    email, setEmail,
	                    address, setAddress,
	                    country, setCountry,
						countryCode, setCountryCode,
	                    stateProvince, setStateProvince,
	                    city, setCity,
	                    zipCode, setZipCode,
	                    phoneNoStart, setPhoneNoStart,
	                    phoneNoEnd, setPhoneNoEnd,
	                    organization, setOrganization,
	                    currency, setCurrency,
	                    password, setPassword,
	                    confirmPassword, setConfirmPassword,
                    }) {
	const [notice, setNotice] = useState("");

	function updateEmail(value) {
		if (/[A-Z]/.test(value)) {
			setNotice(
				"That looked like uppercase; we switched to lowercase instead."
			);
		}

		const lowercased = value.toLowerCase();

		setEmail(lowercased);
	}

	// const countryList = [
	//   { name: "Albania" },
	//   { name: "Algeria" },
	//   { name: "America" },
	//   { name: "Israel" },
	// ];
	const organizationList = [
		{ name: "ISSTA" },
		{ name: "World Traveler" },
		{ name: "YMCA" },
	];

	const currencies = countryList?.map((country) => {
		return {value:country.currency.code ,name:country.currency.code+' '+country.currency.symbol+'('+country.currency.name+') '};
	});
	//console.log("currencies",currencies);

	return (
		<form onSubmit={onSubmit}>
			<div className="row">
				<div className="col-sm-6">
					<NameInput
						label="Travel Agency Name*"
						inputName="agencyname"
						showLoginLink="signup"
						error={error}
						onSubmit={onSubmit}
						placeholder={"Enter Agency Name"}
						value={agencyName}
						setValue={setAgencyName}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<NameInput
						label="First Name*"
						inputName="fname"
						showLoginLink="signup"
						error={error}
						onSubmit={onSubmit}
						placeholder={"Enter First Name"}
						value={firstName}
						setValue={setFirstName}
					/>
				</div>
				<div className="col-sm-6">
					<NameInput
						label="Last Name*"
						inputName="lname"
						showLoginLink="signup"
						error={error}
						onSubmit={onSubmit}
						placeholder={"Enter Last Name"}
						value={lastName}
						setValue={setLastName}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-6">
					<EmailInput
						label="E-Mail*"
						inputName="email"
						showLoginLink="signup"
						onToggleSignup={onToggleSignup}
						error={error}
						notice={notice}
						onSubmit={onSubmit}
						value={email}
						setValue={setEmail}
						placeholder={"E-mail address"}
					/>
				</div>

				<div className="col-sm-6">
					<NameInput
						label="Address"
						inputName="address"
						showLoginLink="signup"
						error={error}
						onSubmit={onSubmit}
						placeholder={"Enter Address"}
						value={address}
						setValue={setAddress}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-6">
					<DropdownInput
						label="Country*"
						inputName="countryname"
						showLoginLink="signup"
						error={error}
						onSubmit={onSubmit}
						placeholder={"Select a country"}
						dropDownObj={countryList}
						value={country}
						setValue={setCountry}
						

					/>
				</div>
				<div className="col-sm-6">
					<NameInput
						label="State / Province"
						inputName="stateProvince"
						showLoginLink="signup"
						error={error}
						onSubmit={onSubmit}
						placeholder={"Enter State"}
						value={stateProvince}
						setValue={setStateProvince}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-6">
					<NameInput
						label="City*"
						inputName="city"
						showLoginLink="signup"
						error={error}
						onSubmit={onSubmit}
						placeholder={"Enter city name"}
						value={city}
						setValue={setCity}
					/>
				</div>

				<div className="col-sm-6">
					<NameInput
						label="Zip / Postal Code"
						inputName="zipCode"
						showLoginLink="signup"
						error={error}
						onSubmit={onSubmit}
						placeholder={"Enter Postal Code"}
						value={zipCode}
						setValue={setZipCode}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-6">
					<div style={{display: 'grid', gridTemplateColumns: '2fr 3fr'}}>
						<PhoneInput
							label="Phone*"
							inputName="area"
							showLoginLink="signup"
							type="number"
							error={error}
							onSubmit={onSubmit}
							placeholder={""}
							value={phoneNoStart}
							setValue={setPhoneNoStart}
						/>
						<NameInput
							label="&nbsp;"
							inputName="phone"
							showLoginLink="signup"
							type="number"
							error={error}
							onSubmit={onSubmit}
							placeholder={""}
							value={phoneNoEnd}
							setValue={setPhoneNoEnd}
						/>
					</div>
				</div>
				<div className="col-sm-6">
					<DropdownInput
						label="Currency*"
						inputName="currency"
						showLoginLink="signup"
						error={error}
						onSubmit={onSubmit}
						placeholder={"Select Currency"}
						dropDownObj={currencies}
						value={currency}
						setValue={setCurrency}
					/>
				</div>

			</div>
			<div className="row">
				<div className="col-sm-6">
					<DropdownInput
						label="Travel Organization Membership"
						inputName="organizationname"
						showLoginLink="signup"
						error={error}
						onSubmit={onSubmit}
						placeholder={"Select an Organization"}
						dropDownObj={organizationList}
						value={organization}
						setValue={setOrganization}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-6">
					<PasswordInput
						onSubmit={onSubmit}
						error={error}
						label="Password*"
						inputName="new-password"
						placeholder={"Password"}
						value={password}
						setValue={setPassword}
					/>
				</div>

				<div className="col-sm-6">
					<PasswordInput
						onSubmit={onSubmit}
						error={error}
						label="Confirm Password*"
						inputName="confirm-password"
						placeholder={"Password (again)"}
						value={confirmPassword}
						setValue={setConfirmPassword}
					/>
				</div>
			</div>
		</form>
	);
}

export default SignupForm;
