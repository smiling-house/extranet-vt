// Thin wrapper: the RU/DH cohort of Guesty-via-DistributionHub partners.
// All layout, filtering, pagination and drill-down live in PartnersListView.
import React from "react";
import PartnersListView from "../PartnersListView";

const PartnersGuestyDH = (props) => (
  <PartnersListView
    {...props}
    title="Guesty PMs"
    subhead="Property managers whose listings arrive via the RU/DH Guesty channel"
    apiParams={{
      provider: "rentalsunited_api",
      source: "G",
      // VTHub's RU/DH upsert writes listings with channelSource:"VT" (see
      // rusync.js:2547) — so listing counts must be joined against that.
      channelSource: "VT",
    }}
    statusFilterKey="property_status_to_filter_guesty_dh"
  />
);

export default PartnersGuestyDH;
