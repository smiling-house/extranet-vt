// Thin wrapper: the RU-native cohort synced via RU/DH.
// All layout, filtering, pagination and drill-down live in PartnersListView.
import React from "react";
import PartnersListView from "../PartnersListView";

const PartnersRuDH = (props) => (
  <PartnersListView
    {...props}
    title="RU PMs"
    apiParams={{
      provider: "rentalsunited_api",
      source: "RU",
      channelSource: "SH",
    }}
    statusFilterKey="property_status_to_filter_ru_dh"
  />
);

export default PartnersRuDH;
