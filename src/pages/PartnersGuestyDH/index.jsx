// Thin wrapper: the RU/DH cohort of Guesty-via-DistributionHub partners.
// All layout, filtering, pagination and drill-down live in PartnersListView.
import React from "react";
import PartnersListView from "../PartnersListView";

const PartnersGuestyDH = (props) => (
  <PartnersListView
    {...props}
    title="Guesty PMs"
    apiParams={{
      provider: "rentalsunited_api",
      source: "G",
      channelSource: "SH",
    }}
    statusFilterKey="property_status_to_filter_guesty_dh"
  />
);

export default PartnersGuestyDH;
