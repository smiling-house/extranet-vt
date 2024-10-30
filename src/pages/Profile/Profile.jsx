import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";
import pageBg from '../../assets/bk_pool.png';
import creditCardIcon from '../../assets/icons/creditcard.png';
import placeholderImage from '../../assets/image-placeholder.png';
import InputField from "../../components/InputField";

import './Profile.scss';
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Buttons/Button/Button";
import TextAreaField from "../../components/TextAreaField";
import BankDetails from "./BankDetails";
import Popup from "../../components/Popup";
import { baseURL } from "../../core";
import axios from "axios";
import './Profile.scss';
import AuthService from "../../services/auth.service";
import swal from 'sweetalert';
import { MdOutlineEdit } from 'react-icons/md';
import { IoMdAddCircle } from 'react-icons/io';
import UplodIMg from '../../assets/uplod.png'
import editIcon from '../../assets/icons/editIcon.png';
const Profile = ({ setUser, token, setToken, drawerWidth }) => {
	const agent = JSON.parse(localStorage.getItem("agent"));
	const agency = JSON.parse(localStorage.getItem("travelAgency"));

	const avatar = agent && agent?.userImage;
	const userId = localStorage.getItem("id");
	const [picture, setPicture] = useState([]);
	const [imgData, setImgData] = useState(null);
	const [agencyName, setAgencyName] = useState(agency?.agencyName);
	const [agentName, setAgentName] = useState(agent?.firstName + ' ' + agent?.lastName);
	const [email, setEmail] = useState(agent?.email);
	const [phone, setPhone] = useState(agent?.phone);
	const [address, setAddress] = useState(agent?.address);
	const [postalCode, setPostalCode] = useState(agent?.postalCode);

	const [city, setCity] = useState(agency?.city);
	const [country, setCountry] = useState(agency?.country);
	const [countryCode, setCountryCode] = useState(agency?.countryCode);
	const [currency, setCurrency] = useState(agency?.currency);

	const [pass1, setPass1] = useState(agent?.password);
	const [pass2, setPass2] = useState(agent?.password);

	const [personalEmailTitle, setPersonalEmailTitle] = useState('');
	const [personalEmailBody, setPersonalEmailBody] = useState('');

	const [bankDetailsToShow, setBankDetailsToShow] = useState(null);
	const [file, setFile] = useState();

	const inputFileds = {
		firstName: "",
		lastName: "",
		agencyName: "",
		agentFirstName: "",
		agentLastName: "",
		email: "",
		phone: "",
		address: "",
		postalCode: "",
		city: "",
		country: "",
		currency: "",
		password: "",
		confirmPassword: "",
		userImage: "",

		IBAN: "",
		bankName: "",
		extraDetails: "",
		holderAdress: "",
		holderCity: "",
		holderCountry: "",
		holderFirstName: "",
		holderPostalCode: "",
		swiftNumber: "",
	}
	const [formData, setformData] = useState(inputFileds)
	const [error, seterror] = useState({ ...formData })
	const [submit, setsubmit] = useState(false)
	const fileInputRef = useRef(null);

	const handleButtonClick = (e) => {
		e.preventDefault();
		fileInputRef.current.click();
	}
	const handleInputField = (e) => {
		const { name, value } = e.target
		console.log(value, "value")
		console.log(e.target.files)

		setformData({ ...formData, [name]: value })
		if (e.target.name === "userImage") {
			setformData({ ...formData, [name]: e.target.files[0] })
			setFile(URL.createObjectURL(e.target.files[0]));
			const submitPayload = {
				user_image: e.target.files[0]
			};
			AuthService.updateProfilePicture(submitPayload).then((response) => {
				console.log(response.message, "-")

				localStorage.setItem("user_image", response.doc.userImage);
				if (response.message === 'Agency Updated') {
					swal({
						icon: "success",
						show: true,
						title: 'Success',
						text: 'Logo Uploded successfully'
					})
				}
			}).catch((e) => {
				console.log(e)
			})

		}
		if (value)
			switch (name) {
				// case "agencyName":
				// 	error.agencyName = value.length > 0 ? "" : "Select agency name"
				// 	break;
				// case "firstName":
				// 	error.firstName = value.length > 0 ? "" : "Select first name"
				// 	break;
				// case "lastName":
				// 	error.lastName = value.length > 0 ? "" : "Select last name"
				// 	break;
				// case "agentFirstName":
				// 	error.agentFirstName = value.length > 0 ? "" : "Enter agent first name"
				// 	break;
				// case "agentLastName":
				// 	error.agentLastName = value.length > 0 ? "" : "Enter agent last name"
				// 	break;
				case "email":
					error.email = value.length > 0 ? "" : "Enter email"
					break;
				case "phone":
					error.phone = value.length > 0 ? "" : "Enter phone"
					break;
				// case "address":
				// 	error.address = value.length > 0 ? "" : "Enter address"
				// 	break;
				// case "postalCode":
				// 	error.postalCode = value.length > 0 ? "" : "Enter postalCode"
				// 	break;
				// case "city":
				// 	error.city = value.length > 0 ? "" : "Enter city"
				// 	break;
				// case "country":
				// 	error.country = value.length > 0 ? "" : "Enter country"
				// 	break;
				// case "currency":
				// 	error.currency = value.length > 0 ? "" : "Enter currency"
				// 	break;
				case "password":
					if (!value) {
						error.password = "Enter password";
					} else if (formData.confirmPassword !== value) {
						error.confirmPassword = "Passwords do not match";
					} else {
						error.password = "";
						error.confirmPassword = "";
					}
					break;

				case "confirmPassword":
					if (!value) {
						error.confirmPassword = "Enter confirm password";
					} else if (formData.password !== value) {
						error.confirmPassword = "Passwords do not match";
					} else {
						error.password = "";
						error.confirmPassword = "";
					}
					break;

				default:
					break;
			}
		seterror(error)
	}

	function validate() {
		// if (formData.firstName == "") {
		// 	error.firstName = "Select first name"
		// }
		// if (formData.lastName == "") {
		// 	error.lastName = "Select last name"
		// }
		// if (formData.agencyName == "") {
		// 	error.agencyName = "Select agency name"
		// }
		// if (formData.agentName == "") {
		// 	error.agentName = "Enter agent name"
		// }
		if (formData.email == "") {
			error.email = "Enter email"
		}
		if (formData.phone === "") {
			error.phone = "Enter phone"
		}
		// if (formData.address == "") {
		// 	error.address = "Enter address"
		// }
		// if (formData.postalCode == "") {
		// 	error.postalCode = "Enter postal code"
		// }
		// if (formData.city == "") {
		// 	error.city = "Enter city"
		// }
		// if (formData.country == "") {
		// 	error.country = "Enter country"
		// }
		// if (formData.currency == "") {
		// 	error.currency = "Enter currency"
		// }
		if (formData.password == "") {
			error.password = "Enter password"
		}
		if (formData.confirmPassword === "") {
			error.confirmPassword = "Enter confirm password"
		}
		return error
	}
	useEffect(() => {
		const agency = JSON.parse(localStorage.getItem("travelAgency"));
		const agent = JSON.parse(localStorage.getItem("agent"));

		const UpdatedData = {
			agencyId: agent?.agency_id !== undefined ? agent?.agency_id : "",
			agentFirstName: agent?.firstName !== undefined ? agent?.firstName : "",
			agentLastName: agent?.lastName !== undefined ? agent?.lastName : "",
			email: agent?.email !== undefined ? agent?.email : "",
			phone: agent?.phone !== undefined ? agent?.phone : "",
			firstName: agency?.firstName !== undefined ? agency?.firstName : "",
			lastName: agency?.lastName !== undefined ? agency?.lastName : "",
			agencyEmail: agency?.email !== undefined ? agency?.email : "",
			agencyPhone: agency?.phone !== undefined ? agency?.phone : "",
			agencyName: agency?.agencyName !== undefined ? agency?.agencyName : "",
			address: agency?.address !== undefined ? agency?.address : "",
			postalCode: agency?.postalCode !== undefined ? agency?.postalCode : "",
			city: agency?.city !== undefined ? agency?.city : "",
			country: agency?.country !== undefined ? agency?.country : "",
			currency: agency?.currency !== undefined ? agency?.currency : "",
			password:"",
			confirmPassword: "",
			userImage: agency?.userImage !== undefined ? agency?.userImage : "blob:http://localhost:3000/a2a19291-b780-478d-80aa-23458cd23c84"
		}
		setformData(UpdatedData)
		//localStorage.setItem("travelAgency", JSON.stringify(UpdatedData));
	}, [])
	const handleform = (e) => {
		e.preventDefault();
		setsubmit(true)
		//validate()
		const allData = JSON.parse(localStorage.getItem("allData"));

		const UpdateProfileApiPayload = {
			firstName: formData.firstName !== undefined ? formData.firstName : "",
			lastName: formData.lastName !== undefined ? formData.lastName : "",
			// agency_id: allData?.agency_id !== undefined ? parseInt(allData?.agency_id) : "",
			agencyName: formData.agencyName !== undefined ? formData.agencyName : "",
			phone: formData.phone !== undefined ? formData.phone : "",
			firstName: formData.firstName !== undefined ? formData.firstName : "",
			email: formData.email !== undefined ? formData.email : "",
			abbreviation: formData.abbreviation !== undefined ? formData.abbreviation : "",
			website: formData.website !== undefined ? formData.website : "",
			address: formData.address !== undefined ? formData.address : "",
			city: formData.city !== undefined ? formData.city : "",
			state_province: formData.state_province !== undefined ? formData.state_province : "",
			zipcode: formData.zipcode !== undefined ? formData.zipcode : "",
			countryCode: formData.countryCode !== undefined ? formData.countryCode : "",
			organization: formData.organization !== undefined ? formData.organization : "",
			userImage: formData.userImage !== undefined ? formData.userImage : "",
			ta_company_markup: formData.userImag !== undefined ? formData.userImag : "blob:http://localhost:3000/a2a19291-b780-478d-80aa-23458cd23c84",

			IBAN: formData?.IBAN,
			bankName: formData?.bankName,
			extraDetails: formData?.extraDetails,
			holderAdress: formData?.holderAdress,
			holderCity: formData?.holderCity,
			holderCountry: formData?.holderCountry,
			holderFirstName: formData?.holderFirstName,
			holderPostalCode: formData?.holderPostalCode,
			swiftNumber: formData?.swiftNumber,
		}
		console.log(UpdateProfileApiPayload, "UpdateProfileApiPayload")
		console.log(error.password.length == 0, "error")
		if (formData.email !== "" && formData.phone !== "") {
			if (error.password.length == 0 && error.confirmPassword.length == 0) {
				console.log(UpdateProfileApiPayload, "UpdateProfileApiPayload")
				AuthService.updateProfileApi(agent?.agency_id, UpdateProfileApiPayload).then((response) => {
					console.log(response.message, "-")
					if (response) {
						swal({
							show: true,
							title: 'Success',
							text: 'Successfully Form Submitted'
						})
					}
				}).catch((e) => {
					console.log(e)
				})
			}
		}
	}



	useEffect(() => {
		const load = async () => {

		};
		load();
	}, []);

	const onChangePicture = (e) => {
		if (e.target.files[0]) {
			//console.log("picture:  >>>", e.target.files);
			setPicture(e.target.files[0]);
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setImgData(reader.result);
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const userRequest = axios.create({
		baseURL: baseURL,
		headers: {
			token: `Bearer ${token}`,
		},
	});
	const handleSubmit = async (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append("user_image", picture);
		formData.append("id", userId);
		const response = await userRequest.post(
			`/agent/update-profile-picture`,
			formData
		);

		//console.log("response handle Submit  upload pic : ", response);
		if (response.status === 200) {
			//console.log("success");
			setUser(response.data?.doc);
		} else {
			//console.log("not success");
		}
	};
	const [setLogo, setsetLogo] = useState([])

	useEffect(() => {
		AuthService.GetProfile(agent?.agent_id).then((response) => {
			setsetLogo(response.agent)

		}).catch((e) => {
			console.log(e)
		})
	}, [])
	return (
		<>

			<div className="reservations-container" style={{ backgroundImage: `url(${pageBg})` }}>

				{
					bankDetailsToShow &&
					<Popup width={820} onClose={() => setBankDetailsToShow(null)}>
						<BankDetails client={bankDetailsToShow} onClose={() => setBankDetailsToShow(null)} />
					</Popup>
				}
				<div style={{ "background-color": "rgba(19, 59, 113, 0.8)" }}>
					<PageHeader searchOpen={null} style={{ position: "absolute", marginTop: "70px" }} />
				</div>
			</div >
			<div class="row m-5">
				<h1 className="profile-heading-cst">Profile Information</h1>
				<hr className="mt mb-5"></hr>
				<div class="col-sm-8">
					<div class="row">
						<div class="form-group col-sm-3 mb-4">
							<label for="agentName">Agent First Name({agent?.role})</label>
							<input type="text" class="form-control" value={formData.agentFirstName} id="agentFirstName" name="agentFirstName" placeholder="Enter agent name" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.agentFirstName}</div>
						</div>
						<div class="form-group col-sm-3 mb-4">
							<label for="agentFirstName">Agent Last Name</label>
							<input type="text" class="form-control" value={formData.agentLastName} id="agentLastName" name="agentLastName" placeholder="Enter agent name" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.agentLastName}</div>
						</div>
						<div class="form-group col-sm-3 mb-4">
							<label for="email">Agent Email</label>
							<input type="email" class="form-control" value={formData.email} id="email" name="email" placeholder="Enter email" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.email}</div>
						</div>
						<div class="form-group col-sm-3 mb-4">

							<span className="mt-5" ></span>
							<div className="mt-4 text-center" >
								<IoMdAddCircle style={{ fontSize: "35px", "color": "green" }} />
								<span className="link18" style={{ "color": "green", "text-decoration": "none" }}> Add sub Agent</span>
							</div>
							{/* <label for="phone">Agent Phone</label> */}
							{/* <input type="phone" class="form-control" value={formData.phone} id="phone" name="phone" placeholder="Enter phone" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.phone}</div> */}
						</div>
					</div>
					<hr className="mt-5 mb-2"></hr>
					<div class="row mt-4">
						<div class="form-group col-sm-3 mb-4">
							<label for="agencyName">Agency Name</label>
							<input type="text" class="form-control" readOnly={agent?.role === "agent" ? true : false} value={formData.agencyName} id="agencyName" name="agencyName" placeholder="Enter agency name" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.agencyName}</div>
						</div>
						<div class="form-group col-sm-3 mb-4">
							<label for="firstName">Manager First Name</label>
							<input type="text" class="form-control" value={formData.firstName} id="firstName" name="firstName" placeholder="Enter first name" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.firstName}</div>
						</div>
						<div class="form-group col-sm-3 mb-4">
							<label for="lastName">Manager Last Name</label>
							<input type="text" class="form-control" value={formData.lastName} id="lastName" name="lastName" placeholder="Enter last name" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.lastName}</div>
						</div>
						<div class="form-group col-sm-3 mb-4">
							<label for="email">Agency Email</label>
							<input type="email" class="form-control" value={formData.agencyEmail} id="agencyEmail" name="agencyEmail" placeholder="Enter agency email" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.agencyEmail}</div>
						</div>
					</div>

					<div class="row mt-5">
						<div class="form-group col-sm-3 mb-4">
							<label for="phone">Agency Phone</label>
							<input type="phone" class="form-control" value={formData.agencyPhone} id="agencyPhone" name="agencyPhone" placeholder="Enter agency phone" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.agencyPhone}</div>
						</div>
						<div class="form-group col-sm-3 mb-4">
							<label for="address">Agency Address</label>
							<input type="text" class="form-control" readOnly={agent?.role === "agent" ? true : false} value={formData.address} id="address" name="address" placeholder="Enter address" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.address}</div>
						</div>
						<div class="form-group col-sm-3 mb-4">
							<label for="postalCode">Agency Postal Code</label>
							<input type="text" class="form-control" readOnly={agent?.role === "agent" ? true : false} value={formData.postalCode} id="postalCode" name="postalCode" placeholder="Enter postal code" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.postalCode}</div>
						</div>
						<div class="form-group col-sm-3 mb-4">
							<div className="mt-4" onClick={() => setBankDetailsToShow(1)}>
								<img src={creditCardIcon} alt="creditCardIcon" />
								<span className="link18">Agency Bank Details</span>
							</div>
						</div>

					</div>
					<hr />
					<div class="row mt-5">
						<div class="form-group col-sm-3 mb-4">
							<label for="password">Password</label>
							<input type="password" readOnly={agent?.role === "agent" ? true : false} value={formData.password} class="form-control" id="password" name="password" placeholder="Password" onChange={handleInputField} />
							<div class="invalid-feedback-error">{error.password}</div>
						</div>
						<div class="form-group col-sm-3 mb-4 ">
							<label for="confirmPassword">Confirm Password</label>
							<input type="password" readOnly={agent?.role === "agent" ? true : false} value={formData.confirmPassword} class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Password (again)" onChange={handleInputField} />
							<i class="bi bi-eye-slash" id="togglePassword"></i>
							<div class="invalid-feedback-error">{error.confirmPassword}</div>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="row ">
						<div class="form-group col-sm-6 text-center">

							<input type="file"
								className="form-control d-none"
								id="userImage"
								name="userImage"
								placeholder="Upload Image"
								accept="image/x-png,image/gif,image/jpeg"
								onChange={handleInputField}
								readOnly={agent?.role === "agent" ? true : false}
								ref={fileInputRef}
							/>


							<button className="file-uplod-cst p-3 " type="button" onClick={handleButtonClick}>Upload your logo </button>
							<div className="text-center pt-2">
								<span> Recommended size 299X299 px</span><br></br>
								<span>500 kb max size</span><br></br>
								<span>Format PNG or JPG</span><br></br>
							</div>
						</div>
						<div class="form-group col-sm-6 cst-cst-img">
							{file !== undefined ? <>
								<div className="fluid-container">
									<img src={file} className="rounded-circle" style={{ "width": "34%" }} />
								</div>
							</> : <>
								{/* <img src={UplodIMg} className="rounded-circle" style={{ "width": "34%" }} /> */}
								 <img src={setLogo?.userImage} className="rounded-circle" style={{ "width": "34%" }} />
							</>}

						</div>
						<div class="row">
							<div class=" col-md-12 form-group mt-4">
								<div class="card">
									<div class="card-body" style={{ "background": "#f8f8f8" }}>
										<div className="d-flex justify-content-between ">

											<h5 class="card-title">Add Personal Email Format for your Client</h5>

											<span className="justify-content-end cst-class-edit"><img src={editIcon} className="img-fluid" /></span>
										</div>
										<div class="form-group mb-3">
											<input type="text" class="form-control" id="title" name="title" placeholder="Title" />
										</div>
										<div class="form-group mb-3">
											<textarea class="form-control" id="title" name="title" placeholder="Email Text Format" cols="10" rows="4" style={{ "resize": "none" }}></textarea>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row mt-5">
							<div class="form-group col-md-2">
								<button type="button" class="btn btn-outline cancle-chnages-cst-btn px-4" onClick={handleform}>Cancel</button>
							</div>
							<div class="form-group col-md-5">
								<button type="button" class="save-chnages-cst-btn px-4" onClick={handleform}>Save Changes</button>
							</div>
						</div>
					</div>
				</div>
				<hr className="mb-5 mt-5"></hr>
				<h5 className="text-center">© 2023 VillaTracker. All rights reserved. Cookie Policy, <span className="privase-cst">Privacy</span> and <span className="privase-cst">Terms</span></h5>
			</div>
		</>
	)
};

export default Profile;
