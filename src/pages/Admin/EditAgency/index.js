import React, { useState, useEffect } from "react";
import Button from "../../../components/Buttons/Button/Button";
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";
import addTitleIcon from "../../../assets/icons/admin/add-title-icon.svg";
import editTitleIcon from "../../../assets/icons/admin/edit-title-icon.svg";
import closeIcon from "../../../assets/icons/closeIcon.png";

import "./EditAgency.scss";
import AuthService from "../../../services/auth.service";
import swal from "sweetalert";
import { log } from "loglevel";

const EditAgency = (props) => {
  const { agency, onClose, agencies, editClickedId, editAgencyId } = props;
  useEffect(() => {
    const load = async () => {};
    load();
  }, []);
  console.log(agencies, "agencies");
  const [filterDataSingle, setfilterDataSingle] = useState(
    agencies.filter((iteam) => iteam._id == agency)
  );

  const [agencyName, setAgencyName] = useState(
    filterDataSingle && filterDataSingle[0]?.agencyName
  );
  const [agentName, setAgentName] = useState(filterDataSingle?.agentName);
  const [address, setAddress] = useState(filterDataSingle?.address);
  const [email, setEmail] = useState(
    filterDataSingle && filterDataSingle[0]?.email
  );
  const [country, setCountry] = useState(
    filterDataSingle && filterDataSingle[0]?.country
  );
  const [countryCode, setCountryCode] = useState(
    filterDataSingle && filterDataSingle[0]?.countryCode
  );
  const [phone, setPhone] = useState(filterDataSingle?.phone);
  const [city, setCity] = useState(filterDataSingle?.city);
  const [postalCode, setPostalCode] = useState("");
  const [notes, setNotes] = useState(filterDataSingle?.notes);

  const handleSaveButton = () => {
    if (editClickedId) {
      var UpdatePayLoad = {
        agencyName: agencyName,
        agentName: agentName,
        phone: phone,
        email: email,
        address: address,
        city: city,
        zipcode: postalCode,
        countryCode: countryCode,
        // "firstName": "string",
        // "abbreviation": "string",
        // "website": "string",
        // "state_province": "string",
        // "organization": "string",
        // "userImage": "string",
        // "ta_company_markup": "string"
      };
      AuthService.updateTravelAgency(UpdatePayLoad, editAgencyId)
        .then((response) => {
          console.log(response);
          swal({
            show: true,
            icon: "success",
            title: "Success",
            text: response.message,
          });
          setTimeout(() => {
            onClose()();
          }, 1000);
        })
        .catch((e) => {
          swal({
            show: true,
            icon: "error",
            title: "Opps!!",
            text: e.response.data.message,
          });
        });
    } else {
      var addPayLoad = {
        agencyName: agencyName,
        agentName: agentName,
        address: address,
        countryCode: countryCode,
        country: country,
        city: city,
        zipcode: postalCode,
        phone: phone,
        email: email,
        // "firstName": "string",
        // "lastName": "string",
        // "stateProvince": "string",
        // "currency": "string",
        // "organization": "string",
        // "password": "string"
      };
      AuthService.addNewPartner(addPayLoad)
      console.log("registering new partner:",addPayLoad)
        .then((response) => {
          console.log(response.message);
          swal({
            show: true,
            icon: "success",
            title: "Success",
            text: response.message,
          });
          setTimeout(() => {
            onClose()();
          }, 1000);
        })
        .catch((e) => {
          console.log(e, "jsdjsdjsjdk");

          swal({
            show: true,
            icon: "error",
            title: "Opps!!",
            text: e.response.data.message,
          });
        });
    }
  };

  return (
    <>
      <img src={closeIcon} className="popup-close-icon" onClick={onClose} />
      <div className="container edit-agency-container">
        <div className="edit-agency-header">
          <img src={agency.id === "-1" ? addTitleIcon : editTitleIcon} alt="" />
          <div className="edit-agency-title">
            {agency.id === "-1"
              ? "Add PM" 
              : "Edit PM"}
          </div>
        </div>
        <div className="edit-agency-main" style={{ display: "block" }}>
          <div className="row">
            <div className="col-6">
              <InputField
                label="Partner Name*"
                value={agencyName}
                onChange={setAgencyName}
                placeholder={"Enter partner name"}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
              <InputField
                label="Manager Name*"
                value={agentName}
                onChange={setAgentName}
                placeholder={"Enter manager name"}
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <InputField
                label="Address"
                value={address}
                onChange={setAddress}
                placeholder={"Enter address"}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
              <InputField
                label="E-mail Address*"
                value={email}
                onChange={setEmail}
                placeholder={"Enter email address"}
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <InputField
                label="Country"
                value={country}
                onChange={setCountry}
                placeholder={"Enter country"}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
              <InputField
                label="Phone No.*"
                value={phone}
                onChange={setPhone}
                placeholder={"Enter phone"}
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <InputField
                label="Account ID"
                value={postalCode}
                onChange={setPostalCode}
                placeholder={"Enter postal code"}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
              <TextAreaField
                label="partner Token"
                onChange={setNotes}
                placeholder={"Enter partner Token"}
                style={{ height: "152px", marginTop: "20px" }}
              >
                {notes}
              </TextAreaField>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <InputField
                label="City"
                value={city}
                onChange={setCity}
                placeholder={"Enter city"}
                style={{ marginTop: "20px" }}
              />{" "}
            </div>
          </div>
        </div>
        <div className="edit-agency-footer">
          <Button
            style={{ fontSize: "18px", marginRight: "30px" }}
            variant="link"
            text="Cancel"
            onClick={onClose}
          />
          <Button
            style={{ fontSize: "18px" }}
            text="Save"
            onClick={handleSaveButton}
          />
        </div>
      </div>
    </>
  );
};

export default EditAgency;
