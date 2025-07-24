import Checkbox from "../../../components/Checkbox";
import React, { useCallback, useEffect, useState } from "react"
import { PATH_PROPERTY } from "../../../Util/constants"
import { useHistory } from "react-router-dom"
import swal from "sweetalert"
import canOff from "../../../assets/property/can-off.svg";
import canOn from "../../../assets/property/can-on.svg";
import starOff from "../../../assets/property/star-off.svg";
import regenerateOn from "../../../assets/property/star-on.svg";
import regenerateOff from "../../../assets/property/star-off.svg";
import starOn from "../../../assets/property/star-on.svg";
import picLeft from "../../../assets/property/pic-left-dark.png";
import picLeftOn from "../../../assets/property/pic-left-on-dark.png";
import picRight from "../../../assets/property/pic-right-dark.png";
import picRightOn from "../../../assets/property/pic-right-on-dark.png";
import switchOff from "../../../assets/property/switch.svg";
import switchOn from "../../../assets/property/switch-on.svg";
import Button from "../../../components/Buttons/Button/Button"
import ImageWithHover from "../../../components/ImageWithHover";
import VTChannelIcon from "../../../assets/channels/icons/VTChannel.svg"
import VTChannelIconOn from "../../../assets/channels/icons/VTChannel-on.svg"
import VTChannelIconOnBlue from "../../../assets/channels/icons/VTChannel-on-blue.svg"
import VTChannelLabel from "../../../assets/channels/icons/label-VTChannel.svg"

import SHChannelIcon from "../../../assets/channels/icons/SHChannel.svg"
import SHChannelIconOn from "../../../assets/channels/icons/SHChannel-on.svg"
import SHChannelIconOnBlue from "../../../assets/channels/icons/SHChannel-on-blue.svg"
import SHChannelLabel from "../../../assets/channels/icons/label-SHChannel.svg"

import TLChannelIcon from "../../../assets/channels/icons/TLChannel.svg"
import TLChannelIconOn from "../../../assets/channels/icons/TLChannel-on.svg"
import TLChannelIconOnBlue from "../../../assets/channels/icons/TLChannel-on-blue.svg"
import TLChannelLabel from "../../../assets/channels/icons/label-TLChannel.svg"

import eventsIcon from "../../../assets/special-collection/icons/events.svg"
import eventsIconOn from "../../../assets/special-collection/icons/events-on.svg"
import eventsIconOnBlue from "../../../assets/special-collection/icons/events-on-blue.svg"
import eventsLabel from "../../../assets/special-collection/icons/label-events.svg"

import dogsIcon from "../../../assets/special-collection/icons/dogs.svg"
import dogsIconOn from "../../../assets/special-collection/icons/dogs-on.svg"
import dogsIconOnBlue from "../../../assets/special-collection/icons/dogs-on-blue.svg"
import dogsLabel from "../../../assets/special-collection/icons/label-pets.svg"

import greenIcon from "../../../assets/special-collection/icons/green.svg"
import greenIconOn from "../../../assets/special-collection/icons/green-on.svg"
import greenIconOnBlue from "../../../assets/special-collection/icons/green-on-blue.svg"
import greenLabel from "../../../assets/special-collection/icons/label-sustainable.svg"

import familiesIcon from "../../../assets/special-collection/icons/kids.svg"
import familiesIconOn from "../../../assets/special-collection/icons/kids-on.svg"
import familiesIconOnBlue from "../../../assets/special-collection/icons/kids-on-blue.svg"
import familiesLabel from "../../../assets/special-collection/icons/label-families.svg"
import bathIcon from "../../../assets/property/baths.png";
import bedsIcon from "../../../assets/property/beds.png";
import peopleIcon from "../../../assets/property/people.png";

import CollectionIcon from "../../../components/CollectionIcon"
import RegionsDropDown from "../../../components/RegionsDropDown"
import "./EPSListingRow.scss"
import { getStorageValue } from "../../../Util/general";

//By Jaison
import axios from "axios"
import constants from "../../../Util/constants"

const EPSListingrow = (props) => {
  const { property, fullCalendar, id, agent, agency, partner, xdata, updateXdata , EPSstatus, handleStatusButton} = props
  const oldXdata=xdata
  const [chk, setChk] = useState([])
  const [tags, setTags] = useState(xdata?.tags)
  const [region, setNewRegion] = useState(xdata?.region)
  const [subRegion, setNewSubRegion] = useState(xdata?.subRegion)
  const [picIndex, setPicIndex] = useState(0);
  const history = useHistory()
  const [title, setTitle] = useState(xdata.title||property.title)
  const [change, setChange] = useState(null)
  const summary =
    property?.publicDescription?.summary ||
    property?.publicDescription?.space
  const [desc, setDesc] = useState(xdata.desc || summary)
  const [blockChannels, setblockChannels] = useState(!xdata.newListings && partner?.accountId !== '64072805d57d670040d5fab6')
  const partnerLogin = getStorageValue('partnerLogin')

  //By Jaison
  const Epartner = JSON.parse(localStorage.getItem("Epartner"))
  const partnerId = Epartner.partnerId
 // console.log( 'Epartner....')  
 // console.log( Epartner)  
 // console.log('partnerId:' + partnerId)  



  //By Jaison
  const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g'

  const userRequest = axios.create({
      headers: {
          Authorization: `Bearer ${token2}`
      }
  })  

  const setNextPic = () => {
    setPicIndex((picIndex + 1 >= picLength) ?
      0 : picIndex + 1)
  };

  const setPrevPic = () => {
    setPicIndex(picIndex === 0 ? picLength - 1 : picIndex - 1);
  };

  const isNullOrEmptyArray = (arr) => {
    return arr == null || arr.length === 0;
  };



  const renderAmount = (title, pic, amount) => {
    return (
      <div className="property-page-body-top-left-info-amount">
        <div className="row d-flex justify-content-center m-2">
          <img src={pic} alt="" style={{ width: "40px" }} />
        </div>
        <div className="row d-flex justify-content-center m-2">{title}</div>
        <div className="row d-flex justify-content-center m-2">
          {amount ? amount : ``}
        </div>
      </div>
    );
  };

  const renderSpecialCollections = () => {
    return (
      /* 	<div>
              <img src={specialEvents} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
              <img src={specialFamilies} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
              <img src={greenIcon} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
              <img src={dogsIcon} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
          </div> */
      <div className="search-main-selection-icons"
        style={{
          paddingTop: '5px',
          display: 'grid',
          gridTemplateColumns: '60px 60px 60px 60px',
          justifyItems: 'center',
        }}>
        <CollectionIcon
          readOnly={true}
          path={eventsIcon}
          pathOver={eventsIconOn}
          pathOver2={eventsIconOnBlue}
          selected={tags?.indexOf("eventCollection") > -1}
          label={eventsLabel}
          //onClick={() => toggleCollection("eventCollection")}
        />
        <CollectionIcon
          readOnly={true}
          path={familiesIcon}
          pathOver={familiesIconOn}
          pathOver2={familiesIconOnBlue}
          selected={
            tags?.indexOf("familyCollection") > -1
          }
          label={familiesLabel}
          //onClick={() => toggleCollection("familyCollection")}
        />
        <CollectionIcon
          readOnly={true}
          path={dogsIcon}
          pathOver={dogsIconOn}
          pathOver2={dogsIconOnBlue}
          selected={tags?.indexOf("petsCollection") > -1}
          label={dogsLabel}
          //onClick={() => toggleCollection("petsCollection")}
        />
        <CollectionIcon
          readOnly={true}
          path={greenIcon}
          pathOver={greenIconOn}
          //pathOver2={greenIconOnBlue}
          selected={
            tags?.indexOf("ecoCollection") > -1
          }
          label={greenLabel}
          //onClick={() => toggleCollection("ecoCollection")}
        />

      </div>
    )
  }



  const editProperty = (id) => {
    //console.log("selected listing:" + propertyId, property)
    localStorage.setItem("property", JSON.stringify(property)) // saving to local the selected listing
    history.push(PATH_PROPERTY+'/'+id, { property, xdata })
  }

  // const renderChannels = () => {s

  //   return (

  //     <div className="channels-main-selection-icons"
  //       style={{
  //         paddingTop: '15px',
  //         display: 'grid',
  //         gridTemplateColumns: '40px 40px 40px',
  //         justifyItems: 'center',
  //       }}>
  //       {<CollectionIcon
  //         //readOnly={blockxdata.channel}
  //         readOnly={partnerLogin}
  //         path={VTChannelIcon}
  //         pathOver={VTChannelIconOn}
  //         pathOver2={VTChannelIconOnBlue}
  //         selected={xdata?.channel?.includes('VT')&&xdata?.status==='Approved'}
  //         selected2={false}
  //         label={VTChannelLabel}
  //         //onClick={() => toggleChannel("VT")}
  //       />}
  //       {<CollectionIcon
  //         readOnly={partnerLogin}
  //         //readOnly={!xdata.newListings}
  //         path={SHChannelIcon}
  //         pathOver={SHChannelIconOn}
  //         pathOver2={SHChannelIconOnBlue}
  //         selected={xdata?.channel?.includes('SH')&&xdata?.status==='Approved'}
  //         selected2={false}
  //         label={SHChannelLabel}
  //         //onClick={() => toggleChannel("SH")}
  //       />}
  //     </div>
  //   )
  // }

  //picture:
  let pic = null;
  let picPosition = 0
  let picLength = 0
  if (!isNullOrEmptyArray(xdata.pictures) && picIndex != null) {
    pic = xdata.pictures[picIndex % xdata.pictures?.length].original
    picPosition = picIndex % xdata.pictures?.length;
    picLength = xdata?.pictures?.length

  } else
    if (!isNullOrEmptyArray(property.pictures) && picIndex != null) {
      pic = property.pictures[picIndex % property.pictures?.length].original
      picPosition = picIndex % property.pictures?.length;
      picLength = property?.pictures?.length
    }
  //main xdata return here:
  return <>
    <td className="px-3 p-3 text-primary cst-cursor"><h4 >
      <div className="property-main-picture-container">
        <div className="nickname">
          {property.nickname} <span className="property-type">({property?.propertyType})</span><br></br>
          <span className="property-id">{property._id != null ? property._id : "-"}</span>
        </div>
        <div className="img-number">
          {picIndex ? picIndex + 1 : "Main"}/{picLength} Total
          <div className="garbage-can">
            {/* {!partnerLogin && <ImageWithHover
              path={canOff}
              pathOver={canOn}
              className="garabage-icon"
              tooltip={'DELETE THIS PIC'}
              onClick={removePic}
            />} */}
          </div>
          <div className="garbage-can">
            {/* {!partnerLogin && <ImageWithHover
              path={starOff}
              pathOver={starOn}
              tooltip={'set as Main PIC'}
              className="garabage-icon"
              onClick={mainPic}
            />} */}
          </div>
        </div>
        <div className="property-main-picture-container">
          <div className="img-slider">
            <ImageWithHover
              path={picLeft}
              pathOver={picLeftOn}
              className="property-page-prev-next-pic"
              style={{ left: "10px" }}
              onClick={setPrevPic}
            />
            <div
              className="property-main-picture"
              onClick={() => editProperty(id)}
              style={{
                backgroundImage: pic ? `url(${pic})` : "transparent",
                backgroundSize: "cover",
              }}
            />
            <ImageWithHover
              path={picRight}
              pathOver={picRightOn}
              className="property-page-prev-next-pic"
              style={{ right: "10px" }}
              onClick={setNextPic}
            />
          </div>
        </div>
      </div>
      <div className="text-title">{property?.title}
        {/* {!partnerLogin && <ImageWithHover
          path={regenerateOff}
          pathOver={regenerateOn}
          className="property-page-prev-next-pic"
          style={{ right: "10px" }}
          tooltip={'AI generate for title:' + property?.title + ' and rewrite the desc.' + desc}
          onClick={setAITitle}
        />} */}
      </div>

    </h4>
    </td>
    <td className="px-4 p-3 ">
      <h4>{EPSstatus}
      </h4>
    </td>
    <td className="px-4 p-3">
      <h4>
        {fullCalendar ? fullCalendar.length : 'undefined'}
      </h4>
    </td><td className="px-4 p-3">
      <h4>
        {renderSpecialCollections()}<br></br><br></br>
        weekdays: {property?.prices?.basePrice} {property?.prices?.currency}<br></br>
        weekend:  {property?.prices?.weekendBasePrice || property?.prices?.basePrice} {property?.prices?.currency}<br></br>
        {property?.prices?.weeklyPriceFactor < 1 && (
          <>
            week discount: {parseInt(100 - property?.prices?.weeklyPriceFactor * 100)}% <br></br>
          </>
        )}
        {property?.prices?.monthlyPriceFactor < 1 && (
          <>
            month discount: {parseInt(100 - property?.prices?.monthlyPriceFactor * 100)}%
          </>
        )}
      </h4>
      <div className="property-box-footer-left">
          <div className="property-box-footer-left-icon">
            <img src={peopleIcon} alt="" />
            {property?.accommodates}
          </div>
          <div className="property-box-footer-left-icon">
            <img src={bedsIcon} alt="" />
            {xdata?.beds} 
          </div>
          <div className="property-box-footer-left-icon">
            <img src={bathIcon} alt="" />
            {property?.bathrooms}
          </div>
          <div className="property-box-footer-left-icon">
            {/* <img src={bedsIcon} alt="" /> */}
            {property.bedrooms} bedrooms 
          </div>

      </div>
    </td>
    <td className="px-4 p-3 ">
      {/*
      {!partnerLogin && <Button
        style={{ height: '60px', width: '100px', fontSize: '1rem', borderRadius: '6px' }}
        variant="green"
        text="Geo-Reset"
        onClick={handleResetButton()}
      />}
      */}

        { EPSstatus==='pending' || EPSstatus==='disconnected'  ? (<Button
        style={{ height: '60px', width: '100px', fontSize: '1rem', borderRadius: '6px' }}
        variant="green"
        text="Connect"
        onClick={() => handleStatusButton(id,true)}
      />) : '' }

        { EPSstatus==='connected' ? (<Button
        style={{ height: '60px', width: '100px', fontSize: '1rem', borderRadius: '6px' }}
        variant="red"
        text="Disconnect"
        onClick={() => handleStatusButton(id,false)}
      />) : '' }
    </td>
    <td className="px-4 p-3 text-decoration">
      <h4>
        {property?.address?.country},{property?.address?.state},{property?.address?.city} {property?.address?.full}
      </h4>
      {/* {!partnerLogin && <RegionsDropDown
        selectedRegion={selectedRegion}
        selectedSubRegion={selectedSubRegion}
        propertyId={id}
        property={property}
        xdata={xdata}
      />} */}
    </td>
    <td className="px-4 p-3">
      <h4>
        {agent?.firstName + ' ' + agent?.lastName||''}
      </h4>
    </td>
  </>

}
export default EPSListingrow
