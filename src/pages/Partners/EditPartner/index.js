import React, { useState, useEffect } from "react";
import Button from "../../../components/Buttons/Button/Button";
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";
import addTitleIcon from "../../../assets/icons/admin/add-title-icon.svg";
import editTitleIcon from "../../../assets/icons/admin/edit-title-icon.svg";
import closeIcon from "../../../assets/icons/closeIcon.png";
import creditCardIcon from "../../../assets/icons/creditcard.png";
import "./EditPartner.scss";
import AuthService from "../../../services/auth.service";
import swal from "sweetalert";
import { log } from "loglevel";
import Checkbox from "../../../components/Checkbox";
import { getStorageValue } from "../../../Util/general";

const EditPartner = (props) => {
  const { agent, newPartnerID, partner, onClose, partners, editClickedId, editPartnerId } = props;
  useEffect(() => {
    console.log("clicked partner:", partner)
    setChkVT(partner.basicChannels?.includes("VT"));
    setChkSH(partner.basicChannels?.includes("SH"));
    setChkTL(partner.basicChannels?.includes("TL"));
  }, [partner]);

  const [bankDetailsToShow, setBankDetailsToShow] = useState(false);
  const [chkVT, setChkVT] = useState(partner?.basicChannels?.includes("VT"));
  const [chkSH, setChkSH] = useState(partner?.basicChannels?.includes("SH"));
  const [chkTL, setChkTL] = useState(partner?.basicChannels?.includes("TL"));
  const [filterDataSingle, setfilterDataSingle] = useState(
    partners.filter((iteam) => iteam._id == partner)
  );
  let selectedChannels = partner.basicChannels
  const [partnerName, setPartnerName] = useState(partner.pmName)
  const [contactName, setContactName] = useState(partner.contactName)
  const [email, setEmail] = useState(partner.email)
  const [phone, setPhone] = useState(partner.pmPhone)
  const [accountID, setAccountID] = useState(partner.accountId)
  const [token, setToken] = useState(partner.bearerToken)
  const partnerLogin = getStorageValue('partnerLogin')
  const inputFileds = {
    IBAN: partner.bankDetails?.IBAN,
    bankName: partner.bankDetails?.bankName,
    extraDetails: partner.bankDetails?.extraDetails,
    holderAdress: partner.bankDetails?.holderAdress,
    holderCity: partner.bankDetails?.holderCity,
    holderCountry: partner.bankDetails?.holderCountry,
    holderFirstName: partner.bankDetails?.holderFirstName,
    swiftNumber: partner.bankDetails?.swiftNumber,
    holderPostalCode: partner.bankDetails?.holderPostalCode
  };

  const [formData, setformData] = useState(inputFileds);
  const handleInputField = (e) => {
    const { name, value, files } = e.target;
    console.log(name, value);
    const updatedFormData = { ...formData, [name]: value };

    setformData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));

  };

  const handleSaveButton = () => {
    if (editClickedId) {
      var UpdatePayLoad = {
        accountId: accountID,
        pmName: partnerName,
        contactName: contactName,
        pmPhone: phone,
        email: email,
        bearerToken: token,
        bankDetails: formData,
        source: partner.source,
        // "firstName": "string",
        // "abbreviation": "string",
        // "website": "string",
        // "state_province": "string",
        // "organization": "string",
        // "userImage": "string",
        "ta_company_markup": "10"
      };
      console.log("UPDATE partner payload:", UpdatePayLoad)
      AuthService.updatePartner(UpdatePayLoad.accountId, UpdatePayLoad, partner.source)
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
        pmName: partnerName,
        source: partner.source,
        pmPhone: phone,
        contactName: contactName,
        email: email,
        bearerToken: token,
        accountId: accountID,
        channels: selectedChannels.map((item) => item).join(","),
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

  const handleDeleteButton = () => {
    if (editClickedId) {
      var deletePayLoad = {
        pmName: partnerName,
        source: partner.source,
        contactName: contactName,
        pmPhone: phone,
        email: email,
        accountId: accountID,
        token: token,
      };
      console.log("DELETE partner", deletePayLoad)
      AuthService.deletePartner(deletePayLoad.accountId, partner.source)
        .then((response) => {
          console.log(response);
          swal({
            show: true,
            icon: "success",
            title: "deleted PM and listings from SHUB",
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
        pmName: partnerName,
        pmPhone: phone,
        contactName: contactName,
        email: email,
        token: token,
        accountId: accountID,
        channels: selectedChannels.map((item) => item).join(","),

        /*
{
  "email":"yavgar@gmail.com",
  "accountId":"640625ea0620e40031b8597d",
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNjQxOGE1YzY0NTUzNDdmMGExMjViNDRhIiwiYXBwbGljYXRpb25JZCI6IjY0MTJmNGI4NDA5OTIxZjVmM2VhY2M3YiIsImFjY291bnRJZCI6IjY0MDYyNWVhMDYyMGU0MDAzMWI4NTk3ZCIsImlzcyI6InByb2R1Y3Rpb24uZ3Vlc3R5LmNvbSIsIm5hbWUiOiJhcHBsaWNhdGlvbiIsInJvbGUiOiJ1c2VyIiwidXNlclJvbGVzIjpbeyJyb2xlSWQiOnsicGVybWlzc2lvbnMiOlsibGlzdGluZy52aWV3ZXIiXX19XSwicmVxdWVzdGVyIjoiT1RBQGd1ZXN0eS5jb20iLCJpYXQiOjE2NzkzMzY5MDJ9.nVtw-wy3qSQqF9anMjC0l9JJBG8SNiR-U0UOAkLiLJE",
  "agent":"TAL ARNON",
  "channels":"VT,SH",
  "pmPhone":"972-542804003",
  "contactName":"Tal contact",
  "pmName":"Tal Test company"
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

  const handleResyncButton = () => {
    var resyncPayLoad = {
      pmName: partnerName,
      contactName: contactName,
      pmPhone: phone,
      email: email,
      accountId: accountID,
      token: token,
      source: partner.source
    };
    console.log("Resync partner", resyncPayLoad)
    AuthService.resyncPartner(resyncPayLoad.accountId, resyncPayLoad.source)
      .then((response) => {
        console.log(response);
        swal({
          show: true,
          icon: "success",
          title: "resync PM listings started on SHUB",
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
  };
  const handleActivateButton = () => {
    var activatePayLoad = {
      accountId: accountID,
      source: partner.source
    };
    console.log("Activate partner", activatePayLoad)
    AuthService.activatePartner(activatePayLoad.accountId, activatePayLoad.source)
      .then((response) => {
        console.log(response);
        swal({
          show: true,
          icon: "success",
          title: "activated all PM listings!",
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
  };

  const handleAgencyBankDetails = () => {
    setBankDetailsToShow(true);
    console.log('show bank details')
    document.body.style.overflow = "hidden";
  };

  const handleClosedBankDetails = () => {
    setBankDetailsToShow(false);
    console.log('bankDetails:',formData)
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <img src={closeIcon} className="popup-close-icon" onClick={onClose} />
      <div className="container edit-partner-container">
        <div className="edit-partner-header">
          <img src={partner.id === "-1" ? addTitleIcon : editTitleIcon} alt="" />
          <div className="edit-partner-title">
            {partner.id === "-1"
              ? "Add PM "
              : "Property Manager Details"}&nbsp;
            | {partner?.source ? partner?.source==='SH'?'Smiling House':'Villa Tracker':''}
          </div>
        </div>
        <div className="edit-partner-main" style={{ display: "block" }}>
          <div className="row">
            <div className="col-6">
              <InputField
                readOnly={partnerLogin}
                label="Company Name*"
                value={partnerName}
                onChange={setPartnerName}
                placeholder={"Enter partner name"}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
              <InputField
                label="Guesty Account ID"
                readOnly={partnerLogin}
                value={accountID}
                onChange={setAccountID}
                placeholder={"Enter AccountId"}
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>
          {!bankDetailsToShow && (<>
            <div className="row">
              <div className="col-6">
                <InputField
                  label="Contact Person"
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
                <div className="mt-4" onClick={handleAgencyBankDetails}>
                <img
                onClick={handleClosedBankDetails}
                src={creditCardIcon}
                alt="creditCardIcon"
                className="img-fluid"
              />
              &nbsp;
                  <span className="payment-text">
                    Payments will be sent to you bank account.
                    when a booking is made on the Villa Tracker 
                    according to the agreed terms. 
                    <h3 className="link18">Press Here to Add Bank Details</h3>
                  </span>
                </div>
                
              </div>
              { !partnerLogin && (<div className="col-6">
                <TextAreaField
                  readOnly={partnerLogin}
                  label="partner Token"
                  onChange={setToken}
                  value={token}
                  placeholder={"Enter partner Token"}
                  style={{ fontSize: "25px", fontWeight: "500", color: "#707070", marginTop: "20px", height: "140px", marginTop: "20px" }}
                >
                  {token}
                </TextAreaField>
              </div>)}
            </div>
          </>)}
          {bankDetailsToShow && (<div className="row">
            <div className="col-md-6" >
              <div className="col-md-6 col-12 mb-3 px-4 w-100 fw-bolder ">
                <label for="holderFirstName">Holders Name*</label>
                <input className="form-control" onChange={handleInputField} value={formData?.holderFirstName} name="holderFirstName" placeholder={"Enter holders name"} disabled={agent?.role === "agent" ? true : false} />
              </div>
              <div className="col-md-6 col-12 mb-3 px-4 w-100 fw-bolder">
                <label for="holderAdress">Address*</label>
                <input className="form-control" onChange={handleInputField} value={formData?.holderAdress} name="holderAdress" placeholder={"Enter address"} disabled={agent?.role === "agent" ? true : false} />
              </div>

              <div className="col-md-6 col-12 mb-3 px-4 w-100 fw-bolder">
                <label for="holderCity">City*</label>
                <input className="form-control" onChange={handleInputField} value={formData?.holderCity} name="holderCity" placeholder={"Enter city"} disabled={agent?.role === "agent" ? true : false} />
              </div>
              <div className="col-md-6 col-12 mb-3 px-4 w-100 fw-bolder">
                <label for="holderCountry">Country*</label>
                <input className="form-control" onChange={handleInputField} value={formData?.holderCountry} name="holderCountry" placeholder={"Enter country"} disabled={agent?.role === "agent" ? true : false} />
              </div>
              <div className="col-md-6 col-12 mb-3 px-4 w-100 fw-bolder">

                <label for="holderPostalCode">Postal Code*</label>
                <input className="form-control" onChange={handleInputField} value={formData?.holderPostalCode} name="holderPostalCode" placeholder={"Enter country"} disabled={agent?.role === "agent" ? true : false} />
              </div>

            </div>
            <div className="col-md-6" >
              <div className="col-md-6 col-12 mb-3 px-4 w-100 fw-bolder">
                <label for="IBAN">IBAN / Account Number*</label>
                <input className="form-control" onChange={handleInputField} value={formData?.IBAN} name="IBAN" placeholder={"Enter IBAN / Account Number"} disabled={agent?.role === "agent" ? true : false} />
              </div>
              <div className="col-md-6 col-12 mb-3 px-4 w-100 fw-bolder">
                <label for="bankName">Bank Name*</label>
                <input className="form-control" onChange={handleInputField} value={formData?.bankName} name="bankName" placeholder={"Enter bank name"} disabled={agent?.role === "agent" ? true : false} />
              </div>
              <div className="col-md-6 col-12 mb-3 px-4 w-100 fw-bolder">
                <label for="swift">SWIFT / BIC*</label>
                <input className="form-control" onChange={handleInputField} value={formData?.swiftNumber} name="swiftNumber" placeholder={"Enter SWIFT / BIC"} disabled={agent?.role === "agent" ? true : false} />
              </div>
              <div className="col-md-6 col-12 mb-3 px-4 w-100 fw-bolder">
                <label for="swift">Extra Details</label>
                <textarea className="form-control" name="extraDetails" onChange={handleInputField} value={formData?.extraDetails} rows={5} disabled={agent?.role === "agent" ? true : false}></textarea>
              </div>
            </div>
            <div className="mt-4 d-flex" onClick={handleClosedBankDetails}>
              <img
                onClick={handleClosedBankDetails}
                src={creditCardIcon}
                alt="creditCardIcon"
                className="img-fluid"
              />
              &nbsp;
              <span className="link18">
                <h3>Close Bank Details</h3>
              </span>
            </div>
          </div>)}
        </div>
        <div className="edit-partner-footer">
          {partner.id !== "-1" && !partnerLogin
            ? (<><Button
              style={{ fontSize: "18px", marginRight: "30px" }}
              variant="Pink"
              text="Activate All"
              onClick={handleActivateButton}
            />
              <Button
                style={{ fontSize: "18px", marginRight: "30px" }}
                variant="green"
                text="Resync PM listings"
                onClick={handleResyncButton}
              />
              <Button
                style={{ fontSize: "18px", marginRight: "30px" }}
                variant="cyan"
                text="Delete PM + listings"
                onClick={handleDeleteButton}
              /></>) : (<></>)}
            {bankDetailsToShow &&  <Button
            style={{ fontSize: "18px", marginRight: "30px" }}
            variant="link"
            text="Close Bank details"
            onClick={handleClosedBankDetails}
          />}
          <Button
            style={{ fontSize: "18px", marginRight: "30px" }}
            variant="link"
            text="Cancel"
            onClick={onClose}
          />
          <Button
            style={{ fontSize: "18px" }}
            text={partner.id === "-1"
              ? "Add PM" :
              "Save"}
            onClick={handleSaveButton}
          />
        </div>
      </div>
    </>
  );
};

export default EditPartner;
