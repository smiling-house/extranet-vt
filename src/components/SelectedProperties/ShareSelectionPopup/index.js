import React, { useEffect, useState } from "react";
import link from "../../../assets/icons/link.png";
import editIcon from "../../../assets/icons/editIcon.png";
import Popup from "../../Popup/index";
import Button from "../../Buttons/Button/Button";
import InputField from "../../InputField/index";
import TextAreaField from "../../TextAreaField/index";

import "./ShareSelectionPopup.scss";
import { useSelector } from "react-redux";
import { userRequest } from "../../../api/requestMethods";
import axios from "axios";
import { baseURL } from "../../../core";
import {
  calculateTotalNights,
  countWeekendDays,
  detectCurrency,
  getStorageValue,
  isPercentage,
  isPercentageOrAmount,
} from "../../../Util/general";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";

const ShareSelectionPopup = (props) => {
  const [chkIncludePrice, setChkIncludePrice] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { title, icon, onClose } = props;
  const selectedProperties = useSelector(
    (state) => state.property.selectedProperties
  );
  useEffect(() => {
    const load = async () => {};
    load();
  }, []);

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

  const getAdditionalFee = (key, value, calculateTax, totalPrice, property) => {
    let taxes =
      // property?.taxes?.length > 0 ? property?.taxes?.length : dummyTaxes; // for calculation of taxes i add dummy taxes data
      property?.taxes?.length > 0 && property?.taxes?.length; // for calculation of taxes i add dummy taxes data
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
            taxAmount = obj?.amount * calculateTotalNights();
            break;
          case "PER_GUEST_PER_NIGHT":
            taxAmount =
              obj.amount * property?.accommodates * calculateTotalNights();
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
  const formatTaxName = (tax) => {
    let name =
      tax?.type === "OTHER"
        ? `${tax?.name} tax`
        : tax.type?.split("_").join(" ");
    return name?.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const calculateTotalPrice = (property) => {
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

    let totalPrice =
      weekDays * property?.prices?.basePrice +
      weekEndDays * (property?.prices?.weekendBasePrice || 0) +
      extraGuestsTotalFee +
      (property?.prices?.cleaningFee || 0);
    if (totalNightsMoreThanAMonth) {
      totalPrice = totalPrice * property?.prices?.monthlyPriceFactor;
    } else if (totalNightsMoreThanAWeek) {
      // count;
      totalPrice = totalPrice * property?.prices?.weeklyPriceFactor;
    }

    // calculate taxes
    let taxes =
      // property?.taxes?.length > 0 ? property?.taxes?.length : dummyTaxes;
      property?.taxes?.length > 0 && property?.taxes?.length;
    if (taxes) {
      const totalTaxPrice = getAdditionalFee(
        undefined,
        undefined,
        true,
        totalPrice,
        property
      );
      totalPrice += totalTaxPrice;
    }

    return totalPrice ? totalPrice.toFixed(2) : 0;
  };

  console.log("selected properties", selectedProperties);
  const handleSend = async () => {
    setLoading(true);
    try {
      if (!email || !subject) {
        toast.error("Please select email and subject", {
          position: "top-right",
          toastClassName: "custom-toast",
        });
        setLoading(false);
        return;
      }
      if (selectedProperties?.length > 0) {
        await selectedProperties?.map(async (property) => {
          const payload = {
            title: property?.title,
            guests: property?.accommodates,
            bedrooms: property?.bedrooms,
            bathrooms: property?.bathrooms,
            overview: property?.publicDescription?.summary,
            amenities: property?.amenities,
            thumbnail: property?.picture?.thumbnail,
            propertyPictures: property?.pictures?.map((pic) => {
              return {
                thumbnail: `https://${pic?.thumbnail?.split("//")[1]}`,
                original: `https://${pic?.original?.split("//")[1]}`,
              };
            }),
            address: property?.address,
            logo: JSON.parse(localStorage.getItem("agent")).userImage,
            travelAgency: JSON.parse(localStorage.getItem("travelAgency")),
            clientEmail: email,
            clientSubject: subject,
            includePricing: chkIncludePrice,
            totalPrice: calculateTotalPrice(property),
            totalNights: calculateTotalNights(),
            propertyType: property?.propertyType,
            minNights: property?.terms?.minNights,
            checkIn: `${getStorageValue("dateFrom")}. Time: ${
              property?.defaultCheckInTime
            } (24-hour)`,
            checkOut: `${getStorageValue("dateTo")}. Time: ${
              property?.defaultCheckOutTime
            } (24-hour)`,
            currency: detectCurrency(property?.prices?.currency),
          };

          const pdf = await axios.post(`${baseURL}/pdf/generate`, payload, {
            responseType: "blob",
          });

          toast.success("Email sent successfully!", {
            position: "top-right",
            toastClassName: "custom-toast",
          });
          const blob = new Blob([pdf.data], { type: "application/pdf" });

          // Create a download link for the file
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${payload?.title}`;
          document.body.appendChild(link);
          link.click();

          // Clean up the object URL after the download is complete
          URL.revokeObjectURL(url);
          setLoading(false);
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <Loader
          loading={loading}
          title={"Pdf generation in progress, emails will be send shortly!"}
        />
      )}
      <Popup onClose={onClose} width={950}>
        <div className="share-selection-container">
          <div className="share-selection-header">
            <img
              src={icon}
              alt=""
              style={{ width: "26px", marginRight: "15px" }}
            />
            <div>{title}</div>
          </div>

          <div className="share-selection-main">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputField
                label="Add Client Email:*"
                value={email}
                onChange={setEmail}
                placeholder={"Enter your Email"}
                style={{ width: "450px", marginTop: "20px" }}
              />
              <div className="share-selection-add-message-link">
                Add Personal Message Format for your client
                <img src={editIcon} alt="" style={{ paddingLeft: "10px" }} />
              </div>
            </div>

            <InputField
              label="Email Subject:"
              value={subject}
              onChange={setSubject}
              placeholder="Your Vacation Rental Brochure"
              style={{ marginTop: "20px" }}
            />

            <TextAreaField
              label="Email Message:"
              value={message}
              onChange={setMessage}
              style={{ height: "150px", marginTop: "20px" }}
            >
              Please find attached the brochure for the property recommended for
              you by "Agent name"..
              https://smilinghousetouroperator.mybookingpal.com/search/?location=Cyprus,%20Greece&checkin=
              2022-12-28&period=7&adults=2&pos=d23bfbe0c18752c0&product_id=1235250549&currency=
              USD&brochure=true#/produc
            </TextAreaField>
          </div>

          <div className="share-selection-footer">
            <div style={{ display: "flex" }}>
              <input
                type="checkbox"
                checked={chkIncludePrice}
                onChange={() => setChkIncludePrice(!chkIncludePrice)}
                style={{ marginRight: "10px" }}
              />
              <div
                className="link18-no-line"
                onClick={() => setChkIncludePrice(!chkIncludePrice)}
              >
                Do not include pricing in brochure
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <Button
                style={{ fontSize: "18px", marginRight: "30px" }}
                variant="link"
                text="Cancel"
                onClick={onClose}
              />
              <Button
                style={{ fontSize: "18px" }}
                text="Send"
                disabled={loading}
                onClick={handleSend}
              />
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default ShareSelectionPopup;
