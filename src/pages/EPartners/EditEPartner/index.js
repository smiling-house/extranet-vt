import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Button from "../../../components/Buttons/Button/Button";
import InputField from "../../../components/InputField";
import addTitleIcon from "../../../assets/icons/admin/add-title-icon.svg";
import editTitleIcon from "../../../assets/icons/admin/edit-title-icon.svg";
import closeIcon from "../../../assets/icons/closeIcon.png";
import {PATH_SELECT} from "../../../Util/constants";
import "./EditEPartner.scss";
import AuthService from "../../../services/auth.service";
import swal from "sweetalert";
import { log } from "loglevel";
import Checkbox from "../../../components/Checkbox";
import { v4 as uuidv4 } from 'uuid'


const EditEPartner = (props) => {
  const { newPartnerID, agent, agency, partner, onClose, partners, editClickedId, editPartnerId } = props;
  const csvInputRef = useRef(null);
  useEffect(() => {
    console.log("clicked partner:", partner)
  }, [partner]);

  const history = useHistory();
  const [filterDataSingle, setfilterDataSingle] = useState(
    partners.filter((iteam) => iteam._id == partner)
  );
  let selectedChannels = partner.basicChannels
  const [partnerName, setPartnerName] = useState(partner.partnerName)
  const [contactName, setContactName] = useState(partner.contactName)
  const [email, setEmail] = useState(partner.email)
  const [phone, setPhone] = useState(partner.partnerPhone)
  const [CSV, setCSV] = useState(partner.ids)
  const [partnerID, setPartnerID] = useState(partner.partnerId)
  const [calendarUrl, setCalendarUrl] = useState(partner.calendarUrl)
  const [staticUrl, setStaticUrl] = useState(partner.staticUrl)
  const [token, setToken] = useState(partner.bearerToken)

  const [syncExternalPropertiesUrl, setSyncExternalPropertiesUrl] = useState(partner.syncExternalPropertiesUrl || '')
  

  const handleSaveButton = () => {

    if(!partnerID || partnerID.trim() === '') {
          swal({
            show: true,
            icon: "error",
            title: "Oops!!",
            text: 'partnerID is required. You get partnerID only when you approve the external partner!',
          });
      return;
    }

    if (editClickedId) {
      var UpdatePayLoad = {
        partnerId: partnerID,
        partnerName: partnerName,
        contactName: contactName,
        partnerPhone: phone,
        syncExternalPropertiesUrl,
        calendarUrl,
        staticUrl,
        agent: agent.firstName+' '+agent.lastName,
        email: email,
        bearerToken: token,
        provider: partner.provider,
        // "firstName": "string",
        // "abbreviation": "string",
        // "website": "string",
        // "state_province": "string",
        // "organization": "string",
        // "userImage": "string",
        "ta_company_markup": "10"
      };
      console.log("UPDATE External partner payload:", UpdatePayLoad)
      AuthService.updateEPartner(partnerID, UpdatePayLoad)
        .then((response) => {
          console.log(response);
          swal({
            show: true,
            icon: "success",
            title: "Success",
            text: response.message,
            timer: 1000
          });
          // setTimeout(() => {
          //   onClose()();
          // }, 1000);
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
        partnerId:partnerID,
        partnerName: partnerName,
        source: 'SHUB',
        partnerPhone: phone,
        agent: agent.firstName+' '+agent.lastName,
        contactName: contactName,
        email: email,
        bearerToken: token,
        partnerId: partnerID,
      };
      console.log("NEW E partner payload:", partnerID, addPayLoad)
      AuthService.updateEPartner(partnerID, addPayLoad)
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

  const handleDeleteButton = () => {
    if (editClickedId) {
      var deletePayLoad = {
        partnerName: partnerName,
        source: partner.source,
        contactName: contactName,
        partnerPhone: phone,
        email: email,
        partnerId: partnerID,
        token: token,
      };
      console.log("DELETE partner", deletePayLoad)
      AuthService.deleteEPartner(deletePayLoad.partnerId)
        .then((response) => {
          console.log(response);
          swal({
            show: true,
            icon: "success",
            title: `deleted external Partner ${deletePayLoad.partnerName} (${deletePayLoad.email}) from SHUB`,
            text: response.message,
          });
          setTimeout(() => {
            onClose();
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
        partnerName: partnerName,
        partnerPhone: phone,
        contactName: contactName,
        email: email,
        token: token,
        partnerId: partnerID,
        channels: selectedChannels.map((item) => item).join(","),

        /*
{
  "email":"yavgar@gmail.com",
  "partnerId":"640625ea0620e40031b8597d",
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNjQxOGE1YzY0NTUzNDdmMGExMjViNDRhIiwiYXBwbGljYXRpb25JZCI6IjY0MTJmNGI4NDA5OTIxZjVmM2VhY2M3YiIsImFjY291bnRJZCI6IjY0MDYyNWVhMDYyMGU0MDAzMWI4NTk3ZCIsImlzcyI6InByb2R1Y3Rpb24uZ3Vlc3R5LmNvbSIsIm5hbWUiOiJhcHBsaWNhdGlvbiIsInJvbGUiOiJ1c2VyIiwidXNlclJvbGVzIjpbeyJyb2xlSWQiOnsicGVybWlzc2lvbnMiOlsibGlzdGluZy52aWV3ZXIiXX19XSwicmVxdWVzdGVyIjoiT1RBQGd1ZXN0eS5jb20iLCJpYXQiOjE2NzkzMzY5MDJ9.nVtw-wy3qSQqF9anMjC0l9JJBG8SNiR-U0UOAkLiLJE",
  "agent":"TAL ARNON",
  "channels":"VT,SH",
  "partnerPhone":"972-542804003",
  "contactName":"Tal contact",
  "partnerName":"Tal Test company"
}
        */
      };
      console.log("NEW partner payload:", addPayLoad)
      AuthService.addNewPartner(addPayLoad)
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

  const handleCsvClick = () => {
    if (csvInputRef.current) {
      csvInputRef.current.click();
    }
  }

  const handleCSVButton = (event) => {
    const file = event.target.files[0];
    // console.log('csvfile', file)
    let csvdata = {};
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const now = new Date().toISOString();
        // const parsedData = text?.split("\n")?.length ? text?.split("\n").map((row) => row.split(",")[0].replace(/\r/g, "")) : [];

        // Parse CSV and build the required structure
        const parsedData = text
          ?.split("\n")
          ?.filter(row => row.trim() !== "")
          .map((row) => {
            const id = row.split(",")[0].replace(/\r/g, "");
            return {
              [id]: {
                status: "pending",
                updateStatic: false,
                updateCalendar: false,
                staticUpdated: now,
                calendarUpdated: now
              }
            };
        });
        
        csvdata = { 'ids' : parsedData }
        // console.log("CSV data:", csvdata);
        setCSV(csvdata);
        if (editClickedId) {
          var uploadPayLoad = {
            content: csvdata,
            partnerId: partnerID,
            token: token,
          };
          // console.log("UPLOAD CSV partner", partnerID,uploadPayLoad)
          AuthService.uploadSelectedListings(partnerID,uploadPayLoad)
            .then((response) => {
              console.log(response);
              if(response && response.data && response.data.success) {
                swal({
                  show: true,
                  icon: "success",
                  title: `${parsedData.length} ${parsedData.length > 1 ? 'ids' : 'id'} updated for external Partner ${partnerName} (${email})`,
                  text: "Successfully updated listings",
                }).then(() => {
                  onClose();
                });
              } else {
                  throw new Error(`Error updating listings: ${response?.data?.message || 'Unknown error'}`);
              }
      
            })
            .catch((e) => {
              swal({
                show: true,
                icon: "error",
                title: "Opps!!",
                text: `Error updating listings: ${e.response?.data?.message || e.message}`,
              }).then(() => {
                onClose();
              });
            });
        };
      }
      reader.readAsText(file);
    }
    
  }

  const handleSelectListings = () => {
    if (editClickedId) {
      var uploadPayLoad = {
        content: CSV,
        partnerId: partnerID,
        token: token,
      };
      console.log("Add Listings for partner", partnerID,uploadPayLoad)
      localStorage.setItem("Epartner", JSON.stringify(partner))
      history.push(PATH_SELECT, { partner, partnerID });
  }
}

  return (
    <>
      <img src={closeIcon} className="popup-close-icon" onClick={onClose} alt="Close tab" />
      <div className="container edit-partner-container">
        <div className="edit-partner-header">
          <img src={partner.id === "-1" ? addTitleIcon : editTitleIcon} alt="" />
          <div className="edit-partner-title">
            {partner.id === "-1"
              ? "Add External Partner"
              : "Edit External Partner"}
          </div>
        </div>
        <div className="edit-partner-main" style={{ display: "block" }}>
          <div className="row">
            <div className="col-6">
              <InputField
                label="Partner Name*"
                value={partnerName}
                onChange={setPartnerName}
                placeholder={"Enter partner name"}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
              <InputField
                label="Partner ID"
                value={partnerID}
                readOnly={true}
                //onChange={setPartnerID}
                placeholder={"Enter partnerId"}
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <InputField
                label="Manager Name"
                value={contactName}
                onChange={setContactName}
                placeholder={"Enter contact name"}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
              <InputField
                label="E-mail Address*"
                value={email}
                onChange={setEmail}
                placeholder={"Enter partner email"}
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <InputField
                label="Phone No."
                value={phone}
                onChange={setPhone}
                placeholder={"Enter phone"}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
            <InputField
                label="EPartner Token"
                //onChange={setToken}
                readOnly={true}
                value={token}
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>

<div className="row">
  <div className="col-12">
    <InputField
      label="Properties Sync Url"
      value={syncExternalPropertiesUrl}
      onChange={setSyncExternalPropertiesUrl}
      placeholder={"Enter Properties Sync Url"}
      style={{ marginTop: "20px" }}
    />
  </div>
</div>

          <div className="row">
            <div className="col-6">
              <InputField
                label="Static WH URL"
                value={staticUrl}
                onChange={setStaticUrl}
                placeholder={"Enter partner Static URL"}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
            <InputField
                label="Calendar WH URL"
                placeholder={"Enter partner Calendar URL"}
                //onChange={setToken}
                readOnly={false}
                value={calendarUrl}
                onChange={setCalendarUrl}
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>
        </div>
        <div className="edit-partner-footer">
        <Button
              style={{ fontSize: "18px", marginRight: "30px" }}
              variant="blue"
              text="Upload CSV Listings"
              onClick={handleCsvClick}
            />
            <input
              type="file"
              ref={csvInputRef}
              style={{ display: 'none' }}
              accept=".csv"
              onChange={handleCSVButton}
            />
        <Button
                style={{ fontSize: "18px", marginRight: "30px" }}
                variant="green"
                text="Add shared Listings"
                onClick={handleSelectListings}
              />
          {partner.id !== "-1"
            ? (<>
              <Button
                style={{ fontSize: "18px", marginRight: "30px" }}
                variant="cyan"
                text="Remove Partner"
                onClick={handleDeleteButton}
              /></>) : (<></>)}
            
          <Button
            style={{ fontSize: "18px", marginRight: "30px" }}
            variant="link"
            text="Cancel"
            onClick={onClose}
          />
          <Button
            style={{ fontSize: "18px" }}
            text={partner.id === "-1"
              ? "Add External Partner" :
              "Update External Partner"}
            onClick={handleSaveButton}
          />
        </div>
      </div>
    </>
  );
};

export default EditEPartner;
