import React, { useEffect, useState } from "react";

//const ScriptLoaded = require("../../docs/ScriptLoaded").default;

import picLeft from "../../assets/property/pic-left-dark.png";
import screenshot from "../../assets/screen_shot_2020_07__jk7r5.png";
import screenshot2x from "../../assets/screen_shot_2020_07__jk7r5@2x.png";
import g73Image from "../../assets/g73.png";
import g817 from "../../assets/g817.png";

import Image7 from "../../assets/Image_7.png";
import PageHeader from "../../components/PageHeader";

import "./PropertyReserve.scss";

const google = window.google;

const PropertyReservationPage = (props) => {
  //   const [picIndex, setPicIndex] = useState(0);
  //   const dispatch = useDispatch();
  //   const { type, onBack } = props;
  //   const history = useHistory();
  //   const location = useLocation();
  //   const property = location.state && location.state.property;
  //   const ref = React.createRef();
  //   let prop = props;
  //   const AnyReactComponent = ({ text }) => <div>{text}</div>;

  //   useEffect(() => {
  //     const load = async () => {};
  //     load();
  //   }, []);

  //   const setNextPic = () => {
  //     setPicIndex(picIndex + 1);
  //   };

  //   const setPrevPic = () => {
  //     let p = picIndex - 1;
  //     if (p < 0) {
  //       p += property.pictures.length;
  //     }
  //     setPicIndex(p);
  //   };

  //   const doSearch = (params) => {
  //     //console.log("go back from reserve!");
  //     //history.push(PATH_SEARCH)
  //   };

  //   if (property == null) {
  //     //history.push(PATH_SEARCH)
  //   }

  //   if (property) {
  //     //console.log("propertyData:", property);
  //     let searchPropertiesArray = [];
  //     let prop = UseCreateObject(property);
  //     //console.log("prop >>>: ", prop);
  //   }
  //   let pic = null;
  //   let picPosition = 0;

  //   if (!isNullOrEmptyArray(property.pictures) && picIndex != null) {
  //     // //console.log(property.pictures.length, picIndex);
  //     pic = property.pictures[picIndex % property.pictures.length].original;
  //     picPosition = picIndex % property.pictures.length;
  //   }

  //   const bullet = (index) => {
  //     return (
  //       <span
  //         key={index}
  //         style={{
  //           fontSize: "26px",
  //           color: index === picPosition ? "#44C8F5" : "#D1D1D1",
  //           padding: "0 3px",
  //         }}
  //       >
  //         &bull;
  //       </span>
  //     );
  //   };

  //   const renderAmenities = (text, i) => {
  //     return (
  //       <div key={i} className="property-page-body-top-left-info-amenity">
  //         {text}
  //       </div>
  //     );
  //   };

  //   const renderAmount = (title, pic, amount) => {
  //     return (
  //       <div className="property-page-body-top-left-info-amount">
  //         <img src={pic} alt="" style={{ width: "40px" }} />
  //         <span>{title}</span>
  //         {amount ? (
  //           <span style={{ fontSize: "20px" }}>{amount}</span>
  //         ) : (
  //           <span style={{ fontSize: "20px" }}>&nbsp;</span>
  //         )}
  //       </div>
  //     );
  //   };

  //   const amenities = property.amenities;
  //   const summary = property.publicDescription.summary;
  //   prop = UseCreateObject(property);
  //   const mapContainerStyle = {
  //     height: "400px",
  //     width: "800px",
  //   };

  //   const center = {
  //     lat: prop.lat,
  //     lng: prop.lng,
  //   };

  //   const position = {
  //     lat: prop.lat,
  //     lng: prop.lng,
  //   };

  //   const onLoad = (marker) => {
  //     //console.log("position: ", position);
  //     //console.log("marker: ", marker);
  //   };

  return (
    <>
      <div className="property-page-wrapper">
        <PageHeader bgColor="#133B71" searchOpen={null}/>
        {/* <div className="link18-bold-no-line" style={{ display: "flex" }}>
          <img src={goBack} alt="" />
          &nbsp;&nbsp;Back
        </div> */}
        <div
          id="n_5__Web_1920X1080_Guest__Payment_48_Hours_Hold__1"
          className="n_5__Web_1920X1080_Guest__Payment_48_Hours_Hold__1_Class"
        >
          <svg data-type="Rectangle" data-name="bg inn" className="bg_inn">
            <rect
              className="bg_inn_Class"
              rx="0"
              ry="0"
              x="0"
              y="0"
              width="1920"
              height="3366"
            ></rect>
          </svg>
          <div
            data-type="ScrollableGroup"
            data-name="Scroll Group 2"
            className="Scroll_Group_2_Class"
          >
            <img
              data-type="Rectangle"
              data-name="screen_shot_2020_07__jk7r5"
              className="screen_shot_2020_07__jk7r5_Class"
              src={screenshot}
              srcSet={`${screenshot} 1x, ${screenshot2x} 2x`}
              alt="screen shot"
            />
          </div>
          <svg
            data-type="Path"
            data-name="Bg header"
            className="Bg_header"
            viewBox="0 0 1656.667 254.299"
          >
            <path
              className="Bg_header_Class"
              d="M 0 0 L 1656.666870117188 0 L 1656.666870117188 254.2987976074219 L 0 254.2987976074219 L 0 0 Z"
            ></path>
          </svg>
          <div
            data-type="Group"
            data-name="Group 1405"
            className="Group_1405_Class"
          >
            <div
              data-type="Symbol"
              data-name="Down_Arrow_3_"
              className="Down_Arrow_3_ Down_Arrow_3__Class"
            >
              <svg
                data-type="Path"
                data-name="Down_Arrow_3_"
                className="Down_Arrow_3__q"
                viewBox="0 0 13.733 7.673"
              >
                <path
                  className="Down_Arrow_3__q_Class"
                  d="M 6.86672830581665 0 C 6.70707893371582 0 6.5472731590271 0.0625036433339119 6.425387382507324 0.1873476952314377 L 0.1829425096511841 6.581439971923828 C -0.06098083406686783 6.831289768218994 -0.06098083406686783 7.235874652862549 0.1829425096511841 7.485568523406982 C 0.4268664121627808 7.735252380371094 0.8218560814857483 7.735416412353516 1.065625071525574 7.485568523406982 L 6.86672830581665 1.54353392124176 L 12.66783332824707 7.485568523406982 C 12.91175937652588 7.735416412353516 13.30674743652344 7.735416412353516 13.55051422119141 7.485568523406982 C 13.79428005218506 7.235716342926025 13.79443740844727 6.831132411956787 13.55051422119141 6.581439971923828 L 7.308068752288818 0.1873476952314377 C 7.186185359954834 0.0625036433339119 7.026378631591797 0 6.86672830581665 0 Z"
                ></path>
              </svg>
            </div>
            <div data-type="Text" data-name="Back" className="Back_Class">
              <span>Back</span>
            </div>
          </div>
          <svg
            data-type="Rectangle"
            data-name="Rectangle 602"
            className="Rectangle_602"
          >
            <rect
              className="Rectangle_602_Class"
              rx="0"
              ry="0"
              x="0"
              y="0"
              width="1598"
              height="73"
            ></rect>
          </svg>
          <svg
            data-type="Rectangle"
            data-name="Rectangle 605"
            className="Rectangle_605"
          >
            <rect
              className="Rectangle_605_Class"
              rx="0"
              ry="0"
              x="0"
              y="0"
              width="1598"
              height="73"
            ></rect>
          </svg>
          <div
            data-type="Text"
            data-name="Reservation Summary "
            className="Reservation_Summary__Class"
          >
            <span>Reservation Summary </span>
          </div>
          <div
            data-type="Text"
            data-name="Price Details"
            className="Price_Details_Class"
          >
            <span>Price Details</span>
          </div>
          <div
            data-type="Text"
            data-name="Book your Guest Trip!"
            className="Book_your_Guest_Trip_ek_Class"
          >
            <span>Book your Guest Trip!</span>
          </div>
          <div
            data-type="Group"
            data-name="Group 1344"
            className="Group_1344_Class"
          >
            <img
              data-type="Rectangle"
              data-name="Image 7"
              className="Image_7_Class"
              src={Image7}
              srcSet={`${Image7} 1x, ${Image7.replace(".png", "@2x.png")} 2x`}
              alt="Image 7"
            />
          </div>
          <div data-type="Text" data-name="Check-In" className="Check-In_Class">
            <span>Check-In</span>
          </div>
          <div
            data-type="Text"
            data-name="Check-Out"
            className="Check-Out_Class"
          >
            <span>Check-Out</span>
          </div>
          <div
            data-type="Symbol"
            data-name="Component Arrive"
            className="Component_Arrive Component_Arrive_Class"
          >
            <div
              data-type="Text"
              data-name="26.1.2023"
              className="n_612023_Class"
            >
              <span>26.1.2023</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="Component Arrive"
            className="Component_Arrive Component_Arrive__Class"
          >
            <div
              data-type="Text"
              data-name="Time: 15:00 PM (24-hour)"
              className="Time_1500_PM_24-hour_Class"
            >
              <span>Time:</span>
              <span style={{ fontStyle: "normal", fontWeight: "normal" }}>
                {" "}
                15:00 PM{" "}
              </span>
              <span
                style={{
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "23px",
                }}
              >
                (24-hour)
              </span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="Component Depart"
            className="Component_Depart Component_Depart_Class"
          >
            <div
              data-type="Text"
              data-name="6.2.2023"
              className="n_22023_Class"
            >
              <span>6.2.2023</span>
            </div>
          </div>
          <div
            data-type="Text"
            data-name="Time: 10:00 AM (24-hour)"
            className="Time_1000_AM_24-hour_Class"
          >
            <span>Time: </span>
            <span style={{ fontStyle: "normal", fontWeight: "normal" }}>
              10:00 AM{" "}
            </span>
            <span
              style={{
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "23px",
              }}
            >
              (24-hour)
            </span>
          </div>
          <div data-type="Text" data-name="Villa" className="Villa_Class">
            <span>Villa</span>
          </div>
          <div data-type="Text" data-name="Type" className="Type_Class">
            <span>Type</span>
          </div>
          <div
            data-type="Text"
            data-name="Minimum Stay"
            className="Minimum_Stay_Class"
          >
            <span>Minimum Stay</span>
          </div>
          <div
            data-type="Text"
            data-name="Property ID"
            className="Property_ID_Class"
          >
            <span>Property ID</span>
          </div>
          <div
            data-type="Text"
            data-name="1235185461"
            className="n_235185461_Class"
          >
            <span>1235185461</span>
          </div>
          <div
            data-type="Text"
            data-name="3 night(s)"
            className="n__nights_Class"
          >
            <span>3 night(s)</span>
          </div>
          <div
            data-type="Text"
            data-name=" Renovated 19th Century Crown Jewel Villa"
            className="n_Renovated_19th_Century_Crown_Class"
          >
            <span> Renovated 19th Century Crown Jewel Villa</span>
          </div>
          <svg
            data-type="Path"
            data-name="Path 3423"
            className="Path_3423"
            viewBox="0 327.601 1598 1"
          >
            <path
              className="Path_3423_Class"
              d="M 0 327.6005859375 L 1598 327.6005859375"
            ></path>
          </svg>
          <svg
            data-type="Path"
            data-name="Path 3450"
            className="Path_3450"
            viewBox="0 327.601 1598 1"
          >
            <path
              className="Path_3450_Class"
              d="M 0 327.6005859375 L 1598 327.6005859375"
            ></path>
          </svg>
          <svg
            data-type="Path"
            data-name="Path 3447"
            className="Path_3447"
            viewBox="0 327.601 1038.222 1"
          >
            <path
              className="Path_3447_Class"
              d="M 0 327.6005859375 L 1038.22216796875 327.6005859375"
            ></path>
          </svg>
          <svg
            data-type="Path"
            data-name="Path 3448"
            className="Path_3448"
            viewBox="0 327.601 1038.222 1"
          >
            <path
              className="Path_3448_Class"
              d="M 0 327.6005859375 L 1038.22216796875 327.6005859375"
            ></path>
          </svg>
          <div
            data-type="Group"
            data-name="Group 1487"
            className="Group_1487_Class"
          >
            <div
              data-type="Text"
              data-name="Guest: 16"
              className="Guest_16_Class"
            >
              <span>Guest: </span>
              <span>16</span>
            </div>
            <div
              data-type="Text"
              data-name="Bedrooms: 8"
              className="Bedrooms_8_Class"
            >
              <span>Bedrooms: </span>
              <span>8</span>
            </div>
            <div
              data-type="Text"
              data-name="Bedrooms: 10"
              className="Bedrooms_10_Class"
            >
              <span>Bedrooms: </span>
              <span>10</span>
            </div>
            <div data-type="Group" data-name="g69" className="g69_Class">
              <div data-type="Group" data-name="g71" className="g71_Class">
                <img
                  data-type="Group"
                  data-name="g73"
                  className="g73_Class"
                  src={g73Image}
                  srcSet={`${g73Image} 1x, ${g73Image.replace(
                    ".png",
                    "@2x.png"
                  )} 2x`}
                  alt="g73"
                />
              </div>
            </div>
            <div
              data-type="Group"
              data-name="Layer_3"
              className="Layer_3_Class"
            >
              <div
                data-type="Group"
                data-name="Group 282"
                className="Group_282_Class"
              >
                <div
                  data-type="Group"
                  data-name="ARC_423_"
                  className="ARC_423__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 264"
                    className="Group_264_Class"
                  >
                 
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="ARC_422_"
                  className="ARC_422__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 265"
                    className="Group_265_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2920"
                      className="Path_2920"
                      viewBox="38.354 28.412 8.234 5.459"
                    >
                      <path
                        className="Path_2920_Class"
                        d="M 39.44207000732422 33.87109375 C 39.23749542236328 33.87109375 39.03185653686523 33.81341934204102 38.84904861450195 33.69482040405273 C 38.34525299072266 33.3661994934082 38.20270156860352 32.69264984130859 38.53131103515625 32.18885803222656 C 40.07318496704102 29.82437705993652 42.67815017700195 28.4119987487793 45.50071716308594 28.4119987487793 C 46.10245132446289 28.4119987487793 46.58884429931641 28.89839363098145 46.58884429931641 29.50011825561523 C 46.58884429931641 30.10183906555176 46.10245132446289 30.58823585510254 45.50071716308594 30.58823585510254 C 43.41588973999023 30.58823585510254 41.49208831787109 31.63065910339355 40.35499572753906 33.3770866394043 C 40.14717483520508 33.69698333740234 39.79897308349609 33.87109375 39.44207000732422 33.87109375 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="CIRCLE_38_"
                  className="CIRCLE_38__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 266"
                    className="Group_266_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2921"
                      className="Path_2921"
                      viewBox="40.6 17.336 14.229 14.228"
                    >
                      <path
                        className="Path_2921_Class"
                        d="M 47.71519470214844 31.56423950195312 C 43.85781860351562 31.56423950195312 40.59998321533203 28.30641937255859 40.59998321533203 24.45011901855469 C 40.59998321533203 20.59382820129395 43.85781860351562 17.33599662780762 47.71519470214844 17.33599662780762 C 51.57148361206055 17.33599662780762 54.82931518554688 20.59382820129395 54.82931518554688 24.45011901855469 C 54.82931518554688 28.30641937255859 51.57148361206055 31.56423950195312 47.71519470214844 31.56423950195312 Z M 47.71519470214844 19.51223373413086 C 45.0384407043457 19.51223373413086 42.77622604370117 21.77334785461426 42.77622604370117 24.45011901855469 C 42.77622604370117 27.12688827514648 45.03842163085938 29.38800430297852 47.71519470214844 29.38800430297852 C 50.39196395874023 29.38800430297852 52.65308380126953 27.12688827514648 52.65308380126953 24.45011901855469 C 52.65308380126953 21.77334785461426 50.39196395874023 19.51223373413086 47.71519470214844 19.51223373413086 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="ARC_421_"
                  className="ARC_421__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 267"
                    className="Group_267_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2922"
                      className="Path_2922"
                      viewBox="48.354 28.413 9.408 9.408"
                    >
                      <path
                        className="Path_2922_Class"
                        d="M 56.67374420166016 37.82086944580078 C 56.072021484375 37.82086944580078 55.58564758300781 37.33447265625 55.58564758300781 36.73274993896484 C 55.58564758300781 33.34543609619141 52.82942199707031 30.5892276763916 49.44210815429688 30.5892276763916 C 48.84038543701172 30.5892276763916 48.35398864746094 30.10283088684082 48.35398864746094 29.50110816955566 C 48.35398864746094 28.89937210083008 48.84038543701172 28.41299057006836 49.44210815429688 28.41299057006836 C 54.02961730957031 28.41299057006836 57.76187896728516 32.14632797241211 57.76187896728516 36.73274993896484 C 57.76187896728516 37.33338165283203 57.27548980712891 37.82086944580078 56.67374420166016 37.82086944580078 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="LINE_818_"
                  className="LINE_818__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 268"
                    className="Group_268_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2923"
                      className="Path_2923"
                      viewBox="43.923 28.412 6.998 2.176"
                    >
                      <path
                        className="Path_2923_Class"
                        d="M 49.83256530761719 30.58823585510254 L 45.01110076904297 30.58823585510254 C 44.40937042236328 30.58823585510254 43.92298126220703 30.10183906555176 43.92298126220703 29.50011825561523 C 43.92298126220703 28.89839363098145 44.40937042236328 28.4119987487793 45.01110076904297 28.4119987487793 L 49.83256530761719 28.4119987487793 C 50.43428421020508 28.4119987487793 50.92066955566406 28.89839363098145 50.92066955566406 29.50011825561523 C 50.92066955566406 30.10183906555176 50.43319702148438 30.58823585510254 49.83256530761719 30.58823585510254 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="LINE_817_"
                  className="LINE_817__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 269"
                    className="Group_269_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2924"
                      className="Path_2924"
                      viewBox="55 35.059 2.176 5.792"
                    >
                      <path
                        className="Path_2924_Class"
                        d="M 56.08809661865234 40.85105895996094 C 55.48637390136719 40.85105895996094 54.99999237060547 40.36466979980469 54.99999237060547 39.76294708251953 L 54.99999237060547 36.14712142944336 C 54.99999237060547 35.54537582397461 55.48637390136719 35.05899047851562 56.08809661865234 35.05899047851562 C 56.68984222412109 35.05899047851562 57.17622375488281 35.54537582397461 57.17622375488281 36.14712142944336 L 57.17622375488281 39.76294326782227 C 57.17622375488281 40.36466979980469 56.68984222412109 40.85105514526367 56.08809661865234 40.85105514526367 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="ARC_420_"
                  className="ARC_420__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 270"
                    className="Group_270_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2925"
                      className="Path_2925"
                      viewBox="19.185 30.259 11.818 11.818"
                    >
                      <path
                        className="Path_2925_Class"
                        d="M 20.27310943603516 42.07706451416016 C 19.67137908935547 42.07706451416016 19.18499755859375 41.59068298339844 19.18499755859375 40.98893356323242 C 19.18499755859375 35.07175827026367 23.99883079528809 30.25899696350098 29.9149284362793 30.25899696350098 C 30.51666259765625 30.25899696350098 31.00304985046387 30.74539184570312 31.00304985046387 31.34711456298828 C 31.00304985046387 31.9488525390625 30.51666259765625 32.43524169921875 29.9149284362793 32.43524169921875 C 25.19793128967285 32.43524169921875 21.36123275756836 36.27194595336914 21.36123275756836 40.98893356323242 C 21.36123275756836 41.59068298339844 20.87375068664551 42.07706451416016 20.27310943603516 42.07706451416016 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="LINE_816_"
                  className="LINE_816__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 271"
                    className="Group_271_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2926"
                      className="Path_2926"
                      viewBox="28.046 30.259 8.605 2.176"
                    >
                      <path
                        className="Path_2926_Class"
                        d="M 35.56271362304688 32.43524169921875 L 29.13410568237305 32.43524169921875 C 28.53238105773926 32.43524169921875 28.04598999023438 31.9488525390625 28.04598999023438 31.34711456298828 C 28.04598999023438 30.74539184570312 28.53238105773926 30.25899696350098 29.13410568237305 30.25899696350098 L 35.56271362304688 30.25899696350098 C 36.1644401550293 30.25899696350098 36.65082931518555 30.74539184570312 36.65082931518555 31.34711456298828 C 36.65082931518555 31.9488525390625 36.1644401550293 32.43524169921875 35.56271362304688 32.43524169921875 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="LINE_815_"
                  className="LINE_815__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 273"
                    className="Group_273_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2928"
                      className="Path_2928"
                      viewBox="19.185 39.12 2.176 6.998"
                    >
                      <path
                        className="Path_2928_Class"
                        d="M 20.27310943603516 46.11769104003906 C 19.67137908935547 46.11769104003906 19.18499755859375 45.63129806518555 19.18499755859375 45.02956390380859 L 19.18499755859375 40.20811462402344 C 19.18499755859375 39.60639953613281 19.67137908935547 39.12000274658203 20.27310943603516 39.12000274658203 C 20.87483978271484 39.12000274658203 21.36123275756836 39.60639953613281 21.36123275756836 40.20811462402344 L 21.36123275756836 45.02956390380859 C 21.36123275756836 45.63129806518555 20.87375068664551 46.11769104003906 20.27310943603516 46.11769104003906 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="CIRCLE_37_"
                  className="CIRCLE_37__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 274"
                    className="Group_274_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2929"
                      className="Path_2929"
                      viewBox="23.615 15.489 18.248 18.248"
                    >
                      <path
                        className="Path_2929_Class"
                        d="M 32.73886489868164 33.73675918579102 C 27.79336738586426 33.73675918579102 23.61499404907227 29.55837059020996 23.61499404907227 24.61287307739258 C 23.61499404907227 19.66737747192383 27.79336738586426 15.4889965057373 32.73886489868164 15.4889965057373 C 37.68437576293945 15.4889965057373 41.86274337768555 19.66737747192383 41.86274337768555 24.61287307739258 C 41.86274337768555 29.55837059020996 37.68437576293945 33.73675918579102 32.73886489868164 33.73675918579102 Z M 32.73886489868164 17.66523170471191 C 28.9728889465332 17.66523170471191 25.79123878479004 20.84689140319824 25.79123878479004 24.61287307739258 C 25.79123878479004 28.37886047363281 28.9728889465332 31.56051635742188 32.73886489868164 31.56051635742188 C 36.50484848022461 31.56051635742188 39.68650817871094 28.37886047363281 39.68650817871094 24.61287307739258 C 39.68650817871094 20.84689140319824 36.50484848022461 17.66523170471191 32.73886489868164 17.66523170471191 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="ARC_418_"
                  className="ARC_418__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 275"
                    className="Group_275_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2930"
                      className="Path_2930"
                      viewBox="33.954 30.259 11.818 11.818"
                    >
                      <path
                        className="Path_2930_Class"
                        d="M 44.68391036987305 42.07706451416016 C 44.08218765258789 42.07706451416016 43.59580993652344 41.59068298339844 43.59580993652344 40.98893356323242 C 43.59580993652344 36.27194595336914 39.75909423828125 32.43524169921875 35.04209899902344 32.43524169921875 C 34.44036865234375 32.43524169921875 33.9539909362793 31.9488525390625 33.9539909362793 31.34711456298828 C 33.9539909362793 30.74539184570312 34.44036865234375 30.25899696350098 35.04209899902344 30.25899696350098 C 40.95927429199219 30.25899696350098 45.77203369140625 35.07283401489258 45.77203369140625 40.98893356323242 C 45.77203369140625 41.59068298339844 45.28564834594727 42.07706451416016 44.68391036987305 42.07706451416016 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="LINE_814_"
                  className="LINE_814__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 276"
                    className="Group_276_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2931"
                      className="Path_2931"
                      viewBox="42.815 39.12 2.176 6.998"
                    >
                      <path
                        className="Path_2931_Class"
                        d="M 43.90311431884766 46.11769104003906 C 43.3013801574707 46.11769104003906 42.81498718261719 45.63129806518555 42.81498718261719 45.02956390380859 L 42.81498718261719 40.20811462402344 C 42.81498718261719 39.60639953613281 43.3013801574707 39.12000274658203 43.90311431884766 39.12000274658203 C 44.50482559204102 39.12000274658203 44.99122619628906 39.60639953613281 44.99122619628906 40.20811462402344 L 44.99122619628906 45.02956390380859 C 44.99122619628906 45.63129806518555 44.50482559204102 46.11769104003906 43.90311431884766 46.11769104003906 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-type="Group"
                  data-name="ARC_417_"
                  className="ARC_417__Class"
                >
                  <div
                    data-type="Group"
                    data-name="Group 277"
                    className="Group_277_Class"
                  >
                    <svg
                      data-type="Path"
                      data-name="Path 2932"
                      className="Path_2932"
                      viewBox="19.184 43.551 27.891 5.397"
                    >
                      <path
                        className="Path_2932_Class"
                        d="M 33.12931060791016 48.94806671142578 C 28.53744888305664 48.94806671142578 23.94667434692383 47.83167266845703 19.76067543029785 45.59994506835938 C 19.23077201843262 45.31592559814453 19.02946090698242 44.65761566162109 19.31237983703613 44.12662506103516 C 19.59637641906738 43.59780120849609 20.25142097473145 43.39649963378906 20.78569412231445 43.67832183837891 C 28.51568412780762 47.80119323730469 37.7451057434082 47.80119323730469 45.47399520874023 43.67832183837891 C 46.00718307495117 43.39649963378906 46.66439437866211 43.59780120849609 46.94731521606445 44.12662506103516 C 47.23023223876953 44.65655517578125 47.0289306640625 45.31592559814453 46.4990119934082 45.59994506835938 C 42.31194686889648 47.83057403564453 37.72116088867188 48.94806671142578 33.12931060791016 48.94806671142578 Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-type="Group"
              data-name="Group 1483"
              className="Group_1483_Class"
            >
              <img
                data-type="Group"
                data-name="g916"
                className="g916_Class"
                src="g916.png"
                srcset="g916.png 1x, g916@2x.png 2x"
              />
            </div>
          </div>
          <div data-type="Group" data-name="g815" className="g815_Class">
            <img
              data-type="Group"
              data-name="g817"
              className="g817_Class"
              src={g817}
              srcSet={`${g817} 1x, ${g817}@2x 2x`}
            />
          </div>
          <div
            data-type="Text"
            data-name="Event Places"
            className="Event_Places_Class"
          >
            <span>Event Places</span>
          </div>
          <div
            data-type="Group"
            data-name="Group 1477"
            className="Group_1477_Class"
          >
            <div data-type="Group" data-name="pdf (1)" className="pdf_1_Class">
              <div
                data-type="Group"
                data-name="Group 602"
                className="Group_602_Class"
              >
                <div
                  data-type="Group"
                  data-name="Group 601"
                  className="Group_601_Class"
                >
                  <svg
                    data-type="Path"
                    data-name="Path 3022"
                    className="Path_3022"
                    viewBox="64 0 20.5 24.967"
                  >
                    <path
                      className="Path_3022_Class"
                      d="M 84.33268737792969 5.353904247283936 L 78.63835906982422 0.152387723326683 C 78.53158569335938 0.05485957860946655 78.38702392578125 0 78.23573303222656 0 L 66.27769470214844 0 C 65.02150726318359 0 64 0.9331004619598389 64 2.08061671257019 L 64 22.88663482666016 C 64 24.03410339355469 65.02150726318359 24.96720314025879 66.27774047851562 24.96720314025879 L 82.22181701660156 24.96720314025879 C 83.47800445556641 24.96720314025879 84.49951171875 24.03410339355469 84.49951171875 22.88658905029297 L 84.49951171875 5.721634387969971 C 84.49951171875 5.583486080169678 84.439453125 5.451433181762695 84.33268737792969 5.353904247283936 Z M 78.80519104003906 1.775841116905212 L 82.555419921875 5.201516628265381 L 79.94403076171875 5.201516628265381 C 79.31623840332031 5.201516628265381 78.80519104003906 4.73469877243042 78.80519104003906 4.161233425140381 L 78.80519104003906 1.775841116905212 Z M 83.36066436767578 22.88658905029297 C 83.36066436767578 23.46005249023438 82.84961700439453 23.92687034606934 82.22181701660156 23.92687034606934 L 66.27774047851562 23.92687034606934 C 65.64994049072266 23.92687034606934 65.13890075683594 23.46005249023438 65.13890075683594 22.88658905029297 L 65.13890075683594 2.08061671257019 C 65.13890075683594 1.507151126861572 65.64994049072266 1.040332555770874 66.27774047851562 1.040332555770874 L 77.66633605957031 1.040332555770874 L 77.66633605957031 4.161233425140381 C 77.66633605957031 5.308700561523438 78.68785095214844 6.241800785064697 79.94407653808594 6.241800785064697 L 83.36066436767578 6.241800785064697 L 83.36066436767578 22.88658905029297 Z"
                    ></path>
                  </svg>
                  <svg
                    data-type="Path"
                    data-name="Path 3023"
                    className="Path_3023"
                    viewBox="128 170.666 13.666 13.666"
                  >
                    <path
                      className="Path_3023_Class"
                      d="M 137.7364654541016 178.2716064453125 C 137.2093048095703 177.8567657470703 136.7082824707031 177.4302673339844 136.3746337890625 177.0966186523438 C 135.9408874511719 176.6628723144531 135.5543823242188 176.2424621582031 135.2185516357422 175.8420867919922 C 135.7424011230469 174.2233123779297 135.9720764160156 173.3886566162109 135.9720764160156 172.9437561035156 C 135.9720764160156 171.0536346435547 135.2891845703125 170.666015625 134.2637634277344 170.666015625 C 133.4846801757812 170.666015625 132.5554809570312 171.0708312988281 132.5554809570312 172.9982604980469 C 132.5554809570312 173.8479766845703 133.0209350585938 174.8795166015625 133.9434661865234 176.0784149169922 C 133.7177124023438 176.7673950195312 133.4524536132812 177.5620727539062 133.1543884277344 178.4579162597656 C 133.0108947753906 178.8877563476562 132.855224609375 179.2859039306641 132.6905975341797 179.6540374755859 C 132.5566101074219 179.7135620117188 132.4264526367188 179.7741546630859 132.30078125 179.8369903564453 C 131.84814453125 180.0633392333984 131.4182891845703 180.2668304443359 131.0195617675781 180.4559173583984 C 129.2011413574219 181.3167419433594 128 181.8861846923828 128 183.0105743408203 C 128 183.826904296875 128.8869781494141 184.3323669433594 129.7082824707031 184.3323669433594 C 130.7670593261719 184.3323669433594 132.3658142089844 182.918212890625 133.5335845947266 180.5359344482422 C 134.7458343505859 180.0577239990234 136.2528686523438 179.7034759521484 137.4423217773438 179.4816131591797 C 138.3954467773438 180.2145080566406 139.4481201171875 180.915771484375 139.9580535888672 180.915771484375 C 141.3699493408203 180.915771484375 141.6663513183594 180.0994262695312 141.6663513183594 179.4148712158203 C 141.6663513183594 178.0685729980469 140.128173828125 178.0685729980469 139.3885955810547 178.0685729980469 C 139.158935546875 178.0686340332031 138.5428314208984 178.136474609375 137.7364654541016 178.2716064453125 Z M 129.7082824707031 183.1935119628906 C 129.3829650878906 183.1935119628906 129.1627502441406 183.0400390625 129.1388549804688 183.0105743408203 C 129.1388549804688 182.6068267822266 130.3427734375 182.0363006591797 131.5072326660156 181.4846954345703 C 131.5811767578125 181.4496765136719 131.6562805175781 181.4145965576172 131.7324523925781 181.3784484863281 C 130.877197265625 182.6185607910156 130.0313720703125 183.1935119628906 129.7082824707031 183.1935119628906 Z M 133.6943359375 172.9982604980469 C 133.6943359375 171.8049011230469 134.0647125244141 171.8049011230469 134.2637786865234 171.8049011230469 C 134.6664123535156 171.8049011230469 134.8332214355469 171.8049011230469 134.8332214355469 172.9437561035156 C 134.8332214355469 173.1839752197266 134.6730651855469 173.7845458984375 134.3799896240234 174.7221374511719 C 133.9328460693359 174.0337066650391 133.6943359375 173.4436950683594 133.6943359375 172.9982604980469 Z M 134.130859375 179.1185455322266 C 134.1664581298828 179.0195617675781 134.200927734375 178.9194641113281 134.2343139648438 178.8182678222656 C 134.4456024169922 178.184326171875 134.6358032226562 177.6148834228516 134.805419921875 177.1021728515625 C 135.041748046875 177.3624114990234 135.2964477539062 177.6287994384766 135.5695037841797 177.9018096923828 C 135.67626953125 178.0085754394531 135.9409484863281 178.2488098144531 136.2935485839844 178.5496215820312 C 135.5916442871094 178.7025756835938 134.8448638916016 178.8921966552734 134.130859375 179.1185455322266 Z M 140.5274963378906 179.4149322509766 C 140.5274963378906 179.6707458496094 140.5274963378906 179.7769317626953 139.9992065429688 179.7802886962891 C 139.8440704345703 179.7469329833984 139.4853820800781 179.5356292724609 139.042724609375 179.2342224121094 C 139.2033996582031 179.2164459228516 139.3218688964844 179.2075347900391 139.3885955810547 179.2075347900391 C 140.22998046875 179.2075347900391 140.4685668945312 179.289794921875 140.5274963378906 179.4149322509766 Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div
              data-type="Symbol"
              data-name="Title_form_in"
              className="Title_form_in Title_form_in_Class"
            >
              <div
                data-type="Text"
                data-name="Guest First Name*"
                className="Guest_First_Name_Class"
              >
                <span>Guest First Name*</span>
              </div>
            </div>
            <div
              data-type="Symbol"
              data-name="Title_form_in"
              className="Title_form_in Title_form_in_c_Class"
            >
              <div
                data-type="Text"
                data-name="Guest Last Name*"
                className="Guest_Last_Name_Class"
              >
                <span>Guest Last Name*</span>
              </div>
            </div>
            <div
              data-type="Symbol"
              data-name="form"
              className="form form_Class"
            >
              <svg
                data-type="Rectangle"
                data-name="Rectangle 4"
                className="Rectangle_4"
              >
                <rect
                  className="Rectangle_4_Class"
                  rx="6"
                  ry="6"
                  x="0"
                  y="0"
                  width="465.85"
                  height="53"
                ></rect>
              </svg>
              <div
                data-type="Text"
                data-name="Rockman"
                className="Rockman_Class"
              >
                <span>Rockman</span>
              </div>
            </div>
            <div
              data-type="Symbol"
              data-name="form"
              className="form form_dd_Class"
            >
              <svg
                data-type="Rectangle"
                data-name="Rectangle 4"
                className="Rectangle_4_de"
              >
                <rect
                  className="Rectangle_4_de_Class"
                  rx="6"
                  ry="6"
                  x="0"
                  y="0"
                  width="293"
                  height="53"
                ></rect>
              </svg>
              <div
                data-type="Text"
                data-name="Ttavel@smilinghouse.ch"
                className="Ttavelsmilinghousech_Class"
              >
                <span>Ttavel@smilinghouse.ch</span>
              </div>
            </div>
            <div
              data-type="Symbol"
              data-name="Title_form_in"
              className="Title_form_in Title_form_in_dg_Class"
            >
              <div data-type="Text" data-name="Phone*" className="Phone_Class">
                <span>Phone*</span>
              </div>
            </div>
            <div
              data-type="Symbol"
              data-name="form"
              className="form form_di_Class"
            >
              <svg
                data-type="Rectangle"
                data-name="Rectangle 4"
                className="Rectangle_4_dj"
              >
                <rect
                  className="Rectangle_4_dj_Class"
                  rx="6"
                  ry="6"
                  x="0"
                  y="0"
                  width="302.5"
                  height="53"
                ></rect>
              </svg>
              <div
                data-type="Text"
                data-name="+41-79-489-7021"
                className="n_1-79-489-7021_Class"
              >
                <span>+41-79-489-7021</span>
              </div>
            </div>
            <div
              data-type="Symbol"
              data-name="Title_form_in"
              className="Title_form_in Title_form_in_dl_Class"
            >
              <div
                data-type="Text"
                data-name="Country*"
                className="Country_Class"
              >
                <span>Country*</span>
              </div>
            </div>
            <div
              data-type="Symbol"
              data-name="form"
              className="form form_dn_Class"
            >
              <svg
                data-type="Rectangle"
                data-name="Rectangle 4"
                className="Rectangle_4_do"
              >
                <rect
                  className="Rectangle_4_do_Class"
                  rx="6"
                  ry="6"
                  x="0"
                  y="0"
                  width="302.5"
                  height="53"
                ></rect>
              </svg>
              <div
                data-type="Symbol"
                data-name="Down_Arrow_3_"
                className="Down_Arrow_3_ Down_Arrow_3__dp_Class"
              >
                <svg
                  data-type="Path"
                  data-name="Down_Arrow_3_"
                  className="Down_Arrow_3__dq"
                  viewBox="20 40 13.2 7.2"
                >
                  <path
                    className="Down_Arrow_3__dq_Class"
                    d="M 26.60000228881836 47.20002746582031 C 26.44654846191406 47.20002746582031 26.29294204711914 47.14138031005859 26.17578887939453 47.02422332763672 L 20.17559432983398 41.02402877807617 C 19.94113731384277 40.78957366943359 19.94113731384277 40.40990829467773 20.17559432983398 40.17560195922852 C 20.41005325317383 39.9412956237793 20.78971481323242 39.94114303588867 21.02402305603027 40.17560195922852 L 26.60000228881836 45.75158309936523 L 32.17597961425781 40.17560195922852 C 32.41043853759766 39.94114685058594 32.79010009765625 39.94114685058594 33.02440643310547 40.17560195922852 C 33.25871276855469 40.41005706787109 33.25886535644531 40.78972244262695 33.02440643310547 41.02403259277344 L 27.02421569824219 47.02422332763672 C 26.90706062316895 47.14138031005859 26.75345611572266 47.20002746582031 26.60000038146973 47.20002746582031 Z"
                  ></path>
                </svg>
              </div>
              <div
                data-type="Text"
                data-name="Switzerland"
                className="Switzerland_Class"
              >
                <span>Switzerland</span>
              </div>
            </div>
            <div
              data-type="Symbol"
              data-name="Title_form_in"
              className="Title_form_in Title_form_in_ds_Class"
            >
              <div
                data-type="Text"
                data-name="E-Mail*"
                className="E-Mail_Class"
              >
                <span>E-Mail*</span>
              </div>
            </div>
            <div
              data-type="Symbol"
              data-name="form"
              className="form form_du_Class"
            >
              <svg
                data-type="Rectangle"
                data-name="Rectangle 4"
                className="Rectangle_4_dv"
              >
                <rect
                  className="Rectangle_4_dv_Class"
                  rx="6"
                  ry="6"
                  x="0"
                  y="0"
                  width="463.85"
                  height="53"
                ></rect>
              </svg>
              <div data-type="Text" data-name="Moriya" className="Moriya_Class">
                <span>Moriya</span>
              </div>
            </div>
          </div>
          <svg
            data-type="Rectangle"
            data-name="Rectangle 606"
            className="Rectangle_606"
          >
            <rect
              className="Rectangle_606_Class"
              rx="0"
              ry="0"
              x="0"
              y="0"
              width="1598"
              height="73"
            ></rect>
          </svg>
          <div
            data-type="Text"
            data-name="Book this Property Now"
            className="Book_this_Property_Now_Class"
          >
            <span>Book this Property Now</span>
          </div>
          <svg
            data-type="Path"
            data-name="Path 3451"
            className="Path_3451"
            viewBox="0 327.601 1598 1"
          >
            <path
              className="Path_3451_Class"
              d="M 0 327.6005859375 L 1598 327.6005859375"
            ></path>
          </svg>
          <svg
            data-type="Path"
            data-name="Path 3458"
            className="Path_3458"
            viewBox="0 327.601 1587 1"
          >
            <path
              className="Path_3458_Class"
              d="M 0 327.6005859375 L 1587 327.6005859375"
            ></path>
          </svg>
          <svg
            data-type="Path"
            data-name="Path 3453"
            className="Path_3453"
            viewBox="0 327.601 1558.146 1"
          >
            <path
              className="Path_3453_Class"
              d="M 0 327.6005859375 L 1558.146484375 327.6005859375"
            ></path>
          </svg>
          <div
            data-type="Symbol"
            data-name="Component All rights"
            className="Component_All_rights Component_All_rights_Class"
          >
            <div
              data-type="Text"
              data-name="© 2023 VillaTracker. All rights reserved. Cookie Policy, Privacy and Terms."
              className="n_2023_VillaTracker_All_rights_Class"
            >
              <span>
                © 2023 VillaTracker. All rights reserved. Cookie Policy,{" "}
              </span>
              <span>Privacy</span>
              <span> </span>
              <span>and</span>
              <span> </span>
              <span>Terms</span>
              <span>.</span>
            </div>
          </div>
          <div
            data-type="Text"
            data-name="Total Booking Amount "
            className="Total_Booking_Amount__Class"
          >
            <span>Total Booking Amount </span>
          </div>
          <div
            data-type="Text"
            data-name="For 7 Nights"
            className="For_7_Nights_Class"
          >
            <span>For 7 Nights</span>
          </div>
          <div
            data-type="Group"
            data-name="Group 1491"
            className="Group_1491_Class"
          >
            <div data-type="Text" data-name="82,076" className="n_2076_Class">
              <span>82,076</span>
            </div>
            <div data-type="Text" data-name="$" className="Text_Class">
              <span>$</span>
            </div>
          </div>
          <svg
            data-type="Path"
            data-name="Path 3454"
            className="Path_3454"
            viewBox="0 327.601 1558.146 1"
          >
            <path
              className="Path_3454_Class"
              d="M 0 327.6005859375 L 1558.146484375 327.6005859375"
            ></path>
          </svg>
          <div
            data-type="Text"
            data-name="Payment Schedule"
            className="Payment_Schedule_Class"
          >
            <span>Payment Schedule</span>
          </div>
          <div
            data-type="Text"
            data-name="Amount Due Today:

Total Booking Amount:                 Additional Fees due at check-in"
            className="Amount_Due_Today__Total_Bookin_Class"
          >
            <span>
              Amount Due Today:
              <br />
              <br />
              Total Booking Amount:{" "}
            </span>
            <span>Additional Fees due at check-in</span>
          </div>
          <div
            data-type="Text"
            data-name="*Any extra cost will be charged by the host at the property's currency
If people book more than 2 months ahead, we only charge or hold 50% of the booking amount… 
and rest due 2 months before check-in. 
"
            className="Any_extra_cost_will_be_charged_Class"
          >
            <span>
              *Any extra cost will be charged by the host at the property's
              currency
              <br />
              If people book more than 2 months ahead, we only charge or hold
              50% of the booking amount… <br />
              and rest due 2 months before check-in.{" "}
            </span>
            <br />
          </div>
          <div
            data-type="Group"
            data-name="Group 1492"
            className="Group_1492_Class"
          >
            <div
              data-type="Text"
              data-name="82,076"
              className="n_2076_ee_Class"
            >
              <span>82,076</span>
            </div>
            <div data-type="Text" data-name="$" className="Text_ef_Class">
              <span>$</span>
            </div>
          </div>
          <div
            data-type="Group"
            data-name="Group 1493"
            className="Group_1493_Class"
          >
            <div
              data-type="Text"
              data-name="82,076"
              className="n_2076_eh_Class"
            >
              <span>82,076</span>
            </div>
            <div data-type="Text" data-name="$" className="Text_ei_Class">
              <span>$</span>
            </div>
          </div>
          <svg
            data-type="Rectangle"
            data-name="Rectangle 607"
            className="Rectangle_607"
          >
            <rect
              className="Rectangle_607_Class"
              rx="0"
              ry="0"
              x="0"
              y="0"
              width="1598"
              height="73"
            ></rect>
          </svg>
          <div
            data-type="Text"
            data-name="Book your Guest Trip!"
            className="Book_your_Guest_Trip_ek_Class"
          >
            <span>Book your Guest Trip!</span>
          </div>
          <svg
            data-type="Path"
            data-name="Path 3456"
            className="Path_3456"
            viewBox="0 327.601 1598 1"
          >
            <path
              className="Path_3456_Class"
              d="M 0 327.6005859375 L 1598 327.6005859375"
            ></path>
          </svg>
          <svg
            data-type="Rectangle"
            data-name="Rectangle 608"
            className="Rectangle_608"
          >
            <rect
              className="Rectangle_608_Class"
              rx="0"
              ry="0"
              x="0"
              y="0"
              width="1598"
              height="73"
            ></rect>
          </svg>
          <div
            data-type="Text"
            data-name="Payment Information"
            className="Payment_Information_Class"
          >
            <span>Payment Information</span>
          </div>
          <svg
            data-type="Path"
            data-name="Path 3457"
            className="Path_3457"
            viewBox="0 327.601 1598 1"
          >
            <path
              className="Path_3457_Class"
              d="M 0 327.6005859375 L 1598 327.6005859375"
            ></path>
          </svg>
          <div
            data-type="Text"
            data-name="Please select the payment method "
            className="Please_select_the_payment_meth_Class"
          >
            <span>Please select the payment method </span>
          </div>
          <div
            data-type="Text"
            data-name="Wire Transfer "
            className="Wire_Transfer__Class"
          >
            <span>Wire Transfer </span>
          </div>
          <div
            data-type="Text"
            data-name="48 Hours Hold"
            className="n_8_Hours_Hold_Class"
          >
            <span>48 Hours Hold</span>
          </div>
          <div
            data-type="Symbol"
            data-name="choose button"
            className="choose_button choose_button_Class"
          >
            <svg
              data-type="Ellipse"
              data-name="Ellipse 28"
              className="Ellipse_28"
            >
              <ellipse
                className="Ellipse_28_Class"
                rx="14"
                ry="14"
                cx="14"
                cy="14"
              ></ellipse>
            </svg>
            <svg
              data-type="Path"
              data-name="Path 3018"
              className="Path_3018"
              viewBox="0 0 16 16"
            >
              <path
                className="Path_3018_Class"
                d="M 8 0 C 12.41827774047852 0 16 3.581722259521484 16 8 C 16 12.41827774047852 12.41827774047852 16 8 16 C 3.581722259521484 16 0 12.41827774047852 0 8 C 0 3.581722259521484 3.581722259521484 0 8 0 Z"
              ></path>
            </svg>
          </div>
          <svg
            data-type="Rectangle"
            data-name="Rectangle 609"
            className="Rectangle_609"
          >
            <rect
              className="Rectangle_609_Class"
              rx="0"
              ry="0"
              x="0"
              y="0"
              width="1"
              height="120"
            ></rect>
          </svg>
          <div
            data-type="Symbol"
            data-name="choose button"
            className="choose_button choose_button_ew_Class"
          >
            <svg
              data-type="Ellipse"
              data-name="Ellipse 28"
              className="Ellipse_28_ex"
            >
              <ellipse
                className="Ellipse_28_ex_Class"
                rx="14"
                ry="14"
                cx="14"
                cy="14"
              ></ellipse>
            </svg>
          </div>
          <div
            data-type="Text"
            data-name="Your request will be sent to the Villa Tracker team to review
 a contract will be sent to you with payment terms and details"
            className="Your_request_will_be_sent_to_t_Class"
          >
            <span>
              Your request will be sent to the Villa Tracker team to review
              <br /> a contract will be sent to you with payment terms and
              details
            </span>
          </div>
          <div
            data-type="Text"
            data-name="By holding this property for 48 hours, your Credit Card will not be charged, only authorized."
            className="By_holding_this_property_for_4_Class"
          >
            <span>
              By holding this property for 48 hours, your Credit Card will not
              be charged, only authorized.
            </span>
          </div>
          <div
            data-type="Symbol"
            data-name="buttons"
            className="buttons buttons_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 396"
              className="Rectangle_396"
            >
              <rect
                className="Rectangle_396_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="324"
                height="55"
              ></rect>
            </svg>
            <div
              data-type="Text"
              data-name="Hold Property For 48 Hours"
              className="Hold_Property_For_48_Hours_Class"
            >
              <span>Hold Property For 48 Hours</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="Component 38 – 5"
            className="Component_38___5 Component_38__5_Class"
          >
            <div data-type="Text" data-name="Cancel" className="Cancel_Class">
              <span>Cancel</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="Title_form_in"
            className="Title_form_in Title_form_in_e_Class"
          >
            <div
              data-type="Text"
              data-name="Card Holder First Name"
              className="Card_Holder_First_Name_Class"
            >
              <span>Card Holder First Name</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="Title_form_in"
            className="Title_form_in Title_form_in_fa_Class"
          >
            <div
              data-type="Text"
              data-name="Card Holder Last Name"
              className="Card_Holder_Last_Name_Class"
            >
              <span>Card Holder Last Name</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="form"
            className="form form_e_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 4"
              className="Rectangle_4_fa"
            >
              <rect
                className="Rectangle_4_fa_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="433.5"
                height="53"
              ></rect>
            </svg>
          </div>
          <div
            data-type="Symbol"
            data-name="form"
            className="form form_fb_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 4"
              className="Rectangle_4_fc"
            >
              <rect
                className="Rectangle_4_fc_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="433.5"
                height="53"
              ></rect>
            </svg>
          </div>
          <div
            data-type="Symbol"
            data-name="form"
            className="form form_fd_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 4"
              className="Rectangle_4_fe"
            >
              <rect
                className="Rectangle_4_fe_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="282.5"
                height="53"
              ></rect>
            </svg>
          </div>
          <div
            data-type="Symbol"
            data-name="form"
            className="form form_ff_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 4"
              className="Rectangle_4_fg"
            >
              <rect
                className="Rectangle_4_fg_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="282.5"
                height="53"
              ></rect>
            </svg>
          </div>
          <div
            data-type="Symbol"
            data-name="Title_form_in"
            className="Title_form_in Title_form_in_fh_Class"
          >
            <div data-type="Text" data-name="City" className="City_Class">
              <span>City</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="Title_form_in"
            className="Title_form_in Title_form_in_fj_Class"
          >
            <div
              data-type="Text"
              data-name="Country"
              className="Country_fk_Class"
            >
              <span>Country</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="form"
            className="form form_fl_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 4"
              className="Rectangle_4_fm"
            >
              <rect
                className="Rectangle_4_fm_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="278"
                height="53"
              ></rect>
            </svg>
            <div
              data-type="Symbol"
              data-name="Title_form_in"
              className="Title_form_in Title_form_in_fn_Class"
            >
              <div
                data-type="Text"
                data-name="Card Type"
                className="Card_Type_Class"
              >
                <span>Card Type</span>
              </div>
            </div>
            <div
              data-type="Text"
              data-name="Master Card"
              className="Master_Card_Class"
            >
              <span>Master Card</span>
            </div>
            <svg
              data-type="Path"
              data-name="Down_Arrow_3_"
              className="Down_Arrow_3__fq"
              viewBox="20 40 13.2 7.2"
            >
              <path
                className="Down_Arrow_3__fq_Class"
                d="M 26.60000228881836 47.20002746582031 C 26.44654846191406 47.20002746582031 26.29294204711914 47.14138031005859 26.17578887939453 47.02422332763672 L 20.17559432983398 41.02402877807617 C 19.94113731384277 40.78957366943359 19.94113731384277 40.40990829467773 20.17559432983398 40.17560195922852 C 20.41005325317383 39.9412956237793 20.78971481323242 39.94114303588867 21.02402305603027 40.17560195922852 L 26.60000228881836 45.75158309936523 L 32.17597961425781 40.17560195922852 C 32.41043853759766 39.94114685058594 32.79010009765625 39.94114685058594 33.02440643310547 40.17560195922852 C 33.25871276855469 40.41005706787109 33.25886535644531 40.78972244262695 33.02440643310547 41.02403259277344 L 27.02421569824219 47.02422332763672 C 26.90706062316895 47.14138031005859 26.75345611572266 47.20002746582031 26.60000038146973 47.20002746582031 Z"
              ></path>
            </svg>
          </div>
          <div
            data-type="Symbol"
            data-name="form"
            className="form form_fr_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 4"
              className="Rectangle_4_fs"
            >
              <rect
                className="Rectangle_4_fs_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="292"
                height="53"
              ></rect>
            </svg>
            <div
              data-type="Symbol"
              data-name="Down_Arrow_3_"
              className="Down_Arrow_3_ Down_Arrow_3__ft_Class"
            >
              <svg
                data-type="Path"
                data-name="Down_Arrow_3_"
                className="Down_Arrow_3__fu"
                viewBox="20 40 13.2 7.2"
              >
                <path
                  className="Down_Arrow_3__fu_Class"
                  d="M 26.60000228881836 47.20002746582031 C 26.44654846191406 47.20002746582031 26.29294204711914 47.14138031005859 26.17578887939453 47.02422332763672 L 20.17559432983398 41.02402877807617 C 19.94113731384277 40.78957366943359 19.94113731384277 40.40990829467773 20.17559432983398 40.17560195922852 C 20.41005325317383 39.9412956237793 20.78971481323242 39.94114303588867 21.02402305603027 40.17560195922852 L 26.60000228881836 45.75158309936523 L 32.17597961425781 40.17560195922852 C 32.41043853759766 39.94114685058594 32.79010009765625 39.94114685058594 33.02440643310547 40.17560195922852 C 33.25871276855469 40.41005706787109 33.25886535644531 40.78972244262695 33.02440643310547 41.02403259277344 L 27.02421569824219 47.02422332763672 C 26.90706062316895 47.14138031005859 26.75345611572266 47.20002746582031 26.60000038146973 47.20002746582031 Z"
                ></path>
              </svg>
            </div>
            <div
              data-type="Text"
              data-name="Select Country"
              className="Select_Country_Class"
            >
              <span>Select Country</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="Title_form_in"
            className="Title_form_in Title_form_in_fw_Class"
          >
            <div data-type="Text" data-name="Address" className="Address_Class">
              <span>Address</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="form"
            className="form form_fy_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 4"
              className="Rectangle_4_fz"
            >
              <rect
                className="Rectangle_4_fz_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="285.5"
                height="53"
              ></rect>
            </svg>
          </div>
          <div
            data-type="Symbol"
            data-name="Title_form_in"
            className="Title_form_in Title_form_in_f_Class"
          >
            <div
              data-type="Text"
              data-name="Postal Code"
              className="Postal_Code_Class"
            >
              <span>Postal Code</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="Title_form_in"
            className="Title_form_in Title_form_in_ga_Class"
          >
            <div data-type="Text" data-name="CVV/CVC" className="CVVCVC_Class">
              <span>CVV/CVC</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="Title_form_in"
            className="Title_form_in Title_form_in_gb_Class"
          >
            <div
              data-type="Text"
              data-name="Card Number"
              className="Card_Number_Class"
            >
              <span>Card Number</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="form"
            className="form form_f_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 4"
              className="Rectangle_4_f"
            >
              <rect
                className="Rectangle_4_f_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="274"
                height="53"
              ></rect>
            </svg>
          </div>
          <div
            data-type="Symbol"
            data-name="Remember Me"
            className="Remember_Me Remember_Me_Class"
          >
            <div
              data-type="Text"
              data-name="I have read and agree with the Privacy Policy and Terms & Conditions 
of the site Certain policy restrictions may apply."
              className="I_have_read_and_agree_with_the_Class"
            >
              <span>I have read and agree with the </span>
              <span>Privacy Policy</span>
              <span> and </span>
              <span>Terms & Conditions</span>
              <span>
                {" "}
                <br />
                of the site Certain policy restrictions may apply.
              </span>
            </div>
            <div data-type="Symbol" data-name="box" className="box box_Class">
              <svg
                data-type="Rectangle"
                data-name="Rectangle 78"
                className="Rectangle_78"
              >
                <rect
                  className="Rectangle_78_Class"
                  rx="2"
                  ry="2"
                  x="0"
                  y="0"
                  width="19"
                  height="19"
                ></rect>
              </svg>
            </div>
            <div data-type="Group" data-name="vi" className="vi_Class">
              <svg
                data-type="Path"
                data-name="Path 2820"
                className="Path_2820"
                viewBox="22.494 31.492 12.654 9.878"
              >
                <path
                  className="Path_2820_Class"
                  d="M 34.98699569702148 31.67329788208008 C 35.09046173095703 31.78909873962402 35.14861297607422 31.94633483886719 35.14861297607422 32.11030578613281 C 35.14861297607422 32.27428436279297 35.09046173095703 32.43151473999023 34.98699569702148 32.54731750488281 L 27.285400390625 41.18875122070312 C 27.18219375610352 41.30484008789062 27.04206085205078 41.37008666992188 26.89591979980469 41.37008666992188 C 26.74977874755859 41.37008666992188 26.60964775085449 41.30484008789062 26.50643920898438 41.18875122070312 L 22.65564155578613 36.86803436279297 C 22.44053649902344 36.62668228149414 22.44053649902344 36.2353630065918 22.65564155578613 35.99401473999023 C 22.87074279785156 35.75266265869141 23.21949768066406 35.75266265869141 23.43460273742676 35.99401473999023 L 26.89591979980469 39.87895965576172 L 34.20803070068359 31.67329788208008 C 34.31124114990234 31.55720520019531 34.45137405395508 31.49195861816406 34.59751510620117 31.49195861816406 C 34.74365234375 31.49195861816406 34.88378524780273 31.55720520019531 34.98699569702148 31.67329788208008 Z"
                ></path>
              </svg>
            </div>
          </div>
          <div
            data-type="Group"
            data-name="Group 1429"
            className="Group_1429_Class"
          >
            <div
              data-type="Text"
              data-name="Expiration Date
"
              className="Expiration_Date__Class"
            >
              <span>Expiration Date</span>
              <br />
            </div>
            <div
              data-type="Symbol"
              data-name="form"
              className="form form_gg_Class"
            >
              <svg
                data-type="Rectangle"
                data-name="Rectangle 4"
                className="Rectangle_4_gh"
              >
                <rect
                  className="Rectangle_4_gh_Class"
                  rx="6"
                  ry="6"
                  x="0"
                  y="0"
                  width="136"
                  height="53"
                ></rect>
              </svg>
            </div>
            <div
              data-type="Symbol"
              data-name="form"
              className="form form_gi_Class"
            >
              <svg
                data-type="Rectangle"
                data-name="Rectangle 4"
                className="Rectangle_4_gj"
              >
                <rect
                  className="Rectangle_4_gj_Class"
                  rx="6"
                  ry="6"
                  x="0"
                  y="0"
                  width="138.5"
                  height="53"
                ></rect>
              </svg>
              <div
                data-type="Symbol"
                data-name="Down_Arrow_3_"
                className="Down_Arrow_3_ Down_Arrow_3__gk_Class"
              >
                <svg
                  data-type="Path"
                  data-name="Down_Arrow_3_"
                  className="Down_Arrow_3__gl"
                  viewBox="20 40 13.2 7.2"
                >
                  <path
                    className="Down_Arrow_3__gl_Class"
                    d="M 26.60000228881836 47.20002746582031 C 26.44654846191406 47.20002746582031 26.29294204711914 47.14138031005859 26.17578887939453 47.02422332763672 L 20.17559432983398 41.02402877807617 C 19.94113731384277 40.78957366943359 19.94113731384277 40.40990829467773 20.17559432983398 40.17560195922852 C 20.41005325317383 39.9412956237793 20.78971481323242 39.94114303588867 21.02402305603027 40.17560195922852 L 26.60000228881836 45.75158309936523 L 32.17597961425781 40.17560195922852 C 32.41043853759766 39.94114685058594 32.79010009765625 39.94114685058594 33.02440643310547 40.17560195922852 C 33.25871276855469 40.41005706787109 33.25886535644531 40.78972244262695 33.02440643310547 41.02403259277344 L 27.02421569824219 47.02422332763672 C 26.90706062316895 47.14138031005859 26.75345611572266 47.20002746582031 26.60000038146973 47.20002746582031 Z"
                  ></path>
                </svg>
              </div>
            </div>
            <div data-type="Text" data-name="1" className="n__Class">
              <span>1</span>
            </div>
            <div data-type="Text" data-name="2023" className="n_023_Class">
              <span>2023</span>
            </div>
            <div
              data-type="Symbol"
              data-name="Down_Arrow_3_"
              className="Down_Arrow_3_ Down_Arrow_3__go_Class"
            >
              <svg
                data-type="Path"
                data-name="Down_Arrow_3_"
                className="Down_Arrow_3__gp"
                viewBox="20 40 13.2 7.2"
              >
                <path
                  className="Down_Arrow_3__gp_Class"
                  d="M 26.60000228881836 47.20002746582031 C 26.44654846191406 47.20002746582031 26.29294204711914 47.14138031005859 26.17578887939453 47.02422332763672 L 20.17559432983398 41.02402877807617 C 19.94113731384277 40.78957366943359 19.94113731384277 40.40990829467773 20.17559432983398 40.17560195922852 C 20.41005325317383 39.9412956237793 20.78971481323242 39.94114303588867 21.02402305603027 40.17560195922852 L 26.60000228881836 45.75158309936523 L 32.17597961425781 40.17560195922852 C 32.41043853759766 39.94114685058594 32.79010009765625 39.94114685058594 33.02440643310547 40.17560195922852 C 33.25871276855469 40.41005706787109 33.25886535644531 40.78972244262695 33.02440643310547 41.02403259277344 L 27.02421569824219 47.02422332763672 C 26.90706062316895 47.14138031005859 26.75345611572266 47.20002746582031 26.60000038146973 47.20002746582031 Z"
                ></path>
              </svg>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="form"
            className="form form_gq_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 4"
              className="Rectangle_4_gr"
            >
              <rect
                className="Rectangle_4_gr_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="293"
                height="53"
              ></rect>
            </svg>
          </div>
          <div data-type="Group" data-name="help" className="help_Class">
            <svg
              data-type="Boolean Group"
              data-name="Union 82"
              className="Union_82"
              viewBox="-3085 4096 18.001 18"
            >
              <path
                className="Union_82_Class"
                d="M -3085.000244140625 4105 C -3085.000244140625 4100.029296875 -3080.97021484375 4096.00048828125 -3076 4096.00048828125 C -3071.029541015625 4096.00048828125 -3066.99951171875 4100.029296875 -3066.99951171875 4105 C -3067.005126953125 4109.9677734375 -3071.03173828125 4113.994140625 -3076 4114 C -3080.97021484375 4114 -3085.000244140625 4109.970703125 -3085.000244140625 4105 Z M -3083.614990234375 4105 C -3083.614990234375 4109.2060546875 -3080.2060546875 4112.61572265625 -3076 4112.61572265625 C -3071.793701171875 4112.61572265625 -3068.384521484375 4109.2060546875 -3068.384521484375 4105 C -3068.3896484375 4100.796875 -3071.7958984375 4097.3896484375 -3076 4097.384765625 C -3080.2060546875 4097.384765625 -3083.614990234375 4100.794921875 -3083.614990234375 4105 Z M -3076.6923828125 4109.1533203125 C -3076.6923828125 4108.77197265625 -3076.38232421875 4108.4619140625 -3076 4108.4619140625 C -3075.617431640625 4108.4619140625 -3075.307373046875 4108.77197265625 -3075.307373046875 4109.1533203125 C -3075.307373046875 4109.5361328125 -3075.617431640625 4109.84619140625 -3076 4109.84619140625 C -3076.38232421875 4109.84619140625 -3076.6923828125 4109.5361328125 -3076.6923828125 4109.1533203125 Z M -3076.6923828125 4107.07666015625 C -3076.60205078125 4106.197265625 -3076.1533203125 4105.3935546875 -3075.451171875 4104.8564453125 C -3075.020751953125 4104.4267578125 -3074.615478515625 4104.0205078125 -3074.615478515625 4103.615234375 C -3074.615478515625 4102.8505859375 -3075.23486328125 4102.2314453125 -3076 4102.2314453125 C -3076.7646484375 4102.2314453125 -3077.38427734375 4102.8505859375 -3077.38427734375 4103.615234375 C -3077.38427734375 4103.998046875 -3077.6943359375 4104.30810546875 -3078.076904296875 4104.30810546875 C -3078.459228515625 4104.30810546875 -3078.769287109375 4103.998046875 -3078.769287109375 4103.615234375 C -3078.769287109375 4102.0869140625 -3077.52978515625 4100.845703125 -3076 4100.845703125 C -3074.47021484375 4100.845703125 -3073.230224609375 4102.0869140625 -3073.230224609375 4103.615234375 C -3073.320556640625 4104.4951171875 -3073.769775390625 4105.298828125 -3074.472412109375 4105.8359375 C -3074.90185546875 4106.26611328125 -3075.307373046875 4106.67138671875 -3075.307373046875 4107.07666015625 C -3075.307373046875 4107.45947265625 -3075.617431640625 4107.76953125 -3076 4107.76953125 C -3076.38232421875 4107.76953125 -3076.6923828125 4107.45947265625 -3076.6923828125 4107.07666015625 Z"
              ></path>
            </svg>
          </div>
          <img
            data-type="Rectangle"
            data-name="Image 36"
            className="Image_36_Class"
            src="Image_36.png"
            srcset="Image_36.png 1x, Image_36@2x.png 2x"
          />

          <div
            data-type="Symbol"
            data-name="Title_form_in"
            className="Title_form_in Title_form_in_gv_Class"
          >
            <div
              data-type="Text"
              data-name="Credit Cards Accepted:"
              className="Credit_Cards_Accepted_Class"
            >
              <span>Credit Cards Accepted:</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="Title_form_in"
            className="Title_form_in Title_form_in_gx_Class"
          >
            <div
              data-type="Text"
              data-name="Currency"
              className="Currency_Class"
            >
              <span>Currency</span>
            </div>
          </div>
          <div
            data-type="Symbol"
            data-name="form"
            className="form form_gz_Class"
          >
            <svg
              data-type="Rectangle"
              data-name="Rectangle 4"
              className="Rectangle_4_g"
            >
              <rect
                className="Rectangle_4_g_Class"
                rx="6"
                ry="6"
                x="0"
                y="0"
                width="292"
                height="53"
              ></rect>
            </svg>
            <div
              data-type="Symbol"
              data-name="Down_Arrow_3_"
              className="Down_Arrow_3_ Down_Arrow_3__g_Class"
            >
              <svg
                data-type="Path"
                data-name="Down_Arrow_3_"
                className="Down_Arrow_3__ha"
                viewBox="20 40 13.2 7.2"
              >
                <path
                  className="Down_Arrow_3__ha_Class"
                  d="M 26.60000228881836 47.20002746582031 C 26.44654846191406 47.20002746582031 26.29294204711914 47.14138031005859 26.17578887939453 47.02422332763672 L 20.17559432983398 41.02402877807617 C 19.94113731384277 40.78957366943359 19.94113731384277 40.40990829467773 20.17559432983398 40.17560195922852 C 20.41005325317383 39.9412956237793 20.78971481323242 39.94114303588867 21.02402305603027 40.17560195922852 L 26.60000228881836 45.75158309936523 L 32.17597961425781 40.17560195922852 C 32.41043853759766 39.94114685058594 32.79010009765625 39.94114685058594 33.02440643310547 40.17560195922852 C 33.25871276855469 40.41005706787109 33.25886535644531 40.78972244262695 33.02440643310547 41.02403259277344 L 27.02421569824219 47.02422332763672 C 26.90706062316895 47.14138031005859 26.75345611572266 47.20002746582031 26.60000038146973 47.20002746582031 Z"
                ></path>
              </svg>
            </div>
            <div
              data-type="Text"
              data-name="United States dollar"
              className="United_States_dollar_Class"
            >
              <span>United States dollar</span>
            </div>
          </div>
          <svg
            data-type="Rectangle"
            data-name="Rectangle 610"
            className="Rectangle_610"
          >
            <rect
              className="Rectangle_610_Class"
              rx="0"
              ry="0"
              x="0"
              y="0"
              width="1598"
              height="228"
            ></rect>
          </svg>
          <div
            data-type="Text"
            data-name="For 7 Nights"
            className="For_7_Nights_g_Class"
          >
            <span>For 7 Nights</span>
          </div>
          <div
            data-type="Text"
            data-name="Including additional fees "
            className="Including_additional_fees__Class"
          >
            <span>Including additional fees </span>
          </div>
          <div
            data-type="Text"
            data-name="Minus agency fees "
            className="Minus_agency_fees__Class"
          >
            <span>Minus agency fees </span>
          </div>
          <svg
            data-type="Rectangle"
            data-name="Rectangle 603"
            className="Rectangle_603"
          >
            <rect
              className="Rectangle_603_Class"
              rx="0"
              ry="0"
              x="0"
              y="0"
              width="1"
              height="154"
            ></rect>
          </svg>
          <svg
            data-type="Path"
            data-name="Path 3452"
            className="Path_3452"
            viewBox="0 327.601 1598 1"
          >
            <path
              className="Path_3452_Class"
              d="M 0 327.6005859375 L 1598 327.6005859375"
            ></path>
          </svg>
          <div
            data-type="Group"
            data-name="Group 1490"
            className="Group_1490_Class"
          >
            <div
              data-type="Text"
              data-name="82,076"
              className="n_2076_hb_Class"
            >
              <span>82,076</span>
            </div>
            <div data-type="Text" data-name="$" className="Text_hc_Class">
              <span>$</span>
            </div>
          </div>
          <div
            data-type="Text"
            data-name="Total Booking Amount "
            className="Total_Booking_Amount__hd_Class"
          >
            <span>Total Booking Amount </span>
          </div>
          <div
            data-type="Group"
            data-name="Group 1499"
            className="Group_1499_Class"
          >
            <div
              data-type="Text"
              data-name="(-) $9160"
              className="n__9160_Class"
            >
              <span>(-) $9160</span>
            </div>
            <div
              data-type="Text"
              data-name="Agency Commission"
              className="Agency_Commission_Class"
            >
              <span>Agency Commission</span>
            </div>
            <div
              data-type="Text"
              data-name="By clicking on this the client card will be chargers
fully and Villa Tracker will compensate your back
with the commission"
              className="By_clicking_on_this_the_client_Class"
            >
              <span>
                By clicking on this the client card will be chargers
                <br />
                fully and Villa Tracker will compensate your back
                <br />
                with the commission
              </span>
            </div>
            <div
              data-type="Symbol"
              data-name="box+vi"
              className="box_vi boxvi_Class"
            >
              <div
                data-type="Symbol"
                data-name="box"
                className="box box_hj_Class"
              >
                <svg
                  data-type="Rectangle"
                  data-name="Rectangle 78"
                  className="Rectangle_78_hk"
                >
                  <rect
                    className="Rectangle_78_hk_Class"
                    rx="2"
                    ry="2"
                    x="0"
                    y="0"
                    width="19"
                    height="19"
                  ></rect>
                </svg>
              </div>
              <div data-type="Group" data-name="vi" className="vi_hl_Class">
                <svg
                  data-type="Path"
                  data-name="Path 2820"
                  className="Path_2820_hm"
                  viewBox="22.494 31.492 12.654 9.878"
                >
                  <path
                    className="Path_2820_hm_Class"
                    d="M 34.98699569702148 31.67329788208008 C 35.09046173095703 31.78909873962402 35.14861297607422 31.94633483886719 35.14861297607422 32.11030578613281 C 35.14861297607422 32.27428436279297 35.09046173095703 32.43151473999023 34.98699569702148 32.54731750488281 L 27.285400390625 41.18875122070312 C 27.18219375610352 41.30484008789062 27.04206085205078 41.37008666992188 26.89591979980469 41.37008666992188 C 26.74977874755859 41.37008666992188 26.60964775085449 41.30484008789062 26.50643920898438 41.18875122070312 L 22.65564155578613 36.86803436279297 C 22.44053649902344 36.62668228149414 22.44053649902344 36.2353630065918 22.65564155578613 35.99401473999023 C 22.87074279785156 35.75266265869141 23.21949768066406 35.75266265869141 23.43460273742676 35.99401473999023 L 26.89591979980469 39.87895965576172 L 34.20803070068359 31.67329788208008 C 34.31124114990234 31.55720520019531 34.45137405395508 31.49195861816406 34.59751510620117 31.49195861816406 C 34.74365234375 31.49195861816406 34.88378524780273 31.55720520019531 34.98699569702148 31.67329788208008 Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div
            data-type="Text"
            data-name="Cleaning fee
Price for the stay
Percentage fee
Flat per day Fee
Security deposit
Tax "
            className="Cleaning_fee_Price_for_the_sta_Class"
          >
            <span>
              Cleaning fee
              <br />
              Price for the stay
              <br />
              Percentage fee
              <br />
              Flat per day Fee
              <br />
              Security deposit
              <br />
              Tax{" "}
            </span>
          </div>
          <div
            data-type="Text"
            data-name="$400
$0
$91,196
$0
$0
$0"
            className="n_00_0_91196_0_0_0_Class"
          >
            <span>
              $400
              <br />
              $0
              <br />
              $91,196
              <br />
              $0
              <br />
              $0
              <br />
              $0
            </span>
          </div>
          <div
            data-type="Text"
            data-name="Additional Fees"
            className="Additional_Fees_Class"
          >
            <span>Additional Fees</span>
          </div>
          <div
            data-type="Text"
            data-name="House rules and a cancellation policy"
            className="House_rules_and_a_cancellation_Class"
          >
            <span>House rules and a cancellation policy</span>
          </div>
          <div
            data-type="Text"
            data-name="Click here to view complete property terms & conditions"
            className="Click_here_to_view_complete_pr_Class"
          >
            <span></span>
            <span>Click here to view complete property terms & conditions</span>
          </div>
          <div
            data-type="Text"
            data-name="Enjoy a 48-Hours Risk Free Guarantee for bookings placed more than 60 days prior to check-in. Beyond that, we'll make every effort to work with property management to find options if your plans change but refunds cannot be guaranteed and and on a best-offo"
            className="Enjoy_a_48-Hours_Risk_Free_Gua_Class"
          >
            <span>
              Enjoy a 48-Hours Risk Free Guarantee for bookings placed more than
              60 days prior to check-in. Beyond that, we'll make every effort to
              work with property management to find options if your plans change
              but refunds cannot be guaranteed and and on a best-offort basis.
            </span>
          </div>
          <svg
            data-type="Rectangle"
            data-name="Rectangle 611"
            className="Rectangle_611"
          >
            <rect
              className="Rectangle_611_Class"
              rx="0"
              ry="0"
              x="0"
              y="0"
              width="1"
              height="154"
            ></rect>
          </svg>
        </div>
      </div>
    </>
  );
};

export default PropertyReservationPage;