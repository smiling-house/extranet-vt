import React, { useState, useEffect } from "react";
import Button from "../../../components/Buttons/Button/Button";
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";
import addTitleIcon from "../../../assets/icons/admin/add-title-icon.svg";
import editTitleIcon from "../../../assets/icons/admin/edit-title-icon.svg";
import closeIcon from "../../../assets/icons/closeIcon.png";

import "./EditTask.scss";
import AuthService from "../../../services/auth.service";
import swal from "sweetalert";
import { log } from "loglevel";
import Checkbox from "../../../components/Checkbox";

const EditTask = (props) => {
  const { newTaskID, task, onClose, tasks, editClickedId, editTaskId } = props;
  useEffect(() => {
    console.log("clicked task:", task)
  }, [task]);



  const [filterDataSingle, setfilterDataSingle] = useState(
    tasks.filter((iteam) => iteam._id == task)
  );
  let selectedChannels = task.basicChannels
  const [taskName, setTaskName] = useState(task.pmName)
  const [contactName, setContactName] = useState(task.contactName)
  const [email, setEmail] = useState(task.email)
  const [phone, setPhone] = useState(task.pmPhone)
  const [accountID, setAccountID] = useState(task.accountId)
  const [token, setToken] = useState(task.bearerToken)

  const handleSaveButton = () => {
    if (editClickedId) {
      var UpdatePayLoad = {
        accountId: accountID,
        pmName: taskName,
        contactName: contactName,
        pmPhone: phone,
        email: email,
        bearerToken: token,
        source: task.source,
        // "firstName": "string",
        // "abbreviation": "string",
        // "website": "string",
        // "state_province": "string",
        // "organization": "string",
        // "userImage": "string",
        "ta_company_markup": "10"
      };
      console.log("UPDATE task payload:", UpdatePayLoad)
      AuthService.updateTask(UpdatePayLoad.accountId, UpdatePayLoad, task.source)
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
        pmName: taskName,
        source: task.source,
        pmPhone: phone,
        contactName: contactName,
        email: email,
        bearerToken: token,
        accountId: accountID,
        channels: selectedChannels.map((item) => item).join(","),
      };
      console.log("NEW task payload:", addPayLoad)
      AuthService.addNewTask(addPayLoad)
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
        pmName: taskName,
        source: task.source,
        contactName: contactName,
        pmPhone: phone,
        email: email,
        accountId: accountID,
        token: token,
      };
      console.log("DELETE task", deletePayLoad)
      AuthService.deleteTask(deletePayLoad.accountId, task.source)
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
        pmName: taskName,
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
      console.log("NEW task payload:", addPayLoad)
      AuthService.addNewTask(addPayLoad)
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
      pmName: taskName,
      contactName: contactName,
      pmPhone: phone,
      email: email,
      accountId: accountID,
      token: token,
      source: task.source
    };
    console.log("Resync task", resyncPayLoad)
    AuthService.resyncTask(resyncPayLoad.accountId, resyncPayLoad.source)
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
      source: task.source
    };
    console.log("Activate task", activatePayLoad)
    AuthService.activateTask(activatePayLoad.accountId, activatePayLoad.source)
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

  return (
    <>
      <img src={closeIcon} className="popup-close-icon" onClick={onClose} />
      <div className="container edit-task-container">
        <div className="edit-task-header">
          <img src={task.id === "-1" ? addTitleIcon : editTitleIcon} alt="" />
          <div className="edit-task-title">
            {task.id === "-1"
              ? "Add TASK "
              : "Edit TASK "}
            | {task?.source ? task?.source : 'SH'}
          </div>
        </div>
        <div className="edit-task-main" style={{ display: "block" }}>
          <div className="row">
            <div className="col-6">
              <InputField
                label="Task Name*"
                value={taskName}
                onChange={setTaskName}
                placeholder={"Enter task name"}
                style={{ marginTop: "20px" }}
              />
            </div>
            <div className="col-6">
              <InputField
                label="Account ID"
                value={accountID}
                onChange={setAccountID}
                placeholder={"Enter AccountId"}
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
                placeholder={"Enter task email"}
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
              <TextAreaField
                label="task Token"
                onChange={setToken}
                value={token}
                placeholder={"Enter task Token"}
                style={{ fontSize: "25px", fontWeight: "500", color: "#707070", marginTop: "20px", height: "140px", marginTop: "20px" }}
              >
                {token}
              </TextAreaField>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <InputField
                label="Is Running?"
                readOnly={true}
                labelOnly={true}
                value={''}
                placeholder={""}
                style={{ marginTop: "20px" }}
              />
              <div className="channels-main-selection-icons"
                style={{
                  paddingTop: '15px',
                  display: 'grid',
                  gridTemplateColumns: '80px 80px 80px',
                  justifyItems: 'center',
                }}>
                <Checkbox
                  uid="inRunning"
                  checked={task.isRunning}
                  //onChange={() => setChkVT(!chkVT)}
                  label="is Running"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="edit-task-footer">
          {task.id !== "-1"
            ? (<><Button
              style={{ fontSize: "18px", marginRight: "30px" }}
              variant="Pink"
              text="Activate"
              onClick={handleActivateButton}
            />
            <Button
              style={{ fontSize: "18px", marginRight: "30px" }}
              variant="green"
              text="Deactivate"
              onClick={handleResyncButton}
            />
              <Button
                style={{ fontSize: "18px", marginRight: "30px" }}
                variant="cyan"
                text="Delete"
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
            text={task.id === "-1"
              ? "Add PM" :
              "Update PM data"}
            onClick={handleSaveButton}
          />
        </div>
      </div>
    </>
  );
};

export default EditTask;
