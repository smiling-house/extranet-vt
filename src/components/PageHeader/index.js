import React, { useState, useEffect } from "react";
import PageHeaderTopRow from "../PageHeaderTopRow";
import CountryRegionSelect from "../../components/Forms/Fields/CountryRegionAutocomplete/CountryRegionSelect";
import DatePickerArrival from "../../components/Forms/Fields/DatePickerArrival/DatePickerArrival";
import DatePickerDeparture from "../Forms/Fields/DatePickerDeparture/DatePickerDeparture";
import advancedSearch from "../../assets/btn-advanced-search.png";
import searchLogo from "../../assets/icons/search.png";
import GuestsPicker from "../../components/GuestsPicker";
import Button from "../Buttons/Button/Button";
import AdvancedSearch from "../../pages/SearchProperty/AdvancedSearch";
import { useLocation } from "react-router-dom";
import "./PageHeader.scss";
import Checkbox from "../Checkbox";
import DestinationsDropDown from "../DestinationsDropDownOld";
import { getStorageValue } from "../../Util/general";
const PageHeader = (props) => {
  const [searchOpen, setSearchOpen] = useState(true);
  const { partnerLogin, handleSearchFuntionality,handlSearchButtonAdmin, bgColor, topBgColor, doSearch,showDestinationSearch } = props;
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [chkOnlyOnDemand, setChkOnlyOnDemand] = useState(false);
  const [chkOnlyWithPrice, setChkOnlyWithPrice] = useState(false);
const [accountId, setAccountId] = useState(partnerLogin);

  const selectDestination = destination => {
    console.log("destination:", destination)
    localStorage.setItem("destination", destination);
    //handleSearchListings("q",destination)
  }
  const toggleSearch = () => {
    // 👇️ passed function to setState
    setSearchOpen(!searchOpen);
    // setSearchOpen(current => !current);
  };

  useEffect(() => {
    const load = async () => {
      //console.log(props);
      if (partnerLogin) {
        console.log('partnerLogin',partnerLogin)
        handleSearchFuntionality("accountId",partnerLogin)
        setAccountId(partnerLogin)
      }
    };
    load();
  }, []);


  const localtion = useLocation();
  const URL = localtion.pathname;
  const mobile = localStorage.getItem("screen");
  return (
    <div
      className="page-header-container"
      style={{
        maxHeight: searchOpen ? mobile ? "600px" : "255px" : "100px",
        backgroundColor: bgColor,
        padding: '10px'
      }}
    >
      {showAdvancedSearch && (
        <AdvancedSearch onClose={() => setShowAdvancedSearch(false)} />
      )}

      {<PageHeaderTopRow
        bgColor={topBgColor}
        searchOpen={true}
        onToggleSearch={toggleSearch}
      />}

        <div className="agencies-search-container">
          <div className="navigation-bar" style={{ position: "absolute", marginBottom: "110px" }}> </div>
          <div className="row">
            <div className="col-sm-3">
              <input type="text" className="form-control" placeholder="Account ID" value={accountId} readonly={partnerLogin} onChange={(e) => handleSearchFuntionality("accountId",e.target.value)} />
            </div>
            <div className="col-sm-3">
              <input type="text" className="form-control" placeholder="PM Name"  onChange={(e) => handleSearchFuntionality("pmName",e.target.value)} />
            </div>
            <div className="col-sm-2">
              <button className="form-control" style={{ height: "60px", width: "200px", fontSize: "20px", borderRadius: "6px", fontWeight: 100, }} onClick={() => handlSearchButtonAdmin()}>
                <span>Search</span>
              </button>
            </div>
            {/* <span className=" agencies-search-separator"></span> */}
          </div>
        </div>
{showDestinationSearch && (
        <div className="page-header-property-top">
          <div className="page-header-top-row2 row">
            <div className="col-sm-3">
              <DestinationsDropDown formerDestination={''} selectDestination={selectDestination} />
            </div>
            <div className=" col-sm-4">
              <GuestsPicker />
            </div>
            <div className="col-sm-2">
              <Button
                onClick={() => doSearch(0, { params: "a" })}
                style={{ height: "60px", fontSize: "25px" }}
                icon={
                  <img
                    src={searchLogo}
                    style={{ width: "30px" }}
                    alt=""
                  />
                }
                fullwidth={true}
                variant="green"
                text="Search"
              />
            </div>
            <div className="col-sm-1">
              <img
                src={advancedSearch}
                style={{ width: "60px", marginRight: "5px", marginLeft: "auto", marginRight: "auto" }}
                alt=""
                onClick={() => setShowAdvancedSearch(true)}
              />
            </div>
          </div>
          <div className="page-header-top-row3">
            <Checkbox
              uid="chkOnlyWithPrice"
              checked={chkOnlyWithPrice}
              onChange={() => setChkOnlyWithPrice(!chkOnlyWithPrice)}
              label="Include only properties with price"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Checkbox
              uid="chkOnlyOnDemand"
              checked={chkOnlyOnDemand}
              onChange={() => setChkOnlyOnDemand(!chkOnlyOnDemand)}
              label="Include only 'On Demand' properties"
            />
          </div>
        </div>
      )}
        <div className="navigation-bar"
          style={{
            position: "absolute",
            marginTop: "70px",
            // marginLeft: "380px",
          }}
        >

        </div>



    </div>
  );
};

export default PageHeader;
