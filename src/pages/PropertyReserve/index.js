import React, { useEffect, useState } from "react";
import screenshot from "../../assets/screen_shot_2020_07__jk7r5.png";
import PageHeader from "../../components/PageHeader";
import goBack from "../../assets/go-back.svg";
import eventsIcon from "../../assets/collections/icons/events.png";
import familyIcon from "../../assets/collections/icons/family.png";
import petsIcon from "../../assets/collections/icons/pets.png";
import sustainIcon from "../../assets/collections/icons/sustainable.png";
import bath from "../../assets/property/baths.png";
import TermsFooter from "../../components/TermsFooter/TermsFooter";
import guests from "../../assets/icons/guests.png";
import bed from "../../assets/g73.png";
import creditCardsIcon from "../../assets/Image_36.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsCheckSquare } from "react-icons/bs";
import "./45.css";
//import { loadStripe } from "@stripe/stripe-js";
//import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation, useHistory } from "react-router-dom";
import UseCreateObject from "../../Hooks/UseCreateObject.jsx";
import { PATH_SEARCH, PATH_RESERVE } from "../../Util/constants";

import "./PropertyReserve.scss";
import moment from "moment/moment";
import {
  calculateTotalNights,
  countWeekendDays,
  detectCurrency,
  getStorageValue,
  isPercentage,
  isPercentageOrAmount,
} from "../../Util/general";
import { userRequest } from "../../api/requestMethods";
import { data, dummyTaxes } from "../Listings2/makeData";
import NameSelect from "../../components/Forms/Fields/NameAutoComplete/NameSelect";
import ImageWithHover from "../../components/ImageWithHover";
import LinesEllipsis from "react-lines-ellipsis";

const google = window.google;
//const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PropertyReservationPage = (props) => {
  const location = useLocation();
  const history = useHistory();
  const property = location.state && location.state.property;
  const calculatedAmount = location?.state?.price;
  const selectedNights = location?.state?.nights;
  let prop = UseCreateObject(property);
  console.log("reserver property params", property);
  console.log("hooked prop >>>: ", prop);
  if (property) {
    console.log("propertyData:", property);
    let searchPropertiesArray = [];

    //
  }
  // // Work for Responsiveness start ==================================================>
  const [smallScreen, setSmallScreen] = useState(false);
  //console.log("smallScreen >>", smallScreen);
  const [screenSize, setScreenSize] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("wire");
  const [clients, setClients] = useState(null);
  const [picIndex, setPicIndex] = useState(0);
  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 992) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [screenSize]);
  // // Work for Responsiveness end ==================================================>

  const doSearch = (params) => {
    //console.log("go back!");
    history.push(PATH_SEARCH);
  };

  const renderAmount = (title, pic, amount) => {
    return (
      <div className="d-flex flex-column px-3 justifty-content-between align-items-center">
        <img src={pic} alt="" height={40} />
        <span className="px-1">{title}</span>
        {amount ? (
          <span style={{ fontSize: "20px" }}>{amount}</span>
        ) : (
          <span style={{ fontSize: "20px" }}>&nbsp;</span>
        )}
      </div>
    );
  };

  const renderAdditionalFee = (text, value, symbol) => {
    return (
      <div className="d-flex justify-content-between">
        <div className="h5">{text}</div>
        <div className="h5">
          {value}
          {symbol}
        </div>
      </div>
    );
  };

  const formatTaxName = (tax) => {
    let name =
      tax?.type === "OTHER"
        ? `${tax?.name} tax`
        : tax.type?.split("_").join(" ");
    return name?.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const getAdditionalFee = (key, value, calculateTax, totalPrice) => {
    let taxes = property?.taxes?.length > 0 ? property?.taxes : dummyTaxes; // for calculation of taxes i add dummy taxes data
    if (key === "cleaningFee" && property?.prices?.cleaningFee) {
      return renderAdditionalFee(
        "Cleaning Fee",
        property?.prices?.cleaningFee,
        detectCurrency(property?.prices?.currency)
      );
    }
    if (key === "securityDeposit" && property?.prices?.securityDepositFee) {
      return renderAdditionalFee(
        "Security Deposit",
        property?.prices?.securityDepositFee,
        detectCurrency(property?.prices?.currency)
      );
    }
    if (key === "taxes" && taxes.length > 0) {
      return taxes.map((tax) => {
        return renderAdditionalFee(
          formatTaxName(tax),
          tax?.amount,
          isPercentageOrAmount(tax?.units, property?.prices?.currency)
        );
      });
    }
    if (calculateTax) {
      const getTaxPercentage = (amount) => (totalPrice * amount) / 100;
      const getTaxAmount = (obj) => {
        let taxAmount;
        switch (obj.quantifier) {
          case "PER_STAY":
            // handle PER_STAY quantifier
            taxAmount = obj.amount;
            break;
          case "PER_GUEST":
            // handle PER_GUEST quantifier
            taxAmount = obj.amount * property?.accommodates;
            break;
          case "PER_NIGHT":
            // handle PER_NIGHT quantifier
            taxAmount =
              obj?.amount *
              (selectedNights ? selectedNights : calculateTotalNights());
            break;
          case "PER_GUEST_PER_NIGHT":
            taxAmount =
              obj.amount *
              property?.accommodates *
              (selectedNights ? selectedNights : calculateTotalNights());
            // handle PER_GUEST_PER_NIGHT quantifier
            break;
          // add more cases as needed for other quantifier values
          default:
            // handle default case (optional)
            break;
        }
        return taxAmount;
      };

      return taxes?.reduce((acc, curr) => {
        const taxAmount = isPercentage(curr?.units)
          ? getTaxPercentage(curr?.amount)
          : getTaxAmount(curr);
        return acc + taxAmount;
      }, 0);
    }
  };

  const calculateTotalPrice = () => {
    const totalNightsMoreThanAWeek = calculateTotalNights() > 7;
    const totalNightsMoreThanAMonth = calculateTotalNights() > 28;
    const totalGuests = property?.accommodates;
    const extraGuests =
      totalGuests - (property?.prices?.guestsIncludedInRegularFee || 0);
    const extraPersonFee = property?.prices?.extraPersonFee || 0;
    const extraGuestsTotalFee =
      extraGuests * extraPersonFee * calculateTotalNights();
    // week days and week End days
    const weekEndDays = property?.prices.weekendDays
      ? countWeekendDays(undefined, undefined, property?.prices.weekendDays)
      : 0;
    const weekDays = property?.prices?.weekendBasePrice
      ? calculateTotalNights() - weekEndDays
      : calculateTotalNights();

    let totalPrice = calculatedAmount
      ? calculatedAmount
      : weekDays * property?.prices?.basePrice +
        weekEndDays * (property?.prices?.weekendBasePrice || 0) +
        extraGuestsTotalFee +
        (property?.prices?.cleaningFee || 0);
    if (totalNightsMoreThanAMonth && !calculatedAmount) {
      totalPrice = totalPrice * property?.prices?.monthlyPriceFactor;
    } else if (totalNightsMoreThanAWeek && !calculatedAmount) {
      // count;
      totalPrice = totalPrice * property?.prices?.weeklyPriceFactor;
    }

    // calculate taxes
    let taxes = property?.taxes?.length > 0 ? property?.taxes : dummyTaxes;
    if (taxes) {
      const totalTaxPrice = getAdditionalFee(
        undefined,
        undefined,
        true,
        totalPrice
      );
      totalPrice += totalTaxPrice;
    }

    return totalPrice ? totalPrice.toFixed(2) : 0;
  };

  const getAllClients = async () => {
    const clientResponse = await userRequest.get(`/client/get-clients`, {
      params: { limit: "300", skip: "0", agent_id: 1 },
    });
    console.log("fetched Clients >>>>", clientResponse.data.clients);

    // setClients(data);
    setClients(clientResponse.data.clients);
  };
  console.log("clients", clients, client);
  const handleClientChange = (e, name, fromSelect) => {
    console.log("handleCLient change", e, name, fromSelect);
    if (fromSelect) {
      setClient({
        firstName: e.firstName || e.value,
        lastName: e.lastName,
        phone: e.phone,
        email: e.email,
        id: e._id,
      });
    } else {
      setClient((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };
  //console.log(client);
  const handleSubmit = async (event) => {
    event.preventDefault();
    return event;
  };

  useEffect(() => {
    getAllClients();
  }, []);

  const countries = [
    {
      _id: "64503228a1763a286c3ec9e9",
      firstName: "Switzerland",
      lastName: "antoher last",
      phone: "3864903",
      email: "anoither@fhjak.com",
      agencyName: "VillaTracker",
      agent_id: 1,
      agency_id: 1,
      client_id: 16,
      createdAt: "2023-05-01T21:42:01.922Z",
      updatedAt: "2023-05-01T21:42:01.922Z",
      __v: 0,
    },
    {
      _id: "645030dda1763a286c3ec9dc",
      firstName: "Canada",
      lastName: "antoher last",
      phone: "3864903",
      email: "anoither@fhjak.com",
      agencyName: "VillaTracker",
      agent_id: 1,
      agency_id: 1,
      client_id: 15,
      createdAt: "2023-05-01T21:36:29.760Z",
      updatedAt: "2023-05-01T21:36:29.760Z",
      __v: 0,
    },
    {
      _id: "645030b1a1763a286c3ec9d2",
      firstName: "United State",
      lastName: "antoher last",
      phone: "3864903",
      email: "anoither@fhjak.com",
      agencyName: "VillaTracker",
      agent_id: 1,
      agency_id: 1,
      client_id: 14,
      createdAt: "2023-05-01T21:35:46.362Z",
      updatedAt: "2023-05-01T21:35:46.362Z",
      __v: 0,
    },
  ];
  const nextPic = () => {
    if (picIndex < property.pictures.length - 1) {
      setPicIndex(picIndex + 1);
    }
  };

  const prevPic = () => {
    if (picIndex > 0) {
      setPicIndex(picIndex - 1);
    }
  };
  const handleDotClick = (index) => {
    setPicIndex(index);
  };
  return (
    <>
      <div className="property-page-wrapper">
        <PageHeader bgColor="#133B71" />
        <div className="top-line-small-device">
          <div
            className="link18-bold-no-line"
            style={{ display: "flex", padding: "10px 20px" }}
            onClick={doSearch}
          >
            <img src={goBack} alt="" />
            <p>&nbsp;&nbsp;Back</p>
          </div>
          <div className="" style={{ width: "75%", textAlign: "center" }}>
            <h1>Reservation Summary</h1>
          </div>
        </div>
        <div className="property-page-container">
          <div className="price-details-heading">
            <h1>Price Details</h1>
          </div>
          <div className="container-fluid w-100 px-3">
            <div className="reservation-slider-details w-100">
              {/* <div className="col-lg-5">
                <div className="img w-100 p-2">
                  <img
                    src={property?.pictures[0]?.original}
                    className="w-100"
                  />
                </div>
              </div> */}
              <div className="property-slider col-lg-7">
                {property.pictures.length > 0 && (
                  <>
                    <div className="images-container">
                      <button onClick={prevPic} disabled={picIndex === 0}>
                        <IoIosArrowBack />
                      </button>
                      <img
                        src={property?.pictures[picIndex]?.original}
                        alt="Property"
                      />
                      <button
                        onClick={nextPic}
                        disabled={picIndex === property.pictures.length - 1}
                      >
                        <IoIosArrowForward />
                      </button>
                    </div>
                    <div className="dot-indicators">
                      {property.pictures.map((picture, index) => (
                        <div
                          key={index}
                          className={`dot ${
                            index === picIndex ? "active" : ""
                          }`}
                          onClick={() => handleDotClick(index)}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="col-lg-5">
                <div className="p-3 slider-details">
                  <div className="title">
                    <div className="property-page-body-top-title">
                      {/* {property??.title} */}
                      <LinesEllipsis
                        text={property?.title}
                        maxLine="2"
                        ellipsis="..."
                        trimRight
                      />
                    </div>
                    <div className="property-page-body-top-subtitle">
                      {prop.fullAddress}
                    </div>
                  </div>

                  {/* <div className="description w-100 py-2">
                    <div className="property py-1 d-flex ">
                      <p className="w-25 h4 key">PropertyId:</p>
                      <p className="h4 value">{property?._id}</p>
                    </div>
                    <div className="type py-1 d-flex ">
                      <p className="w-25 h4 key">Type:</p>
                      <p className="h4 value">
                        {property?.propertyType}
                      </p>
                    </div>
                    <div className="stay py-1 d-flex ">
                      <p className="w-25 h4 key">Guests:</p>
                      <p className="h4 value">
                        {getStorageValue("adults")} Adults
                        {getStorageValue("children") > 0
                          ? "," + getStorageValue("children") + "children"
                          : ""}
                      </p>
                    </div>
                    <div className="stay py-1 d-flex ">
                      <p className="w-25 h4 key">Minimum Stay:</p>
                      <p className="h4 value">
                        {property?.terms?.minNights} Nights
                      </p>
                    </div>
                    <div className="stay py-1 d-flex ">
                      <p className="w-25 h4 key">Booked nights:</p>
                      <p className="h4 value" style={{ textAlign: "right" }}>
                        {calculateTotalNights()} Nights, {countWeekendDays()}{" "}
                        weekends, {calculateTotalNights() - countWeekendDays()}{" "}
                        weekdays
                        {calculateTotalNights() > 28
                          ? property?.prices?.monthlyPriceFactor
                            ? ", with " +
                              (1 - property.prices.monthlyPriceFactor) *
                                100 +
                              "% discount!"
                            : ", no month discont"
                          : calculateTotalNights() > 6
                          ? property?.prices?.weeklyPriceFactor
                            ? ", with " +
                              (1 - property.prices.weeklyPriceFactor) *
                                100 +
                              "% discount!"
                            : ", no week discount"
                          : ", without discounts"}
                      </p>
                    </div>
                    <div className="stay py-1 d-flex ">
                      <p className="w-25 h4 key">Included in regular fare:</p>
                      <p className="h4 value">
                        {property?.prices?.guestsIncludedInRegularFee}{" "}
                        Guests
                      </p>
                    </div>
                    <div className="stay py-1 d-flex ">
                      <p className="w-25 h4 key">Weekdays fare:</p>
                      <p className="h4 value">
                        {property?.prices?.basePrice}{" "}
                        {detectCurrency(property?.prices?.currency)}
                      </p>
                    </div>
                    {property?.prices?.weekendBasePrice ? (
                      <div className="stay py-1 d-flex ">
                        <p className="w-25 h4 key">Weekends fare:</p>
                        <p className="h4 value">
                          {property?.prices?.weekendBasePrice}{" "}
                          {detectCurrency(property?.prices?.currency)}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    {property?.prices?.weekendDays ? (
                      <div className="stay py-1 d-flex ">
                        <p className="w-25 h4 key">Weekends days:</p>
                        <p className="h4 value">
                          {property.prices.weekendDays
                            .map((item) => item)
                            .join(",")}
                          {days[property.prices.weekendDays[0]]} ,{" "}
                          {days[property.prices.weekendDays[1]]}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div> */}
                  <hr
                    style={{ color: "#D5D5D5", border: "2px solid #D5D5D5" }}
                  />
                  <div className="description w-75 py-3 checkIn-checkOut">
                    <div className="property py-1  d-flex justify-content-between flex-wrap">
                      <p className="h4 text-head-color fw-bold">Check-In:</p>
                      <p className="h4">{getStorageValue("dateFrom")}</p>
                      <p className="h4">
                        Time: {property?.defaultCheckInTime} (24-hour)
                      </p>
                    </div>
                    <div className="type py-1  d-flex justify-content-between">
                      <p className="h4 text-head-color fw-bold">Check-Out:</p>
                      <p className="h4">{getStorageValue("dateTo")}</p>
                      <p className="h4">
                        Time: {property?.defaultCheckOutTime} (24-hour)
                      </p>
                    </div>
                  </div>
                  <hr
                    style={{ color: "#D5D5D5", border: "2px solid #D5D5D5" }}
                  />
                  <div className="py-4 icons">
                    {renderAmount("Guests:", guests, property?.accommodates)}
                    {renderAmount("Bedrooms:", bed, property?.bedrooms)}
                    {renderAmount("Bedrooms:", bath, property?.bathrooms)}
                    {prop.tags.indexOf("eventCollection") > -1
                      ? renderAmount("Event Places", eventsIcon)
                      : ""}
                    {prop.tags.indexOf("familyCollection") > -1
                      ? renderAmount("For Families", familyIcon)
                      : ""}
                    {prop.tags.indexOf("petsCollection") > -1
                      ? renderAmount("Pets Welcome", petsIcon)
                      : ""}
                    {prop.tags.indexOf("sustainCollection") > -1
                      ? renderAmount("Sustainable", sustainIcon)
                      : ""}{" "}
                  </div>
                  <div className="property-ondemand py-2">
                    <h2 className="px-2">This property is</h2>
                    <h1>"On demand"</h1>
                  </div>
                  <hr
                    style={{ color: "#D5D5D5", border: "2px solid #D5D5D5" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid reservation-additional-fees w-100 p-3">
            <div className="px-4 py-3 mx-auto">
              <h3 className="p-2 text-head-color fw-bolder">Additional Fees</h3>
            </div>
            <div className="px-4 container-fluid w-100">
              <div className="row w-100 pb-3 bg-light p-2">
                <div className="col-lg-4 p-2">
                  <div className="p-4">
                    {getAdditionalFee("cleaningFee")}
                    {getAdditionalFee("securityDeposit")}
                    {getAdditionalFee("taxes")}
                  </div>
                </div>
                <div
                  className="col-lg-4 p-2"
                  style={{
                    borderLeft: !smallScreen ? "thick solid #E7E7E7" : "none",
                  }}
                >
                  <div className="p-4">
                    <div className="h3 py-3 d-flex justify-content-between text-head-color">
                      <div className=" gap-3 agency-title">
                        <BsCheckSquare />
                        <h1>Agency Commission</h1>
                      </div>
                      <div>(-) $9160</div>
                    </div>
                    <div className="text-head-color h5">
                      By clicking on this the client card will be chargers fully
                      and Villa Tracker will compensate your back with the
                      commission
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 p-2"
                  style={{
                    borderLeft: !smallScreen ? "thick solid #E7E7E7" : "none",
                    borderTop: smallScreen ? "thick solid #E7E7E7" : "none",
                  }}
                >
                  <div className="p-4 text-head-color">
                    <div className="h3 ">Total Booking Amount</div>
                    <div className="d-flex justify-content-start">
                      <div style={{ fontSize: "55px" }} className=" fw-bold">
                        {detectCurrency(property?.prices?.currency)}
                        {calculateTotalPrice()}
                      </div>
                      <div className="h5">
                        For{" "}
                        {selectedNights
                          ? selectedNights
                          : calculateTotalNights()}{" "}
                        Nights
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="container-fluid w-100 px-3">
            <div className="px-4 pt-2 ">
              <h3 className="p-2 text-head-color fw-bolder">Additional Fees</h3>
            </div>
            <div className="px-4 container-fluid w-100">
              <hr style={{ color: "#D5D5D5", border: "2px solid #D5D5D5" }} />
              <div className="row w-100 pb-3  bg-light p-2">
                <div className="col-lg-4 p-2">
                  <div className="p-4">
                    {getAdditionalFee("cleaningFee")}
                    {getAdditionalFee("securityDeposit")}
                    {getAdditionalFee("taxes")}
                  </div>
                </div>
                <div
                  className="col-lg-4 p-2"
                  style={{
                    borderLeft: !smallScreen ? "thick solid #E7E7E7" : "none",
                    borderTop: smallScreen ? "thick solid #E7E7E7" : "none",
                  }}
                >
                  <div className="p-4">
                    <div className="h3 d-flex justify-content-between text-head-color">
                      <div>Agency Commission</div>
                      <div>(-) $9160</div>
                    </div>
                    <div className="text-head-color h5">
                      By clicking on this the client card will be chargers fully
                      and Villa Tracker will compensate your back with the
                      commission
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-4 p-2"
                  style={{
                    borderLeft: !smallScreen ? "thick solid #E7E7E7" : "none",
                    borderTop: smallScreen ? "thick solid #E7E7E7" : "none",
                  }}
                >
                  <div className="p-4 text-head-color">
                    <div className="h3 ">Total Booking Amount</div>
                    <div className="d-flex justify-content-start">
                      <div style={{ fontSize: "55px" }} className=" fw-bold">
                        {detectCurrency(property?.prices?.currency)}
                        {calculateTotalPrice()}
                      </div>
                      <div className="h5">
                        For {calculateTotalNights()} Nights
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="container-fluid w-100 px-3">
            <div className="price-details-heading">
              <h1> House rules and a cancellation policy</h1>
            </div>
            <div className="container-fluid w-100">
              <div className="row w-100 px-4 text-center py-3">
                {/* <hr style={{ color: "#D5D5D5", border: "2px solid #D5D5D5" }} /> */}
                <div className="px-2 pb-2 text-center house-details">
                  <p className="w-75 h3 fw-medium mx-auto py-3">
                    Enjoy a 48-Hours Risk Free Guarantee for bookings placed
                    more than 60 days prior to check-in. Beyond that, we'll make
                    every effort to work with property management to find
                    options if your plans change but refunds cannot be
                    guaranteed and and on a best-offort basis.
                    {/* {property?.publicDescription?.space} */}
                  </p>

                  <p className="w-75 h5 py-1">
                    {property?.publicDescription?.houseRules}
                  </p>
                  <p className="w-75 h5 py-1">
                    {property?.terms?.cancellation}
                  </p>
                  <a href="javascript:none" className="h5 py-3">
                    Click here to view complete property terms & conditions
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid w-100 px-3 text-center">
            <div className="mx-3 px-3">
              <div className="pt-2 bg-light">
                <h2 className="p-2 text-center text-head-color fw-bold">
                  Book your Guest Trip!
                </h2>
                {/* <hr style={{ color: "#D5D5D5", border: "2px solid #D5D5D5" }} /> */}
              </div>
            </div>
            <div className="container-fluid w-100 p-4 ">
              <div className="row py-3 px-4 mx-auto">
                {/* <form className="row g-3 " > */}
                <div className="col-md-6 py-3 px-4">
                  <label className="form-label">Guest First Name*</label>
                  <NameSelect
                    clients={clients}
                    client={client}
                    // className="form-select pt-3 pb-4"
                    setClient={setClient}
                    setClients={setClients}
                    onClientChange={handleClientChange}
                  />
                </div>
                <div className="col-md-6 py-3 px-4">
                  <label className="form-label">Guest Last Name*</label>
                  <input
                    type="text"
                    className="form-control p-3 border"
                    defaultValue="Rockman"
                    value={client?.lastName}
                    name="lastName"
                    onChange={(e) => handleClientChange(e, "lastName")}
                  />
                </div>
                <div className="col-md-4 py-3 px-4">
                  <label className="form-label">E-Mail*</label>
                  <div className="input-group ">
                    <input
                      type="email"
                      className="form-control p-3 border"
                      defaultValue={"Ttavel@smilinghouse.ch"}
                      placeholder="Ttavel@smilinghouse.ch"
                      value={client?.email}
                      name="email"
                      onChange={(e) => handleClientChange(e, "email")}
                    />
                  </div>
                </div>
                <div className="col-md-4 py-3 px-4">
                  <label className="form-label">Phone*</label>
                  <input
                    type="phone"
                    className="form-control p-3 border"
                    defaultValue={"+41-79-489-7021"}
                    value={client?.phone}
                    name="phone"
                    onChange={(e) => handleClientChange(e, "phone")}
                  />
                </div>
                <div className="col-md-4 py-3 px-4">
                  <label className="form-label">Country*</label>
                  <NameSelect
                    clients={clients}
                    client={countries}
                    setClient={setClient}
                    setClients={setClients}
                    onClientChange={handleClientChange}
                    padding={"0.5rem !important"}
                  />
                  {/* <select
                    className="form-select pt-3 pb-4 border"
                    name={"state"}
                    value={client?.state}
                  >
                    <option>Switzerland</option>
                  </select> */}
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
          <div className="container-fluid w-100 px-3">
            <div className="mx-3 px-3">
              <div className="pt-2 bg-light">
                <div className="p-2">
                  <h2 className="ps-2 text-head-color text-center fw-bold">
                    Payment Information
                  </h2>
                </div>
              </div>
              {/* <hr style={{ color: "#D5D5D5", border: "2px solid #D5D5D5" }} /> */}
            </div>
            <div className="container-fluid w-100 p-4 ">
              <div className="w-75 pb-3 px-4 ps-3 mx-auto">
                <h3 className="text-head-color fw-bold pb-3">
                  Payment Schedule
                </h3>
                <div className="h4 py-1 w-50 d-flex">
                  <div className="pe-3">Amount Due Today:</div>
                  <div className="text-head-color fw-bold">
                    {detectCurrency(property?.prices?.currency)}
                    {calculateTotalPrice()}
                  </div>
                </div>
                <div className="h4 py-1 w-50 d-flex">
                  <div className="pe-3">Total Booking Amount:</div>
                  <div className="text-head-color fw-bold">
                    {detectCurrency(property?.prices?.currency)}
                    {calculateTotalPrice()}
                  </div>
                </div>
                <div className="h4 py-1 w-50 d-flex">
                  <div>Additional Fees due at check-in:</div>
                  <div></div>
                </div>
                <div className="py-2 w-75 h4">
                  *Any extra cost will be charged by the host at the property's
                  currency. If people book more than 2 months ahead, we only
                  charge or hold 50% of the booking amount… and rest due 2
                  months before check-in.
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid w-100 px-3">
            <div className="mx-3 px-3">
              <div className="pt-2 bg-light">
                <h2 className="p-2 text-head-color fw-bold text-center">
                  Book this Property Now
                </h2>
              </div>
              {/* <hr style={{ color: "#D5D5D5", border: "2px solid #D5D5D5" }} /> */}
            </div>
            <div className="px-4 container-fluid w-100 pt-4">
              <div className="row ps-4 h3 text-head-color fw-bold">
                Please select the payment method
              </div>
              <div className="row w-100 pb-3">
                <div
                  className="col-lg-6 p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setPaymentMethod("wire")}
                >
                  <div className="p-4">
                    <div className="d-flex align-items-start">
                      <div>
                        <label>
                          <input
                            type="radio"
                            checked={paymentMethod === "wire"}
                          />
                        </label>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="h3 d-flex justify-content-between  text-head-color fw-bold">
                          <div> Wire Transfer</div>
                        </div>
                        <div className="text-head-color h5">
                          Your request will be sent to the Villa Tracker team to
                          review a contract will be sent to you with payment
                          terms and details
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-6 p-2"
                  style={{
                    borderLeft: !smallScreen ? "thick solid #E7E7E7" : "none",
                    borderTop: smallScreen ? "thick solid #E7E7E7" : "none",
                  }}
                >
                  <div
                    className="p-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => setPaymentMethod("hold")}
                  >
                    <div className="d-flex align-items-start">
                      <div>
                        {" "}
                        <label>
                          <input
                            type="radio"
                            checked={paymentMethod === "hold"}
                          />
                        </label>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="h3 d-flex justify-content-between text-head-color fw-bold">
                          <div> 48 Hours Hold</div>
                        </div>
                        <div className="text-head-color h5 ">
                          By holding this property for 48 hours, your Credit
                          Card will not be charged, only authorized.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {paymentMethod === "hold" && (
            <div className="container-fluid w-100 px-3">
              <div className="container-fluid w-100">
                {/* <hr style={{ color: "#D5D5D5", border: "2px solid #D5D5D5" }} /> */}
                <div className="d-flex flex-column align-items-center mx-auto w-75 py-3 px-4">
                  <div className="h5">Credit Cards Accepted:</div>
                  <div>
                    <img src={creditCardsIcon} alt="credit cards" />
                  </div>
                </div>

                <div className="row w-100 pb-3 px-4 mx-auto">
                  {/* <Elements stripe={stripePromise}>
                    <CheckoutForm
                      amount={calculateTotalPrice()}
                      minStay={
                        selectedNights ? selectedNights : calculateTotalNights()
                      }
                      currency={property?.prices?.currency}
                      onSubmit={handleSubmit}
                      client={client}
                      property={property}
                      getAllClients={getAllClients}
                    />
                  </Elements> */}
                </div>
              </div>
            </div>
          )}
          <div className="container-fluid w-100 px-3">
            <hr style={{ color: "#D5D5D5", border: "2px solid #D5D5D5" }} />
            <TermsFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyReservationPage;
