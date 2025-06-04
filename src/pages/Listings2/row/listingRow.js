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
import "./ListingRow.scss"
import OpenAI from "openai";
import { getStorageValue } from "../../../Util/general";

const Listingrow = (props) => {
  const { property, fullCalendar, id, agent, agency, partner, xdata, updateXdata, listingAddressFull, listingAddressZipExists } = props


  const [chk, setChk] = useState([])
  const [tags, setTags] = useState(xdata?.tags)
  const [region, setNewRegion] = useState(xdata?.region)
  const [subRegion, setNewSubRegion] = useState(xdata?.subRegion)
  const [picIndex, setPicIndex] = useState(0);
  const history = useHistory()
  const [title, setTitle] = useState(xdata.title || property.title)
  const summary =
    property?.publicDescription?.summary ||
    property?.publicDescription?.space
  const [desc, setDesc] = useState(xdata.desc || summary)
  const [blockChannels, setblockChannels] = useState(!xdata.newListings && partner?.accountId !== '64072805d57d670040d5fab6')
  const partnerLogin = getStorageValue('partnerLogin')
  const openai = new OpenAI({
    apiKey: 'sk-bcIta3RH1pbT-3gI3paTOL-a9kJOBvvFG7V2c20XqAT3BlbkFJLmXPW-OAbndQnn5B8kya3ae4aY6AVLRu0E59rpdCcA',
    organization: "org-vLDbTnoXHQHu7bgkVTWTfr2P",
    project: "proj_7arKzumGh222PLgK03D3WatQ",
    dangerouslyAllowBrowser: true
  });


//By Jaison 2025-04-22 - START  
/*
  const [listingIdsToUpdate, setListingIdsToUpdate] = useState([]);
  const handle_listing_ids_to_update = (event) => {
      //alert(event.target.value);
      //alert(event.target.checked);
      if(event.target.checked===true) {
        setListingIdsToUpdate([...listingIdsToUpdate, event.target.value])
      } else if(event.target.checked===false) {
        setListingIdsToUpdate(listingIdsToUpdate.filter(item => item !== event.target.value));
      }
  }
  */
  const agentLoggedIn = JSON.parse( localStorage.getItem('agent') );
  //const allZipcodes = JSON.parse(getStorageValue('allZipcodes') );
  const extranet_vt_logged_in_role = localStorage.getItem('extranet-vt-logged-in-role');

//By Jaison 2025-04-22 - STOP   

  async function AITitle(input, wordCount, exclude) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: 'rewrite in ' + wordCount + ' words excluding the words "' + exclude + ': ' + input }],
        model: "gpt-4o",
      })
      console.log('AI TEXT REWRITE FOR :', input, 'are:', completion?.choices[0]?.message?.content)
      setTitle(completion?.choices[0]?.message?.content)
      xdata.title = completion?.choices[0]?.message?.content
      updateXdata(id, xdata)

      setTimeout(() => {
      }, 1000);
      return (completion?.choices[0]?.message?.content)
    }
    catch {

    }

  }

  async function AIDesc(input, wordCount, exclude) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: 'rewrite in ' + wordCount + ' words ,with no prices, excluding the words "' + exclude + ': ' + input }],
        model: "gpt-4o",
      })
      console.log('AI TEXT REWRITE FOR :', input, 'are:', completion?.choices[0]?.message?.content)
      setDesc(completion?.choices[0]?.message?.content)
      xdata.desc = completion?.choices[0]?.message?.content
      updateXdata(id, xdata)
      return (completion?.choices[0]?.message?.content)
    }
    catch {

    }

  }

  const updateData = () => {
    console.log('NEW REGION:', region, subRegion)
    xdata.tags = tags
    xdata.agent = agent?.firstName + ' ' + agent?.lastName
    //xdata.region = region
    //xdata.subRegion = subRegion
    xdata.status = xdata.channel ? (xdata.channel.length > 0) ? "Approved" : xdata?.newListing ? "Pending" : "Declined" : "Pending"
    xdata.agent = agent?.firstName + ' ' + agent?.lastName
    localStorage.setItem("xdata", JSON.stringify(xdata))
    // console.log('updating Xdata: id',id,'xdata:',xdata)
    updateXdata(id, xdata)
  }



  const setAITitle = () => {
    //console.log('xdata:', xdata)
    try {
      AITitle(property?.title, 8, xdata.pmName + ' ' + xdata.nickname)
      AIDesc(summary, 100, xdata.pmName + ' ' + xdata.nickname)
    }
    catch (error) {
      console.error('Caught an error:', error);
    }


    //     console.log('exchanged title:', property._id, property.title, xdata.title)
    // } catch (error) {
    //     console.error('Caught an error:', error);
    // } finally {
    //     console.log('Cleanup actions.');
    // }

    //  console.log('exchanged title:', property._id, property.title, xdata.title)

  }


  const setNextPic = () => {
    setPicIndex((picIndex + 1 >= picLength) ?
      0 : picIndex + 1)
  };

  const setPrevPic = () => {
    setPicIndex(picIndex === 0 ? picLength - 1 : picIndex - 1);
  };

  const removePic = () => {

    // take data.pictures, copy it to xdata.pictures, then slicing the current pic.
    if (!isNullOrEmptyArray(xdata.pictures) && picLength != null && picLength > 1) {
      xdata?.pictures.splice(picIndex, 1)
      console.log('xdata pics', xdata.pictures)
      updateData()
    } else {
      xdata.pictures = property?.pictures
      xdata.pictures.splice(picIndex, 1)
      console.log('set the xdata.pictures to:', xdata.pictures)
      updateData()
    }
    pic = xdata.pictures[picIndex % xdata.pictures?.length].original
    picPosition = picIndex % property.pictures?.length;
    picLength = xdata?.pictures?.length
    console.log(' removed pic:', picIndex, ' from prop:', property._id, 'xdata pics:', xdata.pictures)
    setPrevPic()
  };
  function swap(arr, from, to) {
    arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
  }
  const mainPic = () => {

    // make selected pic the first=main one!
    if (!isNullOrEmptyArray(xdata.pictures) && picLength != null && picLength > 1) {
      swap(xdata?.pictures, 0, picIndex);
      console.log('xdata pics', xdata.pictures)
      updateData()
    } else {
      xdata.pictures = property?.pictures
      swap(xdata?.pictures, 0, picIndex);
      console.log('set the xdata.pictures to:', xdata.pictures)
      updateData()
    }
    setPicIndex(0);
    pic = xdata.pictures[0 % xdata.pictures?.length].original
    picPosition = 0 % xdata.pictures?.length;
    picLength = xdata?.pictures?.length
    console.log(' main pic from:', picIndex, '  prop:', property._id, 'xdata pics:', xdata.pictures)
  };

  const isNullOrEmptyArray = (arr) => {
    return arr == null || arr.length === 0;
  };

  const toggleCollection = (collection) => {
    const collectionExist = tags.includes(collection)
    if (collectionExist) {
      setTags(tags.filter((f) => f !== collection)) // remove from xdata channel list
    } else {
      setTags([...tags, collection]) // add to xdata channel list
    }
    //console.log('updating Xdata: id',id,'xdata:',xdata)
    updateData()
  }

  const selectedRegion = (newRegion) => {
    console.log("changing region to:", newRegion)
    setNewRegion(newRegion)
    xdata.region = newRegion
    //updateData()
  }

  const selectedSubRegion = (newSubRegion) => {
    console.log("changing subregion for:", newSubRegion)
    setNewSubRegion(newSubRegion)
    updateData()
  }

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
          readOnly={partnerLogin}
          path={eventsIcon}
          pathOver={eventsIconOn}
          pathOver2={eventsIconOnBlue}
          selected={tags?.indexOf("eventCollection") > -1}
          label={eventsLabel}
          onClick={() => toggleCollection("eventCollection")}
        />
        <CollectionIcon
          readOnly={partnerLogin}
          path={familiesIcon}
          pathOver={familiesIconOn}
          pathOver2={familiesIconOnBlue}
          selected={
            tags?.indexOf("familyCollection") > -1
          }
          label={familiesLabel}
          onClick={() => toggleCollection("familyCollection")}
        />
        <CollectionIcon
          readOnly={partnerLogin}
          path={dogsIcon}
          pathOver={dogsIconOn}
          pathOver2={dogsIconOnBlue}
          selected={tags?.indexOf("petsCollection") > -1}
          label={dogsLabel}
          onClick={() => toggleCollection("petsCollection")}
        />
        <CollectionIcon
          readOnly={partnerLogin}
          path={greenIcon}
          pathOver={greenIconOn}
          pathOver2={greenIconOnBlue}
          selected={
            tags?.indexOf("ecoCollection") > -1
          }
          label={greenLabel}
          onClick={() => toggleCollection("ecoCollection")}
        />

      </div>
    )
  }
  const toggleChannel = (channel) => {
    //console.log(channels,channel)
    const channelExists = xdata.channel?.includes(channel)
    const block = (!xdata.newListings && partner?.accountId !== '64072805d57d670040d5fab6')
    xdata.newListing = false;
    //setblockChannels(block)
    // console.log('block?',block)
    // if (xdata.status === 'Declined') {
    //   if (block) {
    //      console.log('cannot approve declined props from our side!')
    //      swal({
    //       show: true,
    //       icon: 'error',
    //       title: 'cannot re-approve !',
    //       text: "ask the PM to re-connect the property : guestyId=" + id + " : "+property.title
    //   })
    //   return { error: 'cannot re-approve declined props' }
    //   } else {
    //     console.log('re-activated on SHM!')
    //     xdata.newListing=true
    //     xdata.status = 'Approved'
    //   }
    if (channelExists) {
      xdata.channel = xdata.channel.filter((f) => f !== channel)
      if (xdata.channel.length === 0) { xdata.status = 'Pending' }
      console.log('after removal of channel:', channel, xdata.channel)
    } else {

      xdata.channel = [...xdata.channel, channel]
      xdata.status = 'Approved'
    }
    updateData()
  }


  const handleResetButton = () => {
    // console.log("Reset pressed! resseting xdata:", property)
    // console.log("updated xdata:", xdataPayload)
    // console.log("changing region for:", property.address.region)
    // setNewRegion(property.address.region)
    // xdata.region=property.address.region
    //updateData()
  }

  const editProperty = () => {
    //console.log("selected listing:" + propertyId, property)
    localStorage.setItem("property", JSON.stringify(property)) // saving to local the selected listing
    history.push(PATH_PROPERTY, { property, xdata })
  }

  const renderChannels = () => {

    return (

      <div className="channels-main-selection-icons"
        style={{
          paddingTop: '15px',
          display: 'grid',
          gridTemplateColumns: '40px 40px 40px',
          justifyItems: 'center',
        }}>
        {<CollectionIcon
          //readOnly={blockxdata.channel}
          readOnly={partnerLogin}
          path={VTChannelIcon}
          pathOver={VTChannelIconOn}
          pathOver2={VTChannelIconOnBlue}
          selected={xdata?.channel?.includes('VT')}
          selected2={false}
          label={VTChannelLabel}
          onClick={() => toggleChannel("VT")}
        />}
        {<CollectionIcon
          readOnly={partnerLogin}
          //readOnly={!xdata.newListings}
          path={SHChannelIcon}
          pathOver={SHChannelIconOn}
          pathOver2={SHChannelIconOnBlue}
          selected={xdata?.channel?.includes('SH')}
          selected2={false}
          label={SHChannelLabel}
          onClick={() => toggleChannel("SH")}
        />}
      </div>
    )
  }

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
 
    <td className="px-3 p-3 text-primary cst-cursor">
    {(extranet_vt_logged_in_role==='admin' && (xdata.region === 'unmapped' || xdata.region === '') ) && 
      <input type="checkbox" value={`${id}_unmapped`} name="listing_ids_to_update[]"  />
    }

    {(extranet_vt_logged_in_role==='admin' && xdata.region !== 'unmapped' && xdata.region !== '') && 
      <input type="checkbox" value={id} name="listing_ids_to_update[]"  />
    }


{extranet_vt_logged_in_role==='partner' && partner.accountId==='585a39dbe43900100017e9e8' &&      
      <label>{xdata.pmName}</label>
    }
    

      <h4>
      <div className="property-main-picture-container">
        <div className="nickname">
          {property.nickname} <span className="property-type">({property?.propertyType})</span><br></br>

          <a target="_blank" href={`https://login.villatracker.com/property/${property._id}`}>
  <span className="property-id">{property._id != null ? property._id : "-"}</span>
</a>          

        </div>
        <div className="img-number">
          {picIndex ? picIndex + 1 : "Main"}/{picLength} Total
          
          {/*<div className="garbage-can">
            {!partnerLogin && <ImageWithHover
              path={canOff}
              pathOver={canOn}
              className="garabage-icon"
              tooltip={'DELETE THIS PIC'}
              onClick={removePic}
            />}
            </div>*/}

          <div className="garbage-can">
            {!partnerLogin && <ImageWithHover
              path={starOff}
              pathOver={starOn}
              tooltip={'set as Main PIC'}
              className="garabage-icon"
              onClick={mainPic}
            />}
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
              onClick={() => editProperty()}
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
        <div className="text-title"><h2>{title}</h2></div>
      </div>


    </h4>
    </td>
     <td  className="px-4 p-6 ">
      {xdata.region==='unmapped' ? <span style={{color:'red','font-weight':'bold'}}>unmapped</span> : <span>Mapped</span> }
     </td>
    <td  className="px-4 p-6 ">
      
      <div className="col-sm-6">
        <label><strong>Country:</strong></label>
         &nbsp;{property.address.country || '-Nil'}
        <br /><br />

        <label><strong>State: </strong></label>
         &nbsp;{property.address.state || '-Nil'}
        <br /><br />

        <label><strong>Region: </strong></label>
         &nbsp;{xdata.region || '-Nil'}
        <br /><br />

        <label><strong>City: </strong></label>
         &nbsp;{property.address.city || '-Nil'}
        <br /><br />

        <label><strong>Sub Region: </strong></label>
         &nbsp;{xdata.subRegion || '-Nil'}
        <br /><br />

        <label><strong>Zipcode: </strong></label>
         &nbsp;{property.address.zipcode || '-Nil'}
      </div>

    </td>
    <td className="px-4 p-3 ">
      <h4>
        {xdata.status}

        { (extranet_vt_logged_in_role==='admin' && xdata.status==='Declined' &&  xdata.declineReason !== '') &&
          <p><i>({xdata.declineReason})</i></p>
        }

        {(extranet_vt_logged_in_role==='admin' && xdata?.statusUpdatedBy != null) &&
          <p>Status Updated By: {xdata.statusUpdatedBy}</p>
        }

      </h4>
    </td>
    <td className="px-4 p-3">
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
        <div className="property-box-footer-right-icon">
          {/* <img src={bedsIcon} alt="" /> */}
          {property.bedrooms} bedrooms
        </div>
      </div>
    </td>
    <td className="px-4 p-3 text-decoration">

{listingAddressZipExists===true &&
       <h4 style={{'background-color':'green'}}>
       {property?.address?.full}
     </h4>
}
{listingAddressZipExists===false &&
       <h4 style={{'background-color':'red'}}>
       {property?.address?.full}
     </h4>
}
     
      {/* !partnerLogin && <RegionsDropDown
        selectedRegion={selectedRegion}
        selectedSubRegion={selectedSubRegion}
        propertyId={id}
        property={property}
        xdata={xdata}
      /> */}
    </td>
  </>

}
export default Listingrow