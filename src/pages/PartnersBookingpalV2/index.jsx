// Thin wrapper: BookingPal PMs, rendered with the modern PartnersListView.
// Replaces the legacy PartnersBookingpal/ page — dedicated backend endpoint
// (local/partners-bookingpal) and its own listings drill-down destination
// (PATH_LISTINGS_BOOKINGPAL), no connect/edit modal.
import React from "react";
import PartnersListView from "../PartnersListView";
import { PATH_LISTINGS_BOOKINGPAL } from "../../Util/constants";

const PartnersBookingpalV2 = (props) => (
  <PartnersListView
    {...props}
    title="BP PMs"
    subhead="BookingPal channel property managers"
    endpoint="local/partners-bookingpal"
    drilldownPath={PATH_LISTINGS_BOOKINGPAL}
    // No provider/source needed — the endpoint scopes itself.
    apiParams={{}}
    statusFilterKey="property_status_to_filter_bp_v2"
  />
);

export default PartnersBookingpalV2;
