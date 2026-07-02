// Thin wrapper: the RU-native cohort synced via RU/DH.
// All layout, filtering, pagination and drill-down live in PartnersListView.
import React from "react";
import PartnersListView from "../PartnersListView";

const PartnersRuDH = (props) => (
  <PartnersListView
    {...props}
    title="RU PMs"
    subhead="RentalsUnited-native property managers synced via RU/DH"
    apiParams={{
      provider: "rentalsunited_api",
      source: "RU",
      // VTHub's RU/DH upsert writes listings with channelSource:"VT" (see
      // rusync.js:2547) — so listing counts must be joined against that.
      channelSource: "VT",
    }}
    statusFilterKey="property_status_to_filter_ru_dh"
  />
);

export default PartnersRuDH;
