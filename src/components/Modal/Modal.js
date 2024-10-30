import React, { useEffect } from "react";
import { useState } from "react";
import "./Modal.scss";
import axios from "axios";
export default function Modal() {

  const [form, setform] = useState({
    clientFullName: "",
    extraDetails: "",
    destination: "",
    arrive: "",
    amenities: "",
    deport: "",
    guests: "",
    bedroom: "",
    priceRange: "",
    propertyType: "",
    mustHave: ""
  });

  const [error, setError] = useState({ ...form });
  const [submit, setsubmit] = useState(false);

  const onchangeHandler = (e) => {
    let { name, value } = e.target;
    setform({ ...form, [name]: value });
    // switch (name) {
    //   case "destination":
    //     if (value.length === 0) {
    //       error.destination = "Enter name *";
    //     } else {
    //       error.destination = "";
    //     }
    //     break;
    //   case "customor":
    //     if (value.length === 0) {
    //       error.customor = "Enter customer *";
    //     } else {
    //       error.customor = "";
    //     }
    //     break;
    //   case "description":
    //     if (value.length === 0) {
    //       error.description = "Enter description *";
    //     } else {
    //       error.description = "";
    //     }
    //     break;
    //   default:
    //     break;
    // }
    // setError(error);
  };
  function validate() {
    if (form.destination === "") {
      error.destination = "Enter destination *";
    }
    if (form.customor === "") {
      error.customor = "Enter customer *";
    }
    if (form.description === "") {
      error.description = "Enter description *";
    }

    setError(error);
  }

  useEffect(() => {
    const destination = localStorage.getItem("destination")
    const bedrooms = localStorage.getItem("bedrooms")
    const adults = localStorage.getItem("adults")
    console.log(destination,bedrooms,adults)
    // const bedrooms = localStorage.getItem("bedrooms")
    // const bedrooms = localStorage.getItem("bedrooms")

    var updatePaylod = {
      clientFullName: "",
      extraDetails: "",
      destination: destination,
      arrive: "",
      amenities: "",
      deport: "",
      guests: adults,
      bedroom: bedrooms,
      priceRange: "",
      propertyType: "",
      mustHave: ""
    }
    setform(updatePaylod)
  }, [])



  const submitHandler = (e) => {
    e.preventDefault();
    setsubmit(true);
    //console.log("Modal data >>>", form); // Modal form deatils
  };
  useEffect(() => {
    let token = localStorage.getItem("jToken");
    axios
      .get(
        "https://backend.villatracker.com/wishlist/get-wishlists?limit=300&agent_id=1",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        // setModalData(response.data);
      });
  }, []);

  return (
    <>
      {/* <div className="modalWrapper" onClick={closeModal}></div>
      <div className="modalContainer">
        <div
          className="container"
          style={{
            border: "2px solid grey",
            width: "100vw",
            height: "86vh",
            borderRadius: "8px",
          }}
        >
          <div className=" d-flex justify-content-center p-2">
            <h2
             className="d-flex justify-content-center"
              style={{ color: "grey", fontWeight: "bold", padding: "7px" }}
            >
              Request an alternate offer
            </h2>{" "}
            <span>
              {" "}
              <button
                type="button"
                className="btn btn-light btn-lg mx-4"
                onClick={closeModal}
              >
                X
              </button>
            </span>
            </div>
            <div className="d-flex justify-content-center">
              <p style={{ color: "grey", fontWeight: "bold", padding: "7px" }}>
                {" "}
                We got all the details just waiting for you to add your client
                name and <br /> your comment so we can send you alternative
                offer
              </p>
            </div>
        
          <hr />
          <form
            className="row g-4"
            onSubmit={submitHandler}
            style={{ fontFamily: "Quicksand" }}
          >
            <div className="col-md-5">
              <label for="inputEmail4" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Client Full Name*
                </span>
              </label>
              <select id="inputEmail4" className="form-select">
                <option selected disabled>
                  Please select client Name
                </option>
                {modalData?.wishlists?.map((iteam) => {
                  return (
                    <>
                      {" "}
                      <option>{iteam.clientName}</option>
                    </>
                  );
                })}
              </select>
              ;
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Extra Details -Add your personal note
                </span>
              </label>
              <input type="text" className="form-control" id="inputPassword4" onChange={onchangeHandler} />
            </div>
           
            <div className="col-md-3">
              <label for="inputCity" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Destination
                </span>
              </label>
              <input type="text" className="form-control" id="inputCity" onChange={onchangeHandler} />
            </div>
            
         
            <div className="col-md-3">
              <label for="inputZip" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Arrive
                </span>
              </label>
              <input type="text" className="form-control" id="inputZip" onChange={onchangeHandler} />
            </div>
            <div className="col-md-3">
              <label for="inputZip" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Deport
                </span>
              </label>
              <input type="text" className="form-control" id="inputZip" onChange={onchangeHandler} />
            </div>
            <div className="col-md-3">
              <label for="inputZip" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Guests
                </span>
              </label>
              <input type="text" className="form-control" id="inputZip" onChange={onchangeHandler} />
            </div>
            <div className="col-md-3">
              <label for="inputZip" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Bedroom
                </span>
              </label>
              <input type="text" className="form-control" id="inputZip" onChange={onchangeHandler} />
            </div>
            <div className="col-md-3">
              <label for="inputZip" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Price Range
                </span>
              </label>
              <input type="text" className="form-control" id="inputZip" onChange={onchangeHandler} />
            </div>
            <div className="col-md-3">
              <label for="inputZip" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Property Type
                </span>
              </label>
              <input type="text" className="form-control" id="inputZip" onChange={onchangeHandler} />
            </div>
            <div className="col-md-3">
              <label for="inputZip" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Must Have
                </span>
              </label>
              <input type="text" className="form-control" id="inputZip" onChange={onchangeHandler} />
            </div>
            <div className="col-md-3">
              <label for="inputZip" className="form-label">
                <span
                  className="input_name_address"
                  style={{ color: "grey", fontWeight: "bold" }}
                >
                  Amenities
                </span>
              </label>
              <input type="text" className="form-control" id="inputZip" onChange={onchangeHandler} />
            </div>

           
            <br />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-light btn-lg p-2"
                onClick={closeModal}
                style={{ fontFamily: "Quicksand" }}
              >
                close
              </button>
              <button
                type="submit"
                className="btn  btn-lg mx-4 p-2"
                style={{
                  fontFamily: "Quicksand",
                  backgroundColor: "#165093",
                  color: "white",
                }}
              >
                Send to Villa Tracker Team
              </button>
            </div>
          </form>
        </div>
      </div> */}




      <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <div className="container">
                <h1 class="text-center"><b>Request an alternative offer</b></h1>
                <h3 class="text-center">We got all the details just waiting for you to add your client
                  name and <br /> your comment so we can send you alternative
                  offer</h3>
              </div>
              <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close" style={{ "padding": "10px", "margin-bottom": "7%" }}></button>
            </div>

            <div class="modal-body">
              <div className="container">
                <div class="row mb-4">
                  <div class="form-group col-md-6">
                    <label for="clientFullName">Client Full Name</label>
                    <input type="text" class="form-control" id="clientFullName" name="clientFullName" placeholder="Enter Client name" value={form.clientFullName} onChange={onchangeHandler} />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="extraDetails">Extra Details - Add your personal note</label>
                    <input type="text" class="form-control" id="extraDetails" name="extraDetails" value={form.extraDetails} onChange={onchangeHandler} />
                  </div>
                </div>
                <div class="row ">
                  <div class="form-group col-md-4">
                    <label for="destination">Destination</label>
                    <input type="text" class="form-control" id="destination" name="destination" placeholder="Enter destination" value={form.destination} onChange={onchangeHandler} />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="persoanelNote">Arrive</label>
                    <input type="text" class="form-control" id="arrive" name="arrive"  value={form.arrive} onChange={onchangeHandler} />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="amenities">Amenities</label>
                    <input type="text" class="form-control" id="amenities" name="amenities" value={form.amenities} onChange={onchangeHandler} />
                  </div>

                </div>
                <div class="row mt-4">
                  <div class="form-group col-md-4">
                    <label for="deport">Deport</label>
                    <input type="text" class="form-control" id="deport" name="deport" placeholder=""  value={form.deport} onChange={onchangeHandler} />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="persoanelNote">Guests</label>
                    <input type="text" class="form-control" id="guests" name="guests" value={form.guests} onChange={onchangeHandler} />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="persoanelNote">Bedroom</label>
                    <input type="text" class="form-control" id="bedroom" name="bedroom" value={form.bedroom} onChange={onchangeHandler} />
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="form-group col-md-4">
                    <label for="persoanelNote">Price Range</label>
                    <input type="text" class="form-control" id="priceRange" name="priceRange"  value={form.priceRange} placeholder="Price Range" onChange={onchangeHandler} />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="propertyType">Property Type</label>
                    <input type="text" class="form-control" id="propertyType" name="propertyType" value={form.propertyType} onChange={onchangeHandler} />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="mustHave">Must Have</label>
                    <input type="text" class="form-control" id="mustHave" name="mustHave" value={form.mustHave} onChange={onchangeHandler} />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancle</button>
              <button type="button" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
