import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionHeader from "./CollectionHeader";
import * as propertyActions from "../../../store/redux/Property/actions";
import constants from "../../../Util/constants";
import goBack from "../../../assets/go-back.svg";
import LoadingBox from "../../../components/LoadingBox";
import Paging from "../../../components/Paging";
import PropertyBox from "../../SearchProperty/PropertyBox";
import SelectedProperties from "../../../components/SelectedProperties";

import "./Collection.scss";
import Row from "../../../components/Row";

const Collection = (props, bgVdo) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [showSelection, setShowSelection] = useState(false);
  const isLoading = useSelector((state) => state.property.isLoading);
  const { type, onBack } = props;
  const properties = useSelector((state) => state.property.properties);
  const selectedProperties = useSelector(
    (state) => state.property.selectedProperties
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      await dispatch(propertyActions.loadProperties(pageNumber));
    };
    load();
  }, []);

  const doSearch = (pageNumber) => {
    console.log("skipping : ", pageNumber * constants.PAGING_PAGE_SIZE);
    setShowSelection(false);
    dispatch(propertyActions.loadProperties(pageNumber));
  };

  const onToggleProperty = (property) => {
    dispatch(propertyActions.toggleProperty(property));
  };

  const onChangePage = (pageNumber) => {
    console.log("collection page=", pageNumber);
    setPageNumber(pageNumber);
    doSearch(pageNumber);
  };

  if (showSelection) {
    return <SelectedProperties doSearch={doSearch} />;
  }

  let totalCount = localStorage.getItem("count")
    ? localStorage.getItem("count")
    : 0;
  const propertyPagingFrom = 1 + pageNumber * constants.PAGING_PAGE_SIZE;
  let propertyPagingTo = (pageNumber + 1) * constants.PAGING_PAGE_SIZE;
  if (totalCount < propertyPagingTo) {
    propertyPagingTo = totalCount;
  }
  //console.log("from", propertyPagingFrom," TO ",propertyPagingTo)

  return (
    <div className="collection-container">
      {/* background video */}
      <div class="video-container">
        <video
          id={type == "Family" ? "family" : "dog-events-sustain"}
          src={props.bgVdo}
          autoPlay={true}
          loop
          muted
          width="100%"
          // style={{height:'300xp'}}
        />
      </div>

      <CollectionHeader
        pageNumber={pageNumber}
        propertyPagingTo={propertyPagingTo}
        propertyPagingFrom={propertyPagingFrom}
        bgVdo={props.bgVdo}
        type={type}
        onShowSelectedProperties={() => setShowSelection(true)}
      />
      <LoadingBox visible={isLoading} />
      <div style={{ padding: "20px 30px" }}>
        <Row style={{ paddingBottom: "15px", justifyContent: "space-between" }}>
          <div
            className="link18-bold-no-line"
            style={{ display: "flex" }}
            onClick={onBack}
          >
            <img src={goBack} alt="" />
            &nbsp;&nbsp;Back
          </div>
          {properties && (
            <Paging
              perPage={constants.PAGING_PAGE_SIZE}
              totalItems={properties.count}
              currentPage={pageNumber}
              onChangePage={onChangePage}
            />
          )}
        </Row>
        <div className="collection-boxes row">
          {properties &&
            properties.listings &&
            properties.map((property, i) => {
              const selected =
                selectedProperties.findIndex(
                  (p) => p._id === property?.listing._id
                ) > -1;
              return (
                <PropertyBox
                  key={i}
                  property={property?.listing}
                  selected={selected}
                  onToggle={() => onToggleProperty(property)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
