import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import pageBg from "../../assets/SigninPic.jpeg";
import PropertyBox from "../../pages/SearchProperty/PropertyBox";
import BlueWhiteButton from "../Buttons/BlueWhiteButton";
import shareSelection from "../../assets/icons/share-selection-on.svg";
import shareSelectionOn from "../../assets/icons/share-selection.png";
import link from "../../assets/icons/link-on.svg";
import linkOn from "../../assets/icons/link.png";
import saveSearch from "../../assets/icons/save-search-on.png";
import saveSearchOn from "../../assets/icons/save-search.png";
import ShareSelectionPopup from "./ShareSelectionPopup";
import SaveSearchPopup from "./SaveSearchPopup";
import PageHeader from "../PageHeader";
import goBack from "../../assets/go-back.svg";
import "./SelectedProperties.scss";
import { PATH_SEARCH, PATH_RESERVE } from "../../Util/constants";

const SelectedProperties = (props, setShowSelection) => {
  const [showShareAsLink, setShowShareAsLink] = useState(false);
  const [showSaveSearch, setShowSaveSearch] = useState(false);
  const [showShareAsPdf, setShowShareAsPdf] = useState(false);
  const { type, onBack,doSearch } = props;
  const history = useHistory();
  const selectedProperties = useSelector(
    (state) => state.property.selectedProperties
  );

  const doBack = (params) => {
    console.log("go back!");
    setShowSelection(false);
    history.push(PATH_SEARCH);
  };

  const buttonsBox = (
    <div className="selected-properties-results-buttons">
      <BlueWhiteButton
        style={{ width: "440px" }}
        icon={link}
        iconOn={linkOn}
        onClick={() => setShowShareAsLink(true)}
        label="Share selection as link for the client"
      />
      <div style={{ height: "15px" }} />
      <BlueWhiteButton
        style={{ width: "440px" }}
        icon={shareSelection}
        iconOn={shareSelectionOn}
        onClick={() => setShowShareAsPdf(true)}
        label="Share selection as PDFs for the client"
      />
      <div style={{ height: "15px" }} />
      <BlueWhiteButton
        icon={saveSearch}
        iconOn={saveSearchOn}
        onClick={() => setShowSaveSearch(true)}
        label="Save search for the client"
      />
    </div>
  );

  // const style = { backgroundImage: `url(${pageBg})`, backgroundSize: '100%' };

  let boxes;
  console.log("selected array:", selectedProperties);
  if (selectedProperties.length < 2) {
    boxes = [...selectedProperties, <div />, buttonsBox];
  } else if (selectedProperties.length < 3) {
    boxes = [...selectedProperties, buttonsBox];
  } else {
    boxes = [
      selectedProperties[0],
      selectedProperties[1],
      buttonsBox,
      ...selectedProperties.slice(2),
    ];
  }

  return (
    <div
      className="selected-properties-container"
      style={{ backgroundColor: "white" }}
    >
      <div
        className="link18-bold-no-line"
        style={{ display: "flex" }}
        onClick={doSearch}
      >
        <img src={goBack} alt="" />
        &nbsp;&nbsp;Back
      </div>

      {showShareAsLink && (
        <ShareSelectionPopup
          title="Share selection as link for the client"
          icon={link}
          onClose={() => setShowShareAsLink(false)}
        />
      )}
      {showShareAsPdf && (
        <ShareSelectionPopup
          title="Share selection as PDFs for the client"
          icon={shareSelection}
          onClose={() => setShowShareAsPdf(false)}
        />
      )}
      {showSaveSearch && (
        <SaveSearchPopup onClose={() => setShowSaveSearch(false)} />
      )}

      <div className="selected-properties-results">
        <div className="selected-properties-title">
          Your Properties Selection
        </div>
        <div className="selected-properties-boxes">
          <div />
          <div />
          <div className="selected-properties-sub-title">Action Needed:</div>
        </div>
        <div className="selected-properties-boxes row">
          {boxes.map((property, i) => {
            return property?._id ? (
              <PropertyBox key={i} property={property} />
            ) : (
              <div key={i}>{property}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectedProperties;
