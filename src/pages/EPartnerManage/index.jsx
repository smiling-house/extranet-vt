import React, { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar/index.js";

import LoadingBox from "../../components/LoadingBox/index.js";

import pageBg from '../../assets/SigninPic.jpeg';

import InputField from "../../components/InputField";
import { v4 as uuidv4 } from 'uuid'

import axios from "axios";

import constants, { PATH_EPARTNERS } from "../../Util/constants.js";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";


const EPartnerManage = (props) => {

    const { agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props;

    const history = useHistory();

    const Epartner = JSON.parse(localStorage.getItem('Epartner'));
    const ePartnerEmail = localStorage.getItem('ePartnerEmail');

  const [partnerName, setPartnerName] = useState(Epartner.partnerName)
  const [contactName, setContactName] = useState(Epartner.contactName)
  const [email, setEmail] = useState(Epartner.email)
  const [phone, setPhone] = useState(Epartner.phone)
  const [calendarUrl, setCalendarUrl] = useState(Epartner.calendarUrl)
  const [staticUrl, setStaticUrl] = useState(Epartner.staticUrl)

  const [partnerTitle, setPartnerTitle] = useState(Epartner.title)
  const [partnerWebsite, setPartnerWebsite] = useState(Epartner.website)

  const [partnerNda, setPartnerNda] = useState(Epartner.nda)
  const [partnerStatus, setPartnerStatus] = useState(Epartner.status)

    const [isLoading, setIsLoading] = useState(false)

    const [showRejectionReasons, setShowRejectionReasons] = useState(false)
    const [reasonForRejection, setReasonForRejection] = useState('')

    const setStatus = (status) => {
      setPartnerStatus(status);

      if(status==='rejected') {
        setShowRejectionReasons(true);
      } else {
        setShowRejectionReasons(false);  
        setReasonForRejection('')      
      }
    }

    const updateExternalPartner = async() => {
        //console.log(partnerStatus)

        if(partnerStatus==='approved') {

            //Generate unique partner id and bearer token for the External Partner
            const newEpartnerId = uuidv4(); //RECHECK FOR ITS UNIQUENESS - HIGH PRIORITY
            const newEpartnerBearerToken = uuidv4(); //RECHECK FOR ITS UNIQUENESS - MEDIUM PRIORITY

            //Update external partners status to approved
            //send email to the External partner with all required documents attached with the partner id and bearer token
            const response = await axios.post( `${constants.SHUB_URL}/eps/approve-new-external-partner`, {email:ePartnerEmail, partnerId:newEpartnerId, bearerToken:newEpartnerBearerToken} )

            console.log('/eps/approve-new-external-partner', response)

            if(response.data.status===250) {
              
                swal({
                    show: true,
                    title: 'E Partner has been approved. ' + response.data.message,
                    text: '',
                    icon: "success"
                })
                
                history.push(PATH_EPARTNERS)
            }

        } else if(partnerStatus==='rejected') {

            if(reasonForRejection==='') {
                swal({
                    show: true,
                    title: 'Select reason for rejection',
                    text: '',
                    icon: "error"
                })

                return false;
            }

            const response = await axios.post( `${constants.SHUB_URL}/eps/reject-new-external-partner`, {email:ePartnerEmail,reasonForRejection:reasonForRejection} )  
            
            console.log('/eps/reject-new-external-partner', response)     
            
            if(response.data.status===250) {
              
                swal({
                    show: true,
                    title: 'E Partner has been rejected. ' + response.data.message,
                    text: '',
                    icon: "success"
                })
                
                history.push(PATH_EPARTNERS)
            }

        }

    }
    
    return (
		<div className="page-container">
			<div className="page-header">VT-Extranet : External Partner Manage</div>
			<Sidebar
				agency={agency}
				agent={agent}
				screenSize={screenSize}
				activeMenu={activeMenu}
				handleToggleMenu={handleToggleMenu}
			/>
			<div className={activeMenu ? `${"page-body"}` : "page-body"} >


            <div className="listings-container">
                <LoadingBox visible={isLoading} />
                <div className="listings-main">
                    <div className="listings-title">{Epartner?.pmName ? Epartner?.pmName : ''} /{Epartner?.contactName ? Epartner?.contactName : ''} / {Epartner?.email ? Epartner?.email : ''} / AccountID {Epartner?.accountId ? Epartner?.accountId : ''}/ source: {Epartner?.source ? Epartner?.source : ''}





<div>

         <div className="row">
            <div className="col-6">
              <InputField
                label="Title"
                value={partnerTitle}
                style={{ marginTop: "20px" }}
              />
            </div>

            <div className="col-6">
              <InputField
                label="Website"
                value={partnerWebsite}
                style={{ marginTop: "20px" }}
              />
            </div>            
          </div>

         <div className="row">
            <div className="col-6">
              <InputField
                label="Partner Name*"
                value={partnerName}
                style={{ marginTop: "20px" }}
              />
            </div>

            <div className="col-6">
              <InputField
                label="Manager Name (Contact Name)"
                value={contactName}
                style={{ marginTop: "20px" }}
              />
            </div>            
          </div>

          <div className="row">

            <div className="col-6">
              <InputField
                label="E-mail Address*"
                value={email}
                style={{ marginTop: "20px" }}
              />
            </div>

            <div className="col-6">
              <InputField
                label="Phone No."
                value={phone}
                style={{ marginTop: "20px" }}
              />
            </div>            
          </div>


          <div className="row">
            <div className="col-6">
              <InputField
                label="Static WH URL"
                value={staticUrl}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
            <InputField
                label="Calendar WH URL"
                readOnly={false}
                value={calendarUrl}
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-12">
                <label>NDA</label>
                <h4><a href={partnerNda} target="_blank">{partnerNda}</a></h4>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
                <label>Partner Satus:</label>
                <select
                className="form-control"
                value={partnerStatus}
                onChange={(e) => setStatus(e.target.value)} // make sure to define this handler
                >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                </select>
            </div>

            {showRejectionReasons==true && <div className="col-6">
                <label>Reason for rejection:</label>
                <select
                className="form-control"
                value={reasonForRejection}
                onChange={(e) => setReasonForRejection(e.target.value)} // make sure to define this handler
                >
                <option value="">-Select Rejection Reason-</option>
                <option value="Reason 1">Reason 1</option>
                <option value="Reason 2">Reason 2</option>
                <option value="Reason 3">Reason 3</option>
                </select>
            </div>   
            }

          </div>


        <div className="row">
            <div className="col-6">&nbsp;</div>
            <div className="col-6">&nbsp;</div>
        </div>

          <div className="row">
            <div className="col-6">
                
                <button
                    type="submit"
                    className="btn btn-success border-radius-0 w-25 py-2"
                    style={{ backgroundColor: "#165093" }}
                    onClick={updateExternalPartner}
                >
                    Update External Partner Status
                </button>                

            </div>

            <div className="col-6">&nbsp;</div>
        </div>


</div>


                    </div>








                </div>

            </div>

            </div>
        </div>
    )

}

export default EPartnerManage